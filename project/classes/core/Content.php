<?php

# Include base page class for page building
use sky\Auth;
use sky\BaseException;
use sky\Request;
use sky\Sky;

require_once "basePage.php";

/**
 * Class content
 * Content generate class
 */
class Content {

	/**
	 * Rendered page
	 * @var string
	 */
	public static $renderedPage = "";

	/**
	 * Page object
	 * @var bool|BasePage
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
		Twig::init();

		# Get path
		$path = Request::getPath();

		# Check if available
		if(!empty(Sky::$config["authenticate"]["use"]) && !Auth::isLoggedIn())
			foreach(self::$authPages as $page)
				if(preg_match("/$page/", $path))
					Request::setAddress('/login');

		# Make page
		self::makePage();

	}

	/**
	 * Makes new page
	 */
	public static function makePage() {

		# Page object creation
		try {

			$pageClass = ucfirst(Request::getPageName());
			$pageNamespace = implode("/", array_slice(Request::getAddress(), 0, -1));
			$pageClassFull = "$pageNamespace/$pageClass";
			$pagePath = Sky::location("pages") . "$pageClassFull.php";

			# Existing check
			if(!file_exists($pagePath))
				throw new \sky\System404Exception("No page for path found: $pagePath");

			# Page include
			/** @noinspection PhpIncludeInspection */
			include $pagePath;
var_dump($pagePath, $pageClassFull, class_exists($pageClassFull));
			if(!class_exists($pageClassFull))
				return;

			# Create page object
			self::$page = BasePage::baseInit($pageClassFull);

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
				"pathElements" => Request::getAddress(),
				"jsTemplates"  => $jsTemplates ? json_encode($jsTemplates, true) : "{}"
			);

			# Render
			self::$renderedPage = Sky::$twig->render("/shared/" . self::$page->parentTemplate . ".twig", $parameters);

		} catch(\sky\System404Exception $e) {

			# Set code
			header("HTTP/1.0 404 Not Found", true, 404);

			# Render 404 page
			self::$renderedPage = Sky::$twig->render("/system/404.twig", array("page" => Request::getOriginalPath()));

		} catch(Exception $e) {

			# Log if needed
			if(!($e instanceof BaseException))
				BaseException::log($e->getMessage());

			# Message
			self::$renderedPage = Sky::$twig->render("/system/errorPage.twig", array("error" => "Во время работы произошла ошибка (" . $e->getMessage() . "), пожалуйста попробуйте позже"));

			# Mark that page was rendered
			self::$page = true;

		}

	}

}