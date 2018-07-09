<?php

# Special namespace
namespace sky\db;
use sky\systemErrorException;


/**
 * Class that holds single condition
 * @package sky\db
 */
class Condition {
	public
		$type = "where",
		$name,
		$value,
		$compare,
		$logic,
		$group,
		$function,
		$conditions = array();

	public function __construct($type,
								$name,
								$value,
								$compare = "=",
								$logic = "AND",
								$function = false,
								$group = false) {
		$this->type = $type;
		$this->name = $name;
		$this->value = $value;
		$this->compare = $compare;
		$this->logic = $logic;
		$this->group = $group;
		$this->function = $function;
		$this->correctCondition();
	}

	/**
	 * Some manipulation during cloning
	 */
	function __clone() {
		$old = $this->conditions;
		$this->conditions = array();
		foreach($old as $condition)
			$this->conditions[] = clone $condition;
	}

	/**
	 * Adds group to current condition
	 * @param $name
	 * @param $logic
	 * @return Condition
	 * @throws \sky\systemErrorException
	 */
	public function addGroup($name, $logic) {


		# Get path
		$parts = explode(".", $name);


		# Get parent
		if(sizeof($parts) > 1)  {
			if(!$parent	= $this->findGroup(implode(".", array_slice($parts, 0, -1))))
				throw new systemErrorException("Try add group for not existing parent group: $name");
		} else
			$parent = $this;


		# Group
		$group = new Condition("group", $name, false, false, $logic);


		# Add to stacks
		$parent->conditions[] = $group;


		# Return
		return $group;


	}

	/**
	 * Searches for specified group
	 * @param $name
	 * @return bool|Condition
	 */
	public function findGroup($name) {

		# Go through
		foreach($this->conditions as $condition) {

			/** @var $condition Condition */

			# Skip none group
			if($condition->type != "group")
				continue;

			# If founded
			if($condition->name === $name)
				return $condition;

			# Search recursively
			if($group = $condition->findGroup($name))
				return $group;

		}

		# If not found
		return false;

	}

	/**
	 * Makes string representation of current condition
	 * @param bool|string $table table name to add for each condition where table didn't set
	 * @return string
	 */
	public function toString($table = false) {


		# Result
		$result = "";


		if($this->type === "group") {


			# If empty
			if(empty($this->conditions))
				return "";


			# Go through conditions
			foreach($this->conditions as $condition) {

				/** @var $condition Condition */

				# Useless logic
				$logic = $result === "" ? '' : $condition->logic;


				# Compile string
				if($condition->type === "group") {

					# If empty
					if(empty($condition->conditions))
						continue;

					# Make expression
					$result .= " $logic (" . $condition->toString($table) . ")";

				} else {

					$result .= " $logic " . $condition->toString($table);
				}
			}

		} else {


			# Dashes to name
			$name = Core::addBackDashes($this->name, $table);


			# Return
			$result = $name . " " . $this->compare . " " . $this->value;

		}

		# Return
		return $result;


	}

	/**
	 * Adds special corrections to condition
	 */
	protected function correctCondition() {


		# Make big
		if(isset($this->logic))
			$this->logic = strtoupper($this->logic);


		# Group
		if($this->type === "group")
			return;


		# Special functions
		if(!empty($this->function)) {
			switch($this->function) {
				case "noQuotes":
					break;
				case "iNetAtoN":
					$this->value = "INET_ATON(" . Core::addDashes($this->value) . ")";
					break;
				case "now":
					$this->value = "NOW()";
					break;
				default:
					$this->value = $this->function . "(" . Core::addDashes($this->value) . ")";
			}
			$this->function = "noQuotes";
		}

		# Dashes to value
		if(!is_array($this->value) && (empty($this->function) || $this->function != "noQuotes"))
			$this->value = Core::addDashes($this->value);

		# Correction
		if($this->type !== "set") {
			if(is_null($this->value) && $this->compare === "=") $this->compare = "IS";
			elseif(is_null($this->value) && $this->compare === "!=") $this->compare = "IS NOT";
			elseif(is_bool($this->value)) $this->value = (int)$this->value;
			elseif(!is_array($this->value) &&  $this->compare === "ANY") $this->compare = "=";
			elseif(is_array($this->value)) {

				# Not in compare
				if($this->compare == "NOT IN" || $this->compare == "!=")
					$this->compare = "NOT IN";

				# Default compare
				elseif($this->compare == "ANY")
					$this->compare = "= ANY";
				else $this->compare = "IN";

				# Add dashes
				foreach($this->value as $key => $value)
					$this->value[$key] = Core::addDashes($value);

				# Implode
				$this->value = "(" . implode(", ", $this->value) . ")";
			}
		}


		# Null convert
		if(is_null($this->value))
			$this->value = 'NULL';

	}

}