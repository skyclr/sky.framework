<?php

# Special namespace
namespace sky\db;


class join {
	private
		$table,
		$type = "LEFT",
		$on;

	private $types = array("LEFT", "RIGHT", "INNER");

	/**
	 * Creates new join condition
	 * @param        $table
	 * @param        $on
	 * @param string $type
	 */
	public function __construct($table, $on, $type = "LEFT") {


		# Correct
		$type = mb_strtoupper($type);


		# Set table
		$this->table = $table;


		# Set type
		if(in_array($type, $this->types))
			$this->type = $type;


		# Set on
		$this->on = $on;

	}

	/**
	 * Makes string representation of join expression
	 * @return string
	 */
	public function toString() {


		# Add dashes
		$this->table = core::addBackDashes($this->table);


		# Adds join type
		if(!isset($this->type) || !in_array($this->type, $this->types))
			$expression = "LEFT JOIN $this->table ";
		else
			$expression = "$this->type JOIN $this->table";


		# If we have ON clause in join
		if(!empty($this->on))
			$expression .= " ON " . $this->on;


		# Return
		return $expression;
	}

}