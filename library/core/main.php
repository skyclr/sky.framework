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
require_once __DIR__ . "/sky.php";
require_once __DIR__ . "/../auth/authentication.php";
require_once __DIR__ . "/../database/database2.php";
require_once __DIR__ . "/../utils/datetime.php"; 
require_once __DIR__ . "/../fileSystem/file.php"; 
require_once __DIR__ . "/../fileSystem/directory.php";
require_once __DIR__ . "/../fileSystem/upload.php";
require_once __DIR__ . "/../fileSystem/uploadedFile.php";
require_once __DIR__ . "/../fileSystem/file.php";
require_once __DIR__ . "/../utils/info.php";
require_once __DIR__ . "/../images/image.php"; 
require_once __DIR__ . "/../network/network.php"; 
require_once __DIR__ . "/../network/request.php"; 
require_once __DIR__ . "/../utils/utilities.php"; 
require_once __DIR__ . "/../utils/validator.php"; 
require_once __DIR__ . "/../utils/vars.php";
require_once __DIR__ . "/../utils/Filter/ArrayFilter.php";


