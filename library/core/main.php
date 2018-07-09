<?php 

# Set preferences
date_default_timezone_set('Europe/Moscow');
ini_set("max_execution_time", 15);
mb_internal_encoding("utf-8");
ini_set("session.gc_maxlifetime", 86400);

# Include preferences
require __DIR__ . "/../../project/preferences/main.php";
global $preferences;

# Set errors
if(!empty($dev)) {
	ini_set("display_errors", 1);
	error_reporting(E_ALL);
}

# Path to include files
set_include_path(dirname(__FILE__));

# Classes
require_once __DIR__ . "/exceptions.php";
require_once __DIR__ . "/Sky.php";
require_once __DIR__ . "/../auth/Auth.php";
require_once __DIR__ . "/../database/DB2.php";
require_once __DIR__ . "/../utils/DateTime.php";
require_once __DIR__ . "/../fileSystem/File.php";
require_once __DIR__ . "/../fileSystem/Directory.php";
require_once __DIR__ . "/../fileSystem/Upload.php";
require_once __DIR__ . "/../fileSystem/File.php";
require_once __DIR__ . "/../fileSystem/UploadedFile.php";
require_once __DIR__ . "/../utils/Info.php";
require_once __DIR__ . "/../images/Image.php";
require_once __DIR__ . "/../network/Network.php";
require_once __DIR__ . "/../network/Request.php";
require_once __DIR__ . "/../utils/Utilities.php";
require_once __DIR__ . "/../utils/Validator.php";
require_once __DIR__ . "/../utils/Vars.php";
require_once __DIR__ . "/../utils/Filter/ArrayFilter.php";


