<?php

/**
 * Class page
 * Used for creation main page
 */
class page extends basePage {

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