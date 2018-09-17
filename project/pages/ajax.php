<?php

use sky\auth;
use sky\request;
use sky\sky;
use sky\userData as ud;
use sky\userErrorException;
use sky\vars;

/**
 * Sends error back data
 * @param   array|string $params What to send backs
 * @param string|bool    $name   Name of return element to set params to
 */
function jError($params, $name = false) {

    # Set content type
    header("Content-Type: application/json");

    # Converting
    if(is_string($params) && !$name)
        $name = "text";

    # Set ass array part
    if($name)
        $params = array($name => $params);

    # Sending
    die(json_encode(array_merge(array("error" => true), $params)));

}

/**
 * Sends success back data
 * @param   array|string $params What to send backs
 * @param string|bool $name      Name of return element to set params to
 * @throws userErrorException
 */
function jSend($params, $name = false) {

    # Set content type
    header("Content-Type: application/json");

    # Converting
    if(is_string($params) && !$name)
        $name = "text";

    # Set ass array part
    if($name)
        $params = array($name => $params);

	# Sending
	if(!$result = json_encode(array_merge(array("error" => false), $params)))
		throw new userErrorException("Can't convert final data to JSON: " . json_last_error_msg());

    # Sending
    die($params);

}

# Headers
header('Content-type: application/json');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");     // Date in the past to disable cache

try {

    # Set section
    if(sizeof($realPathParts = Request::getOriginalPathParts()) > 1)
        $section = $realPathParts[1];

    # Operation subtype
    if(sizeof($realPathParts) > 2)
		$action = $realPathParts[2];
    else
        $action = vars::action();

    # Check
    if(!$action || !preg_match('^/\w+/$', $action))
		jError("Wrong action provided");

    # Require
	if(file_exists(__DIR__ . "ajax/$action.php"))
		require_once __DIR__ . "ajax/" . "$action.php";

	# If no handler worked
	jError("No such action");

}
# Database errors
catch(\sky\databaseException $e) {
    jError("Sorry, error with database occurred");
}
# User error
catch(\sky\userException $e) {
    jError($e->getMessage());
}
# Operations error
catch(\sky\systemException $e) {
    jError("Sorry, inner error occurred");
}
# Operations error
catch(Exception $e) {
    \sky\baseException::log($e->getMessage());
    jError("Sorry, inner error occurred");
}