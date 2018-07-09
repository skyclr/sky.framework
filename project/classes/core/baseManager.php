<?php

use sky\db\DatabaseQuery;
use sky\FilterRule;
use sky\VarFilter;

abstract class baseManager extends \ArrayIterator {

	/**
	 * Array element class, extended from baseEntity
	 * @var string
	 */
	protected $elementClass = "NotDefined";

	/**
	 * Counter
	 * @var false|int
	 */
	protected $totalCount = false;

	/**
	 * Limit
	 * @var false|int
	 */
	public $limit = false;

	/**
	 * Offset
	 * @var false|int
	 */
	public $offset = false;

	/**
	 * Inner query to get data
	 * @var DatabaseQuery
	 */
	protected $query;

	/**
	 * Returns query
	 * @return DatabaseQuery
	 */
	public function getQuery() {

		if(!$this->query)
			$this->prepareQuery();

		return $this->beforeLoad();
	}

	/**
	 * Return array of ids
	 * @return array
	 */
	public function getIds() {

		# Return
		return $this->getFieldValues("id", true);

	}

	/**
	 * Return array of values
	 * @param string $name Filed name
	 * @param bool   $good
	 * @return array
	 */
	public function getFieldValues($name, $good = false) {

		# Init
		$values = array();

		# Go
		foreach($this as $item)
			/** @var BaseEntity $item */
			if(!$good || $item->{$name})
				$values[] = $item->{$name};

		# Return
		return $values;

	}

	/**
	 * Return item if found
	 * @param int $id Ticket id
	 * @return mixed
	 */
	public function getById($id) {

		# Go
		foreach($this as $item)
			/** @var BaseEntity $item */
			if($item->id == $id)
				return $item;

		# Return
		return null;

	}

	/**
	 * Returns new manager with items, which filed matches
	 * @param string $name Field name
	 * @param mixed $value Value
	 * @return $this
	 */
	public function getByField($name, $value) {

		# Create empty
		$manager = static::make();

		# Go
		foreach($this as $item)
			/** @var BaseEntity $item */
			if($item->{$name} == $value)
				$manager[] = $item;

		# Return
		return $manager;

	}

	/**
	 * Returns number of elements with matched field
	 * @param string $name Field name
	 * @param mixed $value Value
	 * @return int
	 */
	public function countByField($name, $value) {

		# Create empty
		$count = 0;

		# Go
		foreach($this as $item)
			/** @var BaseEntity $item */
			if($item->{$name} == $value)
				$count++;

		# Return
		return $count;

	}

	/**
	 * Returns number of elements with matched field
	 * @param string $name Field name
	 * @param mixed $value Value
	 * @return static
	 */
	public function excludeByField($name, $value) {

		# Return
		return $this->excludeItems($this->getByField($name, $value));

	}

	/**
	 * Returns new manager with items, which items not in list
	 * @param array|baseManager $items Items list
	 * @return static
	 */
	public function excludeItems($items) {

		# Create empty
		$manager = static::make();

		# Convert to array
		if($items instanceof baseManager)
			$items = iterator_to_array($items);

		# Go
		foreach($this as $item) {
			/** @var BaseEntity $item */
			if(!in_array($item, $items))
				$manager[] = $item;
		}

		# Return
		return $manager;

	}


	/**
	 * Returns new manager with items, which excluded items
	 * @param mixed $item Item
	 * @return static
	 */
	public function excludeItem($item) {

		# Return
		return $this->excludeItems([$item]);

	}

	/**
	 * Loads from query
	 * @param DatabaseQuery|null $query
	 * @return $this
	 * Loads from query
	 */
	public function load(DatabaseQuery $query = null) {

		# Preparations
		$query = $this->beforeLoad($query);

		# Get rows
		if($rows = $query->select())
			foreach($rows as $row)
				$this->addItemFromDataArray($row);

		# Self return
		return $this;

	}

	/**
	 * Loads from query
	 * @param DatabaseQuery|null $query
	 * @return mixed
	 * Loads from query
	 */
	public function loadFirst(DatabaseQuery $query = null) {

		# Preparations
		$query = $this->beforeLoad($query);

		# Get rows
		if(!$row = $query->limit(1)->select(\sky\db\Ret::SINGLE))
			return false;

		# Return
		$this->addItemFromDataArray($row);

		# Self return
		return $this[0];

	}

	/**
	 * Prepares query for loading from DB
	 * @param DatabaseQuery|null $query
	 * @return null|DatabaseQuery
	 */
	protected function beforeLoad(DatabaseQuery $query = null) {

		# If not set, get inner
		if($query)
			$this->query = $query;
		elseif(!$this->query)
			$this->prepareQuery();

		# Save original
		$original = $this->query->same();

		# Post processing
		$this->queryPostProcessing();

		# Reset original
		$new = $this->query;
		$this->query = $original;

		# Return parsed request
		return $new;

	}

	/**
	 * Adds joins and other things according to final query
	 */
	protected function queryPostProcessing() {}

	/**
	 * Adds new item from data array
	 * @param $rowData
	 * @return baseEntity
	 */
	public function addItemFromDataArray($rowData) {
		$this[] = $item = call_user_func([$this->elementClass, "make"], $rowData);
		return $item;
	}

	/**
	 * Add multiple items
	 * @param $rowsArray
	 * @return $this
	 */
	public function addMultipleItemsFromArray($rowsArray) {

		# Add items
		foreach($rowsArray as $rowData)
			$this->addItemFromDataArray($rowData);

		# Self return
		return $this;

	}

