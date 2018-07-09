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
			throw new SystemErrorException("Файл $this->path уже существует, и при этом не является директорией");


		# Try to create
		if(!$exists && !@mkdir($this->path, 0777, true))
			throw new SystemErrorException("Невозможно создать диретокрию \"$this->path\"");


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
			throw new SystemErrorException("Невозможно удалить директорию " . $this->path);


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
	 * @return array
	 * @throws SystemErrorException
	 */
	public function read($pattern = "*") {


		# Get list
		if(!is_array($list = glob($this->path . $pattern)))
			throw new SystemErrorException("Невозможно прочитать директорию " . $this->path);


		# Files holder
		$files = array();


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

}