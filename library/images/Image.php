<?php

# Current NS
namespace sky\images;

# Class if IM supported
require_once "ImageImagick.php";

# Uses
use sky\DateTime;
use sky\fs\File;
use sky\SystemErrorException;
use sky\SystemNoticeException;
use sky\UserErrorException;

/**
 * Class image to work with images transformation
 * @package sky\images
 */
class Image {

	public $width, $height;
	protected $type;

	/**
	 * Inner image
	 * @var
	 */
	protected $image;

	/**
	 * @var \sky\fs\File
	 */
	public $file;

	/**
	 * @param $type
	 * @return Image|ImageImagick
	 */
	public static function make($type) {

		# If Imagick available
		if(class_exists("Imagick"))
			return new ImageImagick($type);

		# Simple
		return new self($type);

	}

	/**
	 * Creates new instance
	 * @param $type
	 */
	protected function __construct($type) {

		# Set type
		$this->type = $type;

		# Self return
		return $this;

	}

	/**
	 * Crates new image from path
	 * @param string $path Image file path
	 * @return static
	 */
	public static function makeFromPath($path) {

		# Make file
		$file = new File($path);

		# Make image
		return self::makeFromFile($file);

	}

	/**
	 * Creates new image from file object
	 * @param File $file
	 * @return Image
	 * @throws SystemErrorException
	 */
	public static function makeFromFile(File $file) {

		# Check
		if($file->type != "image")
			throw new SystemErrorException("Try to create image from not image source: $file->path");

		# Make image
		$image = self::make($file->extension);

		# Set path
		$image->file = $file;

		# Creates image from file
		$image->createFromFile();

		# Get sizes
		$image->getSizes();

		# Image
		return $image;

	}

	/**
	 * Gets image sizes from file
	 * @throws SystemNoticeException
	 */
	public function getSizes() {

		# Gathers old image sizes
		if(!($sizes = getimagesize($this->file->path)))
			throw new SystemNoticeException("Невозможно получить размеры изображения {$this->file->path}");

		# Convert
		list($this->width, $this->height) = $sizes;

	}

	/**
	 * Generates image from file path
	 * @throws UserErrorException
	 * @throws SystemErrorException
	 * @return resource
	 */
	protected function createFromFile() {

		switch($this->type) {
			case 'jpg':
			case 'jpeg':
				if (!$image = \imagecreatefromjpeg($this->file->path))
					throw new SystemErrorException("Невозможно создать изображение из файла {$this->file->path}"); break;
			case 'gif':
				if (!$image = \imagecreatefromgif($this->file->path))
					throw new SystemErrorException("Невозможно создать изображение из файла {$this->file->path}"); break;
			case 'png':
				if (!$image = \imagecreatefrompng($this->file->path))
					throw new SystemErrorException("Невозможно создать изображение из файла {$this->file->path}"); break;
			default:
				throw new UserErrorException("Неизвестный тип изображения: \"$this->type\"");
				break;
		}

		# Save and return
		return $this->image = $image;
	}

	/**
	 * Creates new image with new sizes and transparent according old one
	 * @param Image $image
	 * @param int $width
	 * @param int $height
	 * @throws SystemErrorException
	 * @return resource New blank image
	 */
	private function createFromImage(Image $image, $width, $height) {


		# Create empty
		if(!($newImage = imagecreatetruecolor($width, $height)))
			throw new SystemErrorException("");

		# Set properties according to type
		if($this->type == "png" || $this->type == "gif") {

			# Get index
			$transparentIndex = imagecolortransparent($image->image);

			# If we have a specific transparent color
			if($transparentIndex >= 0) {

				# Get the original image's transparent color's RGB values
				$transparentColor = @imagecolorsforindex($image->image, $transparentIndex);

				# Allocate the same color in the new image resource
				$transparentIndex = imagecolorallocate($newImage, $transparentColor['red'], $transparentColor['green'], $transparentColor['blue']);

				# Completely fill the background of the new image with allocated color.
				imagefill($newImage, 0, 0, $transparentIndex);

				# Set the background color for new image to transparent
				imagecolortransparent($newImage, $transparentIndex);

			} # Always make a transparent background color for PNGs that don't have one allocated already
			elseif($this->type == "png") {

				# Turn off transparency blending (temporarily)
				imagealphablending($newImage, false);

				# Create a new transparent color for image
				$color = imagecolorallocatealpha($newImage, 0, 0, 0, 127);

				# Completely fill the background of the new image with allocated color.
				imagefill($newImage, 0, 0, $color);

				# Restore transparency blending
				imagesavealpha($newImage, true);

			}
		}

		# Save
		$this->width = $width;
		$this->height = $height;

		# Save and return
		return $this->image = $newImage;

	}

