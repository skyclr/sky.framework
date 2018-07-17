<?php

use sky\Sky;
use sky\SystemErrorException;

class Email {

	private
		$to = [],
		$cc = [],
		$from,
		$fromName,
		$subject,
		$text,
		$plainText,
		$attachments = [],
		$embedImages = [];

	/**
	 * Static constrictor
	 * @return Email
	 */
	public static function make() {
		return new self();
	}

	/**
	 * Sets email recipient
	 * @param string|array $address Single or array of addresses
	 * @return $this
	 */
	public function to($address) {

		if(is_array($address)) {
			foreach($address as $single)
				$this->to($single);
		} elseif(\sky\VarFilter::check($address)->typeFilter(\sky\FilterRule::TYPE_EMAIL)->valueOr(null))
			$this->to[] = $address;

		return $this;
	}


	/**
	 * Sets email copy
	 * @param string|array $address Single or array of addresses
	 * @return $this
	 */
	public function cc($address) {

		if(is_array($address)) {
			foreach($address as $single)
				$this->cc($single);
		} elseif(\sky\VarFilter::check($address)->typeFilter(\sky\FilterRule::TYPE_EMAIL)->valueOr(null))
			$this->cc[] = $address;

		return $this;
	}

	/**
	 * Adds attachment
	 * @param $path
	 * @param $name
	 * @return $this
	 */
	public function attachment($path, $name) {
		$this->attachments[] = ["file" => $path, "name" => $name];
		return $this;
	}

	/**
	 * Adds embed image
	 * @param $path
	 * @param $cid
	 * @return $this
	 */
	public function embedImage($path, $cid) {
		$this->embedImages[] = ["file" => $path, "cid" => $cid];
		return $this;
	}

	/**
	 * Sets from
	 * @param $address
	 * @return $this
	 */
	public function from($address) {
		$this->from = $address;
		return $this;
	}

	/**
	 * Sets email subject
	 * @param $subject
	 * @return $this
	 */
	public function subject($subject) {
		$this->subject = $subject;
		return $this;
	}

	/**
	 * Sets email text
	 * @param $text
	 * @return $this
	 */
	public function text($text) {
		$this->text = $text;
		return $this;
	}

	/**
	 * Sets email text
	 * @param $text
	 * @return $this
	 */
	public function plainText($text) {
		$this->plainText = $text;
		return $this;
	}

	/**
	 * Renders text from twig template
	 * @param string $name Template name
	 * @param array $data  Array of data
	 * @return Email
	 */
	public function render($name, $data) {
		return $this->text(\sky\Sky::$twig->render("emails/$name.twig", $data));
	}

	/**
	 * Creates new email object from file content
	 * @param \sky\fs\File $file
	 * @return static
	 * @throws SystemErrorException
	 */
	public static function fromFile(\sky\fs\File $file) {

		# Read error
		if(!$mailData = json_decode($file->getContent(), true))
			throw new SystemErrorException("Wrong mail contents for a file: $file->path");

		# Data check
		if(!is_array($mailData) || !count($mailData) || !isset($mailData['mail']))
			throw new SystemErrorException("Wrong mail contents for a file: $file->path");

		$email = new static();
		$email->from($mailData["from"]);
		$email->to($mailData["mail"]);
		$email->subject($mailData["subject"]);
		$email->cc($mailData["cc"]);
		$email->text($mailData["message"]);
		$email->plainText($mailData["plainMessage"]);
		$email->attachments = $mailData["attachments"];
		$email->embedImages = $mailData["embedImages"];
		return $email;

	}

	/**
	 * Sends email
	 * @param bool $notify
	 */
	public function send($notify = false) {

		try {

			# Validate incoming params
			if(!$this->subject || !$this->text)
				throw new SystemErrorException('No header or text in message');

			# Validate incoming params
			if(!$this->from)
				throw new SystemErrorException('No from name provided');

			# Send mails
			foreach($this->to as $mailTo) {

				# Checking for spam attempt
				if(strpos($mailTo . $this->subject . $this->text, 'MIME-Version:') !== false || strpos($mailTo . $this->subject . $this->text, 'Content-Type:') !== false)
					throw new SystemErrorException('Possible attack: ' . $mailTo . '/' . $this->subject . '/' . $this->text);

				# Set work dir + attach dir
				\sky\fs\Directory::make(Sky::location("mail") . 'attachments/')->create();

				# Encode message
				$message = json_encode(
					array(
						'from'         => $this->from,
						'mail'         => $mailTo,
						'subject'      => $this->subject,
						'cc'           => $this->cc,
						'message'      => $this->text,
						'attachments'  => $this->attachments ? $this->attachments : [],
						'embedImages'  => $this->embedImages ? $this->embedImages : [],
						'plainMessage' => $this->plainText ? $this->plainText : false
					)
				);

				# Get file location
				if($notify)
					$loc = Sky::location("mailNotify") . date(\sky\DateTime::DATE_TIME) . '_' . \sky\Utilities::getRandomString(10) . '.mail';
				else
					$loc = Sky::location("mail") . date(\sky\DateTime::DATE_TIME) . '_' . \sky\Utilities::getRandomString(10) . '.mail';

				# Store mail file witch should be send by cron
				\sky\fs\File::make($loc)
					->write($message, true);

			}

		} catch(Exception $e) {

		}
	}

	/**
	 * Fills PHPMailer parameters
	 * @param \PHPMailer\PHPMailer\PHPMailer $mail
	 */
	public function fillMailer(\PHPMailer\PHPMailer\PHPMailer $mail) {

		# From
		$mail->setFrom($this->from);

		# CC copy
		if($this->cc) {
			foreach($this->cc as $cc)
				$mail->addCC($cc);
		}

		# Compiling mail
		foreach($this->to as $to)
			$mail->addAddress($to);

		$mail->FromName = $this->fromName;
		$mail->Subject  = $this->subject;

		# Set content
		$mail->msgHTML(stripslashes($this->text));

		# Set plain body
		if(!empty($this->plainText))
			$mail->AltBody = $this->plainText;

		# Adding attachments
		if(!empty($this->attachments)) {

			# Foreach attach
			foreach($this->attachments as $currentAttachment) {

				# File exists?
				if(!file_exists($currentAttachment['file']))
					continue;

				# Adding attachment
				$mail->addAttachment($currentAttachment['file'], $currentAttachment['name']);

			}
		}

		# Adding attachments
		if($this->embedImages) {

			# Foreach attach
			foreach($this->embedImages as $currentImage) {

				# File exists?
				if(!file_exists($currentImage['file']))
					continue;

				# Adding attachment
				$mail->addEmbeddedImage($currentImage['file'], $currentImage['cid']);

			}
		}

	}

}