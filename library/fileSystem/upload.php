<?php

namespace sky\fs;

# Uses
use sky\baseException;
use sky\info;
use sky\systemFatalException;

/**
 * Class upload
 * @package sky\fs
 */
class upload {

	# Set as single
	const SINGLE = "single";

	/**
	 * Returns array contains uploaded files without moving
	 * @param string $inputName
	 * @return array|bool
	 */
	public static function getTempFiles($inputName = "userfile") {


		# Checks of any files loaded
		if(!isset($_FILES[$inputName]))
			return false;

		# If not array
		if(!is_array($_FILES[$inputName]['tmp_name'])) {

			# Upload file
			if(!self::checkFile(array(
				"name"          => $_FILES[$inputName]['name'],
				"error"         => $_FILES[$inputName]['error'],
				"temporaryName" => $_FILES[$inputName]['tmp_name'],
				"size"          => $_FILES[$inputName]['size']
			))
			)
				return array();

			# Return file
			return array(file::make(sys_get_temp_dir() . $_FILES[$inputName]['tmp_name']));

		} else {

			# Files
			$filesData = array();

			# Go through files
			foreach($_FILES[$inputName]['tmp_name'] as $number => $temporaryFile) {

				# Upload file
				if(!self::checkFile(array(
					"name"          => $_FILES[$inputName]['name'][$number],
					"error"         => $_FILES[$inputName]['error'][$number],
					"size"          => $_FILES[$inputName]['size'][$number],
					"temporaryName" => $temporaryFile
				))
				)
					continue;

				# Save file info
				$filesData[] = file::make(sys_get_temp_dir() . $temporaryFile);

			}

			# Return
			return $filesData;

		}

	}

	/**
	 * Uploads files to server
	 * @param string $directory
	 * @param string $nameType      Shows how to generate name
	 * @param int|string $prefix    Special prefix for name generation
	 * @param int $maxFiles         How much files should we download
	 * @param string $inputName     Name of input tag
	 * @param bool|string $fileType Type of files
	 * @throws systemFatalException
	 * @return uploadedFile[]|uploadedFile
	 */
	public static function uploadFiles($directory, $nameType = "random", $prefix = 0, $maxFiles = -1, $inputName = "userfile", $fileType = false) {

		# Local initialisations
		$fileNum   = 0;
		$filesData = array();

		# Checks of any files loaded
		if(!isset($_FILES[$inputName]))
			return [];

		# If not array
		if(!is_array($_FILES[$inputName]['tmp_name'])) {

			# Upload file
			if($fileData = self::uploadFile(array(
				"name"          => $_FILES[$inputName]['name'],
				"error"         => $_FILES[$inputName]['error'],
				"temporaryName" => $_FILES[$inputName]['tmp_name'],
				"size"          => $_FILES[$inputName]['size'],
				"number"        => $fileNum + 1
			), $directory, $nameType, $prefix, $maxFiles, $fileType)
			)
				$filesData[] = $fileData;

		} else {

			# Go through files
			foreach($_FILES[$inputName]['tmp_name'] as $number => $temporaryFile) {

				# Upload file
				if(!$fileData = self::uploadFile(array(
					"name"          => $_FILES[$inputName]['name'][$number],
					"error"         => $_FILES[$inputName]['error'][$number],
					"size"          => $_FILES[$inputName]['size'][$number],
					"temporaryName" => $temporaryFile,
					"number"        => $fileNum + 1
				), $directory, $nameType, $prefix, $maxFiles, $fileType)
				)
					continue;

				# Save file info
				$filesData[] = $fileData;

				# Update uploaded number
				$fileNum++;

			}
		}

		# If single
		if($maxFiles == self::SINGLE)
			return $filesData ? $filesData[0] : null;

		# Return moved files data
		return $filesData;
	}

