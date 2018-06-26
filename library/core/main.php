<?php 

# Set preferences
date_default_timezone_set('Europe/Moscow');
ini_set("max_execution_time", 15);
mb_internal_encoding("utf-8");

# Include preferences
require realpath(dirname(__FILE__)."/../../preferences/main.php");
global $preferences;

# Set errors
if(!empty($dev)) {
	ini_set("display_errors", 1);
	error_reporting(E_ALL);
}

# Path to include files
set_include_path(dirname(__FILE__));

# Classes
require_once "exceptions.php";
require_once "sky.php";

require_once $preferences["locations"]["library"] . "auth/authentication.php";
require_once $preferences["locations"]["library"] . "database/database2.php"; 
require_once $preferences["locations"]["library"] . "utils/datetime.php"; 
require_once $preferences["locations"]["library"] . "fileSystem/file.php"; 
require_once $preferences["locations"]["library"] . "fileSystem/directory.php";
require_once $preferences["locations"]["library"] . "fileSystem/upload.php";
require_once $preferences["locations"]["library"] . "fileSystem/uploadedFile.php";
require_once $preferences["locations"]["library"] . "fileSystem/file.php";
require_once $preferences["locations"]["library"] . "utils/info.php";
require_once $preferences["locations"]["library"] . "images/image.php"; 
require_once $preferences["locations"]["library"] . "network/network.php"; 
require_once $preferences["locations"]["library"] . "network/request.php"; 
require_once $preferences["locations"]["library"] . "utils/utilities.php"; 
require_once $preferences["locations"]["library"] . "utils/validator.php"; 
require_once $preferences["locations"]["library"] . "utils/vars.php";

require_once $preferences["locations"]["library"] . "utils/Filter/VarFilter.php";
require_once $preferences["locations"]["library"] . "utils/Filter/ArrayFilter.php";
require_once $preferences["locations"]["library"] . "utils/Filter/FilterRule.php";