	/**
	 * Makes resize image from this one
	 * @param      $width
	 * @param      $height
	 * @param bool $crop
	 * @return $this New resize image
	 */
	public function resize($width, $height, $crop = false) {

		# Get new image sizes
		$sizes = $this->newSizes($width, $height, $crop);

		# Create new
		$new = new self($this->type);

		# Set same parameters
		if($crop)
			$new->createFromImage($this, $width, $height);
		else
			$new->createFromImage($this, $sizes["width"], $sizes["height"]);

		# Copy
		$this->copy($new, $width, $height, $crop);

		# Self return
		return $new;

	}

	/**
	 * Copies part of one one image to another with x, y, of old part
	 * @param Image $to
	 * @param       $width
	 * @param       $height
	 * @param       $x
	 * @param       $y
	 * @throws \sky\SystemNoticeException
	 */
	private function copyWithCrop(Image $to, $width, $height, $x, $y) {
		if(!imagecopyresampled(
				$to->image,		// To
				$this->image,	// From
				0, 0, $x, $y,
				$width,
				$height,
				$width * $this->width / $to->width,
				$height * $this->height / $to->height))
			throw new SystemNoticeException("Невозможно создать миниатрю для файла {$this->file->fullName}");
	}

	/**
	 * Makes image copy from one to another
	 * @param Image $to         Destination image
	 * @param int   $partWidth  Part width
	 * @param int   $partHeight Part height
	 * @param bool  $crop       Crop flag
	 * @throws \sky\SystemNoticeException
	 */
	private function copy(Image $to, $partWidth, $partHeight, $crop = false) {

		# Resize image
		if($crop) {
			$this->copyWithCrop($to, $partWidth, $partHeight,
					(int)($this->width -  $this->width * ($partWidth/$to->width))/2,
					(int)($this->height -  $this->height * ($partHeight/$to->height))/2);
		}
		elseif(!imagecopyresampled($to->image, $this->image, 0, 0, 0, 0, $to->width, $to->height, $this->width, $this->height))
			throw new SystemNoticeException("Невозможно создать миниатрю для файла {$this->file->fullName}");
	}

	/**
	 * Scales image sizes to maximum proportions height and width
	 * @param         $oldWidth
	 * @param         $oldHeight
	 * @param Integer $width  new maximum width of image
	 * @param Integer $height new maximum height of image
	 * @param bool    $crop
	 * @return array Array with new height and width values
	 */
	public static function getNewSizes($oldWidth, $oldHeight, $width, $height, $crop = false) {

		if ($oldWidth > $width || $oldHeight > $height || $crop) {

			if ($oldWidth / $width > $oldHeight / $height) {

				# In this case scaled width is more than height
				if($crop) {
					$sizes["width"]  = $oldWidth * ($height / $oldHeight);
					$sizes["height"] = $height;
				} else {
					$sizes["width"]  = $width;
					$sizes["height"] = $oldHeight * ($width / $oldWidth);
				}

			} else {

				if($crop) {
					$sizes["width"]  = $width;
					$sizes["height"] = $oldHeight * ($width / $oldWidth);
				} else {
					$sizes["width"]  = $oldWidth * ($height / $oldHeight);
					$sizes["height"] = $height;
				}

			}
		} else {
			return array(
					"width" => $oldWidth,
					"height" => $oldHeight
			);
		}

		# Return counted
		return $sizes;

	}