	/**
	 * Checks file for base upload errors
	 * @param array $file File info
	 * @return bool
	 * @throws systemFatalException
	 */
	private static function checkFile($file) {

		# Upload errors proceed
		if($file['error'] != UPLOAD_ERR_OK) {

			switch($file['error']) {
				case UPLOAD_ERR_NO_FILE:
					if(empty($file['name']))
						break;
					info::error("Файл <b>\"{$file['name']}\"</b> не был загружен");
					break;
				case UPLOAD_ERR_PARTIAL:
					info::error("Файла <b>\"{$file['name']}\"</b> был загружен лишь частично");
					break;
				case UPLOAD_ERR_FORM_SIZE:
				case UPLOAD_ERR_INI_SIZE:
					info::error("Файл <b>\"{$file['name']}\"</b> превышает допустимый размер");
					break;
				default: {
					info::error("Во время загрузки файла <b>\"{$file['name']}\"</b> произошла неизвестная ошибка");
					throw new systemFatalException("Can't upload file, reason code:" . $file['error'] . '$_FILES:\n' . var_export($_FILES, true));
				}
			}

			# If any errors occupiers we'll go to next file
			return false;
		}

		return true;

	}

	/**
	 * Uploads file according to parameters
	 * @param array $file       File info: name, error, temporaryName, number
	 * @param string $directory Directory where file would be uploaded
	 * @param string $nameType  How to create name for new file
	 * @param mixed $prefix     Prefix used in name creation
	 * @param int $maxFiles     Maximum files number
	 * @param bool $fileType    Type of file, like image, video or extension
	 * @return uploadedFile|bool Array if file info or false on error
	 * @throws systemFatalException
	 */
	private static function uploadFile($file, $directory, $nameType = "random", $prefix = 0, $maxFiles = -1, $fileType = false) {

		# Max files
		if($maxFiles == self::SINGLE)
			$maxFiles = 1;

		# Base upload errors check
		if(!self::checkFile($file))
			return false;

		# Get file extensions
		$uploadFile = new uploadedFile($directory, $file);

		# File limitation
		if($maxFiles >= 0 && $file['number'] > $maxFiles) {
			info::error("Файл \"$uploadFile->name\" не загружен, так как превышен лимит загружаемых за раз файлов");
			return false;
		}

		# Check if tmp file really uploaded file
		if(!is_uploaded_file($uploadFile->temporaryName))
			return false;

		# Check if this is proper file type
		if($fileType && !$uploadFile->checkType($fileType)) {
			info::error("Файл \"$uploadFile->fullName\" не загружен, так как файлы этого типа не разрешены");
			return false;
		}

		# Make filename
		if(!$uploadFile->directory()->exists())
			$uploadFile->directory()->create();

		# Make new file name
		$uploadFile->makeUploadName($nameType, $prefix);

		# Download files
		if(!move_uploaded_file($file['temporaryName'], $uploadFile->path)) {
			info::error("Во время загрузки файла $uploadFile->name произоша ошибка.");
			baseException::log("Cant move file '$uploadFile->temporaryName to path  $uploadFile->path");
			return false;
		}

		# Change mode
		if(!$uploadFile->chmod(0666))
			info::notice("После перемещения файла не получилось изменить его права.");

		# Return file info
		return $uploadFile;

	}

	/**
	 * Returns number of uploaded files
	 * @param String $inputName Name of file input
	 * @return int Number of uploaded files
	 */
	public static function filesUploaded($inputName = "userfile") {

		# If no files
		if(!isset($_FILES[$inputName]))
			return 0;

		# Number of uploaded files
		$filesUploaded = 0;

		# If many files
		if(is_array($_FILES[$inputName]['tmp_name'])) {

			# Go through files and check was ot uploaded
			foreach($_FILES[$inputName]['tmp_name'] as $temporaryFile) {
				if(!is_uploaded_file($temporaryFile))
					continue;
				else $filesUploaded++;
			}

			# If single
		} else {
			if(!empty($_FILES[$inputName]['tmp_name']))
				$filesUploaded = (int)is_uploaded_file($_FILES[$inputName]['tmp_name']);

		}

		# Return
		return $filesUploaded;

	}

}

