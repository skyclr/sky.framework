<?php

# Sky namespace
namespace sky\fs;

# Use image
use sky\images\Image;
use sky\SystemErrorException;
use sky\SystemNoticeException;
use sky\UserException;

/**
 * Class to work with single file
 * @package sky
 */
class File {

	# Name generation types
	const NAME_RANDOM = "random";
	const NAME_NUMBERED = "numbered";
	const NAME_NO_CHANGE = false;

	/**
	 * File groups extensions association
	 * @var array
	 */
	protected $filesExtensions = array(
		"image"   => "jpeg, jpg, png, gif, tiff, cr2, crw, raw, nef, nrw",
		"audio"   => "mp3, mid, acc, midi",
		"video"   => "avi, mpeg, mp4, mpg, flv, 3gp, mov, mkv, mts, m4v",
		"archive" => "zip, 7zip, 7z, tar, gz, rar",
		"text"    => "xls, xlsx, txt"
	);

	/**
	 * File path
	 * @var
	 */
	public $path;
	public $name, $extension, $fullName;

	/**
	 * Type of file
	 * @var string
	 */
	public $type = "unknown";

	/**
	 * Directory that holds file
	 * @var string
	 */
	private $dirPath = "";

	/**
	 * Directory that holds file
	 * @var Directory
	 */
	private $directory;

	/**
	 * Holds file size
	 * @var
	 */
	protected $size;

	/**
	 * @param string $path
	 */
	public function __construct($path) {

		# Save extension
		$this->extension = self::extension($path);
		$name = self::name($path);

		# Get directory path
		$this->dirPath = mb_substr($path, 0, -mb_strlen("$name.$this->extension"));

		# Sets file name
		$this->setName($name);
		$this->directory();

		# Get file type
		foreach($this->filesExtensions as $type => $extensions) {
			if(in_array($this->extension, explode(", ", $extensions)))
				$this->type = $type;
		}

	}

	/**
	 * static construct
	 * @param string $path File path
	 * @return File
	 */
	public static function make($path) {
		return new self($path);
	}

	/**
	 * Checks if current file exists
	 * @return bool True if file exists
	 */
	public function exists() {
		return file_exists($this->path);
	}

	/**
	 * Checks if current file exists and readable
	 * @return bool True if file exists and readable
	 */
	public function readable() {
		return $this->exists() && is_readable($this->path);
	}

	/**
	 * Makes directory of current file
	 * @return Directory
	 */
	public function directory() {

		# Make
		if(!$this->directory)
			$this->directory = new Directory($this->dirPath);

		# Return dir
		return $this->directory;

	}

	/**
	 * Changes stored file name, but not renames real file
	 * @param $name
	 * @return $this
	 */
	public function setName($name) {
		$this->name = $name;
		$this->fullName = "$this->name.$this->extension";
		$this->path = $this->dirPath . $this->fullName;
		return $this;
	}

	/**
	 *  Changes stored file extension, but not renames real file
	 * @param $extension
	 * @return $this
	 */
	public function setExtension($extension) {
		$this->extension = $extension;
		$this->fullName = "$this->name.$this->extension";
		$this->path = $this->dirPath . $this->fullName;
		return $this;
	}

	/**
	 * Deletes file
	 * @return boolean True on delete, false if not exists
	 * @throws SystemErrorException
	 */
	public function delete() {

		# If already deleted
		if(!file_exists($this->path))
			return false;

		# Try to delete
		if(!@unlink($this->path))
			throw new SystemErrorException("Невозможно удалить файл " . $this->path);

		# Return
		return true;

	}

	/**
	 * Copies file
	 * @param String $destination        Destination file path
	 * @param Bool   $overwrite          If false throws exception on file exists
	 * @throws SystemNoticeException
	 * @throws SystemErrorException
	 */
	public function copy($destination, $overwrite = true) {

		# If exists
		if(!$overwrite && file_exists($destination))
			throw new SystemNoticeException("File already exists");

		# Copy
		$result = \copy($this->path, $destination);

		# Exception if error occupies
		if($result === false)
			throw new SystemErrorException("Can't copy file");

	}

	/**
	 * Moves file
	 * @param string $destination New path
	 * @param bool   $overwrite   Indicates to overwrite if $destination is exists
	 * @throws SystemNoticeException
	 * @throws SystemErrorException
	 */
	public function move($destination, $overwrite = true) {

		# If exists
		if(!$overwrite && file_exists($destination))
			throw new SystemNoticeException("File already exists");

		# Copy
		$result = \rename($this->path, $destination);

		# Exception if error occupies
		if($result === false)
			throw new SystemErrorException("Can't move file");

	}

	/**
	 * Locks current file with
	 * @param bool|int $lock Lock, default: LOCK_EX | LOCK_NB
	 * @return bool
	 */
	function lock($lock = false) {

		# Open lock file
		if(!$fp = fopen($this->path, "a"))
			return false;

		# If cant lock process file
		if(!flock($fp, $lock ? $lock : LOCK_EX | LOCK_NB))
			return false;

		# Success return
		return true;

	}