	/**
	 * Scales image sizes to maximum proportions height and width
	 * @param Integer $width  new maximum width of image
	 * @param Integer $height new maximum height of image
	 * @param bool    $crop
	 * @return array Array with new height and width values
	 */
	protected function newSizes($width, $height, $crop = false) {
		return self::getNewSizes($this->width, $this->height, $width, $height, $crop);
	}

	/**
	 * Saves image as current file
	 * @param string|File $path File location
	 * @param bool $optimize    Image optimization flag (performs optimize func)
	 * @return $this
	 * @throws SystemErrorException
	 */
	public function save($path, $optimize = true) {

		# Make file
		if($path instanceof File)
			$this->file = $path;
		else
			$this->file = new File($path);

		# Create according to path
		switch ($this->file->extension) {
			case 'jpg':
			case 'jpeg':
				if (!imagejpeg($this->image, $this->file->path, $optimize ? 50 : 100))
					throw new SystemErrorException("Невозможно создать файл $this->file->path");
				break;
			case 'gif':
				if (!imagegif($this->image, $this->file->path))
					throw new SystemErrorException("Невозможно создать файл $this->file->path");
				break;
			case 'png':
				if (!imagepng($this->image, $this->file->path, $optimize ? 50 : 100))
					throw new SystemErrorException("Невозможно создать файл $this->file->path");
				break;
			default:
				throw new SystemErrorException("Неизвестное расширение изображения: \"{$this->file->fullName}\"");
		}

		# Return
		return $this;

	}

	/**
	 * Gets image file information
	 */
	public function getImageInfo() {

		$result = array();

		# Jpeg and tiff supported only
		if($this->file->extension != "jpg" && $this->file->extension != "jpeg" && $this->file->extension != "tiff")
			return $result;

		# Get EXIF data from image
		$exif = @exif_read_data($this->file->path, 0, true);

		# If no exif data gained
		if($exif === false)
			return $result;

		try {

			# If no data
			if(empty($exif['GPS']))
				throw new UserErrorException("No GPS data persists");

			# If wrong data
			if(empty($exif['GPS']['GPSLatitudeRef']) ||
					empty($exif['GPS']['GPSLatitude']) ||
					empty($exif['GPS']['GPSLongitudeRef']) ||
					empty($exif['GPS']['GPSLongitude']))
				throw new UserErrorException("Wrong GPS data for {$this->file->path}: ".var_export($exif, true));

			# Get reference and latitude
			$reference = $exif['GPS']['GPSLatitudeRef'];
			$latitude  = $exif['GPS']['GPSLatitude'];

			# Count parts
			list($num, $dec) = explode('/', $latitude[0]);
			$seconds = $num / $dec;
			list($num, $dec) = explode('/', $latitude[1]);
			$minutes = $num / $dec;
			list($num, $dec) = explode('/', $latitude[2]);
			$degrees = $num / $dec;

			# Recount
			$latitude = ($seconds + $minutes / 60 + $degrees / 3600) * ($reference == "S" ? -1 : 1);

			# Get reference and longitude
			$reference  = $exif['GPS']['GPSLongitudeRef'];
			$longitude = $exif['GPS']['GPSLongitude'];

			# Count parts
			list($num, $dec) = explode('/', $longitude[0]);
			$seconds = $num / $dec;
			list($num, $dec) = explode('/', $longitude[1]);
			$minutes = $num / $dec;
			list($num, $dec) = explode('/', $longitude[2]);
			$degrees = $num / $dec;

			# Recount
			$longitude = ($seconds + $minutes / 60 + $degrees / 3600) * ($reference == "W" ? -1 : 1);

			# Return
			$result["gps"] = array($latitude, $longitude);

		} catch(\Exception $e) {}

		try {

			# Get Created
			if(!empty($exif["EXIF"]["DateTimeOriginal"])) {
				$result["created"] = DateTime::createFormat("Y:m:d H:i:s", $exif["EXIF"]["DateTimeOriginal"])->format(DateTime::DATETIME_SQL);
			}
		} catch(\Exception $e) {
			#baseException::log("Error in exif data: " . $exif["EXIF"]["DateTimeOriginal"]);
		}

		return $result;

	}

}