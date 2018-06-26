<?php

# Framework namespace
namespace sky;
use PHPMailer\PHPMailer\Exception;

/** Errors handler
 * @param $code
 * @param $message
 * @param $file
 * @param $line
 */
function errorHandler($code, $message, $file, $line) {

	# Skip pdo gone aways
	if(!error_reporting() || stripos($message, "MySQL server has gone away") !== false)
		return;

	switch($code) {
		case E_ERROR    :
			$type = "php error";
			break;
		case E_PARSE    :
			$type = "php parse";
			break;
		case E_STRICT    :
			$type = "php error";
			break;
		default:
			$type = "php";
			break;
	}

	baseException::log("($type)$message;\nLine: $line.\nFile: $file", 1);

}

# Register error handler
set_error_handler('\sky\errorHandler', E_ALL | E_STRICT);

/**
 * Base class for all exceptions
 * <b>Extends</b> Exception
 */
class baseException extends \Exception {

	/**
	 * Indicates that we should mail exceptions
	 * @var bool
	 */
	public static $mail = true;

	/**
	 * Exception type
	 * @var string
	 */
	private $type = "error";

	/**
	 * Error code
	 * @var Integer
	 */
	protected $code = 1;

	/**
	 * Custom string representation of object
	 * @return string String class representation
	 */
	public function __toString() {

		# Get backtrace
		$backtrace = debug_backtrace();
		$traceData = "";

		# Format backtrace
		foreach($backtrace as $trace) {
			if(!empty($trace["line"]))
				$traceData .= "\t line: {$trace["line"]} \t file: {$trace["file"]}\n";
		}

		# Convert
		return @date("d.m.Y H:i") . "\nException($this->type, $this->line): $this->message" . ";\n$traceData\n\n";

	}

	/**
	 * Custom string representation of object
	 * @return string String class representation
	 */
	public function toHTML() {

		global $preferences;
		$text = @date("d.m.Y H:i") . "<h3>" . ucfirst($this->type) . ": $this->message</h3>";

		$text .= "<table>";

		# Get backtrace
		$backtrace = array_reverse(debug_backtrace());

		# Format backtrace
		foreach($backtrace as $trace) {

			if(isset($trace["file"]) && $trace["file"] == $this->file && $trace["line"] == $this->line) {
				$trace["line"] = "<b>{$trace["line"]}</b>";
				$trace["file"] = "<b>{$trace["file"]}</b>";
			}

			if(!empty($trace["line"]))
				$text .= "<tr><td style='padding: 5px;'>{$trace["line"]}</td><td style='padding: 5px;'>{$trace["file"]}</td></tr>";
		}

		$text .= "</table>";

		try {
			if(class_exists('\sky\sky') && !empty(sky::$twig))
				return sky::$twig->render("/emails/ErrorNotify.twig", [
					"header"  => "Error " . (isset($preferences["site"]["name"]) ? $preferences["site"]["name"] : ""),
					"content" => $text,
					"footer"  => isset(sky::$config['site']['signature']) ? sky::$config['site']['signature'] : date("d.m.y H:i")
				]);
		} catch(Exception $e) {
			return "<h1>Error " . (isset($preferences["site"]["name"]) ? $preferences["site"]["name"] : "") . "</h1><p>$text</p>";
		}

		# Simple string on default
		return $this->__toString();

	}

	/**
	 * Logs data to log file with full backtrace
	 * <b>0</b> - good, <b>1</b> - error, <b>2</b> - no message will be putted to stack
	 */
	public function saveLog() {

		# Get log file path
		if(isset(sky::$config) && isset(sky::$config["locations"]["logs"]))
			$filePath = sky::$config["locations"]["logs"] . "errorLog_" . @date("d.m") . ".txt";

		# If we need to show
		if(!empty(sky::$config['development']['traceExceptions']) && sky::$config['development']['traceExceptions'] == "screen")
			echo '<pre>' . $this . '</pre>';

		if(!empty(sky::$config['development']['noLog']))
			return;

		# Try to create file if not exists
		if(!isset($filePath) || (!file_exists($filePath) && !touch($filePath)) || !is_writable($filePath))
			return;

		# Email send
		\email::make()->from("TDS Admin")
			->text($this->toHTML())
			->plainText($this->__toString())
			->to("am@waperz.com")
			->subject("Error on TDS admin")
			->send(true);

		# Log
		error_log($this->__toString(), 3, $filePath);

	}

