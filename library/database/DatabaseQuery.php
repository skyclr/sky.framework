<?php

# Special database namespace
namespace sky\db;

use sky\databaseException;
use sky\systemErrorException;
use sky\Utilities;
use sky\Validator;

/**
 * Class to perform new syntax to queries
 */
class DatabaseQuery extends Core {

	/**
	 * Database object
	 * @var DB2
	 */
	private $database = false;

	/**
	 * Tables list
	 * @var string
	 */
	private $tables = false;

	/**
	 * Holds tables list as it was set
	 * @var bool|string|array
	 */
	private $tablesRaw = false;

	/**
	 * Request parameters list
	 * @var array
	 */
	private $parameters = array();

	/**
	 * Conditions list
	 * @var Condition
	 */
	private $conditions = false;

	/**
	 * Having conditions list
	 * @var Condition
	 */
	private $having = false;

	/**
	 * Records to be updated/added
	 * @var array
	 */
	private $records = array();

	/**
	 * Records to be updated on duplicate
	 * @var array
	 */
	private $updateOnDuplicate = array();

	/**
	 * Request trace
	 * @var string|bool
	 */
	private $trace = false;

	/**
	 * Available compares
	 * @var array
	 */
	private $compares = array("=", ">", "<", "!=", "<=", ">=", "<=>", "&", "|", "^", "ANY", "IN", "NOT IN", "IS", "IS NOT", "LIKE", "NOT LIKE", "REGEXP", "NOT REGEXP");

	/**
	 * Available logic
	 * @var array
	 */
	private $logic = array("AND", "OR", "XOR");

	/**
	 * Prepares object
	 * @param DB2                  $database Database access object
	 * @param string|boolean|array $tables   Tables list
	 */
	function __construct($database, $tables = false) {

		# Save database
		$this->database = $database;

		# Make main group
		$this->conditions = new Condition("group", "", false);

		# Set tables list
		if($tables)
			$this->setTables($tables);

	}

	/**
	 * Some manipulation during cloning
	 */
	function __clone() {

		# Clone to not manipulate objects in old request
		$this->conditions = clone $this->conditions;

	}

	/**
	 * Get conditions or count
	 * @param bool $count Should we return or count
	 * @return Condition|bool
	 */
	function getConditions($count = false) {
		return $count ? sizeof($this->conditions) : $this->conditions;
	}


	/**
	 * @return array|bool|string
	 */
	public function getTables() {
		return $this->tablesRaw;
	}

	/**
	 * Sets tables list to use in FROM
	 * @param string|array $tables Tables list
	 * @return $this
	 */
	public function setTables($tables) {

		# Tables convert
		if(is_array($tables)) {

			# Prepare
			foreach($tables as $i => $table)
				$tables[$i] = $this->addBackDashes($table);

			# Compile tables list
			$this->tables = implode(", ", $tables);

		} else
			$this->tables = $this->addBackDashes($tables);

		# Save not imploded
		$this->tablesRaw = $tables;

		# Return
		return $this;

	}

	/**
	 * Set offset and limit for page navigation request
	 * @param int $perPage Elements per page
	 * @param int $page    Page number
	 * @return DatabaseQuery
	 */
	public function setPage($perPage, $page = 1) {

		return $this->limit($perPage)->offset($perPage * ($page - 1));
	}

	/**
	 * Clones current query
	 * @param mixed $drop Elements to be dropped in new request
	 * @see DatabaseQuery::drop
	 * @return DatabaseQuery
	 */
	public function same($drop = false) {

		# Make clone
		$clone = clone $this;

		# Drop
		if($drop)
			$clone->drop($drop);

		# Return
		return $clone;
	}

	/**
	 * Removes some request parameters
	 * @param string|array $what Element(s) to be dropped
	 * @param bool|string  $name Special name for some of drops
	 * @return DatabaseQuery
	 */
	public function drop($what, $name = false) {

		# If array drop each
		if(is_array($what)) {
			foreach($what as $drop)
				$this->drop($drop, $name);

			return $this;
		}

		# Preferences and conditions and etc
		if($what == "parameters") $this->parameters = array();
		if($what == "limit") unset($this->parameters["limit"]);
		if($what == "offset") unset($this->parameters["offset"]);
		if($what == "conditions") $this->conditions = array();
		if($what == "join") unset($this->parameters['join']);
		if($what == "group") unset($this->parameters['group']);
		if($what == "order") unset($this->parameters['order']);
		if($what == "records") unset($this->parameters['records']);
		if($what == "parametersExceptJoins") {
			foreach($this->parameters as $key => $val)
				if($key != "join")
					unset($this->parameters[$key]);
		}

		# Return
		return $this;

	}

