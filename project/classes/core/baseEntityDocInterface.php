<?php

abstract class baseEntityDocInterface {

	public static $ENTITY_COMPILED_FIELDS = [];

	protected function filedHavePermission($field, $action) {
		if($action == "meta" && (empty($field['permission']) || in_array($action, $field['permission'])))
			return true;
		if($action == "data" && !empty($field['permission']) && in_array($action, $field['permission']))
			return true;
		if($action == "array" &&  (empty($field['permission']) || in_array($action, $field['permission'])))
			return true;
		if($action == "save" && (empty($field['permission']) || in_array($action, $field['permission'])))
			return true;
		return false;
	}

	protected function setMeta(\sky\ArrayFilter $meta) {

		# Get class name
		$className = get_called_class();

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->filedHavePermission($field, "meta")) {
				$this->{$field['name']} = $this->GET_ENTITY_FIELD_VALUE($field, $meta);
			}

		# Self return
		return $this;

	}

	protected function setData(\sky\ArrayFilter $meta) {

		# Get class name
		$className = get_called_class();

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->filedHavePermission($field, "data"))
				$this->{$field['name']} = $this->GET_ENTITY_FIELD_VALUE($field, $meta);

		# Self return
		return $this;

	}

	/**
	 * Get single field value;
	 * @param $field
	 * @param \sky\ArrayFilter $data
	 * @return mixed
	 * @throws \sky\systemErrorDataException
	 */
	protected function GET_ENTITY_FIELD_VALUE($field, \sky\ArrayFilter $data) {
		switch($field["type"]) {
			case 'timestamp':
			case 'datetime':
			case 'date':
				if($field["default"] == "null" || is_null($field["default"])) $default = null;
				elseif($field["default"] == "now") $default = \sky\DateTime::make();
				else $default = \sky\DateTime::make($field["default"]);
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_DATE)->convertedValueOr(\sky\VarFilter::CONVERT_DATE, $default);
			case 'varchar':
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_EMPTY_STRING)->valueOr($field["default"]);
			case 'int':
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_INTEGER)->convertedValueOr(\sky\VarFilter::CONVERT_INTEGER, $field["default"]);
			case 'positive':
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_POSITIVE)->convertedValueOr(\sky\VarFilter::CONVERT_FLOAT, $field["default"]);
			case 'float':
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_NUMERIC)->convertedValueOr(\sky\VarFilter::CONVERT_FLOAT, $field["default"]);
			case 'text':
				return $data->key($field['field'])->typeFilter(\sky\FilterRule::TYPE_EMPTY_STRING)->convertedValueOr(\sky\VarFilter::CONVERT_TRIM, $field["default"]);
			default:
				throw new \sky\systemErrorDataException("Unknown field type: {$field["type"]}");
		}
	}

	/**
	 * Get single field value;
	 * @param $field
	 * @return mixed
	 * @throws \sky\systemErrorDataException
	 */
	protected function GET_ENTITY_VALUE_FOR_ARRAY($field) {
		$name = $field['name'];
		switch($field["type"]) {
			case 'datetime':
			case 'timestamp':
				/** @var \sky\DateTime $date */
				$date = $this->{$name};
				return $date ? $date->format($date::DATE_TIME_FULL) : null;
			case 'date':
				/** @var \sky\DateTime $date */
				$date = $this->{$name};
				return $date ? $date->format($date::DATE_FULL) : null;
			default:
				return $this->{$name};
		}
	}

	/**
	 * Get single field value;
	 * @param $field
	 * @param bool $fields
	 * @return mixed
	 */
	protected function GET_ENTITY_VALUE_FOR_SAVE($field, &$fields = false) {

		$name = $field['name'];
		switch($field["type"]) {
			case 'datetime':
			case 'timestamp':
				/** @var \sky\DateTime $date */
				$date = $this->{$name};
				$result = $date ? $date->format($date::DATETIME_SQL) : null;
				break;
			case 'date':
				/** @var \sky\DateTime $date */
				$date = $this->{$name};
				$result = $date ? $date->format($date::DATE_SQL) : null;
				break;
			default:
				$result = $this->{$name};
		}

		if(is_array($fields)) {
			if($this->filedHavePermission($field, "save"))
				$fields[$field['name']] = $result;
		}

		return $result;
	}

	/**
	 * Saves current user data
	 * @param bool $replace Replace record by key flag
	 * @return $this
	 */
	public function save($replace = false) {

		# Get class name
		$className = get_called_class();

		$fields = [];

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			$this->GET_ENTITY_VALUE_FOR_SAVE($field, $fields);

		# Prepare query
		/** @noinspection PhpUndefinedFieldInspection */
		$query = \sky\sky::$db->make(static::$tableName)->set($fields);

		# Save main data if none
		/** @noinspection PhpUndefinedFieldInspection */
		if(!$this->id)
			/** @noinspection PhpUndefinedFieldInspection */
			$this->id = $query->insert($replace);
		else
			/** @noinspection PhpUndefinedFieldInspection */
			$query->where("id", $this->id)->update();

		# Return
		return $this;

	}

	protected function toArray() {

		# Get class name
		$className = get_called_class();

		$data = [];

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->filedHavePermission($field, "array"))
				$data[$field['name']] = $this->GET_ENTITY_VALUE_FOR_ARRAY($field);

		# Return
		return $data;

	}

	/**
	 * Compiles data about entity fields according to PHPDoc
	 */
	public static function ENTITY_COMPILE_FIELDS() {

		# Make reflection class
		$class = new ReflectionClass($className = get_called_class());

		# If compiled
		if(isset(static::$ENTITY_COMPILED_FIELDS[$className]))
			return;

		# Make compiled fields as empty array
		static::$ENTITY_COMPILED_FIELDS[$className] = [];

		# Get variables
		if(!$properties = $class->getProperties())
			return;

		# Go through
		/** @var ReflectionProperty $property */
		foreach($properties as $property) {

			$docComment = $property->getDocComment();
			$entity     = [];

			# Get entity type
			if($varType = strpos($docComment, "@entityType")) {
				$right = substr($docComment, $varType + strlen('@entityType'));
				preg_match('/^\s+(.*)\s+/', $right, $parts);
				$entity["type"] = trim($parts[1]);
			}

			# Get permission
			if($varPermission = strpos($docComment, "@permission")) {
				$right = substr($docComment, $varPermission + strlen('@permission'));
				preg_match('/^\s+(.*)\s+/', $right, $parts);
				$entity["permission"] = \sky\vars::trim(explode(",", trim($parts[1])));
			}

			# Get permission
			if($varSaveOption = strpos($docComment, "@saveOption")) {
				$right = substr($docComment, $varSaveOption + strlen('@saveOption'));
				preg_match('/^\s+(.*)\s+/', $right, $parts);
				$entity["saveOption"] = trim($parts[1]);
			}

			# Get entity default
			if($varDefault = strpos($docComment, "@entityDefault")) {
				$right = substr($docComment, $varDefault + strlen('@entityDefault'));
				preg_match('/^\s*(\'?([^\n]*)\'?)\s+/', $right, $parts);
				$entity["default"] = trim($parts[2]);
				if($entity["default"] == 'null') $entity["default"] = null;
			}

			# Save to compiled list
			if($varType) {

				# Get field name
				if(empty($entity["name"]))
					$entity["name"] = $property->getName();

				# Get field name
				if(empty($entity["field"]))
					$entity["field"] = $property->getName();

				# Add to list
				static::$ENTITY_COMPILED_FIELDS[$className][] = $entity;

			}

		}

	}

}