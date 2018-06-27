<?php

namespace sky;

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