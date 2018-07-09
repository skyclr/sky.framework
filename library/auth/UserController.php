<?php

# Set namespace
namespace sky\auth;

use sky\Auth;
use sky\Sky;
use sky\systemErrorException;

include_once 'UserPreferences.php';

/**
 * Class to access user preferences
 */
class UserController implements \ArrayAccess {

	/**
	 * Main user info
	 * @var array
	 */
	private	$userData = array();

	/**
	 * Keeps current user preferences class
	 * @var UserPreferences
	 */
	private	$preferences = false;

	/**
	 * Holds different metrics
	 * @var array
	 */
	public $counts = array();

	/**
	 * Holds additional user information
	 * @var array
	 */
	public $info = array();

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
		$this->userData = $userData;

		# Set info owner
		if(!empty(Sky::$config['login']['userInfo'])) {
			$this->info["owner"] = $userData["id"];
			if($userData['id'] && $info = Sky::$db->make(Sky::$config["login"]["userInfo"])->where("owner", $userData["id"])->get("single"))
				$this->info = $info;
		}
		else
			$this->info = false;

		# Get logged flag
		$this->isLoggedIn = !empty($userData["id"]);

	}

	/**
	 * Saves additional information
	 * @throws systemErrorException
	 */
	public function saveInfo() {

		# If not available
		if(!$this->info)
			throw new systemErrorException("Can't save user information, because of it's not activated in config");

		# Info save
		Sky::$db->make(Sky::$config['login']['userInfo'])->set($this->info)->insert(true);

	}

	/**
	 * Gets users info
	 * @return array user information
	 * @throws systemErrorException
	 */
	public function getInfo() {

		# Logged in check
		if(!Auth::isLoggedIn())
			throw new systemErrorException("Try to get info of logged out user");

		# If not available
		if(!$this->info)
			throw new systemErrorException("Can't save user information, because of it's not activated in config");

		# User info get
		if(!$info = Sky::$db->make(Sky::$config['login']['userInfo'])->where($this->userData['id'], "owner")->get("single"))
			throw new systemErrorException("Can't get user info");

		# Save
		return $this->info = $info;

	}

	/**
	 * Return current user data array
	 * @return array
	 */
	public function get() {
		return $this->userData;
	}

	/**
	 * Returns true if user logged in and he is admin(auth::$me['usertype'] == 'admin')
	 * @return boolean
	 */
	public function isAdmin() {
		return Auth::isLoggedIn() && ($this->userData["id"] == 1 || $this->userData["id"] == 11);
	}

	/**
	 * Initialize user preferences
	 * @param array $preferences
	 */
	public function setPreferences($preferences) {
		$this->preferences = new UserPreferences($preferences);
	}

	/**
	 * Get current user preferences
	 * @return array
	 */
	public function getPreferences() {
		return $this->preferences->getAll();
	}

	/**
	 * Sets or gets user preference
	 * @param String $name  Name of preference to get/set
	 * @param Mixed  $value Value of preference, if not set then you wil get instead of set
	 * @param Bool   $save  Indicates should be preferences saved immediately
	 * @throws systemErrorException
	 * @return Mixed
	 */
	public function pref($name, $value = 'leaveEmptyToGet', $save = true) {

		# Check if we have preferences
		if(!$this->preferences)
			throw new systemErrorException("Try to work with preferences, but they weren't init");

		# Operations
		if($value === 'leaveEmptyToGet') return $this->preferences->get($name);
		else                             return $this->preferences->set($name, $value, $save);

	}

	/**
	 * Saves changes in preferences
	 * @param Bool $currentOnly Indicates that only changes in current script should be saved
	 * @throws systemErrorException
	 */
	public function savePreferences($currentOnly = true) {

		# Check if we have preferences
		if(!$this->preferences)
			throw new systemErrorException("Try to save preferences, but they wern't init");

		# Save
		$this->preferences->save($currentOnly);

	}

	/**
	 * Saves current user data
	 */
	public function save() {

		# If nothing to change
		if(empty(Sky::$config['authenticate']['changeable']))
			return;

		# Changes list
		$changes = array();

		# Compile
		foreach(Sky::$config['authenticate']['changeable'] as $change)
			$changes[$change] = $this->userData[$change];

		# Update records
		Sky::$db->make(Auth::$usersTable)->where($this->userData['id'])->set($changes)->update();

	}

	# Sets offset
	public function offsetSet($offset, $value) {
		if (is_null($offset))
			$this->userData[] = $value;

		else
			$this->userData[$offset] = $value;

	}

	# Checks of element exists
	public function offsetExists($offset) {
		return isset($this->userData[$offset]);
	}

	# Unset element
	public function offsetUnset($offset) {
		unset($this->userData[$offset]);
	}

	# Get data with current offset
	public function offsetGet($offset) {
		return isset($this->userData[$offset]) ? $this->userData[$offset] : null;
	}

	public function inGroup($restrictionId) {
		return false;
	}

}