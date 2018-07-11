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

	/** Default preferences variables @var array */
	private $defaultPreferences;

	/** Guest user data @var array */
	private $guestData;

	/** Cookies path  @var string */
	private $cookiesPath = "/";

	/** Users table name @var string */
	private $usersTable;

	/** Users table name @var string */
	private $authRedirect;

	/** @var Auth */
	private static $self;

	const OPTION_DEFAULT_USER_PREFERENCES = "default_user_preferences";
	const OPTION_GUEST_DATA = "guest_data";
	const OPTION_AUTH_COOKIES_PATH = "auth_cookies_path";
	const OPTION_AUTH_REDIRECT = "auth_redirect";

	const ACTION_LOGOUT = "logout";
	const ACTION_LOGIN = "login";

	/**
	 * This function initialise all authentication instructions
	 * @param string $action
	 * @throws DatabaseException
	 */
	function action($action) {

		try {

			# Logout if type
			if($action === self::ACTION_LOGOUT) {
				self::logout();
				return;
			}

			# Try to login if type
			if($action === self::ACTION_LOGIN) {

				# Username check
				if(!$username = ud::$post->key("username")->typeFilter(FilterRule::TYPE_EMPTY_STRING)->valueOr(null))
					throw new UserAuthorisationException("No username provided");

				# Password check
				if(!$password = ud::$post->key("password")->typeFilter(FilterRule::TYPE_EMPTY_STRING)->valueOr(null))
					throw new UserAuthorisationException("No password provided");

				# Try to authenticate user
				if($user = self::authentication($username, $password)) {

					# If user correct then we authorise him
					self::authorisation($user);

					# After login redirect
					if($this->authRedirect)
						Sky::goToPage($this->authRedirect);

				}
			}

			# Maybe user loggedIn before
			if(!self::isLoggedIn())
				$this->isLoggedInBefore();

			# Login guest
			if(!self::isLoggedIn())
				$this->loginGuest();

		} catch(UserException $e) {}

	}

	/**
	 * Login guest account if it persists in preferences
	 */
	function loginGuest() {

		# If no need in guest account
		if(!$this->guestData)
			return;

		# Login guest
		self::$me = new UserController($this->guestData);

	}

	/**
	 * Gets auth checker
	 * @param string $usersTableAddress Name of tables where stores user data
	 * @param array $options            Array of authentication options
	 * @return Auth
	 */
	public static function get($usersTableAddress = "", $options = []) {
		if(!self::$self)
			self::$self = new static($usersTableAddress, $options);
		return self::$self;
	}

	/**
	 * Creates new auth checker
	 * @param string $usersTableAddress        Name of tables where stores user data
	 * @param array  $options     				Array of authentication options
	 * @throws SystemErrorException
	 */
	private function __construct($usersTableAddress, $options = []) {

		# Check
		VarFilter::check($usersTableAddress)->typeFilter(FilterRule::TYPE_EMPTY_STRING)->exceptionOnError("Bad users table address");

		# Set locals
		$this->usersTable = $usersTableAddress;

		# Set options
		foreach($options as $name => $value) {
			switch($name) {
				case self::OPTION_DEFAULT_USER_PREFERENCES:
					$this->defaultPreferences = $value;
					break;
				case self::OPTION_AUTH_COOKIES_PATH:
					$this->cookiesPath = $value;
					break;
				case self::OPTION_AUTH_REDIRECT:
					$this->authRedirect = $value;
					break;
				case self::OPTION_GUEST_DATA:
					$this->guestData = $value;
					break;
				default:
					throw new SystemErrorException("Unknown auth option: $name");
			}
		}

	}

	/**
	 * This function performs user logout
	 * @param Boolean $redirect If TRUE after login page will be redirected to root
	 */
	function logout($redirect = true) {

		# Unset php cookies data
		if(isset($_COOKIE['sessionId'])) unset($_COOKIE['sessionId']);

		# Destroys session
		session_unset();
		session_destroy();

		# Unset user cookies
		setcookie('sessionId', '', time() - 3600, $this->cookiesPath);
		self::$me = null;

		# Page redirect
		if($redirect)
			Sky::goToPage("/");

	}

	/**
	 * This function performs user authorisation on server based on authentication result.
	 * @param array $user User information gathered by Auth::authentication.
	 * @param bool $updateSession
	 * @throws UserAuthorisationException
	 */
	function authorisation($user, $updateSession = false) {

		# Check status
		if($user["active"] == 0)
			throw new UserAuthorisationException("Your account is not active");

		# Set me
		self::$me = new UserController($user);

		# Check if need to update session
		if(!$updateSession)
			return;

		# Generation of unique ID
		$uniqueId = Utilities::getRandomString(32);

		# Cookies set
		setcookie('sessionId', $uniqueId, time() + 60 * 60 * 24 * 30, $this->cookiesPath);

		# Update database
		Sky::$db->make($this->usersTable)
			->where($user['id'])
			->set("sessionId", $uniqueId)->update();

	}

	/**
	 * This function try to authenticate user, and return user data on success
	 * @param bool|String $username Name of user to authenticate
	 * @param bool|String $password Password of this user
	 * @return array|bool
	 * @throws UserAuthorisationException
	 */
	function authentication($username, $password) {

		# Get user by name and password
		if(!$user = Sky::$db->make($this->usersTable)->where("profileEmail", $username)->where(array("password", "md5"), $password)->get(Ret::SINGLE))
			throw new UserAuthorisationException("Wrong username/password pair");

		# return
		return $user;

	}

	function authenticationBySession($sessionId) {

		# Get user by sessionId
		return Sky::$db->make($this->usersTable)->where("sessionId", $sessionId)->get(Ret::SINGLE);

	}

	/**
	 * This function checks cookies variables(sessionId, username) and try to authorize his if they set
	 * @return bool Returns FALSE if they not set
	 * @throws DatabaseException
	 */
	private function isLoggedInBefore() {

		# If user data was saved
		if(!$sessionId = ud::$cookie->key('sessionId')->typeFilter(FilterRule::TYPE_EMPTY_STRING)->valueOr(null))
			return false;

		try {

			# We try to authorise user
			if($user = self::authenticationBySession($sessionId))
				self::authorisation($user);
			else
				$this->logout(false);

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