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
}


UserData::$cookie = ArrayFilter::make($_COOKIE);
UserData::$get    = ArrayFilter::make($_GET);
UserData::$post   = ArrayFilter::make($_POST);