	/**
	 * Add multiple items
	 * @param $items
	 * @return $this
	 */
	public function addMultipleItems($items) {

		# Add items
		foreach($items as $item)
			$this[] = $item;

		# Self return
		return $this;

	}

	/**
	 * Add multiple items
	 * @param baseManager $manager Manager
	 * @return $this
	 */
	public function addItemsFromManager($manager) {

		# Add items
		foreach($manager as $item)
			$this[] = $item;

		# Self return
		return $this;

	}

	/**
	 * Static creation
	 * @return static
	 * @throws \sky\systemErrorException
	 */
	static function make() {

		# Make manager
		$manager = new static();

		# Check existence
		if(!class_exists($manager->elementClass))
			throw new \sky\systemErrorException("Manager \"" . get_called_class()  . "\" uses \"$manager->elementClass\" class which not exists");

		# Prepare query
		$manager->prepareQuery();

		# Return
		return $manager;

	}

	/**
	 * Crates new manager from entities array
	 * @param array $items
	 * @return $this
	 */
	static function makeFromArray($items) {
		return self::make()->addMultipleItems($items);
	}

	/**
	 * Crates new manager from entities array
	 * @param array $dataRows
	 * @return $this
	 */
	static function makeFromDataArray($dataRows) {
		return self::make()->addMultipleItemsFromArray($dataRows);
	}

	/**
	 * Adds condition to query, can't be called directly
	 * @param string $name Condition name
	 * @param VarFilter $value Condition value
	 */
	abstract protected function userFilterInner($name, VarFilter $value);

	/**
	 * Adds condition to query, that can be defined by user data
	 * @param string $name  Condition name
	 * @param mixed  $value Condition value
	 * @return $this
	 */
	public function userFilter($name, $value) {

		# Prepare query if none
		if(!$this->query)
			$this->prepareQuery();

		# Add condition
		$this->userFilterInner($name, VarFilter::check($value));

		# Self return
		return $this;
	}

	/**
	 * Adds multiple conditions to query, that can be defined by user data
	 * @param array $dataArray Conditions
	 * @return $this
	 */
	public function userFiltersArray($dataArray) {

		# Add condition
		foreach($dataArray as $name => $value)
			$this->userFilter($name, $value);

		# Self return
		return $this;

	}

	/**
	 * Adds condition to query, can't be called directly
	 * @param string $name Condition name
	 * @param VarFilter $value Condition value
	 */
	abstract protected function notUserFilterInner($name, VarFilter $value);

	/**
	 * Adds condition to query, that can be defined programmatic only
	 * @param string $name  Condition name
	 * @param mixed  $value Condition value
	 * @return $this
	 */
	public function notUserFilter($name, $value) {

		# Prepare query if none
		if(!$this->query)
			$this->prepareQuery();

		# Set limit
		if($name == "limit" && $limit = VarFilter::check($value)->typeFilter(FilterRule::TYPE_NATURAL)->valueOr(0)) {
			$this->limit = $limit;
			$this->query->limit($limit);
			return $this;
		}

		# Set offset
		if($name == "offset" && $offset = VarFilter::check($value)->typeFilter(FilterRule::TYPE_NATURAL)->valueOr(0)) {
			$this->offset = $offset;
			$this->query->offset($offset);
			return $this;
		}

		# Add condition
		$this->notUserFilterInner($name, VarFilter::check($value));

		# Self return
		return $this;

	}

	/**
	 * Adds multiple conditions to query, that can be defined programmatic only
	 * @param array $dataArray Conditions
	 * @return $this
	 */
	public function notUserFiltersArray($dataArray) {

		# Add condition
		foreach($dataArray as $name => $value)
			$this->notUserFilter($name, $value);

		# Self return
		return $this;

	}

	/**
	 * Adds condition when no matter who define it
	 * @param $name
	 * @param $value
	 * @return $this
	 */
	public function filter($name, $value) {
		$this->userFilter($name, $value);
		$this->notUserFilter($name, $value);
		return $this;
	}

	/**
	 * Adds conditions array when no matter who define it
	 * @param array $dataArray Conditions
	 * @return $this
	 */
	public function filtersArray($dataArray) {

		# Add condition
		foreach($dataArray as $name => $value)
			$this->filter($name, $value);

		return $this;
	}

	/**
	 * Creates new query
	 * @return DatabaseQuery
	 */
	protected function prepareQuery() {
		$reflectionClass = new ReflectionClass($this->elementClass);
		$table = $reflectionClass->getStaticPropertyValue("tableName");
		return $this->query = \sky\Sky::$db->make($table);
	}

	/**
	 * Gets manager total count in DB
	 * @param DatabaseQuery|null $query
	 * @return false|int|Mixed
	 */
	public function totalCount(DatabaseQuery $query = null) {

		# If not gathered
		if($this->totalCount == false) {

			if($this->limit && !$this->offset && $this->count() < $this->limit)
				$this->totalCount = $this->count();

			else {

				# Prepares query
				$query = $this->beforeLoad($query);

				# Get counter
				$this->totalCount = $query->same(array("records", "limit", "offset", "group", "order"))->records("COUNT(*)")->select(\sky\db\Ret::VALUE);

			}

		}

		# Return
		return $this->totalCount;

	}

	/**
	 * Makes array representation
	 * @return array
	 */
	function toArray() {

		$result = array();

		/** @var baseEntity $item */
		foreach($this as $item)
			/** @noinspection PhpUndefinedMethodInspection */
			$result[] = $item->toArray();

		return $result;

	}

	/**
	 * Delete all items in set
	 * @return $this
	 * @throws \sky\userErrorException
	 */
	public function delete() {

		/** @var baseEntity $element */
		foreach($this as $element)
			$element->delete();

		return $this;

	}

}