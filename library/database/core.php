<?php

# Special DB namespace
namespace sky\db;

use sky\databaseException;


/**
 * @abstract Advanced database functions which may be used in other classes
 * Use class for specified database to access databases
 */
abstract class core {

	/**
	 * Constants
	 */
	const DATE_SQL = "Y-m-d";
	const DATETIME_SQL = "Y-m-d H:i:s";

	/**
	 * Available join types
	 * @var array
	 */
	protected $joinTypes = array("LEFT", "RIGHT", "INNER");

	/**
	 * Parameters types
	 * @var array
	 */
	protected $parametersTypes = array("group"   => "multi",
									   "order"   => "multi",
									   "join"    => "multi",
									   "records" => "multi",
									   "offset"  => "int",
									   "limit"   => "int");

	/**
	 * Creates where condition based on parameters
	 * @param condition $conditions Conditions parameters
	 * @param bool  $mainTable  Holds table for which query is performed
	 * @return string
	 */
	protected function makeWhere($conditions, $mainTable = false) {

		# If no conditions
		if(!$conditions || !$conditions->conditions)
			return "";


		# Compiled expression
		$expression = "WHERE " . $conditions->toString($mainTable);


		# Return
		return $expression;

	}

	/**
	 * Creates where condition based on parameters
	 * @param condition $conditions Conditions parameters
	 * @param bool  $mainTable  Holds table for which query is performed
	 * @return string
	 */
	protected function makeHaving($conditions, $mainTable = false) {

		# If no conditions
		if(!$conditions || !$conditions->conditions)
			return "";

		# Compiled expression
		$expression = "HAVING " . $conditions->toString($mainTable);

		# Return
		return $expression;

	}

	/**
	 * Gets query string parts from parameters
	 * @param String $name    Part name
	 * @param Mixed  $value   Value for expression generation
	 * @param Mixed  $options Additional options
	 * @throws databaseException
	 * @return string
	 */
	protected function getQueryPart($name, $value, $options = false) {


		# Check type
		if(is_array($value) && $this->parametersTypes[$name] !== "multi")
			throw new databaseException("This parameter can't be array: " . $name);


		# Prepare expression
		switch($name) {
			case "group":
				$expression = "GROUP BY ";
				break;
			case "order":
				$expression = "ORDER BY ";
				break;
			case "limit":
				$expression = "LIMIT ";
				break;
			case "offset":
				$expression = "OFFSET ";
				break;
			default:
				$expression = "";
		}


		# Empty parameters
		if(empty($value)) return "";


		# If array
		if(is_array($value)) {
			switch($name) {
				case "join":


					# Convert single join to array structure
					if(!isset($value[0]))
						$value = array($value);


					# Multiple joins
					foreach($value as $join) {

						/** @var $join join */

						# Adds space for second join
						if(!empty($expression))
							$expression .= " ";

						# Add join string
						$expression .= $join->toString();

					}
					break;

				case "order":


					foreach($value as $field => $order) {


						# Add comma
						if($expression !== "ORDER BY ") $expression .= ", ";


						# If simple string
						if(is_numeric($field)) {
							if(!strstr($order, " ASC") && !strstr($order, " DESC")) $order = $order . " ASC";
							$expression .= " " . $order;
							continue;
						}

						# Add dashes
						if(!strstr($field, "("))
							$field = $this::addBackDashes($field, $options);


						# Make order
						$expression .= " " . $field . " " . strtoupper($order);

					}
					break;

				case "records":

					# Go through
					foreach($value as $record) {

						/* Add back dashes */
						$string = $this->addBackDashes($record["field"], $record["table"] ? $record["table"] : $options);

						/* Set */
						if($record["alias"])
							$string = "$string as `{$record["alias"]}`" ;

						/* Add comma */
						if($expression)
							$expression .= ", ";

						/* Save record */
						$expression .= $string;

					}
					break;
				case "group":
					$expression .= $this->implodeNames($value, $options);
					break;
				default:
					$expression .= $this->implodeNames($value);
					break;
			}
			return $expression;
		}


		# Corrections and checks
		if($name == "offset" && $value < 1)
			return "";

		if($name == "order" && !strstr($value, " ASC") && !strstr($value, " DESC"))
			$value = $value . " ASC";


		# If $value not array
		return $expression . $value;

	}

	/**
	 * Separates values with dashes
	 * @param mixed $value Value
	 * @return mixed
	 */
	public static function addDashes($value) {

		# Arrays
		if(is_array($value)) {
			foreach($value as $val)
				$value = self::addDashes($val);
		}

		# If special type
		if(!is_string($value))
			return $value;

		# For safe
		$value = addslashes($value);

		# Return
		return "'$value'";

	}

	/**
	 * Add back dashes to names
	 * @param string      $key   Name of field or condition
	 * @param bool|string $table Table name to add to field name
	 * @return string
	 */
	public static function addBackDashes($key, $table = false) {


		# Trim
		$key = trim($key);


		# If we can't get name
		if(strpos($key, " ") !== false || strpos($key, "(") !== false)
			return $key;


		# Add table
		if($table && mb_strpos($key, '.') === false)
			$key = $table . '.' . $key;


		# Add dashes
		$key = str_replace('`', '', $key); # Replace old if set
		$key = str_replace('.', '`.`', $key); # Dot separate
		$key = "`$key`"; # Separate all
		$key = str_replace('`*`', '*', $key); # Star match


		# Return
		return $key;

	}

	/**
	 * Implodes name list and add dashes
	 * @param Array       $names Column names
	 * @param bool|string $table Table name to add to non table set values
	 * @throws databaseException
	 * @return string
	 */
	public static function implodeNames($names, $table = false) {

		$result = "";

		# Check
		if(!is_array($names))
			throw new databaseException("Not an array");

		# Go through
		foreach($names as $name) {

			if($result !== "") $result .= ", ";
			$result .= self::addBackDashes($name, $table);

		}

		return $result;

	}

}