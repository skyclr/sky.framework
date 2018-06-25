<?php

use sky\ArrayFilter;
use sky\userErrorException;

abstract class baseEntity extends baseEntityDocInterface {

	/**
	 * Entity db id
	 * @var int
	 */
	public $id;

	/** @var ArrayFilter */
	protected $originalMeta;

	/** @var string */
	public static $tableName = 'EntityTableNotSet';

	/**
	 * Set meta fields according to user data
	 * @param ArrayFilter $meta Validator based on user data
	 * @return $this
	 */
	protected function setMeta(ArrayFilter $meta) {

		# Set id
		$this->id = $meta->key("id")->typeFilter(\sky\FilterRule::TYPE_POSITIVE)->convertedValueOr(\sky\VarFilter::CONVERT_INTEGER,null);

		# Call compiled set meta
		if($this instanceof baseEntityDocInterface)
			parent::setMeta($meta);

		return $this;
	}

	/**
	 * Set data fields according to user data
	 * @param ArrayFilter $data Validator based on user data
	 * @param bool      $dataFromMeta
	 * @return $this
	 */
	public function setData(ArrayFilter $data, $dataFromMeta = false) {

		# Call compiled set meta
		if($this instanceof baseEntityDocInterface)
			parent::setData($data);

		return $this;
	}

	/**
	 * Returns original meta without changes
	 * @return ArrayFilter
	 */
	public function getOriginalMeta() {
		return $this->originalMeta;
	}

	/**
	 * Calls setData with specified array
	 * @param $array
	 * @return static
	 */
	public function fromArray($array) {
		$filter = ArrayFilter::make($array);
		$this->checkUserData($filter);
		$this->setData($filter, false);
		return $this;
	}

	/**
	 * Fires on fromArray fires
	 * @param ArrayFilter $filter
	 */
	public function checkUserData(ArrayFilter $filter) {}

	/**
	 * Creates new entity according to data
	 * @param array|bool $meta
	 * @param array|bool $data
	 */
	public function __construct($meta, $data = false) {

		# Initialize baseEntityDocInterface
		if($this instanceof baseEntityDocInterface)
			static::ENTITY_COMPILE_FIELDS();

		# Correct
		if(!$meta)
			$meta = array();

		# Set meta fields according to system data
		$this->setMeta($this->originalMeta = ArrayFilter::make($meta));

		# If data store in meta data array
		if(!$data) {
			$data = $meta;
			$dataFromMeta = true;
		} else
			$dataFromMeta = false;

		# Set data fields according to user data
		$this->setData(ArrayFilter::make($data), $dataFromMeta);

	}

	/**
	 * Creates new user according to DB record with specified id
	 * @param int $id User id
	 * @return $this
	 * @throws userErrorException
	 */
	public static function load($id) {

		# Get user id
		\sky\VarFilter::check($id)->typeFilter(\sky\FilterRule::TYPE_POSITIVE)
			->userExceptionOnError("Неверно указан ID($id)");

		# Get data
		if(!$data = \sky\sky::$db->make(static::$tableName)->where($id)->get(\sky\db\ret::SINGLE))
			throw new userErrorException("Записи с ID $id (" . static::$tableName .") не сущестует");

		# Return data
		return new static($data);

	}


	/**
	 * Deletes from DB record with specified id
	 * @return static
	 * @throws userErrorException
	 */
	public function delete() {

		# Delete record
		if(!$data = \sky\sky::$db->make(static::$tableName)->where($this->id)->delete())
			throw new userErrorException("Записи с ID $this->id не сущестует");

		# Remove id
		$this->id = null;

		# Return data
		return $this;

	}

	/**
	 * Creates new exemplar
	 * @param array|bool $meta Object data
	 * @param array|bool $data Object data
	 * @return $this
	 */
	public static function make($meta, $data = false) {
		return new static($meta, $data);
	}

	/**
	 * Self cloning
	 * @return baseEntity
	 */
	public function copy() {
		return clone $this;
	}

	/**
	 * Extends original meta with specified array and call fromArray with combined data
	 * @param array $extension
	 * @return static
	 */
	public function extendOriginalMeta($extension) {
		$data = array_merge($this->originalMeta->getOriginalData(), $extension);
		return $this->fromArray($data);
	}

	/**
	 * Converts current entity to array of simple types
	 * @throws \sky\systemErrorException
	 */
	public function toArray() {

		# Initialize baseEntityDocInterface
		if($this instanceof baseEntityDocInterface)
			return ["id" => $this->id] + parent::toArray();

		throw new \sky\systemErrorException("Array presentation of '" . __CLASS__ .  "' not implemented yet");
	}

}