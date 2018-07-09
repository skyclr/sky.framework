<?php

# Namespace set
namespace sky\fs;
use sky\SystemErrorException;


/**
 * Class uploadedFile holds uploaded file data
 * @package sky\fs
 */
class UploadedFile extends File {

	public
		$temporaryName,
		$originalName;

	public function __construct($directory, $fileData) {


		# Original
		parent::__construct($directory . $fileData["name"]);


		# Set name
		$this->originalName = $this->name;


		# Set size
		$this->size = $fileData["size"];


		# Set size
		$this->temporaryName = $fileData["temporaryName"];

	}

	/**
	 * Creates new name with specified parameters
	 * @param string $type Type of name generation
	 * @param mixed $prefix Prefix parameter
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function makeUploadName($type, $prefix) {
		$file = parent::makeName($this->directory()->path, $type, $prefix);
		$this->setName($file->name);
		return $this;
	}

}