<?php

# Framework namespace
namespace sky;

/**
 * Base class for all exceptions
 * <b>Extends</b> Exception
 */
class BaseException extends \Exception {

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
			if(!empty($trace["line"])) {
				if(isset($trace["file"]) && $trace["file"] == $this->file && ($trace["line"] == $this->line || $trace["line"] == ($this->line + 1)))
					$traceData .= ">>>";
				$traceData .= "\t line: {$trace["line"]} \t file: {$trace["file"]}";
				$traceData .= "\n";
			}
		}

		# Convert
		return @date("d.m.Y H:i") . "\nException($this->type, $this->line): $this->message" . ";\n$traceData\n\n";

	}

	/**
	 * Custom string representation of object
	 * @return string String class representation
	 */
	public function toHTML() {


		# Get backtrace
		$backtrace = array_reverse(debug_backtrace());

		$text = @date("d.m.Y H:i") . "<h3>" . ucfirst($this->type) . ": $this->message</h3>";
		$text .= "<table>";

		# Format backtrace
		foreach($backtrace as $trace) {
			if(isset($trace["file"]) && $trace["file"] == $this->file && ($trace["line"] == $this->line || $trace["line"] == ($this->line + 1))) {
				$trace["line"] = "<b>{$trace["line"]}</b>";
				$trace["file"] = "<b>{$trace["file"]}</b>";
			}

			if(!empty($trace["line"]))
				$text .= "<tr><td style='padding: 5px;'>{$trace["line"]}</td><td style='padding: 5px;'>{$trace["file"]}</td></tr>";
		}

		return $text . "</table>";
	}

	/**
	 * Logs data to log file with full backtrace
	 * <b>0</b> - good, <b>1</b> - error, <b>2</b> - no message will be putted to stack
	 */
	public function saveLog() {

		# Get log file path
		if(isset(Sky::$config) && isset(Sky::$config["locations"]["logs"]))
			$filePath = Sky::$config["locations"]["logs"] . "errorLog_" . @date("d.m") . ".txt";

		# If we need to show
		if(!empty(Sky::$config['development']['traceExceptions']) && Sky::$config['development']['traceExceptions'] == "screen")
			echo Sky::getType() == Sky::INIT_TYPE_CONSOLE ? "$this\n" : "<pre>$this</pre>";

		# Check key
		if(!empty(Sky::$config['development']['noLog']))
			return;

		# Try to create file if not exists
		if(!isset($filePath) || (!file_exists($filePath) && !touch($filePath)) || !is_writable($filePath))
			return;

		# Log
		error_log($this->__toString(), 3, $filePath);

	}

	public function email() {

		if(!class_exists("\\Email") || empty(Sky::$config["development"]["errorEmail"]))
			return;

		# Email send
		$email = \Email::make()->from(Sky::$config["site"]["infoEmail"])
			->plainText($this->__toString())
			->to(Sky::$config["development"]["errorEmail"])
			->subject("Error site " . Sky::$config["site"]["name"]);

		# Try to render email
		try {
			if(!empty(Sky::$twig))
				$email->render("ErrorNotify", [
					"header"  => "Error " . (isset($preferences["site"]["name"]) ? $preferences["site"]["name"] : ""),
					"content" => $this->toHTML(),
					"footer"  => isset(Sky::$config['site']['signature']) ? Sky::$config['site']['signature'] : date("d.m.y H:i")
				]);
		} catch(\Exception $e) {
			$email->text("<h1>Error " . (isset($preferences["site"]["name"]) ? $preferences["site"]["name"] : "") . "</h1><p>$this</p>");
		}

		# Send
		$email->send(true);

	}

	/**
	 * Logs data to log file with full backtrace
	 * @param string $message Adds message to messages stack
	 * @param int $code
	 *                        <b>0</b> - good, <b>1</b> - error, <b>2</b> - no message will be putted to stack
	 */
	public static function log($message, $code = 1) {
		$e = new BaseException($message, $code);
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
		Info::add($this->getMessage(), $type);

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
class SystemException extends BaseException {
	public function __construct($message, $code = 1) {
		parent::__construct($message, $code, false, true);
	}
}

/** Exception on system error */
class SystemErrorException extends SystemException {
	public function __construct($message) {

		parent::__construct($message, 1);
	}
}

/** Exception on system notice error */
class SystemNoticeException extends SystemException {
	public function __construct($message) {
		parent::__construct($message, 1);
	}
}

/** System fatal exception */
class SystemFatalException extends SystemException {
	public function __construct($message) {
		parent::__construct($message, 4);
	}
}

/** System fatal exception */
class SystemErrorDataException extends SystemException {
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
class DatabaseException extends SystemException {
	# Redefine the exception so message isn't optional
	public function __construct($message) {
		parent::__construct($message, 5);

	}
}

/** Exception by user fault */
class UserException extends BaseException {
	public function __construct($message, $type, $show = true) {
		parent::__construct($message, $type, $show, false);
	}
}

/** Error exception by user fault */
class UserErrorException extends UserException {
	public function __construct($message, $show = true) {
		parent::__construct($message, 1, $show);
	}
}

/** Error exception if user permission restricted */
class UserPermissionException extends UserErrorException {
	public function __construct($message, $show = true) {
		parent::__construct($message, $show);
	}
}

/** Notice exception by user fault */
class UserNoticeException extends UserException {
	public function __construct($message, $show = true) {
		parent::__construct($message, 3, $show);
	}
}

/** Exception for authorization */
class UserAuthorisationException extends UserException {
	public function __construct($message = "Вы должны войти в систему", $show = true) {
		parent::__construct($message, 1, $show);
	}
}

/** Exception on system error */
class System404Exception extends BaseException {
	public function __construct($message, $code = 1) {
		parent::__construct($message, $code, false, false);
	}
}