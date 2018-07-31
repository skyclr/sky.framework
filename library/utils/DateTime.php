<?php

namespace sky;

/**
 * Advanced DateTime Class
 */
class DateTime extends \DateTime {

	/**
	 * Constants
	 */
	const DATE_SQL 			= "Y-m-d";
	const DATETIME_SQL 		= "Y-m-d H:i:s";
	const TIME_DATE 		= "H:i d.m.Y";
	const DATE_TIME			= "d.m.Y H:i";
	const DATE_TIME_FULL	= "d.m.Y H:i:s";
	const DATE_ONLY 		= "d.m";
	const DATE_FULL			= "d.m.Y";

	/**
	 * Creates new object58
	 * @param String		$time			Date string
	 * @param String		$errorMessage	Exception text throw in case of error
	 * @param \DateTimeZone	$timeZone		Zone like in real DateTime
	 * @throws UserErrorException
	 */
	public function __construct($time = "now", $errorMessage = "Неверно указана дата", $timeZone = null) {
		try {

			# Self creation
			if($time instanceof DateTime)
				return $time;

			# Base
			parent::__construct($time, $timeZone);

		# In case of creation error
		} catch(\Exception $e) {
			throw new UserErrorException($errorMessage . ": " . $time);
		}
		return $this;
	}

	/**
	 * Creates new \sky\DateTime form formatted string, add directly because static
	 * @param string $format Date format
	 * @param string $time   Date/time to set
	 * @param string $errorMessage
	 * @param \DateTimeZone $timeZone
	 * @return DateTime
	 * @throws UserErrorException
	 */
	public static function createFormat($format, $time, $errorMessage = "Неверно указана дата", \DateTimeZone $timeZone = null) {

		try {

			# Create real DateTime
			if(!$date = \DateTime::createFromFormat($format, $time, $timeZone))
				throw new \Exception("False on creation");

			# In case of creation error
		} catch(\Exception $e) {
			throw new UserErrorException($errorMessage . ": " . $time);
		}

		return self::make($date->format(self::DATETIME_SQL));
	}

	/**
	 * Creates new object
	 * @param String		$time			Date string
	 * @param String		$errorMessage	Exception text throw in case of error
	 * @param \DateTimeZone	$timeZone		Zone like in real DateTime
	 * @return DateTime
	 * @throws UserErrorException
	 */
	public static function make($time = "now", $errorMessage = "Неверно указана дата", $timeZone = null) {
		return new DateTime($time, $errorMessage, $timeZone);
	}

	/**
	 * Number of seconds passed
	 * @param DateTime $till
	 * @return number
	 */
	public function secondsPassed(DateTime $till = null) {


		# Set to now
		if(!$till)
			$till = DateTime::make();

		# Return
		return abs($this->getTimestamp() - $till->getTimestamp());

	}

	/**
	 * Alter the timestamp of a DateTime object by incrementing or decrementing in a format accepted by strtotime().
	 * @param String $modify A date/time string. Valid formats are explained in Date and Time Formats.
	 * @return DateTime
	 */
	public function modify($modify) {

		# Modify
		parent::modify($modify);

		# Return
		return $this;

	}

	/**
	 * Removes specified parts
	 * @param Bool $hours	If true sets hours to 0
	 * @param Bool $minutes If true sets minutes to 0
	 * @param Bool $seconds If true sets seconds to 0
	 * @return $this
	 */
	public function trim($hours = true, $minutes = true, $seconds = true) {

		# Remove hours
		if($hours)
			$this->modify("- ".($this->format("H"))." hour");

		# Remove minutes
		if($minutes)
			$this->modify("- ".($this->format("i"))." minute");

		# Remove seconds
		if($seconds)
			$this->modify("- ".($this->format("s"))." second");

		# Return
		return $this;

	}

	/**
	 * Get difference between two dates
	 * @param bool|\DateTime $date Date to take difference, if false now will be taken
	 * @param bool           $absolute
	 * @return \DateInterval
	 */
	public function diff($date = false, $absolute = false) {

		# Create now if needed
		if($date === false)
			$date = new DateTime();

		# String to datetime
		if(is_string($date))
			$date = new DateTime($date);

		# Count difference
		return parent::diff($date, $absolute);

	}

	/**
	 * Russian format
	 * @param string $format
	 * @return mixed
	 */
	public function russian($format = "d.m.Y H:i") {

		# Replace format to russian M, for further replace
		$format = str_replace("M", "М", $format);

		# Get
		$return = $this->format($format);

		# Names
		$rusMonths = Array('', 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря');

		# Return replaced
		return str_replace("М", $rusMonths[(int)$this->format("m")], $return);

	}

	/**
	 * Applies strftime to current date
	 * @param string $format Date format
	 * @return string Formatted date
	 * @throws SystemErrorException
	 */
	public function strftime($format) {

		# Check
		if(!function_exists("strftime"))
			throw new SystemErrorException("No function strftime");

		# Reformat
		return strftime($format, $this->format("U"));

	}

	/**
	 * Get passed time in russian way
	 * @return string
	 */
	public function russianPassed() {

		# Get time passed
		$diff = $this->diff();

		# Check passed time
		if($diff->y > 0)
			return $diff->y . ($diff->y > 1 ? "года назад" : "год назад");
		if($diff->m > 0)
			return $diff->m . "мес. назад";
		if($diff->d > 7)
			return ceil($diff->d / 7) . "нед. назад";
		if($diff->d > 0)
			return $diff->d . "д. назад";
		if($diff->h > 0)
			return $diff->h . "ч. назад";
		if($diff->i > 1)
			return $diff->i . "мин. назад";
		return "только что";


	}

	public function same() {
		return clone $this;
	}

}
