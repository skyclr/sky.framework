<?php

# Include base page class for page building
use sky\Request;
use sky\Sky;


/**
 * Content generate class
 */
abstract class PagesControllersManagerBase {

	/**
	 * Rendered page
	 * @var string
	 */
	public $renderedPage = "";

	/**
	 * Current page controller namespace
	 * @var string
	 */
	private $pageNamespace;

	/**
	 * Current page controller class name
	 * @var string
	 */
	private $pageClass;

	/**
	 * Current page controller path relative to project
	 * @var string
	 */
	private $pageRelativePath;

	/**
	 * Gets controller relative directory path for page folder based on namespace
	 * @return string
	 */
	public function getPageClassDirRelative() {
		if(!$this->pageRelativePath) $this->pageRelativePath = implode("/", array_slice(Request::getAddress(), 0, -1));
		return $this->pageRelativePath;
	}

	/**
	 * Gets controller full directory path for page folder based on namespace
	 * @return string
	 */
	public function getPageClassDir() {
		return Sky::location("pages") . self::getPageClassDirRelative();
	}

	/**
	 * Gets controller full path with extension for page folder based on namespace
	 * @return string
	 */
	public function getPageClassPath() {
		return self::getPageClassDir() . self::getPageClassName() . ".php";
	}

	/**
	 * Gets controller class name based on URL
	 * @return string
	 */
	public function getPageClassName() {
		return ucfirst(Request::getPageName());
	}

	/**
	 * Gets controller namespace based on URL
	 * @return string
	 */
	public function getPageClassNamespace() {
		if(!$this->pageNamespace) $this->pageNamespace = ucfirst(Request::getPageName());
		return implode("\\", array_slice(Request::getAddress(), 0, -1));
	}

	/**
	 * Gets page controller full name: namespace + name
	 * @return string
	 */
	public function getPageClass() {
		if(!$this->pageClass) $this->pageClass = self::getPageClassNamespace() . "\\" . self::getPageClassName();
		return $this->pageClass;
	}

	/**
	 * Finds and renders page by filling $this->renderedPage by URL
	 */
	public function renderPageByURL() {

	}

}