	/**
	 * Saves file data with locking
	 * @param string $string    String to write
	 * @param bool   $rewrite   Indicates if file should be rewrite
	 * @param bool   $limitSize Max file size
	 * @return $this
	 * @throws SystemErrorException
	 */
	function write($string, $rewrite = false, $limitSize = false) {

		# File size is too big, could not process
		if(!$rewrite && is_numeric($limitSize) && $limitSize > 0) {
			if(file_exists($this->path) && filesize($this->path) > ($limitSize * 1024 * 1024))
				throw new SystemErrorException("File is too big: $this->path for add/write");
		}

		# Opening file
		if(!$fp = fopen($this->path, ($rewrite ? "w" : "a")))
			throw new SystemErrorException("Couldn't open the file: $this->path for add/write");

		# Locking file
		if(!flock($fp, LOCK_EX))
			throw new SystemErrorException("Couldn't lock the file: $this->path");

		# Writing file
		if(fwrite($fp, $string) === FALSE)
			throw new SystemErrorException("Couldn't write to the file: $this->path");

		# Unlocking file
		flock($fp, LOCK_UN);

		# Closing file
		fclose($fp);

		# Return
		return $this;

	}

	/**
	 * Gets file extension
	 * @param String $path File name or path
	 * @return String File extension
	 */
	public static function extension($path) {
		return strtolower(pathinfo($path, PATHINFO_EXTENSION));
	}

	/**
	 * Gets file name
	 * @param String $path File name or path
	 * @return String file name
	 */
	public static function name($path) {

		# Get extension
		$extension = self::extension($path);

		# Parse
		preg_match('/(\/*([^\/]+))+/', $path, $matches);

		# Get last element
		$path = $matches[count($matches) - 1];

		# Get name without extensions
		return $extension ? mb_substr($path , 0, -1 * mb_strlen(".$extension")) : $path;

	}

	/**
	 * Creates image object from current file
	 */
	public function toImage() {
		return Image::makeFromFile($this);
	}

	/**
	 * Creates new name with specified parameters
	 * @param string $type Type of name generation
	 * @param mixed $prefix Prefix parameter
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function makeNameOnly($type = "random", $prefix = 0) {
		return $this->makeName($this->directory()->path, $type, $prefix);
	}

	/**
	 * Creates new name with specified parameters
	 * @param string $directory Directory for new file
	 * @param string $type Type of name generation
	 * @param mixed $prefix Prefix parameter
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function makeName($directory, $type = File::NAME_RANDOM, $prefix = 0) {

		# New file
		$file = File::make($directory . $this->fullName);

		do {

			# Simple numbers
			if($type === 'numbered') {
				$file->setName($prefix);
				$prefix++;

				# Random string
			} elseif($type === 'random') {

				# Make name
				$file->setName(substr(md5(rand() . time() . $this->name), 0, 10));

				# Prefix add if needed
				if($prefix !== false)
					$file->setName($prefix . $file->name);

				# If specified string
			} else {

				if(is_string($type))
					$file->setName($type);
				else
					$file->setName($this->name);

				# Prefix add if needed
				if($prefix > 0) {
					$file->setName($file->name . $prefix);
					$prefix++;
				}

				# Check
				if(!$prefix && $file->exists())
					throw new SystemErrorException("File $this->path already exists");
			}
		} while($file->exists());

		# Return new
		return $file;

	}

	/**
	 * Checks if file has proper extension
	 * @param string $fileType    Expected file type
	 * @return bool
	 */
	public function checkType($fileType) {

		# If array of possible types
		if(is_array($fileType)) {

			# Ok flag
			$ok = false;

			# Check each type
			foreach($fileType as $type)
				if($this->checkType($type))
					$ok = true;

			# Return
			return $ok;

		}

		# If this type like 'archive'
		if(in_array($fileType, array_keys($this->filesExtensions))) {

			# Get extensions list
			$extensions = explode(", ", $this->filesExtensions[$fileType]);

			# If not valid
			if(!in_array($this->extension, $extensions))
				return false;

			# If this type like 'png'
		} elseif($this->extension != $fileType)
			return false;

		# Get file
		return true;
	}

	/**
	 * Gets file size
	 * @return int
	 */
	public function size() {

		# If already gained
		if($this->size)
			return $this->size;

		# Return
		return $this->size = filesize($this->path);

	}

	/**
	 * Changes file mode
	 * @see chmod
	 * @param $mode
	 * @return bool
	 */
	public function chmod($mode) {
		return chmod($this->path, $mode);
	}

	/**
	 * Write file to output without buffering (for big files)
	 * @throws \sky\SystemErrorException
	 */
	public function getUnBuffered() {

		# Check if file exists
		if(!file_exists($this->path))
			throw new SystemErrorException("File does not exists: " . $this->path);

		# Read file and write it
		if(!$file = fopen($this->path, "r"))
			throw new SystemErrorException("File is not readable: " . $this->path);

		# While we read
		while(!feof($file)) {

			# Read
			echo fread($file, 1024 * 8);

			# Flush
			flush();

			# If connection lost
			if(connection_status() != 0) {
				fclose($file);
				exit;
			}
		}

		# Close
		fclose($file);

	}

	/**
	 * Makes clone of current class
	 * @return static
	 */
	public function same() {
		return clone $this;
	}

	public function getContent() {

		# Check
		if(!$this->exists())
			throw new SystemErrorException("File $this->path isn't exists");

		# Check
		if(!$this->readable())
			throw new SystemErrorException("File $this->path isn't readable");

		# Return content
		return file_get_contents($this->path);

	}

}