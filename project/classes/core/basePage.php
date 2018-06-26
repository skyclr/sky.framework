<?php
use sky\info;
use sky\sky;
use sky\systemErrorException;
use sky\userData as ud;

/**
 * Class page
 * Used for creation main page
 */
abstract class basePage {

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
		$this->preTitle = sky::$config["site"]["name"];
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
	 */
	public static function baseInit() {

		# Create page
		$page = new page();

		# Templates init
		$page->initJsTemplates();

		# Page action
		$page->main();

		# Return new page exemplar
		return $page;

	}

	/**
	 * Gets not cached js templates and get theirs meta
	 */
	private function initJsTemplates() {


		# Add default templates
		if(!empty(sky::$config["templates"]["jsTemplates"]["default"]))
			$this->jsTemplates = array_merge($this->jsTemplates, sky::$config["templates"]["jsTemplates"]["default"]);


		# Go through
		foreach($this->jsTemplates as $key => $template) {


			# Template path
			$path = sky::location("twigJs") . $template . "." . sky::$config["templates"]["jsTemplates"]["extension"];


			# Check
			if(!file_exists($path)) {
				unset($this->jsTemplates[$key]);
				continue;
			}


			# Get time modified
			$mTime = filemtime($path);


			# Date check
			if(!empty(sky::$config["templates"]["jsTemplates"]["clientCache"]) &&
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
			if(!empty(sky::$config["templates"]["jsTemplates"]["multiple"])) {
				if(array_key_exists($template, sky::$config["templates"]["jsTemplates"]["multiple"])) {
					$this->jsTemplates[$key]["multiple"] = true;
					$this->jsTemplates[$key]["date"]     = array(
						"date"      => $this->jsTemplates[$key]["date"],
						"templates" => sky::$config["templates"]["jsTemplates"]["multiple"][$template]
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
	 * @throws systemErrorException
	 */
	public function render($parameters = [], $templatePath = false) {


		# Template path
		if(!$templatePath)
			$templatePath = sky::location("templates") . sky::$config['templates']['pages'] . content::$pagePath . "/" . content::$pageName . ".twig";

		# Try to find non directory
		if(!file_exists($templatePath))
			$templatePath = sky::location("templates") . sky::$config['templates']['pages'] . content::$pagePath . ".twig";

		# Existing check
		if(!file_exists($templatePath))
			throw new systemErrorException("Try to render not existing template: $templatePath");

		# Get page name
		$parameters += ["pageName"       => content::$pageName,
						"pagePath"       => content::$pagePath,
						"resultMessages" => info::get(),
						"page"           => $this];

		# Render
		return sky::$twig->render(mb_substr($templatePath, mb_strlen(sky::location("templates"))), $parameters);

	}

}