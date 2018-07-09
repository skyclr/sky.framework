<?php


# Framework namespace
namespace sky;

/**
 * Class request
 * Used for request routing and etc.
 */
class Request {

	/**
	 * Original path parts
	 * @var bool
	 */
	private static $real = false;

	/**
	 * Original path string
	 * @var bool
	 */
	private static $path = false;

	/**
	 * Gets path with resolved .. and .
	 * @return string Path
	 */
	public static function getOriginalPathParts() {

		# Get address elements
		return self::$real;

	}

	/**
	 * Gets path with resolved .. and .
	 * @return string Path
	 */
	public static function getOriginalPath() {

		# Get address elements
		return self::$path;

	}

	/**
	 * Gets path with resolved .. and .
	 * @return string Path
	 */
	public static function getPath() {

		# Get address elements
		$route = self::getAddress();

		# Make compiled
		return implode("/", $route);

	}

	/**
	 * Gets current addresses stack
	 * @return array
	 */
	public static function getAddress() {

		# Save path
		if(self::$path === false)
			self::$path = empty($_GET["pagePath"]) ? "" : $_GET["pagePath"];

		# If no sub pages were requested
		if(empty($_GET["pagePath"]))
			self::setAddress("index");

		# Return slitted path
		$elements = explode("/", $_GET["pagePath"]);

		# Save real route parts
		if(self::$real === false)
			self::$real = $elements;

		# Would hold route parts
		$route = array();

		# Compile route
		foreach($elements as $element) {

			# Skip empty
			if($element == "")
				continue;

			# If go back
			if(trim($element) == ".."){
				if(sizeof($route))
					array_pop($route);
				# If not same
			} else {
				if(trim($element) != ".")
					array_push($route, $element);
			}

		}

		/* If synonym */
		if(implode("/", $route) != ($newRoute = self::findSynonyms(implode("/", $route)))) {
			self::setAddress($newRoute);
			return self::getAddress();
		}

		# Return
		return $route;

	}

	/**
	 * Sets current address
	 * @param string $address Correct address
	 * @return string New path
	 */
	public static function setAddress($address) {
		$_GET["pagePath"] = $address;
		return self::getPath();
	}

	/**
	 * Gets page name from path
	 * @return string
	 */
	public static function getPageName() {

		# Get path
		$pathElements = self::getAddress();

		# Return path last element
		return array_pop($pathElements);

	}

	/**
	 * Finds page synonyms
	 * @param string $page Page name
	 * @throws SystemErrorException
	 * @return string Page name, as is fi no synonyms or synonym page
	 */
	private static function findSynonyms($page) {

		# If none
		if(empty(Sky::$config["pages"]["synonyms"]))
			return $page;

		# Search through
		foreach(Sky::$config["pages"]["synonyms"] as $synonym => $original) {

			/* If we found it */
			if($find = preg_match("/^$synonym$/", $page))
				return preg_replace("/^$synonym$/", $original, $page);

			/* If regexp wrong */
			if($find === false)
				throw new SystemErrorException("Wrong synonym set: '$synonym' preg failed");

		}

		# Return
		return $page;

	}

}