	/**
	 * Sets/gets records offset
	 * @param $offset
	 * @return DatabaseQuery|int
	 */
	public function offset($offset = false) {

		# Gets limit
		if($offset === false)
			return isset($this->parameters["offset"]) ? $this->parameters["offset"] : 0;

		# Return
		$this->parameters["offset"] = $offset;

		# Set
		return $this;

	}

	/**
	 * Sets/gets max records limit
	 * @param int|bool $limit Limit size
	 * @throws databaseException
	 * @return DatabaseQuery|int
	 */
	public function limit($limit = false) {

		# Gets limit
		if($limit === false)
			return isset($this->parameters["limit"]) ? $this->parameters["limit"] : false;

		# Check
		if(!Validator::value($limit, "positive"))
			throw new databaseException("Wrong request limit: " . $limit);

		# Return
		$this->parameters["limit"] = $limit;

		# Set
		return $this;

	}

	/**
	 * Sets/gets max records limit
	 * @param bool $use
	 * @return DatabaseQuery
	 */
	public function ignore($use = true) {

		# Return
		$this->parameters["ignore"] = $use;

		# Set
		return $this;

	}

	/**
	 * Sets order parameters
	 * @param string|array $field Field name to make order or array of fields
	 * @param string       $order Order direction
	 * @param bool         $prepend
	 * @return DatabaseQuery
	 * @throws databaseException
	 */
	public function order($field, $order = "DESC", $prepend = false) {

		# If is array
		if(is_array($field)) {

			# Go each
			foreach($field as $key => $val) {
				if(is_int($key)) $this->order($val, $order);
				else             $this->order($key, $val);
			}

			# Return
			return $this;
		}

		# Make array
		if(!isset($this->parameters['order']))
			$this->parameters['order'] = array();

		# Set to upper
		$order = strtoupper($order);

		# Check
		if(!in_array($order, array("ASC", "DESC")))
			throw new databaseException("Wrong order type: " . $order);

		# Add param
		if($prepend && !empty($this->parameters['order']))
			$this->parameters['order'] = array_merge(array($field => $order), $this->parameters['order']);
		else
			$this->parameters['order'][$field] = $order;

		# Return
		return $this;

	}

	/**
	 * Sets records to be returned
	 * @param string|array $names Fields to be gathered
	 * @param string|bool  $alias
	 * @param string|bool  $table Table name prepends to rows
	 * @return DatabaseQuery
	 */
	public function records($names, $alias = false, $table = false) {

		# Set
		if(!isset($this->parameters["records"]))
			$this->parameters["records"] = array();

		# Add
		if(is_array($names)) {

			# Shifting if needed
			if($alias && empty($table))
				$table = $alias;

			# Go through
			foreach($names as $key => $name)
				$this->records($name, is_numeric($key) ? false : $key, $table);

			# Save
		} else $this->parameters["records"][] = array(
			"table" => $table,
			"field" => $names,
			"alias" => $alias
		);

		# Return
		return $this;

	}

	/**
	 * Set group by fields
	 * @param array|string $names List of fields to group by
	 * @param bool         $prepend
	 * @return DatabaseQuery
	 */
	public function group($names, $prepend = false) {

		# Set
		if(!isset($this->parameters["group"]))
			$this->parameters["group"] = array();

		# Add
		if(is_array($names)) {
			foreach($names as $name)
				$this->group($name, $prepend);
		} elseif($prepend)
			array_unshift($this->parameters["group"], $names);
		else
			$this->parameters["group"][] = $names;

		# Return
		return $this;

	}

	/**
	 * Adds date condition for request by period name
	 * @param String $period Name of period to add conditions
	 * @param String $name   Name of column
	 * @param bool   $withTime
	 * @param string $tableName
	 * @return $this
	 * @see Utilities::getDateConditions
	 */
	public function whereDates($period, $name = "date_short", $withTime = false, $tableName = "") {
		return $this->whereList(Utilities::getDateConditions($period, $name, $withTime, $tableName));
	}

