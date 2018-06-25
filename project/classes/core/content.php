<?php

# Include base page class for page building
use sky\auth;
use sky\baseException;
use sky\request;
use sky\sky;

require_once "basePage.php";

# Create new content
new content();

/**
 * Class content
 * Content generate class
 */
class content {

	/**
	 * Rendered page
	 * @var string
	 */
	public static $renderedPage = "";

	/**
	 * Path to current page
	 * @var string
	 */
	public static $pagePath = "/index";

	/**
	 * Page name
	 * @var string
	 */
	public static $pageName = "index";

	/**
	 * Page object
	 * @var bool|basePage
	 */
	public static $page = false;

	/**
	 * List of pages available without auth
	 * @var array
	 */
	public static $authPages = [''];

	/**
	 * Make page and resolve addresses
	 */
	public function __construct() {

		# Make twig extend
		twig::init();

		# Get request
		$path = request::getPath(self::$pageName);

		# Check if available
		if(!empty(sky::$config["authenticate"]["use"]) && !auth::isLoggedIn())
			foreach(self::$authPages as $page)
				if($path != "admin/login" && preg_match("/$page/", $path))
					$path = "login";

		# Get page name
		self::$pageName = request::getPageName(self::$pageName);

		# Make page
		self::makePage($path);

	}

	/**
	 * Makes new page
	 * @param string $pagePath Page path inside pages folder
	 */
	public static function makePage($pagePath = "index") {


		# Save page path
		self::$pagePath = $pagePath;

		# Page object creation
		try {

			# Page class path
			$classPath = sky::location("pages") . self::$pagePath . ".php";

			# Existing check
			if(!file_exists($classPath))
				throw new \sky\system404Exception("No page for path found: $pagePath");

			# Page include
			/** @noinspection PhpIncludeInspection */
			include $classPath;

			# Check if proper class exists
			if(!class_exists("page")) {
				self::$page = true;
				return;
			}

			# Create page object
			self::$page = basePage::baseInit();


			# Make templates list
			$jsTemplates = array();
			foreach(self::$page->jsTemplates as $template) {
				$jsTemplates[] = array(
					"path" => $template["path"],
					"date" => $template["date"]
				);
			}

			# Prepare rendering parameters
			$parameters = array(
				"page"         => self::$page,
				"pageName"     => self::$pageName,
				"pagePath"     => self::$pagePath,
				"pathElements" => request::getAddress(),
				"jsTemplates"  => $jsTemplates ? json_encode($jsTemplates, true) : "{}"
			);


			# Render
			self::$renderedPage = sky::$twig->render("/shared/" . self::$page->parentTemplate . ".twig", $parameters);

		} catch(\sky\system404Exception $e) {

			# Set code
			header("HTTP/1.0 404 Not Found", true, 404);

			# Render 404 page
			self::$renderedPage = sky::$twig->render("/system/404.twig", array("page" => request::$path));

		} catch(Exception $e) {

			# Log if needed
			if(!($e instanceof baseException))
				baseException::log($e->getMessage());

			# Message
			self::$renderedPage = sky::$twig->render("/system/errorPage.twig", array("error" => "Во время работы произошла ошибка (" . $e->getMessage() . "), пожалуйста попробуйте позже"));

			# Mark that page was rendered
			self::$page = true;

		}

	}

}