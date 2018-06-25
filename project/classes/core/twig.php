<?php

use sky\auth;
use sky\request;
use sky\sky;
use sky\systemErrorException;

/**
 * Class twig
 * Works with twig template engine
 */
class twig extends Twig_Extension {

	/**
	 * Extension name
	 * @return string
	 */
	public function getName() {

		return "sky";
	}

	/**
	 * Init twig extensions
	 * @throws systemErrorException
	 */
	public static function init() {


		# If not created
		if(!sky::$twig)
			throw new systemErrorException("Try to init Twig without using it");


		sky::$twig->getExtension('core')->setNumberFormat(0, '.', " ");

		# Add filter
		sky::$twig->addFilter(new Twig_SimpleFilter("addClass", array("twig", "filterClass"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("selected", array("twig", "filterSelected"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("checked", array("twig", "filterChecked"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("disabled", array("twig", "filterDisabled"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("else", array("twig", "filterElse"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("onTrue", array("twig", "filterOnTrue"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("isString", array("twig", "filterIsString"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("url", array("twig", "filterUrl"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("json", array("twig", "filterJson"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("includeRaw", array("twig", "includeRaw"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("includeRawFullPath", array("twig", "includeRawFullPath"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("makeSelectColumns", array("twig", "makeSelectColumns"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("fileExists", array("twig", "fileExists"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("ptPath", array("twig", "ptPath"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("anyIn", array("twig", "anyIn"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("allIn", array("twig", "allIn"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("countIn", array("twig", "countIn"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("truncate", array("twig", "truncate"), array('is_safe' => array('html'))));
		sky::$twig->addFilter(new Twig_SimpleFilter("richText", array("twig", "richText"), array('is_safe' => array('html'))));


		# Current page checker
		sky::$twig->addFunction(new Twig_SimpleFunction("pageIs", array("twig", "pageIs")));
		sky::$twig->addFunction(new Twig_SimpleFunction("sectionIs", array("twig", "sectionIs")));


		# Make globals
		sky::$twig->addGlobal('me', auth::$me);
		sky::$twig->addGlobal('post', $_POST);
		sky::$twig->addGlobal('get', $_GET);
		sky::$twig->addGlobal('preferences', sky::$config);
		sky::$twig->addGlobal('base', sky::$config['site']['base']);

		# Add tag parser
		//sky::$twig->addTokenParser(new jsTemplateTag());

	}

	/**
	 * Checks if current page quial to expression
	 * @param $expression
	 * @return bool
	 */
	public static function pageIs($expression) {

		return content::$pagePath == $expression;
	}

	/**
	 * Checks if current page section equal to expression
	 * @param $expression
	 * @return bool
	 */
	public static function sectionIs($expression) {

		$address = request::$real;

		return $address[0] == $expression;
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
		$expression = preg_replace('/(https?:\/\/[^\s]+)/u', '<a href="$1">$1</a>', $expression);
		$expression = preg_replace('/\n/u', '<br/>', $expression);
		$expression = preg_replace('/\[b\](.*)\[\/b\]/u', '<b>$1</b>', $expression);
		$expression = preg_replace('/\[i\](.*)\[\/i\]/u', '<i>$1</i>', $expression);
		return $expression;
	}

	public static function anyIn($expression, $haystack) {
		foreach($expression as $item)
			if(in_array($item, $haystack))
				return true;
		return false;
	}

	public static function allIn($expression, $haystack) {
		foreach($expression as $item)
			if(!in_array($item, $haystack))
				return false;
		return true;
	}

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

		switch($type) {
			case "jvs":
				return sky::$config["resources"]["jvs"] . $expression;
			case "css":
				return sky::$config["resources"]["css"] . $expression;
			case "img":
				return sky::$config["resources"]["img"] . $expression;
			default:
				return sky::$config['site']['base'] . $expression;
		}

	}

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
		return file_get_contents(sky::location("templates") . $expression);
	}

	public static function includeRawFullPath($expression) {
		return @file_get_contents($expression);
	}

	public static function fileExists($expression, $location) {
		return file_exists(sky::location($location) . $expression);
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

		return array("groups" => $columns);

	}
}

/**
 * Class for parsing jsTemplate Tag
 */
class jsTemplateTag extends Twig_TokenParser {

	/**
	 * Tag parse
	 * @param Twig_Token $token
	 * @return jsTemplateNode
	 * @throws Twig_Error_Syntax
	 */
	public function parse(Twig_Token $token) {

		$lineno = $token->getLine();
		$value = $this->parser->getExpressionParser()->parseExpression();
		$stream = $this->parser->getStream();
		$body = $this->parser->subparse(array($this, 'decideIfEnd'));
		$stream->next()->getValue();
		$stream->expect(Twig_Token::BLOCK_END_TYPE);

		return new jsTemplateNode($body, $value, $token->getLine(), $this->getTag());
	}

	/**
	 * Defines open tag
	 * @return string
	 */
	public function getTag() {

		return 'JSTemplate';
	}

	/**
	 * Defines close tag
	 * @param Twig_Token $token
	 * @return bool
	 */
	public function decideIfEnd(Twig_Token $token)
	{
		return $token->test(array('endJSTemplate'));
	}


}

/**
 * Class jsTemplate compiler
 */
class jsTemplateNode extends Twig_Node {

	/**
	 * @param Twig_Node            $body
	 * @param Twig_Node_Expression $value
	 * @param int                  $line
	 * @param null                 $tag
	 */
	public function __construct(Twig_Node $body, Twig_Node_Expression $value, $line, $tag = null) {
		parent::__construct(array('value' => $value, "body" => $body), array(), $line, $tag);
	}

	/**
	 * Compile tag
	 * @param Twig_Compiler $compiler
	 */
	public function compile(Twig_Compiler $compiler) {

		# Compile tag
		$compiler
			->write("echo '<script type=\"text/template\" id=\"'; echo")
			->subcompile($this->getNode('value'))
			->write(';echo "\">";')
			->subcompile($this->getNode('body'))
			->write('echo "</script>";');
	}
}