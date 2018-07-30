<?php

# Set namespace
namespace sky\auth;

/**
 * Class to access user preferences
 */
class UserController extends \ArrayIterator {

	/**
	 * User individual folder folder
	 * @var string
	 */
	public $folder = "";

	/**
	 * Indicates if user logged and not guest
	 * @var bool
	 */
	public $isLoggedIn = false;

	/**
	 * User object construct
	 * @param array $userData User data to be based on
	 */
	public function __construct($userData) {

		# Fill arrays
		foreach($userData as $key => $value)
			$this[$key] = $value;

		# Get logged flag
		$this->isLoggedIn = !empty($userData["id"]);

	}

	/**
	 * Return current user data array
	 * @return array
	 */
	public function get() {
		return $this->getArrayCopy();
	}

}