	/**
	 * Sets list of conditions
	 * @param array       $conditions List of conditions
	 * @param string|bool $group      Group to add conditions to
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function whereList($conditions, $group = false) {

		# Array check
		if(!is_array($conditions))
			throw new SystemErrorException("Conditions must be array, if no use 'where' instead");

		# Add conditions
		foreach($conditions as $name => $value) {

			# If value holds name or name not set
			if(is_numeric($name)) {

				# If value holds name in array
				if(is_array($value)) {

					# Check
					if(sizeof($value) < 2)
						throw new SystemErrorException("Can't be less than 2 elements when you set array of arrays with numeric key");

					# Add condition
					$this->where($value[0],
						$value[1],
						isset($value[2]) ? $value[2] : false,
						isset($value[3]) ? $value[3] : false,
						isset($value[4]) ? $value[4] : $group);

					# If name not set we use default
				} else
					$this->where($value, false, $group);

				# If kwy is name
			} else {
				$this->where($name, $value, $group);
			}

		}

		return $this;

	}

	/**
	 * Adds condition
	 * @param string|array $name      Field name or array where 0 - name, 1 - function on value
	 * @param mixed        $value     Value to compare
	 * @param string       $compare   Comparison, like "=", or ">", "<", etc.
	 * @param string       $logic     Logic to add before
	 * @param bool|string  $groupName Group to add condition to
	 * @return DatabaseQuery
	 * @throws SystemErrorException
	 */
	public function where($name, $value = false, $compare = "=", $logic = "AND", $groupName = false) {

		# Make main group
		if(!$this->conditions)
			$this->conditions = new Condition("group", "", false);

		# Add condition
		return $this->addCondition($this->conditions, $name, $value, $compare, $logic, $groupName);

	}

	/**
	 * Adds having
	 * @param string|array $name      Field name
	 * @param mixed        $value     Value to compare
	 * @param string       $compare   Comparison, like "=", or ">", "<", etc.
	 * @param string       $logic     Logic to add before
	 * @param bool|string  $groupName Group to add condition to
	 * @return DatabaseQuery
	 * @throws SystemErrorException
	 */
	public function having($name, $value = false, $compare = "=", $logic = "AND", $groupName = false) {

		# Make main group
		if(!$this->having)
			$this->having = new Condition("group", "", false);

		# Add condition
		return $this->addCondition($this->having, $name, $value, $compare, $logic, $groupName);

	}

	/**
	 * Adds condition
	 * @param Condition   $group
	 * @param string|array $name      Field name
	 * @param mixed        $value     Value to compare
	 * @param string       $compare   Comparison, like "=", or ">", "<", etc.
	 * @param string       $logic     Logic to add before
	 * @param bool|string  $groupName Group to add condition to
	 * @return DatabaseQuery
	 * @throws SystemErrorException
	 */
	public function addCondition($group, $name, $value = false, $compare = "=", $logic = "AND", $groupName = false) {

		# If id given
		if(is_numeric($name) || (is_array($name) && is_numeric($name[0]))) {
			$value = $name;
			$name  = 'id';
			if(!strpos($this->tables, " "))
				$name = $this->tables . '.id';
		}

		# Set function
		if(is_array($name) && sizeof($name) > 1) {
			$function = $name[1];
			$name     = $name[0];
		} else $function = false;

		# Shift
		if(!in_array($compare, $this->compares)) {
			$groupName = $logic;
			$logic     = $compare;
			$compare   = "=";
		}

		# Shift
		if(!in_array(strtoupper($logic), $this->logic)) {
			$groupName = $logic;
			$logic     = "AND";
		}

		# Group check
		if($groupName) {
			if($find = $group->findGroup($groupName))
				$group = $find;
			else
				$group = $group->addGroup($groupName, $logic);
		}

		# Prepare condition
		$condition = new Condition("where", $name, $value, $compare, $logic, $function, $groupName);

		# Array push
		$group->conditions[] = $condition;

		# Return
		return $this;

	}


	/**
	 * Sets records parameter
	 * @param string|array $name     Name of field
	 * @param mixed        $value    Value to insert
	 * @param bool|string  $function Function to be operated on value
	 * @return DatabaseQuery
	 */
	public function setForUpdate($name, $value = false, $function = false) {

		# If array
		if(is_array($name)) {
			foreach($name as $key => $val) {

				# Global function if set
				$func = $function;

				# If have self function
				if(is_array($val)) {
					$func = $val[1];
					$val  = $val[0];
				}

				# Self call
				$this->setForUpdate($key, $val, $func);

			}

			return $this;
		}

		# Set function
		if(is_array($value) && sizeof($value) > 1) {
			$function = $value[1];
			$value    = $value[0];
		}

		# Save record
		$this->updateOnDuplicate[] = array(
			"type"     => "set",
			"name"     => $name,
			"value"    => $value,
			"function" => $function
		);

		# Return
		return $this;

	}

