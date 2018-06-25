<?php

ini_set("display_errors", 1);
ini_set("session.gc_maxlifetime", 86400);
error_reporting(E_ALL);

/**
 * Include main library file
 */
include "../library/core/main.php";
$preferences["locations"]["html"] = __DIR__ . "/";

/**
 * New sky object performs all initializations
 */
new \sky\sky();

