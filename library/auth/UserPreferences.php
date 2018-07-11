<?php


# Set namespace
namespace sky\auth;


use sky\Auth;
use sky\BaseException;
use sky\Sky;
use sky\SystemNoticeException;
use sky\UserErrorException;


/**
 * Class for work with user preferences 
 */
class UserPreferences {
    
    private
		$settings = false,
		$changes = false;

	/**
	 * This function initialised user preferences class
	 * @param array $preferences Array of user preferences values
	 * @throws SystemNoticeException
	 */
    function __construct($preferences) {
        
		# Check
        if(!is_array($preferences))
            throw new SystemNoticeException("Настройки пользователя имеют неверный формат");
        
		# Save
        $_SESSION["preferences"] = $this->settings = $preferences;
        $this->settings = &$_SESSION["preferences"];
        
    }

	/**
	 * Gets all settings
	 * @return array|bool
	 */
	public function getAll() {
		return $this->settings;
	}

    /**
     * Get preferences variable function 
     * @param String $name Name of user preferences variable to get
     * @return Mixed Null if variable not set or variable value otherwise
     */
    public function get($name) { 
        
        if (isset($this->settings[$name])) return $this->settings[$name];
        return null;
        
    }

	/**
	 * Saves current settings list
	 * @param Bool $current Indicates that only changes during this page should be saved
	 * @throws UserErrorException
	 */
	public function save($current = false) {
		
		
		# auth check
		if(!Auth::isLoggedIn()) {
			BaseException::log("Save with no auth, user data:".var_export($_SESSION));
			throw new UserErrorException("Вы должны быть авторизованы для этой операции");
		}
		
		
		# Current page changes
		if($current && !$this->changes) return;
		
		
		# Find changes
		$changes = $this->settings;
		unset($changes['id']);
		unset($changes['owner']);
		
		
		# Save settings
		Sky::$db->make(Sky::$config['authenticate']['preferencesTable'])->where("owner", Auth::$me['id'])->set($changes)->update();
		
	}

	/**
	 * Sets preference variable
	 * @param String $name  Name of user preferences variable to set.
	 * @param Mixed  $value Value for variable
	 * @param bool   $save
	 * @return Bool True if value set and false otherwise
	 */
    public function set($name, $value, $save = true) {
        

		# If we have special class
		if(class_exists("userPreferencesAdvanced")) {

			# Check of setting correct
			if(method_exists("userPreferencesAdvanced", "checkCorrect") && !call_user_func(array("userPreferencesAdvanced", "checkCorrect"), $name, $value))
				return false;

			# Perform some other correction
			if(method_exists("userPreferencesAdvanced", "correction"))
				$this->settings[$name] = call_user_func(array("userPreferencesAdvanced", "correction"), $name, $value);
		
		} else {
			$this->settings[$name] = $value;
		}


        # Save preference data
        if($save && Auth::isLoggedIn())
            Sky::$db->make(Sky::$config['authenticate']['preferencesTable'])->where("owner", Auth::$me['id'])->set($name, $value)->update();
        
		
		# Mark changes
		$this->changes = true;
		
			
		# Post processing
		if(class_exists("userPreferencesAdvanced") && method_exists("userPreferencesAdvanced", "postProcessing"))
			call_user_func(array("userPreferencesAdvanced", "postProcessing"), $name, $value);
		
		
        return true;
		
    }

    public function a() {

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

}

