<?php

namespace sky;

class ArrayFilter {

	/**
	 * Stored data array
	 * @var array
	 */
	private $data;

	/**
	 * Creates new
	 * @param $data
	 * @throws SystemErrorException
	 */
	function __construct($data) {

		# Check
		if(!is_array($data))
			throw new SystemErrorException("Use ArrayFilter for single types use VarFilter");

		# Save
		$this->data = $data;

	}

	/**
	 * Returns original data
	 * @return array
	 */
	public function getOriginalData() {
		return $this->data;
	}

	/**
	 * Creates new
	 * @param $data
	 * @return ArrayFilter
	 */
	public static function make($data) {
		return new self($data);
	}

	/**
	 * Returns object to filter specific key
	 * @param      $key
	 * @param bool $recursive
	 * @return ArrayFilterKey
	 */
	public function key($key, $recursive = true) {
		return new ArrayFilterKey($this, $key, $recursive);
	}

	/**
	 * Gets data part by key
	 * @param string|boolean $key Data part key
	 * @return array with keys "exists" and "value"
	 */
	public function getByKey($key) {

		# If no key than it data itself
		if($key == false)
			return array(0 => true, "exists" => true, 1=> $this->data, "value" => $this->data);

		# If no spit needed
		if(!mb_strstr($key, ".")) {
			if(isset($this->data[$key]))
				return array(0 => true, "exists" => true, 1 => $this->data[$key], "value" => $this->data[$key]);
			else
				return array(0 => false, "exists" => false,1 => null,  "value" => null);
		}

		# Split keys
		$key = mb_split(".", $key);

		# Start point
		$value = $this->data;

		# Go through keys
		foreach($key as $part) {

			# If no such key
			if(!isset($value[$part]))
				return array(0 => false, "exists" => false, 1 => null, "value" => null);

			# Go toi next step
			$value = $value[$part];

		}

		# Return
		return array(0 => true, "exists" => true, 1 => $value, "value" => $value);

	}

}

class ArrayFilterKey extends VarFilter {

	private $key;
	public $exists = false, $arrayFilter;

	function __construct(ArrayFilter $arrayFilter, $key, $recursive = true) {

		# Save params
		$this->key = $key;
		$this->arrayFilter = $arrayFilter;

		# Get current value
		list($this->exists, $this->value) = $arrayFilter->getByKey($this->key);

		# Parent construct
		parent::__construct($this->value, $recursive);

	}

}