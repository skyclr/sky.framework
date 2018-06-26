<?php

# Set namespace
namespace sky\images;

# File
use sky\fs\file;
use sky\systemErrorException;
use sky\systemNoticeException;
use sky\userErrorException;

# Extend image
class imageImagick extends image {

	/**
	 * @var \Imagick
	 */
	protected $image;

	/**
	 * Generates image from file path
	 * @throws userErrorException
	 * @throws systemErrorException
	 * @return \Imagick
	 */
	protected function createFromFile() {
		$this->image = new \Imagick($this->file->path);
		$this->autoRotate();
		return $this->image;
	}

	/**
	 * Gets image sizes from file
	 * @throws systemNoticeException
	 */
	public function getSizes() {


		# Gathers old image sizes
		if(!$sizes = $this->image->getImageGeometry())
			throw new systemNoticeException("Невозможно получить размеры изображения {$this->file->path}");


		# Convert
		$this->width = $sizes["width"];
		$this->height = $sizes["height"];


	}

	/**
	 * Resize image file and save its resize copy to new file via IMagic
	 * @param integer $width  Max width of new image
	 * @param integer $height Max height of new image file
	 * @param bool    $crop   Identifies if image should be cropped if not  has proper proportions
	 * @return $this|\sky\images\imageImagick
	 * @throws systemNoticeException
	 * @throws systemErrorException
	 */
	public function resize($width, $height, $crop = false) {

		try {


			# Create new
			$new = new self($this->type);

			# Generates new image sizes
			$newSizes = $this->newSizes($width, $height, $crop);

			# Create new image from old one
			$new->image = clone $this->image;


			# Resize image
			$new->image->resizeImage($newSizes["width"], $newSizes["height"], \Imagick::FILTER_LANCZOS, 0.9);


			# Sharpen
			$new->image->sharpenImage(0, 0.5);


			# Save meta
			$new->width = $newSizes["width"];
			$new->height = $newSizes["height"];


			# Crop
			if($crop)
				$new->image->cropImage($width, $height,
					(int)($newSizes["width"] - $width)/2,
					(int)($newSizes["height"]- $height)/2);


			# Return self
			return $new;


		} catch(\ImagickException $e) {
			throw new systemErrorException("Imagick error: " . $e->getMessage());
		}

	}

	/**
	 * Applies inner rotation flag, and erase it
	 * @return $this
	 */
	private function autoRotate() {

		# Get orientation
		$orientation = $this->image->getImageOrientation();

		# Switch
		switch($orientation) {
			case \Imagick::ORIENTATION_BOTTOMRIGHT:
				$this->image->rotateImage("#fff", 180);
				break;
			case \Imagick::ORIENTATION_RIGHTTOP:
				$this->image->rotateImage("#fff", 90);
				break;
			case \Imagick::ORIENTATION_LEFTBOTTOM:
				$this->image->rotateImage("#fff", -90);
				break;
			default: break;
		}

		# Set orientation
		$this->image->setImageOrientation(\Imagick::ORIENTATION_UNDEFINED);

		return $this;

	}

	/**
	 * Saves image as current file
	 * @param string|file $path File location
	 * @param bool $optimize Image optimization flag (performs optimize func)
	 * @return $this
	 */
	public function save($path, $optimize = true) {


		# Make file
		if($path instanceof file)
			$this->file = $path;
		else
			$this->file = new file($path);

		# Optimize
		if($optimize)
			$this->optimize();

		# Create according to path
        $this->image->writeImage($this->file->path);

		# Return
		return $this;

	}

    /**
     * Performs image optimizations
     * @return $this
     */
	function optimize() {
        $this->image->optimizeImageLayers();
        $this->image->setImageCompressionQuality(70);
        return $this;
    }

	/**
	 * Draws overlay image
	 * @param imageImagick $image
	 * @param $x
	 * @param $y
	 */
	public function drawImageOverlay(imageImagick $image, $x, $y) {

		// Overlay the watermark on the original image
		$this->image->compositeImage($image->image, \Imagick::COMPOSITE_OVER, $x, $y);

	}

	/**
	 * Copies image over current at coordinates from bottom left
	 * @param imageImagick $image
	 * @param $x
	 * @param $y
	 * @return $this
	 */
	public function drawImageOverlayFromBottomLeft(imageImagick $image, $x, $y) {

		# Get sizes
		$image->getSizes();
		$this->getSizes();

		# Overlay the watermark on the original image
		$this->image->compositeImage($image->image, \Imagick::COMPOSITE_OVER, $x, $this->height - $y);

		# Self return
		return $this;

	}

}