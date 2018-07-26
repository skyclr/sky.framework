<?php

/**
 * Class page
 * Used for creation main page
 */
class index extends BasePage {

	/**
	 *  Page title
	 * @var string html
	 */
	public $title = "Main page";

	/**
	 * Page creation method
	 */
	function main() {
		\sky\Info::success("Sky framework works, good job!");
		$this->renderContent();
	}
}