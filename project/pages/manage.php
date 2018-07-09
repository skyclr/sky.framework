<?php

require_once \sky\Sky::location("helpers") . "entityBuilder/entityBuilder.php";

/**
 * Class page
 * Used for creation main page
 */
class page extends basePage {

	/**
	 *  Page title
	 * @var string html
	 */
	public $title = "Manage tools";

	/**
	 * Page creation method
	 */
	function main() {

		if(empty(\sky\Sky::$config["development"]["managePassword"]))
			throw new \sky\UserErrorException("No manage password provided, please set it in main.php preferences in [\"development\"][\"managePassword\"]");

		if(empty(\sky\Sky::$config["database"]["use"]))
			throw new \sky\UserErrorException("Database not enabled, please set it in main.php preferences");

		if(!empty($_POST["getEntity"]))
			$this->getEntity();
		if(!empty($_POST["getEntityCode"]))
			$this->getEntity(true);
		if(!empty($_POST["getManager"]))
			$this->getManager();
		if(!empty($_POST["getManagerCode"]))
			$this->getManager(true);

		# Get tables
		$tables = \sky\Sky::$db->query("SHOW TABLES", \sky\db\Ret::ALL_NUM);
		$tables = \sky\Vars::getByKey($tables, 0);

		$this->renderContent(["tables" => $tables]);
	}

	function getOptions() {
		return [
			"table" => \sky\UserData::$post->key("table")->typeFilter(\sky\FilterRule::TYPE_EMPTY_STRING)->userExceptionOnError("No table provided")->valueOr('notSet'),
			"entityName" => \sky\UserData::$post->key("entityName")->typeFilter(\sky\FilterRule::TYPE_EMPTY_STRING)->valueOr(false),
			"managerName" => \sky\UserData::$post->key("managerName")->typeFilter(\sky\FilterRule::TYPE_EMPTY_STRING)->valueOr(false),
		];
	}

	function getEntity($outputCode = false) {

		$options = $this->getOptions();
		$builder = entityBuilder::get();
		list($code, $className) = $builder->getEntity($options["table"], $options);
		if($outputCode) die('<pre>'.htmlspecialchars($code).'</pre>');

		\sky\Network::saveStringAsFile($code, $className.".php");

	}

	function getManager($outputCode = false) {

		$options = $this->getOptions();
		$builder = entityBuilder::get();
		list($code, $className) = $builder->getManager($options["table"], $options);
		if($outputCode) die('<pre>'.htmlspecialchars($code).'</pre>');

		\sky\Network::saveStringAsFile($code, $className.".php");

	}

}