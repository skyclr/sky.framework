<?php

# Framework namespace
namespace sky;

/**
 * Main class
 */ 
class Sky {

	/**
	 * Predefine constants
	 */
	const SKY_VERSION	= "3.7";
    
	/**
	 * Database access class 
	 * @var \sky\db\DB2
	 */
    public static $db;

	/**
	 * Self link
	 * @var bool|Sky
	 */
	private static $sky	= false;
	
	/**
	 * System preferences
	 * @var []
	 */
	public static $config;

	/**
	 * Twig environment object, used to render templates and etc
	 * @see http://twig.sensiolabs.org/documentation
	 * @var \Twig_Environment
	 */
	public static $twig = false;

	/**
	 * Twig loader
	 * @var \Twig_Loader_Filesystem
	 */
	public static $twigLoader;

	/**
	 * Automatically load classes
	 * @param $className
	 */
	public function autoLoad($className) {

		# Trace
		if($backTrace = debug_backtrace() && !empty($backTrace[1]["file"]))
			$dir = dirname($backTrace[1]["file"]);

		# Try to include
		if(!empty($dir) && file_exists("$dir/$className.php"))
			/** @noinspection PhpIncludeInspection */
			include  "$dir/$className.php";
		elseif(file_exists(Sky::location("phpEntities") . "$className.php"))
			include Sky::location("phpEntities") . "$className.php";
		elseif(file_exists(Sky::location("phpManagers") . "$className.php"))
			include Sky::location("phpManagers") ."$className.php";
		elseif(file_exists(Sky::location("phpHelpers") . "$className.php"))
			include Sky::location("phpHelpers") . "$className.php";
		elseif(file_exists(Sky::location("phpCore") . "$className.php"))
			include Sky::location("phpCore") . "$className.php";
		else spl_autoload($className);

	}

	/**
	 * Library every page init
	 * @param bool|string $type Type of preformed actions on init
	 * @global     $libraryPreferences
	 */
	public function __construct($type = false) {

		# Preferences
		global $preferences;

		# Save preferences
		self::$config = $preferences;

		# Starting of session
		if($type !== "console") {

			# Start session
			session_start();

			# Pre validate data
			UserData::init();

		}

		try {

			# File auto loader
			spl_autoload_register(array($this, 'autoLoad'));

			# Add library path
			self::$config["locations"]["library"] = realpath(dirname(__FILE__))."/";

			# Try to init
			try {

				# Init
				$this->init($type);

				# Log
				if($type == "console")
					echo "\e[34mLibrary: init done\e[0m\n";

			} catch(UserErrorException $e) {}

			# Self link
			self::$sky = $this;

			# No render and page creation for console
			if($type == "console") return;

			# Content include after all initialisations
			/** @noinspection PhpIncludeInspection */
			require_once self::location("contentClass");

			# New content
			new \Content();

			# Output rendered page
			/** @noinspection PhpUndefinedClassInspection */
			echo \Content::$renderedPage;

			# No more actions
			return;

		}
		catch(DatabaseException $e) {

			# User info error message
			$error = "В данный момент мы меняем конфигурацию базы данных. Пожалуйста попробуйте позже";

		}
		catch(BaseException $e) {

			# Error
			$error = "Во время работы произоша системная ошибка";

		}
		catch(\Exception $e) {

			# Log
			BaseException::log($e->getMessage() . "\nFile: " .$e->getFile() . "\nLine: " . $e->getLine());

			# Error
			$error = "Во время работы произоша системная ошибка";

		}

		# Render if error occupied
		if(self::$twig)
			# If twig init
			self::$twig->display("/system/errorGlobal.twig", array("error" => $error));
		else
			# If no twig
			die("<h4>$error</h4>");

	}

	/**
	 * Initialise base classes and variables
	 * @param bool|string $type Type of initialisation
	 */
	private function init($type = false) {

		# Log
		if($type == "console")
			echo "\nLibrary: init composer autoload...";

		# Include composer auto load
		/** @noinspection PhpIncludeInspection */
		require_once Sky::location("vendor") . 'autoload.php';

		# Log
		if($type == "console") {
			echo "\e[32mDone\e[0m\n";
			echo "Library: init twig...";
		}

		# If we use twig templates
		if(!empty(self::$config["templates"]))
			$this->initTwig();

		# Log
		if($type == "console")
			echo "\e[32mDone\e[0m\n";

		# SQL and authentication initialization
		if(!empty(self::$config["database"]) && (!isset(self::$config["database"]["use"]) || self::$config["database"]["use"] !== false)) {

			# Log
			if($type == "console")
				echo "Library: init database connection " . self::$config["database"]["host"] . "...";

			# Init database connection
			self::$db = new db\DB2(
				self::$config["database"]["host"],
				self::$config["database"]["name"],
				self::$config["database"]["user"],
				self::$config["database"]["password"]);

			# Log
			if($type == "console")
				echo "\e[32mDone\e[0m\n";

			# If user external configs
			if(!empty(self::$config["preferences"]["external"])) {

				# Log
				if($type == "console")
					echo "Library: get external configs from DB...";

				# Get configs
				if($configs = Sky::$db->make(self::$config["preferences"]["external"])->where("autoload", 1)->select()) {

					# Go through
					foreach($configs as $config)
						self::$config[$config["section"]][$config["name"]] = !empty($config["json"]) ? json_decode($config["value"], true) : $config["value"];

				}


				# Log
				if($type == "console")
					echo "\e[32mDone\e[0m\n";
			}

			# Init authentication
			if($type !== "console" && !empty(self::$config["authenticate"])  && (!isset(self::$config["authenticate"]["use"]) || self::$config["authenticate"]["use"] !== false)) {
				Auth::initialization(
							self::$config['authenticate']["table"],
							self::$config['authenticate']["preferences"]);

				new Auth();
			}
		}

    }

	/**
	 * Init twig template engine
	 */
	private function initTwig() {

		# Create loader
		self::$twigLoader = new \Twig_Loader_Filesystem(self::location("templates"));

		# Create environment
		self::$twig = new \Twig_Environment(self::$twigLoader, array('cache' => self::location("twigCache")));

		# Disable cache if needed
		if(!empty(self::$config['templates']['noCache']) || !empty(self::$config["development"]['noTwigCache']))
			Sky::$twig->setCache(false);

	}

	/**
	 * Gets location path from preferences
	 * @param string $name Name of location
	 * @throws SystemErrorException
	 * @return string
	 */
    public static function location($name) {

		# Check if location exists
		if(!isset(self::$config["locations"][$name])) {

			# Replacement paths
			if($name === "contentClass")
				return self::location("phpCore") . "content.php";

			# Else exception go
			throw new SystemErrorException("Unknown location requested: " . $name);

		}

		# Return path
		return self::$config["locations"][$name];
    	
    }
    
    /**
     * Redirects to page
     * @param string $page Page URL
     */
    public static function goToPage($page) {
    	if(stripos($page, "http:") !== false)
			$page = self::$config["site"]["base"] . $page;
        header("Location: $page");
        die('Похоже ваш браузер не поддерживает перенаправления, перейдите на <a href="' . self::$config["site"]["base"] . $page . '">эту страницу</a>');
    }

}