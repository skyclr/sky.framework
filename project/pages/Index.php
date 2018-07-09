<?php

/**
 * Class page
 * Used for creation main page
 */
class Index extends BasePage {

	/**
	 *  Page title
	 * @var string html
	 */
	public $title = "Main page";

	/**
	 * Page creation method
	 */
	function main() {
		$this->renderContent();
	}
}