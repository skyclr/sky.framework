<?php

# Include base page class for page building
use sky\Auth;
use sky\BaseException;
use sky\Request;
use sky\Sky;

require_once "basePage.php";

/**
 * Content generate class
 */
class PagesControllersManager extends PagesControllersManagerBase {

	/**
	 * Page object
	 * @var bool|BasePage
	 */
	public $page;

	/**
	 * List of pages available without auth
	 * @var array
	 */
	public $authPages = [''];

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
			foreach($this->authPages as $page)
				if(preg_match("/$page/", $path))
					Request::setAddress('/login');

	}

	/**
	 * Makes new page
	 */
	public function renderPageByURL() {

		try {

			# Existing check
			if(!file_exists(self::getPageClassPath()))
				throw new \sky\System404Exception("No page for path found: " . self::getPageClassPath());

			# Page include
			/** @noinspection PhpIncludeInspection */
			include self::getPageClassPath();

			# Check if class exists
			if(!class_exists(self::getPageClass()))
				return;

			# Create page object
			$this->page = BasePage::baseInit(self::getPageClass());

			# Make templates list
			$jsTemplates = array();
			foreach($this->page->jsTemplates as $template) {
				$jsTemplates[] = array(
					"path" => $template["path"],
					"date" => $template["date"]
				);
			}

			# Prepare rendering parameters
			$parameters = array(
				"page"         => $this->page,
				"pathElements" => Request::getAddress(),
				"jsTemplates"  => $jsTemplates ? json_encode($jsTemplates, true) : "{}"
			);

			# Render
			$this->renderedPage = Sky::$twig->render("/shared/" . $this->page->parentTemplate . ".twig", $parameters);

		} catch(\sky\System404Exception $e) {

			# Set code
			header("HTTP/1.0 404 Not Found", true, 404);

			# Render 404 page
			$this->renderedPage = Sky::$twig->render("/system/404.twig", array("page" => Request::getOriginalPath()));

		} catch(Exception $e) {

			# Log if needed
			if(!($e instanceof BaseException))
				BaseException::log($e->getMessage() . " at " . $e->getFile() . "(" . $e->getLine() . ")");

			# Message
			$this->renderedPage = Sky::$twig->render("/system/errorPage.twig", array("error" => "Во время работы произошла ошибка (" . $e->getMessage() . "), пожалуйста попробуйте позже"));

			# Mark that page was rendered
			$this->page = true;

		}

	}

}