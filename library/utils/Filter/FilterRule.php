<?php

namespace sky;

class FilterRule {

	const RULE_TYPE = "type";
	const RULE_ISSET = "isset";
	const RULE_MAX = "max";
	const RULE_MIN = "min";
	const RULE_MAX_LEN = "maxLength";
	const RULE_MIN_LEN = "minLength";
	const RULE_PREG = "preg";
	const RULE_SAME = "same";

	const TYPE_POSITIVE = "positive";
	const TYPE_NUMERIC = "numeric";
	const TYPE_INTEGER = "integer";
	const TYPE_NATURAL = "natural";
	const TYPE_DATE = "date";
	const TYPE_EMAIL = "email";
	const TYPE_URL = "url";
	const TYPE_EMPTY_STRING = "trim";
	const TYPE_BOOL_STRING = "boolString";

	/**
	 * Error flag
	 * @var bool
	 */
	public $error = false;

	private
		$rule,
		$ruleCondition;

	/**
	 * Create rule
	 * @param $rule
	 * @param $ruleCondition
	 */
	function __construct($rule, $ruleCondition) {
		$this->rule          = $rule;
		$this->ruleCondition = $ruleCondition;
	}

	/**
	 * Checks if var have proper type
	 * @param VarFilter $varFilter Var to check
	 * @param           $value
	 * @throws SystemErrorException
	 */
	function check(VarFilter $varFilter, $value) {

		# Check if exists, because this is main for ArrayFilterKey
		if($varFilter instanceof ArrayFilterKey) {
			/** @var $varFilter ArrayFilterKey */
			if($this->error = !$varFilter->exists) {
				return;
			}
		}

		# Array recursive check
		if(is_array($value) && $varFilter->recursive) {
			$this->checkRecursive($varFilter, $value);
			return;
		}

		#  Apply rule
		switch($this->rule) {
			case self::RULE_SAME: {
				/** @var $varFilter ArrayFilterKey */
				list($exists, $otherValue) = $varFilter->arrayFilter->getByKey($this->ruleCondition);
				$this->error = !$exists || $value !== $otherValue;
				break;
			}
			case self::RULE_TYPE: {
				$this->checkType($value);
				break;
			}
			case self::RULE_MAX: {
				$this->error = !is_numeric($value) || $value > $this->ruleCondition;
				break;
			}
			case self::RULE_MIN: {
				$this->error = !is_numeric($value) || $value < $this->ruleCondition;
				break;
			}
			case self::RULE_MAX_LEN: {
				$this->error = mb_strlen($value) > $this->ruleCondition;
				break;
			}
			case self::RULE_MIN_LEN: {
				$this->error = mb_strlen($value) < $this->ruleCondition;
				break;
			}
			case self::RULE_PREG: {
				$this->error = !preg_match($this->ruleCondition, $value);
				break;
			}
			default:
				throw new SystemErrorException("Unknown validation rule: $this->rule");
		}

	}

	/**
	 * Checks if var have proper type
	 * @param VarFilter $varFilter Var to check
	 * @param           $value
	 * @throws SystemErrorException
	 */
	function checkRecursive(VarFilter $varFilter, $value) {

		# If recursive check
		$i = 0;
		foreach($value as $item) {

			# Check
			$this->check($varFilter, $item);
			$i++;

			# If error occupied
			if($this->error) {

				# If recursive in hard mode we exit on error
				if($varFilter->recursive == $varFilter::RECURSIVE_HARD_MODE)
					return;

				# If recursive in soft mode, we check next
				elseif($i != sizeof($value))
					$this->error = false;
			}
		}


	}

	/**
	 * Checks if value has proper type
	 * @param           $value
	 * @throws SystemErrorException
	 */
	private function checkType($value) {

		#  Apply rule
		switch($this->ruleCondition) {
			case self::TYPE_EMAIL: {
				$this->error = !filter_var($value, FILTER_VALIDATE_EMAIL);
				break;
			}
			case self::TYPE_URL: {
				$this->error = !filter_var($value, FILTER_VALIDATE_URL);
				break;
			}
			case self::TYPE_DATE: {
				if(!($value instanceof \DateTime))
					$this->error = !(bool)preg_match('/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/i', $value) &&
						!(bool)preg_match('/^\d{2}\.\d{2}\.\d{4}$/i', $value) &&
						!(bool)preg_match('/^\d{2}\.\d{2}\.\d{4} \d{2}\:\d{2}(\:\d{2})?$/i', $value);
				break;
			}
			case self::TYPE_EMPTY_STRING: {
				$this->error = !is_string($value) || !mb_strlen(trim($value));
				break;
			}
			case self::TYPE_POSITIVE: {
				$this->error = !is_numeric($value) || $value < 0;
				break;
			}
			case self::TYPE_INTEGER: {
				$this->error = !is_numeric($value) || $value != (int)$value;
				break;
			}
			case self::TYPE_NATURAL: {
				$this->error = !is_numeric($value) || $value != (int)$value || $value < 0;
				break;
			}
			case self::TYPE_NUMERIC: {
				$this->error = !is_numeric($value);
				break;
			}
			case self::TYPE_BOOL_STRING: {
				$this->error = $value !== "false" && $value !== "true" && !is_bool($value);
				break;
			}
			default:
				throw new SystemErrorException("Unknown require type: $this->ruleCondition");
		}

	}

}