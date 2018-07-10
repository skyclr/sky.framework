<?php

/**
 * This is mail-sender script. Read mail dir. / send mails
 * Should be set to cron
 */

# Inner settings
use sky\BaseException;
use sky\Sky;
use sky\SystemException;

$maxMailsAtATime = 100;    # Maximum mail messages limit sent at execution (Максимальное кол-во обрабатываемых писем за один запуск скрипта)
$processedMails  = 0;       # Reset processed counter (Кол-во обработанных писем)
$delayTime       = 10; //900;    # Delay task for 15 min if message is not sent.

# Re-set error reporting
ini_set('display_errors', 1);
error_reporting(55);

# Open lock file
$fp = fopen("mailSender.lock", "a");

# If cant lock process file
if(!flock($fp, LOCK_EX | LOCK_NB))
	die("Another process is running\n");

# System include
require_once __DIR__. '/../../library/core/main.php';

# Init
new Sky('console');
restore_error_handler();

# Make actions
try {

	# Set paths
	$mailFolder = Sky::location("mail");
	$mailNotifyFolder = Sky::location("mailNotify");
	$lockName   = $mailFolder . "running.lock";

	# Создание директории для email и аттачей
	\sky\fs\Directory::make($mailFolder)->create();

	# Open lock file
	$fp = fopen($lockName, "a");

	# If cant lock process file
	if(!flock($fp, LOCK_EX | LOCK_NB))
		Sky::exitLog("Another process is running\n", "red");

	# We're started
	Sky::output("Started\n", "green");

	# Get mails files
	if(!$mails = glob($mailFolder . "*.mail"))
		if(!$mails = glob($mailNotifyFolder . "*.mail"))
			Sky::exitLog("No mails to proceed\n", "yellow");

	# Get only 100
	if(sizeof($mails) > 100)
		$mails = array_slice($mails, 0, 100);

	# Go through mails
	foreach($mails as $file) {

		# Stop processing if too many
		if($processedMails > $maxMailsAtATime) {
			Sky::output("Send limit exceeded: $maxMailsAtATime\n", "red");
			break;
		}

		# Console.log
		Sky::output("Processing $file\n");

		# Read error
		if(!$mailData = json_decode(file_get_contents($file), true))
			continue;

		# Data check
		if(!is_array($mailData) || !count($mailData) || !isset($mailData['mail'])) {
			BaseException::log("Wrong mail contents for a file: " . $file);
			continue;
		}

		try {

			# Init Mailer
			$mail = new \PHPMailer\PHPMailer\PHPMailer();

			# From
			if($mailData['from'])
				$mail->setFrom(Sky::$config['smtp']['login']);

			# CC copy
			if($mailData['cc']) {
				foreach($mailData['cc'] as $cc)
					$mail->addCC($cc);
			}

			# Set parameters
			$mail->SMTPAuth   = true;
			$mail->Port       = Sky::$config['smtp']['port'];
			$mail->Host       = Sky::$config['smtp']['server'];
			$mail->Hostname   = Sky::$config['smtp']['server'];
			$mail->SMTPSecure = Sky::$config['smtp']['ssl'] ? "ssl" : false;
			$mail->Username   = Sky::$config['smtp']['login'];
			$mail->Password   = Sky::$config['smtp']['password'];
			$mail->Timeout    = 5;
			$mail->Mailer     = "smtp";

			# Log
			echo "\n-----------------------------------\n";
			echo "To: " . $mailData['mail'] . "\n";
			echo "From: " . $mailData['from'] . "\n";
			echo "Subj: " . stripslashes($mailData['subject']) . "\n";


			if(!empty($mailData['plainMessage']))
				echo "Plaint text body: " . stripslashes($mailData['plainMessage']) . "\n";
			else
				echo "Body: " . stripslashes($mailData['message']) . "\n";

			echo "---\n";

			# Compiling mail
			$mail->addAddress($mailData['mail']);
			$mail->FromName = 'Waperz'; // 'Служба поддержки Waperz'; // . sky::$config['site']['name'];
			$mail->Subject  = stripslashes($mailData['subject']);

			# Set content
			$mail->msgHTML(stripslashes($mailData['message']));

			# Set plain body
			if(!empty($mailData['plainMessage']))
				$mail->AltBody = $mailData['plainMessage'];

			$mail->isHTML(true);
			$mail->CharSet = "UTF-8";

			# Adding attachments
			if(!empty($mailData['attachments']) && is_array($mailData['attachments'])) {

				# Log
				Sky::output("Attachments\n");

				# Foreach attach
				foreach($mailData['attachments'] as $currentAttachment) {

					# File exists?
					if(!file_exists($currentAttachment['file']))
						continue;

					# Log
					Sky::output("attach: {$currentAttachment['name']}\n");

					# Adding attachment
					$mail->addAttachment($currentAttachment['file'], $currentAttachment['name']);

				}
			}

			# Adding attachments
			if(!empty($mailData['embedImages']) && is_array($mailData['embedImages'])) {

				# Log
				Sky::output("embedImages\n");

				# Foreach attach
				foreach($mailData['embedImages'] as $currentImage) {

					# File exists?
					if(!file_exists($currentImage['file'])) {
						echo " file not exists:" . $currentImage['file'] . "\n";
						continue;
					}

					# Log
					Sky::output("embed: {$currentImage['file']}\n");

					# Adding attachment
					$mail->addEmbeddedImage($currentImage['file'], $currentImage['cid']);

				}
			}

			# Sending
			if($mail->send()) echo "ok\n";
			else {
				Sky::output("Mail send Error: $mail->ErrorInfo \n", "red");
				continue;
			}

			# Deleting task
			unlink($file);

			# Remove attachments (if any)
			if(!empty($mailData['attachments']) && is_array($mailData['attachments'])) {
				Sky::output("Removing attachments: $mail->ErrorInfo \n", "yellow");
				foreach($mailData['attachments'] as $currentAttachment) {
					if(file_exists($currentAttachment['file']))
						unlink($currentAttachment['file']);
				}
			}

			# Increment counter
			$processedMails++;

			# Close SMTP conn.
			$mail->SmtpClose();

		} catch(SystemException $e) {
			Sky::output("Error: " . $e->getMessage(). " \n", "red");
		}

	}

	# Output stats.
	Sky::output("Tasks processed: $processedMails\n", "green");

} catch(Exception $e) {
	Sky::output("Catch exception: " . $e->getMessage(). " \n", "red");
}

die("Finished");
