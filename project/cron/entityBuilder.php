<?php

# System include
require_once dirname(__FILE__) . '/../library/core/main.php';

# Handle init output
ob_start();

# Init
new sky\sky('console');

# Remove library init information
ob_end_clean();

# Make actions
try {

	# Check params
	if($argc < 2 || empty($argv[1]))
		die("No table provided");

	# Add path of entity template
	\sky\sky::$twigLoader->addPath(\sky\sky::location("classes"));

	# Make definition
	getTableDefinition($argv[1]);

	echo "Done\n\n";

} catch(Exception $e) {
	echo "Catch exception: " . $e->getMessage() . "\n";
}

function parseParameters() {

	# Globals
	global $argv;

	# Result parameters list
	$parameters = [];

	# If no params
	if(empty($argv))
		return $parameters;

	# Go through
	for($i = 2; $i < sizeof($argv); $i++) {
		$value = $argv[$i];
		switch($value) {
			case "-e": {
				if(empty($argv[$i + 1]) || $argv[$i + 1][0] == "-")
					throw new \sky\userErrorException("No entity name provided after -e");
				$parameters["entityName"] = $argv[++$i];
				break;
			}
			case "-m": {
				if(empty($argv[$i + 1]) || $argv[$i + 1][0] == "-")
					throw new \sky\userErrorException("No manager name provided after -m");
				$parameters["managerName"] = $argv[++$i];
				break;
			}
			case "-se": {
				$parameters["save"] = true;
				break;
			}
			case "-sm": {
				$parameters["saveManager"] = true;
				break;
			}
			default:
				throw new \sky\userErrorException("Unknown parameter: {$argv[$i]}");
		}
	}

	return $parameters;

}

function getTableDefinition($tableName) {

	$fields     = \sky\sky::$db->query("select * from information_schema.columns where TABLE_NAME = '$tableName'");

	if(!$fields)
		throw new \sky\userErrorException("No table '$tableName' exists");

	$entityName = ucfirst($tableName);
	if($entityName[strlen($entityName) - 1] == "s")
		$entityName = substr($entityName, 0, strlen($entityName) - 1);

	# Get command string vars
	$parameters = parseParameters();

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
		$replaces["array_fields"][] = getFieldSaveExpressions($column);

		# Skip id
		if($column->COLUMN_NAME == "id")
			continue;

		$replaces["fields"][]             = '$' . $column->COLUMN_NAME;
		$replaces["data_fill"][]          = getFieldFillExpressions($column);
		$replaces["fields_definitions"][] = getFieldDefinition($column);
		$replaces["save_fields"][]        = getFieldSaveExpressions($column);

	}

	# Make code
	$code = \sky\sky::$twig->render("core/subEntityTemplateNew.twig", [
		"table_name"         => $replaces["table_name"],
		"entity_name"        => $replaces["entity_name"],
		"fields"             => "public\n\t\t" . implode(",\n\t\t", $replaces["fields"]) . ";",
		"data_fill"          => implode(";\n\t\t", $replaces["data_fill"]) . ";",
		"save_fields"        => implode(",\n\t\t\t", $replaces["save_fields"]),
		"fields_definitions" => implode("\n", $replaces["fields_definitions"]),
		"array_fields"       => implode(",\n\t\t\t", $replaces["array_fields"]),
	]);

	if(empty($parameters["save"]) && empty($parameters["manager"])) {
		echo $code;
		exit;
	}

	if(!empty($parameters["save"])) {
		file_put_contents(\sky\sky::location("classes") . "entities/$entityName.php", $code);
	}

	# Make code
	$code = \sky\sky::$twig->render("core/subManagerTemplate.twig", [
		"table_name"   => $replaces["table_name"],
		"entity_name"  => $replaces["entity_name"],
		"manager_name" => $replaces["manager_name"],
		"fields"       => "public\n\t\t" . implode(",\n\t\t", $replaces["fields"]) . ";",
		"data_fill"    => implode(";\n\t\t", $replaces["data_fill"]) . ";",
		"save_fields"  => implode(",\n\t\t\t", $replaces["save_fields"]),
		"array_fields" => implode(",\n\t\t\t", $replaces["array_fields"]),
	]);

	if(empty($parameters["saveManager"])) {
		echo $code;
		exit;
	} else {
		file_put_contents(\sky\sky::location("classes") . "managers/$managerName.php", $code);
	}


	# log
	return $code;
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

	$expressions = "\t/**\n\t * Table field\n \t * @var ";

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

	return $expressions . "\n\t */\n\tpublic \${$field->COLUMN_NAME};\n";

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


