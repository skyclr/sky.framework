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
			"fields_definitions" => implode("\n", $definition["fields_definitions"]),
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
			"fields_definitions" => [],
		];

		foreach($fields as $field) {

			# column info
			$column = new tableColumn($field);

			# Skip id
			if($column->COLUMN_NAME == "id")
				continue;

			$replaces["fields_definitions"][] = $this->getFieldDefinition($column);

		}

		return $replaces;

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
		elseif($field->DATA_TYPE == "enum")
			$expressions .= $field->COLUMN_TYPE;
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

}