<?php

# Framework namespace
namespace sky;

# Special message
use sky\info\message;


# Stored message
require_once "message.php";


/**
 * Class to work with information messages
 */
class info {

	/**
	 * Init function
	 */
	public static function  init() {

		# Link to session
		if(!empty(sky::$config["sessionInfo"]))
			self::$messages = &$_SESSION["infoMessages"];

		if(!self::$messages)
			self::$messages = array();

	}

	/**
	 * Holds all messages
	 * @var array
	 */
	private static $messages = array();

	/**
	 * @var message
	 */
	private static $last;

	/**
	 * Returns last added message
	 * @return message
	 */
	public static function getLast() {
		return self::$last;
	}

	/**
	 * Return number of messages
	 * @return Int
	 */
	public static function any() {
		return (bool)sizeof(self::$messages);
	}

	/**
	 * Adds new message
	 * @param        $text
	 * @param string $type
	 * @param string $subtype
	 */
	public static function add($text, $type = "error", $subtype = "global") {

		# Add message
		self::$messages[] = self::$last = new message($text, $type, $subtype);

	}

	/**
	 * Adds success new message
	 * @param        $text
	 * @param string $subtype
	 */
	public static function success($text, $subtype = "global") {

		# Add message
		self::add($text, "success", $subtype);

	}

	/**
	 * Adds error new message
	 * @param        $text
	 * @param string $subtype
	 */
	public static function error($text, $subtype = "global") {

		# Add message
		self::add($text, "error", $subtype);

	}

	/**
	 * Adds notice new message
	 * @param        $text
	 * @param string $subtype
	 */
	public static function notice($text, $subtype = "global") {

		# Add message
		self::add($text, "notice", $subtype);

	}

	/**
	 * Gets list of messages
	 * @param bool|string $type
	 * @param bool|string $subtype
	 * @return \sky\info\message[]
	 */
	public static function get($type = false, $subtype =  false) {


		# Result store
		$result = array();


		# Go through
		foreach(self::$messages as $i => $message) {

			/** @var $message info\message */
			if($type && $type != $message->type)
				continue;

			if($subtype && $subtype != $message->subtype)
				continue;

			# Get
			$result[] = $message;

			# Remove from storage
			unset(self::$messages[$i]);

		}


		# Return
		return $result;

	}

}


