<?php

# Set namespace
namespace sky;

# Uses
use sky\auth\userController;
use sky\db\ret;
use sky\userData as ud;

# Add controller
include_once 'userController.php';

/**
 * Class for user authentication
 */
class auth {

	/**
	 * User data variable
	 * @var auth\userController
	 */
	public static $me = false;

	/**
	 * Default preferences variables
	 */
	private static
		$defaultPreferences = array(),
		$isInit     		= false;

	/**
	 * Users table name
	 * @var string
	 */
	public static
		$usersTable	= "users";

	/**
	 * This function initialise all authentication instructions
	 */
	function __construct() {

		# Logout if type
		if(vars::type() == 'logout')
			self::logout();

		# Try to login if type
		if(vars::type() == 'login') {

			try {

				# Try to authenticate user
				if($user = self::authentication()) {

					# Generation of unique ID
					$uniqueId = md5(date("U") . rand(1000, getrandmax()));

					# Cookies set
					setcookie('sessionId', $uniqueId, time() + 60 * 60 * 24 * 30, sky::$config["site"]["base"]);
					setcookie('autoLogin', 'true', time() + 60 * 60 * 24 * 30, sky::$config["site"]["base"]);
					setcookie('username', $user['profileEmail'], time() + 60 * 60 * 24 * 30, sky::$config["site"]["base"]);

					# Update database
					sky::$db->make(self::$usersTable)
						->where($user['id'])
//						->set("date_auth_last", date(dbCore::DATETIME_SQL))
//						->set("ip", $_SERVER["REMOTE_ADDR"])
						->set("sessionId", $uniqueId)->update();

					# If user correct then we authorise him
					self::authorisation($user);

					# After login redirect
					if(self::isLoggedIn() && !empty(sky::$config["authenticate"]["redirect"]))
						sky::goToPage(sky::$config["authenticate"]["redirect"]);

				} else info::error("Неверная пара логин/пароль" . $user);

			} catch(\Exception $e) {
				if($e instanceof databaseException)
					throw new databaseException("Can't auth user, ".$e->getMessage());
				info::error("Ошибка во время аутентификации пользователя");
			}

		}

		# Maybe user loggedIn before
		if(!self::isLoggedIn())
			self::isLoggedInBefore();

		# Login guest
		if(!self::isLoggedIn())
			self::loginGuest();

	}

	/**
	 * Login guest account if it persists in preferences
	 */
	static function loginGuest() {

		# If no need in guest account
		if(empty(sky::$config["authenticate"]["guest"]))
			return;

		# Login guest
		self::$me = new userController(sky::$config["authenticate"]["guest"]);

		# Set guest preferences
		if(!empty(sky::$config["authenticate"]["preferencesTable"]) && self::$defaultPreferences) {

			# Add to controller
			auth::$me->setPreferences(self::$defaultPreferences);
		}

	}

	/**
	 * Initialization of parameters
	 * @param string $usersTableAddress        Name of tables where stores user data
	 * @param array  $defaultPreferences      Array of default settings which will assign to new users,
	 *                                        or if any error on get user setting occupied
	 * @throws systemErrorException
	 */
	static function initialization($usersTableAddress, $defaultPreferences) {

		# Check
		validator::value($usersTableAddress, "trim", "Bad users table address");

		# Set locals
		self::$usersTable = $usersTableAddress;
		self::$isInit	  = true;

		# Check preferences
		if(empty($defaultPreferences) || !is_array($defaultPreferences))
			return;

		# Set local
		self::$defaultPreferences = $defaultPreferences;

		# Default preferences set
		if(empty($_SESSION["preferences"]))
			$_SESSION["preferences"] = $defaultPreferences;

	}

	/**
	 * This function performs user logout
	 * @param Boolean $redirect If TRUE after login page will be redirected to root
	 */
	static function logout($redirect = true) {

		# Unset php cookies data
		if(isset($_COOKIE['sessionId'])) unset($_COOKIE['sessionId']);
		if(isset($_COOKIE['username']))  unset($_COOKIE['username']);

		# Destroys session
		session_unset();
		session_destroy();

		# Unset user cookies
		setcookie('sessionId', '', time() - 3600, sky::$config["site"]["base"]);
		setcookie('autoLogin', '', time() - 3600, sky::$config["site"]["base"]);
		setcookie('username' , '', time() - 3600, sky::$config["site"]["base"]);

		# Page redirect
		if($redirect)
			sky::goToPage("/");

	}

