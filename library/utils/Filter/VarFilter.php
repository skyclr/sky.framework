<?php

namespace sky;

class VarFilter {

	protected
		$error = false,
		$default;

	const RECURSIVE_HARD_MODE = "hardMode";
	const RECURSIVE_SOFT_MODE = "softMode";

	const CONVERT_TRIM = "trim";
	const CONVERT_INTEGER = "int";
	const CONVERT_FLOAT = "float";
	const CONVERT_CEIL = "ceil";
	const CONVERT_FLOOR = "floor";
	const CONVERT_BOOL = "bool";
	const CONVERT_DATE = "date";
	const CONVERT_HTML_SPEC_CHARD_DECODE = "h_sc_d";

	public 	$value,
		$recursive = true;

	/**
	 * Last used rule
	 * @var FilterRule
	 */
	protected $lastRule = array();

	/**
	 * Creates new variable filter
	 * @param mixed $value Variable value
	 * @param bool $recursive if value is array every item would be checked
	 */
	function __construct($value, $recursive = true) {
		$this->value = $value;
		$this->recursive = $recursive;
	}

	/**
	 * Returns value if all filters success, specified value otherwise
	 * @param mixed $defaultValue Default value to return on filters error
	 * @return mixed
	 */
	public function valueOr($defaultValue = null) {

		# Default value on error
		if($this->error)
			return $defaultValue;

		# Current value
		return $this->value;

	}

	/**
	 * Returns value if all filters success, specified value otherwise
	 * @param mixed $howToConvert Convert way
	 * @param mixed $defaultValue Default value to return on filters error
	 * @return mixed
	 * @throws SystemErrorException
	 */
	public function convertedValueOr($howToConvert, $defaultValue = null) {

		# Default value on error
		if($this->error)
			return $defaultValue;

		# Current value
		return $this->convert($howToConvert)->value;

	}

	public function convert($how) {
		switch($how) {
			case self::CONVERT_INTEGER:
				$this->value = (int)$this->value; break;
			case self::CONVERT_FLOAT:
				$this->value = (float)$this->value; break;
			case self::CONVERT_TRIM:
				$this->value = trim($this->value); break;
			case self::CONVERT_CEIL:
				$this->value = ceil($this->value); break;
			case self::CONVERT_FLOOR:
				$this->value = floor($this->value); break;
			case self::CONVERT_HTML_SPEC_CHARD_DECODE:
				$this->value = htmlspecialchars_decode($this->value); break;
			case self::CONVERT_DATE:
				if(!($this->value instanceof DateTime))
					$this->value = DateTime::make($this->value);
				break;
			default: throw new systemErrorException("Unknown conversion: $how");
		}
		return $this;
	}

	/**
	 * Static constructor
	 * @param mixed $value Variable value
	 * @param bool $recursive if value is array every item would be checked
	 * @return VarFilter
	 */
	static function check($value, $recursive = true) {
		return new self($value, $recursive);
	}

	/**
	 * Action to be performed if last filter not passed
	 * @param $errorAction
	 * @return $this
	 * @throws \Exception
	 */
	function onError($errorAction) {

		# If error occupied
		if($this->error)
			$this->performAction($errorAction);

		# Self return
		return $this;

	}

	/**
	 * Throws system exception on error
	 * @param string $message Exception message
	 * @return $this
	 */
	function exceptionOnError($message) {

		# If error occupied
		if($this->error)
			$this->performAction($message, "systemException");

		return $this;
	}

	/**
	 * Throws system exception on error or returns value
	 * @param string $message Exception message
	 * @return mixed
	 */
	function valueOrException($message) {
		return $this->exceptionOnError($message)->value;
	}

	/**
	 * Throws system exception on error
	 * @param string $message Exception message
	 * @return $this
	 */
	function userExceptionOnError($message) {

		# If error occupied
		if($this->error)
			$this->performAction($message, "userException");

		return $this;
	}

	/**
	 * Throws system exception on error or returns value
	 * @param string $message Exception message
	 * @return $this
	 */
	function valueOrUserException($message) {
		return $this->userExceptionOnError($message)->value;
	}

	/**
	 * Performs specified action
	 * @param            $action
	 * @param bool|false $name
	 * @throws \Exception
	 * @throws systemErrorException
	 * @throws userErrorException
	 */
	protected function performAction($action, $name = false) {

		if($action instanceof \Exception)
			throw $action;

		if($name == "systemException")
			throw new systemErrorException($action);

		if($name == "userException")
			throw new userErrorException($action);

	}

	function defaultValue($default) {
		$this->default = $default;
		return $this;
	}

	/**
	 * Adds new FilterRule of specified type and conditions
	 * @param string $rule Rile name
	 * @param mixed $ruleCondition Conditions
	 * @return $this
	 * @throws SystemErrorException
	 */
	function filter($rule, $ruleCondition) {

		# Create rule
		$this->lastRule = new FilterRule($rule, $ruleCondition);

		# Apply rule
		$this->lastRule->check($this, $this->value);

		# Set error
		$this->error = $this->error || $this->lastRule->error;

		# If error occupied
		if($this->error && !is_null($this->default))
			$this->value = $this->default;

		# Self return
		return $this;
	}

	/**
	 * Creates filter with type of FilterRule::RULE_TYPE
	 * @param string $type One of filter types
	 * @return VarFilter
	 */
	function typeFilter($type) {
		return $this->filter(FilterRule::RULE_TYPE, $type);
	}

}