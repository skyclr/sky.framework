<?php
require_once "tableColumn.php";
class entityBuilder {

	private static $singleton;

	/**
	 * Singleton
	 * @return entityBuilder
	 */
	public static function get() {
		if(!self::$singleton)
			self::$singleton = new static();
		return self::$singleton;
	}

	private function __construct() {

		# Add path of entity template
		\sky\Sky::$twigLoader->addPath(\sky\Sky::location("helpers")."entityBuilder/");

	}

	function getEntity($tableName, $parameters) {

		# Get definition
		$definition = $this->getTableDefinition($tableName, $parameters);

		# Make code
		return [\sky\Sky::$twig->render("subEntityTemplateNew.twig", [
			"table_name"         => $definition["table_name"],
			"entity_name"        => $definition["entity_name"],
			"fields"             => "public\n\t\t" . implode(",\n\t\t", $definition["fields"]) . ";",
			"data_fill"          => implode(";\n\t\t", $definition["data_fill"]) . ";",
			"save_fields"        => implode(",\n\t\t\t", $definition["save_fields"]),
			"fields_definitions" => implode("\n", $definition["fields_definitions"]),
			"array_fields"       => implode(",\n\t\t\t", $definition["array_fields"]),
		]), $definition["entity_name"]];

	}

	function getManager($tableName, $parameters) {

		# Get definition
		$definition = $this->getTableDefinition($tableName, $parameters);

		# Make code
		return [\sky\Sky::$twig->render("subManagerTemplate.twig", [
			"table_name"   => $definition["table_name"],
			"entity_name"  => $definition["entity_name"],
			"manager_name" => $definition["manager_name"],
			"fields"       => "public\n\t\t" . implode(",\n\t\t", $definition["fields"]) . ";",
			"data_fill"    => implode(";\n\t\t", $definition["data_fill"]) . ";",
			"save_fields"  => implode(",\n\t\t\t", $definition["save_fields"]),
			"array_fields" => implode(",\n\t\t\t", $definition["array_fields"]),
		]), $definition["manager_name"]];

	}

	function getTableDefinition($tableName, $parameters) {

		$database = \sky\Sky::$config["database"]["name"];
		$fields = \sky\Sky::$db->query("select * from information_schema.columns where TABLE_SCHEMA = '$database' and  TABLE_NAME = '$tableName'");

		if(!$fields)
			throw new \sky\UserErrorException("No table '$tableName' exists");

		$entityName = ucfirst($tableName);
		if($entityName[strlen($entityName) - 1] == "s")
			$entityName = substr($entityName, 0, strlen($entityName) - 1);

		# Replace entity name
		if(!empty($parameters["entityName"]))
			$entityName = $parameters["entityName"];

		$managerName = $entityName . "s";

		# Replace entity name
		if(!empty($parameters["managerName"]))
			$managerName = $parameters["managerName"];

		$replaces = [
			"table_name"         => $tableName,
			"entity_name"        => $entityName,
			"manager_name"       => $managerName,
			"fields"             => [],
			"data_fill"          => [],
			"save_fields"        => [],
			"fields_definitions" => [],
			"array_fields"       => []
		];

		foreach($fields as $field) {

			# column info
			$column = new tableColumn($field);

			# Array conversion
			$replaces["array_fields"][] = $this->getFieldSaveExpressions($column);

			# Skip id
			if($column->COLUMN_NAME == "id")
				continue;

			$replaces["fields"][]             = '$' . $column->COLUMN_NAME;
			$replaces["data_fill"][]          = $this->getFieldFillExpressions($column);
			$replaces["fields_definitions"][] = $this->getFieldDefinition($column);
			$replaces["save_fields"][]        = $this->getFieldSaveExpressions($column);

		}

		return $replaces;

	}

	function getFieldFillExpressions(tableColumn $field) {


		$expressions = "\$this->{$field->COLUMN_NAME} = \$data->key(\"{$field->COLUMN_NAME}\")";

		# Type filter
		if($field->DATA_TYPE == "int")
			$expressions .= "->typeFilter(FilterRule::TYPE_INTEGER)";
		elseif($field->DATA_TYPE == "date" || $field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= "->typeFilter(FilterRule::TYPE_DATE)";
		else
			$expressions .= "->typeFilter(FilterRule::TYPE_EMPTY_STRING)";

		# Defaults
		if(is_null($field->COLUMN_DEFAULT))
			$expressions .= "->valueOr(null)";
		elseif($field->DATA_TYPE == "date" || $field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= "->convertedValueOr(\\sky\\VarFilter::CONVERT_DATE, \\sky\\DateTime::make())";
		elseif($field->IS_NULLABLE == "YES")
			$expressions .= "->valueOr(null)";
		else
			$expressions .= "->valueOr(\"{$field->COLUMN_DEFAULT}\")";

		return $expressions;

	}

	/**
	 * Return PhpDOC
	 * @param tableColumn $field
	 * @return string
	 */
	function getFieldDefinition(tableColumn $field) {

		$expressions = "\t/**\n\t * Table field '$field->COLUMN_NAME'\n \t * @var ";

		# Type filter
		if($field->DATA_TYPE == "int")
			$expressions .= "int";
		elseif($field->DATA_TYPE == "date" || $field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= '\sky\Datetime';
		elseif($field->DATA_TYPE == "float" || $field->DATA_TYPE == "double")
			$expressions .= "float";
		else
			$expressions .= "string";

		# Expression
		$expressions .= "\n\t * @entityType ";

		# Type filter
		if($field->DATA_TYPE == "int")
			$expressions .= "int";
		elseif($field->DATA_TYPE == "date" || $field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= $field->DATA_TYPE;
		elseif($field->DATA_TYPE == "float" || $field->DATA_TYPE == "double")
			$expressions .= "float";
		else
			$expressions .= "text";

		# Expression
		$expressions .= "\n\t * @entityDefault ";

		# Defaults
		if(is_null($field->COLUMN_DEFAULT))
			$expressions .= "null";
		elseif($field->DATA_TYPE == "date" || $field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= "now";
		elseif($field->IS_NULLABLE == "YES")
			$expressions .= "null";
		else
			$expressions .= "{$field->COLUMN_DEFAULT}";
		# Expression
		$expressions .= "\n\t * @permission meta, array, save";

		return $expressions . "\n\t */\n\t" . "public \${$field->COLUMN_NAME};\n";

	}


	/**
	 * Returns save expression
	 * @param tableColumn $field
	 * @return string
	 */
	function getFieldSaveExpressions(tableColumn $field) {

		$expressions = "\"{$field->COLUMN_NAME}\" => ";

		if($field->DATA_TYPE == "datetime" || $field->DATA_TYPE == "timestamp")
			$expressions .= "\$this->{$field->COLUMN_NAME} ? \$this->{$field->COLUMN_NAME}->format(\\sky\\DateTime::DATETIME_SQL) : null";
		elseif($field->DATA_TYPE == "date")
			$expressions .= "\$this->{$field->COLUMN_NAME} ? \$this->{$field->COLUMN_NAME}->format(\\sky\\DateTime::DATE_SQL) : null";
		else
			$expressions .= "\$this->{$field->COLUMN_NAME}";

		return $expressions;

	}

}