	/**
	 * This function performs user authorisation on server based on authentication result.
	 * @param array|bool $user      User information gathered by Auth::authentication.
	 * @throws systemErrorException
	 * @throws databaseException
	 */
	static function authorisation($user = false) {

		# Check if initialised
		if(!self::$isInit)
			throw new systemErrorException("Auth options not initialized");

		# Set me
		self::$me = new userController($user);

		# Load preferences
		try {

			# If we don't use preferences
			if(empty(sky::$config["authenticate"]["preferences"]))
				return;

			# Get user preferences
			$preferences = sky::$db->make(sky::$config["authenticate"]["preferencesTable"])->where("user_id", self::$me["id"])->get(ret::SINGLE);

			# Save all preferences to storage
			if($preferences)
				auth::$me->setPreferences($preferences);

			# Add user preferences	
			elseif(self::$defaultPreferences) {

				# Save default preferences
				sky::$db->make(sky::$config["authenticate"]["preferencesTable"])->set(self::$defaultPreferences)->set("user_id", self::$me["id"])->insert(true);

				# Save to session
				auth::$me->setPreferences(self::$defaultPreferences);

			}

		} catch(baseException $e) {

			# In case of error
			self::logout(false);
			info::error("Ошибка во время авторизации");

		}
	}

	/**
	 * This function try to authenticate user, and return user data on success
	 *
	 * @param bool|String $username  Name of user to authenticate
	 * @param bool|String $password  Password of this user
	 * @param bool|String $sessionId Session identifier, may be alternative for password
	 * @throws systemErrorException
	 * @return array|bool FALSE on fail, user data array otherwise
	 */
	static function authentication($username = false, $password = false, $sessionId = false) {

		# Check if initialised
		if (!self::$isInit)
			throw new systemErrorException("Переменные аутентификации не инициализированы");

		# Check is username set
		if($username === false && is_null($username = ud::$post->key("username")->valueOr('')))
			return false;

		# Checks if isset password
		if($password === false && $sessionId === false && is_null($password = ud::$post->key("password")->valueOr('')))
			return false;

		# Prepare request
		$request = sky::$db->make(self::$usersTable)->where("profileEmail", $username);

		# Get user by name and password
		if($password !== false)
			$user = $request->where(array("password", "md5"), $password)->get(ret::SINGLE);

		# Get user by name and unique id
		else
			$user = $request->where("sessionId", $sessionId)->get(ret::SINGLE);

		# If no data gathered
		if(!$user)
			return false; # If we didn't get user return false

		# Check status
		if($user["active"] == 0)
			throw new userErrorException("Вы не активировали ваш аккаунт");

		# Return data
		return $user;

	}

	/**
	 * This function checks cookies variables(sessionId, username) and try to authorizate his if they setted
	 * @return bool Returns FALSE if they not set
	 * @throws databaseException
	 */
	static function isLoggedInBefore() {

		# If user data was saved
		if(!isset($_COOKIE['sessionId']) || !isset($_COOKIE['username']))
			return false;

		try {

			# We try to authorise user
			if($user = self::authentication(ud::$cookie->key('username')->valueOr(''), false, ud::$cookie->key('sessionId')->valueOr(''))) {
				self::authorisation($user);
				return true;
			}
		} catch(\Exception $e) {
			if($e instanceof databaseException)
				throw new databaseException("Can't auth user, ".$e->getMessage());
			info::error("Во время восстановления сессии произошла ошибка");
		}

		# False if auth failed
		return false;

	}

	/**
	 * Checks if user currently loggedIn
	 * @return Boolean Returns TRUE if user logged and FALSE otherwise
	 */
	static function isLoggedIn() {

		# If properly logged in
		return self::$me && !empty(self::$me["id"]);

	}

}