<?php

use sky\sky;
use sky\systemErrorException;
use sky\utils;

class email {

	private
		$to = [],
		$cc = [],
		$from,
		$subject,
		$text,
		$plainText,
		$attachments = [],
		$embedImages = [];

	/**
	 * Static constrictor
	 * @return email
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
		} elseif(\sky\validator::value($address, "email", "null"))
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
		} elseif(\sky\validator::value($address, "email", "null"))
			$this->cc[] = $address;

		return $this;
	}

	/**
	 * Adds attachment
	 * @param $attachment
	 * @return $this
	 */
	public function attachment($attachment) {
		$this->attachments[] = $attachment;
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
	 * @return email
	 */
	public function render($name, $data) {
		return $this->text(\sky\sky::$twig->render("emails/$name.twig", $data));
	}

	/**
	 * Sends email
	 * @param bool $notify
	 */
	public function send($notify = false) {

		try {

			# Validate incoming params
			if(!$this->subject || !$this->text)
				throw new systemErrorException('No header or text in message');

			# Send mails
			foreach($this->to as $mailTo) {

				# Checking for spam attempt
				if(strpos($mailTo . $this->subject . $this->text, 'MIME-Version:') !== false || strpos($mailTo . $this->subject . $this->text, 'Content-Type:') !== false)
					throw new systemErrorException('Possible attack: ' . $mailTo . '/' . $this->subject . '/' . $this->text);

				# Set work dir + attach dir
				\sky\fs\directory::make(sky::location("mail") . 'attachments/')->create();

				# Encode message
				$message = json_encode(
					array(
						'from'         => $this->from ? $this->from : sky::$config["smtp"]["from"],
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
					$loc = sky::location("mailNotify") . date(\sky\DateTime::DATE_TIME) . '_' . \sky\utilities::getRandomString(10) . '.mail';
				else
					$loc = sky::location("mail") . date(\sky\DateTime::DATE_TIME) . '_' . \sky\utilities::getRandomString(10) . '.mail';

				# Store mail file witch should be send by cron
				\sky\fs\file::make($loc)
					->write($message, true);

			}

		} catch(Exception $e) {

			# No user data provided

		}
	}

}