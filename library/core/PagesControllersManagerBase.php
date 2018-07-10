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

	public function getPageClassDirRelative() {
		if(!$this->pageRelativePath) $this->pageRelativePath = implode("/", array_slice(Request::getAddress(), 0, -1));
		return $this->pageRelativePath;
	}

	public function getPageClassDir() {
		return Sky::location("pages") . self::getPageClassDirRelative();
	}

	public function getPageClassPath() {
		return self::getPageClassDir() . self::getPageClassName() . ".php";
	}

	public function getPageClass() {
		if(!$this->pageClass) $this->pageClass = self::getPageClassNamespace() . "\\" . self::getPageClassName();
		return $this->pageClass;
	}

	public function getPageClassName() {
		return ucfirst(Request::getPageName());
	}

	public function getPageClassNamespace() {
		if(!$this->pageNamespace) $this->pageNamespace = ucfirst(Request::getPageName());
		return implode("\\", array_slice(Request::getAddress(), 0, -1));
	}

	/**
	 * Makes new page
	 */
	public function makePage() {

	}

}