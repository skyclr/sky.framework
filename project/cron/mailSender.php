<?php

/**
 * This is mail-sender script. Read mail dir. / send mails
 * Should be set to cron
 */

# Inner settings
use sky\baseException;
use sky\Sky;
use sky\systemException;

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
require_once dirname(__FILE__) . '/../library/core/main.php';

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
		die("another process is running\n");

	# We're started
	echo "started\n";

	# Get mails files
	if(!$mails = glob($mailFolder . "*.mail"))
		if(!$mails = glob($mailNotifyFolder . "*.mail"))
			die("No mails to proceed");

	# Get only 100
	if(sizeof($mails) > 100)
		$mails = array_slice($mails, 0, 100);

	# Go through mails
	foreach($mails as $file) {

		# Stop processing if too many
		if($processedMails > $maxMailsAtATime) {
			echo 'Send limit exceeded: ' . $maxMailsAtATime . "\n";
			break;
		}

		# Console.log
		echo 'Processing ' . $file . " .. \n";

		# Read error
		if(!$mailData = json_decode(file_get_contents($file), true)) {
			//baseException::log("Invalid mail contents for a file: " . $file);
			continue;
		}

		# Data check
		if(!is_array($mailData) || !count($mailData) || !isset($mailData['mail'])) {
			baseException::log("Wrong mail contents for a file: " . $file);
			continue;
		}

		try {

			# Init Mailer
			$mail = new PHPMailer();

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
				echo " / attachments\n";

				# Foreach attach
				foreach($mailData['attachments'] as $currentAttachment) {

					# File exists?
					if(!file_exists($currentAttachment['file']))
						continue;

					# Log
					echo " attach:" . $currentAttachment['name'] . "\n";

					# Adding attachment
					$mail->addAttachment($currentAttachment['file'], $currentAttachment['name']);

				}
			}

			# Adding attachments
			if(!empty($mailData['embedImages']) && is_array($mailData['embedImages'])) {

				# Log
				echo " / embedImages\n";

				# Foreach attach
				foreach($mailData['embedImages'] as $currentImage) {

					# File exists?
					if(!file_exists($currentImage['file'])) {
						echo " file not exists:" . $currentImage['file'] . "\n";
						continue;
					}

					# Log
					echo " embed:" . $currentImage['file'] . "\n";

					# Adding attachment
					$mail->addEmbeddedImage($currentImage['file'], $currentImage['cid']);

				}
			}

			# Sending
			if($mail->send()) echo "ok\n";
			else {
				echo "Mail send Error: " . $mail->ErrorInfo . "\n";
				//baseException::log("Mail send Error(): " . $mail->ErrorInfo);
				continue;
			}

			# Deleting task
			unlink($file);

			# Remove attachments (if any)
			if(!empty($mailData['attachments']) && is_array($mailData['attachments'])) {
				echo "    removing attachments\n";
				foreach($mailData['attachments'] as $currentAttachment) {
					if(file_exists($currentAttachment['file']))
						unlink($currentAttachment['file']);
				}
			}

			# Increment counter
			$processedMails++;

			# Close SMTP conn.
			$mail->SmtpClose();

		} catch(systemException $e) {
			echo "[mailSender]Error: " . $e->getMessage();
		}

	}

	# Output stats.
	echo "Tasks processed: " . $processedMails . "\n";

} catch(Exception $e) {
	echo "Catch exception: " . $e->getMessage() . "\n";
}

die("Finished");
