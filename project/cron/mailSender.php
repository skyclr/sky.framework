<?php

/**
 * This is mail-sender script. Read mail dir. / send mails
 * Should be set to cron
 */

# Inner settings
use sky\Sky;
use sky\SystemException;

# System include
require_once __DIR__. '/../../library/core/main.php';

# Init
new Sky('console');
restore_error_handler();

# Make actions
try {

	# Set paths
	$mailFolder = \sky\fs\Directory::make(Sky::location("mail"))->create();
	$mailNotifyFolder = \sky\fs\Directory::make(Sky::location("mailNotify"))->create();

	# If cant lock process file
	if(!$mailFolder->file("running.lock")->lock())
		Sky::exitLog("Another process is running\n", "red");

	# Get mails files
	if(!$mails = $mailFolder->read("*.mail", 100))
		if(!$mails = $mailNotifyFolder->read("*.mail", 100))
			Sky::exitLog("No mails to proceed\n", "yellow");

	/** @var \sky\fs\File $file */
	foreach($mails as $file) {

		# Console.log
		Sky::output("Processing ");
		Sky::output("$file->path\n", "yellow");

		# Get email
		$email = Email::fromFile($file);

		try {

			# Init Mailer
			$mail = new \PHPMailer\PHPMailer\PHPMailer();

			# Set parameters
			$mail->isHTML(true);
			$mail->SMTPAuth   = true;
			$mail->Port       = Sky::$config['smtp']['port'];
			$mail->Host       = Sky::$config['smtp']['server'];
			$mail->Hostname   = Sky::$config['smtp']['server'];
			$mail->SMTPSecure = Sky::$config['smtp']['ssl'] ? "ssl" : false;
			$mail->Username   = Sky::$config['smtp']['login'];
			$mail->Password   = Sky::$config['smtp']['password'];
			$mail->Timeout    = 5;
			$mail->Mailer     = "smtp";
			$mail->CharSet = "UTF-8";
			$email->fillMailer($mail);

			# Sending
			if(!$mail->send()) {
				Sky::output("Mail send Error: $mail->ErrorInfo \n", "red");
				continue;
			}

			# Log OK
			Sky::output("Success\n", "green");

			# Deleting task
			$file->delete();

			# Close SMTP conn.
			$mail->SmtpClose();

		} catch(SystemException $e) {
			Sky::output("Error: " . $e->getMessage(). " \n", "red");
		}

	}

	# Output stats.
	Sky::output("Execution done\n", "green");

} catch(Exception $e) {
	Sky::output("Execution done with exception: " . $e->getMessage(). " \n", "red");
}