/**
 *    ["Field"]=> string(2) "id"
 *    ["Type"]=> string(7) "int(11)"
 *    ["Null"]=> string(2) "NO"
 *    ["Key"]=> string(3) "PRI"
 *    ["Default"]=> NULL
 *    ["Extra"]=> string(14) "auto_increment"
 */

/**
 * table_name
 * entity_name
 * fields
 * data_fill
 * save_fields
 * array_fields
 *
 * }
 *
 *
 * function getFieldSaveExpressions(tableColumn $field) {
 *
 * $expressions = "\"{$field["Field"]}\" => ";
 *
 * if(stripos($field["Type"], "timestamp") !== false)
 * $expressions .= "\$this->{$field["Field"]} ? \$this->{$field["Field"]}->format(\\sky\\DateTime::DATETIME_SQL) : null";
 * elseif(stripos($field["Type"], "datetime") !== false)
 * $expressions .= "\$this->{$field["Field"]} ? \$this->{$field["Field"]}->format(\\sky\\DateTime::DATETIME_SQL) : null";
 * elseif(stripos($field["Type"], "date") !== false)
 * $expressions .= "\$this->{$field["Field"]} ? \$this->{$field["Field"]}->format(\\sky\\DateTime::DATE_SQL) : null";
 * else $expressions .= "\$this->{$field["Field"]}";
 *
 * return $expressions;
 *
 * }
 *
 * /**
 *    ["Field"]=> string(2) "id"
 *    ["Type"]=> string(7) "int(11)"
 *    ["Null"]=> string(2) "NO"
 *    ["Key"]=> string(3) "PRI"
 *    ["Default"]=> NULL
 *    ["Extra"]=> string(14) "auto_increment"
 */

/**
 * table_name
 * entity_name
 * fields
 * data_fill
 * save_fields
 * array_fields
 *
 * TABLE_CATALOG
 * TABLE_SCHEMA
 * TABLE_NAME
 * COLUMN_NAME
 * ORDINAL_POSITION
 * COLUMN_DEFAULT
 * IS_NULLABLE
 * DATA_TYPE
 * CHARACTER_MAXIMUM_LENGTH
 * CHARACTER_OCTET_LENGTH
 * NUMERIC_PRECISION
 * NUMERIC_SCALE
 * DATETIME_PRECISION
 * CHARACTER_SET_NAME
 * COLLATION_NAME
 * COLUMN_TYPE
 * COLUMN_KEY
 * EXTRA
 * PRIVILEGES
 * COLUMN_COMMENT
 */
class tableColumn {
	public
		$TABLE_CATALOG,
		$TABLE_SCHEMA,
		$TABLE_NAME,
		$COLUMN_NAME,
		$ORDINAL_POSITION,
		$COLUMN_DEFAULT,
		$IS_NULLABLE,
		$DATA_TYPE,
		$CHARACTER_MAXIMUM_LENGTH,
		$CHARACTER_OCTET_LENGTH,
		$NUMERIC_PRECISION,
		$NUMERIC_SCALE,
		$DATETIME_PRECISION,
		$CHARACTER_SET_NAME,
		$COLLATION_NAME,
		$COLUMN_TYPE,
		$COLUMN_KEY,
		$EXTRA,
		$PRIVILEGES,
		$COLUMN_COMMENT;

	public function __construct($data) {
		foreach($data as $key => $value) {
			$this->{$key} = $value;
		}
	}

}