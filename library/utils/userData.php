<?php

namespace sky;

use sky\validator;

/**
 * Class userData holds prepared validators
 * @package userData
 */
class userData {

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


userData::$cookie = ArrayFilter::make($_COOKIE);
userData::$get    = ArrayFilter::make($_GET);
userData::$post   = ArrayFilter::make($_POST);