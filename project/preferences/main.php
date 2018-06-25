<?php

# Developer platform flag
$dev = true;

/**
 * Global system preferences
 */
$preferences = [

	/**
	 * Development parameters
	 */
	"development"  => [
		"dev"             => $dev,
		"traceExceptions" => $dev ? "screen" : false, # Outputs all exceptions on screen
		"noTwigCache"     => true
	],

	/**
	 * External preferences table
	 */
	"preferences"  => [
		"external" => false # table name with external preferences
	],

	/**
	 * Save info results to session.
	 */
	"sessionInfo"  => true,

	/**
	 * Main site preferences
	 */
	"site"         => [
		"name"      => "My site",
		"signature" => "",
		"base"      => "/",
		"url"       => isset($_SERVER) ? $_SERVER["SERVER_NAME"] : "",
		"infoEmail" => "NOREPLY@example.com",
	],

	/**
	 * Database connection parameters
	 * if FALSE the not used
	 */
	"database"     => [
		"use"      => false,
		"host"     => "127.0.0.1",
		"name"     => "databaseName",
		"port"     => "3306",
		"user"     => "admin",
		"password" => "",
		"charset"  => "UTF8"
	],

	/**
	 * Authenticate preferences
	 * If FALSE then not used
	 */
	"authenticate" => [
		"use"         => false,
		"table"       => "users",
		"domain"      => "/",
		"redirect"    => false,
		"changeable"  => [],
		"preferences" => false
	],

	/**
	 * System pages names
	 */
	"systemPages"  => [
		"errorGlobal" => "errorGlobal", # Global error page location
		"errorPage"   => "errorPage"    # Error during page render path
	],

	/**
	 * SMTP mail properties
	 */
	"smtp"         => [
		"server"   => "smtp.gmail.com",
		"port"     => 465,
		"login"    => "user",
		"password" => "password",
		"ssl"      => true
	]

];

/**
 * Holds project locations
 */
require_once "locations.php";

/**
 * Holds templates information
 */
require_once "templates.php";

/**
 * Holds pages information
 */
require_once "pages.php";