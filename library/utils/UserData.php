<?php

namespace sky;

/**
 * Class userData holds prepared validators
 * @package userData
 */
class UserData {

	/**
	 * Cookie ArrayFilter
	 * @var ArrayFilter
	 */
	static $cookie;

	/**
	 * $_GET ArrayFilter
	 * @var ArrayFilter
	 */
	static $get;

	/**
	 * $_POST ArrayFilter
	 * @var ArrayFilter
	 */
	static $post;

	/**
	 * Inits static vars
	 */
	public static function init() {
		self::$cookie = ArrayFilter::make($_COOKIE);
		self::$get    = ArrayFilter::make($_GET);
		self::$post   = ArrayFilter::make($_POST);
	}
}