	/**
	 * Logs data to log file with full backtrace
	 * @param string $message Adds message to messages stack
	 * @param int $code
	 *                        <b>0</b> - good, <b>1</b> - error, <b>2</b> - no message will be putted to stack
	 */
	public static function log($message, $code = 1) {
		$e = new baseException($message, $code);
		$e->saveLog();
	}

	/**
	 * Pushes error to stack
	 */
	public function toInfo() {

		# Set message type
		$type = "error";
		if($this->type == "success" || $this->type == "notice")
			$type = $this->type;

		# Add message
		info::add($this->getMessage(), $type);

	}

	/**
	 * Redefine the exception so message isn't optional
	 * @param string $message   Adds message to messages stack
	 * @param int|integer $code Define which type of message adds to stack:<br/>
	 * @param bool $show        Defines if this message will be putted to error stack
	 * @param bool $log         Defines if this message should be logged
	 */
	public function __construct($message, $code = 0, $show = true, $log = false) {


		# Make sure everything is assigned properly
		parent::__construct($message, $code);


		# Determines exception type
		switch($code) {
			case "0":
				$this->type = "success";
				break;
			case "1":
				$this->type = "error";
				break;
			case "2":
				$this->type = "other";
				break;
			case "3":
				break;
			case "4":
				$this->type = "fatal";
				break;
			case "5":
				$this->type = "database";
				break;
			default :
				$this->type = "notice";
		}

		# Logs exception data
		if($log)
			$this->saveLog();

		# Adds message to stack
		if($show)
			$this->toInfo();

	}

}

/* Advanced exception */

/** This exception class always logged and never showed to user */
class systemException extends baseException {
	public function __construct($message, $code = 1) {
		parent::__construct($message, $code, false, true);
	}
}

/** Exception on system error */
class systemErrorException extends systemException {
	public function __construct($message) {

		parent::__construct($message, 1);
	}
}

/** Exception on system notice error */
class systemNoticeException extends systemException {
	public function __construct($message) {
		parent::__construct($message, 1);
	}
}

/** System fatal exception */
class systemFatalException extends systemException {
	public function __construct($message) {
		parent::__construct($message, 4);
	}
}

/** System fatal exception */
class systemErrorDataException extends systemException {
	public $data;

	/**
	 * Log differs from parent
	 * @return string
	 */
	public function __toString() {
		$str = parent::__toString();
		return $str . "\nData:" . var_export($this->data, true);
	}

	/**
	 * Constructs
	 * @param string $message
	 * @param array $data
	 */
	public function __construct($message, $data = array()) {
		$this->data = $data;
		parent::__construct($message, 1);
	}
}

/** Class of exception which throws database messages */
class databaseException extends systemException {
	# Redefine the exception so message isn't optional
	public function __construct($message) {
		parent::__construct($message, 5);

	}
}

/** Exception by user fault */
class userException extends baseException {
	public function __construct($message, $type, $show = true) {
		parent::__construct($message, $type, $show, false);
	}
}

/** Error exception by user fault */
class userErrorException extends userException {
	public function __construct($message, $show = true) {
		parent::__construct($message, 1, $show);
	}
}

/** Error exception if user permission restricted */
class userPermissionException extends userErrorException {
	public function __construct($message, $show = true) {
		parent::__construct($message, $show);
	}
}

/** Notice exception by user fault */
class userNoticeException extends userException {
	public function __construct($message, $show = true) {
		parent::__construct($message, 3, $show);
	}
}

/** Exception for authorization */
class userAuthorisationException extends userException {
	public function __construct($message = "Вы должны войти в систему", $show = true) {
		parent::__construct($message, 1, $show);
	}
}

/** Exception on system error */
class system404Exception extends baseException {
	public function __construct($message, $code = 1) {
		parent::__construct($message, $code, false, false);
	}
}