	/**
	 * Sets whole row, and append row to end of row list
	 * @param $fields
	 * @return DatabaseQuery
	 */
	public function setRow($fields) {
		return $this->set($fields, false, false, sizeof($this->records));
	}

	/**
	 * Sets records parameter
	 * @param string|array $name     Name of field
	 * @param mixed        $value    Value to insert
	 * @param bool|string  $function Function to be operated on value
	 * @param int          $row 	 Row number, count from 0
	 * @return DatabaseQuery
	 */
	public function set($name, $value = false, $function = false, $row = 0) {

		# If array
		if(is_array($name)) {
			foreach($name as $key => $val) {

				# Global function if set
				$func = $function;

				# If have self function
				if(is_array($val)) {
					$func = $val[1];
					$val  = $val[0];
				}

				# Self call
				$this->set($key, $val, $func, $row);

			}

			return $this;
		}

		# Set function
		if(is_array($value) && sizeof($value) > 1) {
			$function = $value[1];
			$value    = $value[0];
		}

		# Init
		if(!isset($this->records[$row]))
			$this->records[$row] = array();

		# Save record
		$this->records[$row][] = array(
			"type"     => "set",
			"name"     => $name,
			"value"    => $value,
			"function" => $function
		);

		# Return
		return $this;

	}

	/**
	 * Sets trace option
	 * @param bool|string $type Type of tracing
	 * @return DatabaseQuery
	 */
	public function trace($type = true) {

		# Set trace
		$this->trace = $type;

		# Return
		return $this;

	}

	/**
	 * Sets indexes
	 * @param $name
	 * @return $this
	 */
	public function index($name) {

		# Set index
		$this->parameters["index"] = is_array($name) ? implode(", ", $name) : "`$name`";

		# Self return
		return $this;

	}

	/**
	 * Adds join parameter
	 * @param string       $table   Join table
	 * @param string|array $on      Fields to be joined on
	 * @param string       $type    Join type
	 * @param bool         $prepend If true join would be pushed to begin of stack
	 * @return DatabaseQuery
	 */
	public function join($table, $on, $type = "LEFT", $prepend = false) {

		# Set
		if(!isset($this->parameters["join"]))
			$this->parameters["join"] = array();

		if($prepend) {

			# Prepend join
			array_unshift($this->parameters["join"], new Join($table, $on, $type));

		} else {

			# Add join
			$this->parameters["join"][] = new Join($table, $on, $type);
		}

		# return
		return $this;

	}

	/**
	 * Same as select
	 * @see $this->select
	 * @param bool|string $return What should be returned, see database doc return types
	 * @return Mixed
	 */
	public function get($return = false) {

		return $this->select($return);
	}

	/**
	 * Performs select request
	 * @param bool|string $return What should be returned, see database doc return types
	 * @return Mixed
	 */
	public function select($return = false) {

		# Parameters generation
		$whereExpression   = $this->makeWhere($this->conditions, is_string($this->tablesRaw) ? $this->tablesRaw : false);
		$havingExpression  = $this->makeHaving($this->having);
		$groupExpression   = "";
		$orderExpression   = "";
		$limitExpression   = "";
		$offsetExpression  = "";
		$joinExpression    = "";
		$recordsExpression = "*";

		# If single we limit
		if($return == Ret::SINGLE || $return == Ret::VALUE)
			$this->parameters["limit"] = 1;

		# Get each string parameter
		if(is_array($this->parameters)) {
			foreach($this->parameters as $name => $value) {

				# Check name
				if(!in_array($name, array_keys($this->parametersTypes))) continue;

				${$name . "Expression"} = $this->getQueryPart($name, $value, is_string($this->tablesRaw) && strpos($this->tablesRaw , ' ') == 0 ? $this->tablesRaw : false);

			}
		}

		# Prepare statement
		$requestString = "SELECT $recordsExpression FROM " . $this->tables .
			" $joinExpression" .
			" $whereExpression" .
			" $groupExpression" .
			" $limitExpression" .
			" $offsetExpression" .
			" $havingExpression" .
			" $orderExpression";

		# Performs query
		return $this->database->query($requestString, $return, $this->trace);

	}

