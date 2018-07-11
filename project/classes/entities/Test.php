<?php

class Test extends baseEntity {

	/** @var string */
	public static $tableName = 'test';

	/**
	 * Table field 'name'
	 * @var int
	 * @entityType int
	 * @entityDefault null
	 * @permission meta, array, save
	 */
	public $name;

	/**
	 * Table field 'added'
	 * @var \sky\Datetime
	 * @entityType timestamp
	 * @entityDefault now
	 * @permission meta, array, save
	 */
	public $added;

	/**
	 * Table field 'enumeration'
	 * @var string
	 * @entityType enum('a','b')
	 * @entityDefault null
	 * @permission data, array, save
	 */
	public $enumeration;


}
