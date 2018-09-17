<?php

abstract class BaseEntityDocInterface {

	/**
	 * Entity db id
	 * @var int
	 */
	public $id;

	public static $ENTITY_COMPILED_FIELDS = [];

	protected function fieldHavePermission($field, $action) {
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

	/**
	 * Sets script based fields
	 * @param \sky\ArrayFilter $meta
	 * @return $this
	 */
	protected function setMeta(\sky\ArrayFilter $meta) {

		# Get class name
		$className = get_called_class();

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->fieldHavePermission($field, "meta")) {
				$this->{$field['name']} = $this->GET_ENTITY_FIELD_VALUE($field, $meta);
			}

		# Self return
		return $this;

	}

	/**
	 * Sets fields from user data
	 * @param \sky\ArrayFilter $meta
	 * @return $this
	 */
	protected function setData(\sky\ArrayFilter $meta) {

		# Get class name
		$className = get_called_class();

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->fieldHavePermission($field, "data"))
				$this->{$field['name']} = $this->GET_ENTITY_FIELD_VALUE($field, $meta);

		# Self return
		return $this;

	}

	/**
	 * Get single field value;
	 * @param $field
	 * @param \sky\ArrayFilter $data
	 * @return mixed
	 * @throws \sky\SystemErrorDataException
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
			case 'enum':
				return $data->key($field['field'])->filter(\sky\FilterRule::RULE_ENUM, $field['possible'])->convertedValueOr(\sky\VarFilter::CONVERT_TRIM, $field["default"]);
			default:
				throw new \sky\SystemErrorDataException("Unknown field type: {$field["type"]}");
		}
	}

	/**
	 * Get single field value;
	 * @param $field
	 * @return mixed
	 * @throws \sky\SystemErrorDataException
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
			if($this->fieldHavePermission($field, "save"))
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
		$query = \sky\Sky::$db->make(static::$tableName)->set($fields);

		# Save main data if none
		if(!$this->id)
			$this->id = $query->insert($replace);
		else
			$query->where("id", $this->id)->update();

		# Return
		return $this;

	}

	/**
	 * Makes array representation
	 * @return array
	 */
	protected function toArray() {

		# Get class name
		$className = get_called_class();

		$data = [];

		# Go through
		foreach(static::$ENTITY_COMPILED_FIELDS[$className] as $field)
			if($this->fieldHavePermission($field, "array"))
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

			# Get PHPDoc comment
			$docComment = $property->getDocComment();

			# If type
			if($type = self::getDocOptions($docComment, "@entityType", ['(\w*)(\(.*\))?'])) {

				# Make entity
				$entity = [
					"type"  => $type[1],
					"name"  => $property->getName(),
					"field" => $property->getName()
				];

				# Possibles
				if($entity["type"] == "enum")
					$entity["possible"] = explode(",", str_replace("'", "", substr($type[2], 1,-1)));

				# Save permissions
				if($permission = self::getDocOptions($docComment, "@permission", ['.*']))
					$entity["permission"] = \sky\Vars::trim(explode(",", trim($permission[0])));

				# Save default
				if($default = self::getDocOptions($docComment, "@entityDefault", ['\'?([^\n]*)\'?']))
					$entity["default"] = $default[0] == 'null' ? null : trim($default[0]);

				# Add to list
				static::$ENTITY_COMPILED_FIELDS[$className][] = $entity;

			}

		}

	}

	/**
	 * Parse options from comment string
	 * @param $docComment
	 * @param $name
	 * @param array $optionsPreg
	 * @return bool
	 */
	private static function getDocOptions($docComment, $name, $optionsPreg = []) {

		# Get entity default
		if(!$start = strpos($docComment, $name))
			return false;

		# Get right part
		$right = substr($docComment, $start + strlen($name));

		# Compile RegExp
		$preg = implode(')\s*,\s*(', $optionsPreg);

		# Search
		preg_match('/^\s(' . $preg . ')\s+/', $right, $parts);

		# Remove global found
		array_shift($parts);

		# Return
		return $parts;

	}

}