	/**
	 * Performs update query
	 * @param string $return What should be returned, see database doc return types
	 * @throws databaseException
	 * @return int number of updated records
	 */
	public function update($return = 'updated') {

		# Check to update
		if(!$this->records)
			throw new databaseException("No fields to update");

		# Prepare
		$records = array();

		# Make where
		$whereExpression = $this->makeWhere($this->conditions);
		$joinExpression  = "";

		# Set join
		if(!empty($this->parameters["join"]))
			$joinExpression = $this->getQueryPart("join", $this->parameters["join"]);

		# Compile
		foreach($this->records[0] as $record) {

			# Expression generation
			$record = new Condition("set", $record['name'], $record['value'], "=", "AND", $record["function"]);

			# Record make
			$records[] = $record->toString();

		}

		# Make string
		$requestString = "UPDATE $this->tables $joinExpression SET " . implode(", ", $records) . " $whereExpression";

		# Performs query
		return $this->database->query($requestString, $return, $this->trace);

	}

	/**
	 * Performs delete from database
	 * @param string $return What should be returned, see database doc return types
	 * @return Int number of records
	 */
	public function delete($return = "updated") {

		# Making WHERE expression
		$whereExpression = $this->makeWhere($this->conditions);

		# Prepare query
		$requestString = "DELETE FROM " . $this->tables . " $whereExpression";

		# Performs query
		return $this->database->query($requestString, $return, $this->trace);

	}

	/**
	 * Preforms INSERT
	 * @param bool   $replace Indicates that we should use REPLACE instead of REPLACE
	 * @param string $return  Type of return data
	 * @return Int Inserted record id
	 */
	public function insert($replace = false, $return = "id") {

		# Initialization
		$fieldsExpression = "";
		$valuesExpression = "";
		$updates = array();

		# Go through
		foreach($this->records[0] as $record) {

			# Add " ," if needed
			if($fieldsExpression != "") $fieldsExpression .= ", ";
			if($valuesExpression != "") $valuesExpression .= ", ";

			# Reinterpret values
			$record = new Condition("set", $record['name'], $record['value'], "=", "AND", $record["function"]);

			# Add field to list
			$fieldsExpression .= Core::addBackDashes($record->name);

			# Add value to list
			$valuesExpression .= $record->value;
		}

		# Compile
		foreach($this->updateOnDuplicate as $record) {

			# Expression generation
			$record = new Condition("set", $record['name'], $record['value'], "=", "AND", $record["function"]);

			# Record make
			$updates[] = $record->toString();

		}

		# Prepare request
		$requestString = ($replace ? "REPLACE" : "INSERT") .
			(!empty($this->parameters["ignore"]) ? " IGNORE" : "") .
			" INTO " . $this->tables . "($fieldsExpression) VALUES($valuesExpression)";

		# Updates
		if($updates)
			$requestString .= " ON DUPLICATE KEY UPDATE " . implode(", ", $updates);

		# Performs query
		return $this->database->query($requestString, $return, $this->trace);

	}

	/**
	 * Preforms INSERT
	 * @param bool   $replace Indicates that we should use REPLACE instead of REPLACE
	 * @param string $return  Type of return data
	 * @return Int Inserted record id
	 */
	public function insertMultiple($replace = false, $return = "id") {

		# Initialization
		$fieldsExpression = "";
		$valuesExpression = "";

		# Go through
		foreach($this->records as $rowNum => $row) {

			# Add comma
			if(!$rowNum && $fieldsExpression)
				$fieldsExpression .= ", ";

			if($valuesExpression)
				$valuesExpression .= ", ";

			$valuesExpression .= "(";

			# Go through rows
			foreach($row as $recordNum => $record) {

				# Add " ," if needed
				if(!$rowNum && $fieldsExpression != "") $fieldsExpression .= ", ";
				if($recordNum) $valuesExpression .= ", ";

				# Reinterpret values
				$record = new Condition("set", $record['name'], $record['value'], "=", "AND", $record["function"]);

				# Add field to list
				if(!$rowNum)
					$fieldsExpression .= Core::addBackDashes($record->name);

				# Add value to list
				$valuesExpression .= $record->value;
			}

			$valuesExpression .= ")";

		}

		# Prepare request
		$requestString = ($replace ? "REPLACE" : "INSERT") .
			(!empty($this->parameters["ignore"]) ? " IGNORE" : "") .
			" INTO " . $this->tables . "($fieldsExpression) VALUES $valuesExpression";

		# Performs query
		return $this->database->query($requestString, $return, $this->trace);

	}

	/**
	 * Adds group
	 * @param        $name
	 * @param string $logic
	 * @return $this
	 */
	public function addGroup($name, $logic = "AND") {

		# Group check
		if(!($this->conditions->findGroup($name)))
			$this->conditions->addGroup($name, $logic);

		# Self return
		return $this;

	}

}