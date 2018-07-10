<?php
use sky\Info;
use sky\Sky;
use sky\SystemErrorException;
use sky\UserData as ud;

/**
 * Class page
 * Used for creation main page
 */
abstract class BasePage {

	public

		/**
		 * Page content
		 * @var string html
		 */
		$content = "",

		/**
		 *  Page title
		 * @var string html
		 */
		$title = "",

		/**
		 * Page pre title
		 * @var string
		 */
		$preTitle = "",

		/**
		 * List of templates used in page
		 * @var array
		 */
		$jsTemplates = array(),

		/**
		 * Parent template
		 * @parent template name
		 */
		$parentTemplate = "layout";

	/**
	 * Page creation
	 */
	public function __construct() {
		$this->preTitle = Sky::$config["site"]["name"];
	}

	/**
	 * End page call
	 */
	public function __destruct() {

	}

	/**
	 * Page creation method
	 */
	abstract function main();

	/**
	 * Renders page content
	 * @param array $parameters Template params
	 */
	protected function renderContent($parameters = []) {
		$this->content = $this->render($parameters);
	}

	/**
	 * Performs some global page actions
	 * @param $classNameFull
	 * @return BasePage
	 * @throws SystemErrorException
	 */
	public static function baseInit($classNameFull) {

		# Create page
		$page = new $classNameFull();

		if($page instanceof BasePage) {

			# Templates init
			$page->initJsTemplates();

			# Page action
			$page->main();

		} else throw new SystemErrorException("Page class isn't parented from base page class");

		# Return new page exemplar
		return $page;

	}

	/**
	 * Gets not cached js templates and get theirs meta
	 */
	private function initJsTemplates() {

		# Add default templates
		if(!empty(Sky::$config["templates"]["jsTemplates"]["default"]))
			$this->jsTemplates = array_merge($this->jsTemplates, Sky::$config["templates"]["jsTemplates"]["default"]);

		# Go through
		foreach($this->jsTemplates as $key => $template) {

			# Template path
			$path = Sky::location("twigJs") . $template . "." . Sky::$config["templates"]["jsTemplates"]["extension"];

			# Check
			if(!file_exists($path)) {
				unset($this->jsTemplates[$key]);
				continue;
			}

			# Get time modified
			$mTime = filemtime($path);

			# Date check
			if(!empty(Sky::$config["templates"]["jsTemplates"]["clientCache"]) &&
				$date = ud::$cookie->key("storedTemplates-" . str_replace("/", "-", $template))->valueOr(false)
			) {

				# Time check
				if($mTime <= $date) {
					unset($this->jsTemplates[$key]);
					continue;
				}

			}

			# Rebuild
			$this->jsTemplates[$key] = array(
				"realPath" => $template,
				"path"     => str_replace("/", "-", $template),
				"date"     => $mTime
			);

			# Set multi
			if(!empty(Sky::$config["templates"]["jsTemplates"]["multiple"])) {
				if(array_key_exists($template, Sky::$config["templates"]["jsTemplates"]["multiple"])) {
					$this->jsTemplates[$key]["multiple"] = true;
					$this->jsTemplates[$key]["date"]     = array(
						"date"      => $this->jsTemplates[$key]["date"],
						"templates" => Sky::$config["templates"]["jsTemplates"]["multiple"][$template]
					);
				}
			}

		}

	}

	/**
	 * Renders associated template
	 * @param array $parameters Render parameters
	 * @param bool $templatePath
	 * @return string Rendered template
	 * @throws SystemErrorException
	 */
	public function render($parameters = [], $templatePath = false) {

		# Template path
		if(!$templatePath)
			$templatePath = Sky::location("templates") . Sky::$config['templates']['pages'] . PagesControllersManager::getPageClassDirRelative() . PagesControllersManager::getPageClassName() . "/" . PagesControllersManager::getPageClassName() . ".twig";

		# Try to find non directory
		if(!file_exists($templatePath))
			$templatePath = Sky::location("templates") . Sky::$config['templates']['pages'] . PagesControllersManager::getPageClassDirRelative() . PagesControllersManager::getPageClassName() . ".twig";

		# Existing check
		if(!file_exists($templatePath))
			throw new SystemErrorException("Try to render not existing template: $templatePath");

		# Get page name
		$parameters += ["resultMessages" => Info::get(), "page" => $this];

		# Render
		return Sky::$twig->render(mb_substr($templatePath, mb_strlen(Sky::location("templates"))), $parameters);

	}

}