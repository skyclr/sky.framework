<?php

# Set namespace
namespace sky;

# Uses
use sky\auth\UserController;
use sky\db\Ret;
use sky\UserData as ud;

# Add controller
include_once 'UserController.php';

/**
 * Class for user authentication
 */
class Auth {

	/**
	 * User data variable
	 * @var auth\UserController
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
		if(Vars::type() == 'logout')
			self::logout();

		# Try to login if type
		if(Vars::type() == 'login') {

			try {

				# Try to authenticate user
				if($user = self::authentication()) {

					# Generation of unique ID
					$uniqueId = md5(date("U") . rand(1000, getrandmax()));

					# Cookies set
					setcookie('sessionId', $uniqueId, time() + 60 * 60 * 24 * 30, Sky::$config["site"]["base"]);
					setcookie('autoLogin', 'true', time() + 60 * 60 * 24 * 30, Sky::$config["site"]["base"]);
					setcookie('username', $user['profileEmail'], time() + 60 * 60 * 24 * 30, Sky::$config["site"]["base"]);

					# Update database
					Sky::$db->make(self::$usersTable)
						->where($user['id'])
//						->set("date_auth_last", date(dbCore::DATETIME_SQL))
//						->set("ip", $_SERVER["REMOTE_ADDR"])
						->set("sessionId", $uniqueId)->update();

					# If user correct then we authorise him
					self::authorisation($user);

					# After login redirect
					if(self::isLoggedIn() && !empty(Sky::$config["authenticate"]["redirect"]))
						Sky::goToPage(Sky::$config["authenticate"]["redirect"]);

				} else Info::error("Неверная пара логин/пароль" . $user);

			} catch(\Exception $e) {
				if($e instanceof DatabaseException)
					throw new DatabaseException("Can't auth user, ".$e->getMessage());
				Info::error("Ошибка во время аутентификации пользователя");
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
		if(empty(Sky::$config["authenticate"]["guest"]))
			return;

		# Login guest
		self::$me = new UserController(Sky::$config["authenticate"]["guest"]);

		# Set guest preferences
		if(!empty(Sky::$config["authenticate"]["preferencesTable"]) && self::$defaultPreferences) {

			# Add to controller
			Auth::$me->setPreferences(self::$defaultPreferences);
		}

	}

	/**
	 * Initialization of parameters
	 * @param string $usersTableAddress        Name of tables where stores user data
	 * @param array  $defaultPreferences      Array of default settings which will assign to new users,
	 *                                        or if any error on get user setting occupied
	 * @throws SystemErrorException
	 */
	static function initialization($usersTableAddress, $defaultPreferences) {

		# Check
		Validator::value($usersTableAddress, "trim", "Bad users table address");

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
		setcookie('sessionId', '', time() - 3600, Sky::$config["site"]["base"]);
		setcookie('autoLogin', '', time() - 3600, Sky::$config["site"]["base"]);
		setcookie('username' , '', time() - 3600, Sky::$config["site"]["base"]);

		# Page redirect
		if($redirect)
			Sky::goToPage("/");

	}

	/**
	 * This function performs user authorisation on server based on authentication result.
	 * @param array|bool $user      User information gathered by Auth::authentication.
	 * @throws SystemErrorException
	 * @throws DatabaseException
	 */
	static function authorisation($user = false) {

		# Check if initialised
		if(!self::$isInit)
			throw new SystemErrorException("Auth options not initialized");

		# Set me
		self::$me = new UserController($user);

		# Load preferences
		try {

			# If we don't use preferences
			if(empty(Sky::$config["authenticate"]["preferences"]))
				return;

			# Get user preferences
			$preferences = Sky::$db->make(Sky::$config["authenticate"]["preferencesTable"])->where("user_id", self::$me["id"])->get(Ret::SINGLE);

			# Save all preferences to storage
			if($preferences)
				Auth::$me->setPreferences($preferences);

			# Add user preferences	
			elseif(self::$defaultPreferences) {

				# Save default preferences
				Sky::$db->make(Sky::$config["authenticate"]["preferencesTable"])->set(self::$defaultPreferences)->set("user_id", self::$me["id"])->insert(true);

				# Save to session
				Auth::$me->setPreferences(self::$defaultPreferences);

			}

		} catch(BaseException $e) {

			# In case of error
			self::logout(false);
			Info::error("Ошибка во время авторизации");

		}
	}

	/**
	 * This function try to authenticate user, and return user data on success
	 *
	 * @param bool|String $username  Name of user to authenticate
	 * @param bool|String $password  Password of this user
	 * @param bool|String $sessionId Session identifier, may be alternative for password
	 * @throws SystemErrorException
	 * @return array|bool FALSE on fail, user data array otherwise
	 */
	static function authentication($username = false, $password = false, $sessionId = false) {

		# Check if initialised
		if (!self::$isInit)
			throw new SystemErrorException("Переменные аутентификации не инициализированы");

		# Check is username set
		if($username === false && is_null($username = ud::$post->key("username")->valueOr('')))
			return false;

		# Checks if isset password
		if($password === false && $sessionId === false && is_null($password = ud::$post->key("password")->valueOr('')))
			return false;

		# Prepare request
		$request = Sky::$db->make(self::$usersTable)->where("profileEmail", $username);

		# Get user by name and password
		if($password !== false)
			$user = $request->where(array("password", "md5"), $password)->get(Ret::SINGLE);

		# Get user by name and unique id
		else
			$user = $request->where("sessionId", $sessionId)->get(Ret::SINGLE);

		# If no data gathered
		if(!$user)
			return false; # If we didn't get user return false

		# Check status
		if($user["active"] == 0)
			throw new UserErrorException("Вы не активировали ваш аккаунт");

		# Return data
		return $user;

	}

	/**
	 * This function checks cookies variables(sessionId, username) and try to authorizate his if they setted
	 * @return bool Returns FALSE if they not set
	 * @throws DatabaseException
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
			if($e instanceof DatabaseException)
				throw new DatabaseException("Can't auth user, ".$e->getMessage());
			Info::error("Во время восстановления сессии произошла ошибка");
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