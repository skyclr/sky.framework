<?php

# Sky namespace
namespace sky\fs;

# Uses
use sky\SystemErrorException;

/**
 * Class directory
 * @package sky
 */
class Directory {

	/**
	 * Directory path
	 * @var string
	 */
	public $path;

	/**
	 * static construct
	 * @param string $path Directory path
	 * @return $this
	 */
	public static function make($path) {
		return new self($path);
	}

	/**
	 * @param $path
	 */
	public function __construct($path) {
		$this->path = $path;
	}

	/**
	 * Creates new directory
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function create() {

		# Exists check
		$exists = file_exists($this->path);

		# If already exists but not dir
		if($exists && !is_dir($this->path))
			throw new SystemErrorException("File \"$this->path\" exists, but it's not a directory");

		# Try to create
		if(!$exists && !@mkdir($this->path, 0777, true))
			throw new SystemErrorException("Can't create directory \"$this->path\"");

		# Self return
		return $this;

	}

	/**
	 * Deletes directory recursively
	 * @throws SystemErrorException
	 * @return $this
	 */
	public function delete() {

		# Check if exists
		if(!file_exists($this->path))
			return $this;

		# Clear sub items
		$this->clear();

		# Delete dir
		if(!@rmdir($this->path))
			throw new SystemErrorException("Can't remove directory \"$this->path\"");

		# Delete success
		return $this;
	}

	/**
	 * Removes all directory content
	 * @throws SystemErrorException
	 * @return $this
	 */
	public function clear() {

		# Delete children
		foreach($this->read() as $path) {
			if(is_file($path))
				File::make($path)->delete();
			else
				self::make($path)->delete();
		}

		# Self return
		return $this;
	}

	/**
	 * returns list of directory entries
	 * @param string $pattern Regexp to find
	 * @param int $limit
	 * @return array
	 * @throws SystemErrorException
	 */
	public function read($pattern = "*", $limit = 0) {

		if(!is_dir($this->path))
			throw new SystemErrorException("Path is not a directory  $this->path");

		if(!is_readable($this->path))
			throw new SystemErrorException("Can't read directory $this->path");

		# Get list
		if(!is_array($list = glob($this->path . $pattern)))
			throw new SystemErrorException("Directory read failed $this->path");

		# Files holder
		$files = [];

		# Limit truncate
		if($limit && sizeof($list) > $limit)
			$list = array_slice($list, 0, 100);

		# Go through
		if($list)
			foreach($list as $path)
				$files[] = File::make($path);

		# Return files
		return $files;

	}

	/**
	 * Checks if directory contains file
	 * @param $filename
	 * @return bool
	 */
	public function hasFile($filename) {

		# Return
		return file_exists($this->path . $filename);

	}

	/**
	 * Checks if current directory exists
	 * @return bool True if file exists
	 */
	public function exists() {
		return file_exists($this->path);
	}

	/**
	 * @param $name
	 * @return File
	 */
	public function file($name) {
		return File::make($this->path . "/" . $name);
	}

}