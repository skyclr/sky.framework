<?php

use sky\Auth;
use sky\Request;
use sky\Sky;
use sky\SystemErrorException;

/**
 * Class twig
 * Works with twig template engine
 */
class Twig extends Twig_Extension {

	/**
	 * Extension name
	 * @return string
	 */
	public function getName() {
		return "sky";
	}

	/**
	 * Init twig extensions
	 * @throws SystemErrorException
	 */
	public static function init() {


		# If not created
		if(!Sky::$twig)
			throw new SystemErrorException("Try to init Twig without using it");

		/** @noinspection PhpUndefinedMethodInspection */
		Sky::$twig->getExtension('Twig_Extension_Core')->setNumberFormat(0, '.', " ");

		# Add filter
		Sky::$twig->addFilter(new Twig_Filter("addClass", 			["twig", "filterClass"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("selected", 			["twig", "filterSelected"], 	['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("checked", 				["twig", "filterChecked"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("disabled", 			["twig", "filterDisabled"], 	['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("else", 				["twig", "filterElse"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("onTrue", 				["twig", "filterOnTrue"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("isString", 			["twig", "filterIsString"], 	['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("url", 					["twig", "filterUrl"],		 	['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("json", 				["twig", "filterJson"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("includeRaw", 			["twig", "includeRaw"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("includeRawFullPath", 	["twig", "includeRawFullPath"], ['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("makeSelectColumns", 	["twig", "makeSelectColumns"], 	['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("fileExists", 			["twig", "fileExists"], 		['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("ptPath", 				["twig", "ptPath"], 			['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("anyIn", 				["twig", "anyIn"], 				['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("allIn", 				["twig", "allIn"], 				['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("countIn", 				["twig", "countIn"], 			['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("truncate", 			["twig", "truncate"], 			['is_safe' => ['html']]));
		Sky::$twig->addFilter(new Twig_Filter("richText", 			["twig", "richText"], 			['is_safe' => ['html']]));


		# Current page checker
		Sky::$twig->addFunction(new Twig_Function("pageIs", ["twig", "pageIs"]));
		Sky::$twig->addFunction(new Twig_Function("sectionIs", ["twig", "sectionIs"]));


		# Make globals
		Sky::$twig->addGlobal('me', Auth::$me);
		Sky::$twig->addGlobal('post', $_POST);
		Sky::$twig->addGlobal('get', $_GET);
		Sky::$twig->addGlobal('preferences', Sky::$config);
		Sky::$twig->addGlobal('base', Sky::$config['site']['base']);

	}


	/**
	 * Checks if current page equal to expression
	 * @param $expression
	 * @return bool
	 */
	public static function pageIs($expression) {
		return Sky::$pagesManager->getPageClassDirRelative() . Sky::$pagesManager->getPageClass() == $expression;
	}

	/**
	 * Checks if current page section equal to expression
	 * @param $expression
	 * @return bool
	 */
	public static function sectionIs($expression) {
		/** @noinspection PhpParamsInspection */
		$path = implode("/", Request::getOriginalPathParts());
		return mb_stripos($path, $expression) === 0;
	}

	/**
	 * Returns prelanding template attachment path for compiled template
	 * @param $expression
	 * @param $max
	 * @return bool
	 */
	public static function truncate($expression, $max) {
		return mb_strlen($expression) > $max ? mb_substr($expression, 0, $max) : $expression;
	}

	/**
	 * Returns prelanding template attachment path for compiled template
	 * @param $expression
	 * @return bool
	 */
	public static function richText($expression) {
		/** @noinspection HtmlUnknownTarget */
		$expression = preg_replace('/(https?:\/\/[^\s]+)/u', '<a href="$1">$1</a>', $expression);
		$expression = preg_replace('/\n/u', '<br/>', $expression);
		$expression = preg_replace('/\[b\](.*)\[\/b\]/u', '<b>$1</b>', $expression);
		$expression = preg_replace('/\[i\](.*)\[\/i\]/u', '<i>$1</i>', $expression);
		return $expression;
	}

	/**
	 * Check any entrances in array
	 * @param $expression
	 * @param $haystack
	 * @return bool
	 */
	public static function anyIn($expression, $haystack) {
		foreach($expression as $item)
			if(in_array($item, $haystack))
				return true;
		return false;
	}

	/**
	 * Check that all entrances in array
	 * @param $expression
	 * @param $haystack
	 * @return bool
	 */
	public static function allIn($expression, $haystack) {
		foreach($expression as $item)
			if(in_array($item, $haystack))
				return false;
		return true;
	}

	/**
	 * Entrances count
	 * @param $expression
	 * @param $haystack
	 * @return int
	 */
	public static function countIn($expression, $haystack) {
		$count = 0 ;
		foreach($expression as $item)
			if(in_array($item, $haystack))
				$count++;
		return $count;
	}

	/**
	 * Compiles resource URL
	 * @param string $expression File
	 * @param string $type       Type of resource
	 * @return string
	 */
	public static function filterUrl($expression, $type = "page") {

		if(isset(Sky::$config["resources"][$type]))
			return Sky::$config["resources"][$type] . $expression;

		return Sky::$config['site']['base'] . $expression;
	}


	/**
	 * Adds json script
	 * @param $expression
	 * @return string
	 */
	public static function filterJson($expression) {
		return '<script type="application/json">' . json_encode($expression) . '</script>';
	}

	public static function filterElse($expression, $else) {

		return $expression ? $expression : $else;
	}
	public static function filterIsString($expression) {

		return is_string($expression) ? true : false;
	}
	public static function filterOnTrue($expression, $result) {

		return $expression ? $result : false;
	}

	public static function filterClass($expression, $class) {

		return $expression ? 'class="' . $class . '"' : "";
	}

	public static function filterSelected($expression) {

		return $expression ? 'selected="selected"' : "";
	}

	public static function filterChecked($expression) {

		return $expression ? 'checked="checked"' : "";
	}

	public static function filterDisabled($expression) {

		return $expression ? 'disabled="disabled"' : "";
	}

	public static function includeRaw($expression) {
		return file_get_contents(Sky::location("templates") . $expression);
	}

	public static function includeRawFullPath($expression) {
		return @file_get_contents($expression);
	}

	public static function fileExists($expression, $location) {
		return file_exists(Sky::location($location) . $expression);
	}

	public static function makeSelectColumns($items, $columnSplit = 6, $maxColumns = 4) {

		if(!$items)
			return array();

		$columns      = array();
		$columnsCount = ceil(sizeof($items) / $columnSplit);

		if($columnsCount < 1)
			$columnsCount = 1;
		if($columnsCount > $maxColumns)
			$columnsCount = $maxColumns;

		$perColumn = ceil(sizeof($items) / $columnsCount);
		$i         = 0;


		foreach($items as $item) {
			if($i % $perColumn == 0)
				$column = array();

			$column[] = $item;

			if($i % $perColumn == $perColumn - 1 || $i == sizeof($items) - 1)
				$columns[] = $column;


			$i++;

		}

		return ["groups" => $columns];

	}
}