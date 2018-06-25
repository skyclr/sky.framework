<?php

/**
 * Main project location
 */
$preferences['locations'] = array("root" => realpath(dirname(__FILE__) . "/../../") . "/");

/**
 * Contains array of  main locations paths
 */
$preferences['locations'] += array(
	"html"    => $preferences['locations']['root'] . "public_html/",
	"project" => $preferences['locations']['root'] . "project/",
	"library" => $preferences['locations']['root'] . "library/",
);

# Inners main paths
$preferences['locations'] += array(

	"vendor"    => $preferences['locations']['library'] . "vendor/",
	"classes"   => $preferences['locations']['project'] . "classes/",
	"pages"     => $preferences['locations']['project'] . "pages/",
	"cron"      => $preferences['locations']['project'] . "cron/",
	"templates" => $preferences['locations']['project'] . "templates/",
	"storage"   => $preferences['locations']['project'] . "storage/",
	"temp"      => "/tmp/"

);

# Twig paths
$preferences['locations'] += array(
	"twigCache"  => $preferences['locations']['templates'] . "cache/",
	"twigSystem" => $preferences['locations']['templates'] . "system/",
	"twigJs"     => $preferences['locations']['templates'] . "js/",
);

# Storage
$preferences['locations'] += array(
	'mail'       => $preferences['locations']['storage'] . "mail/",
	'mailNotify' => $preferences['locations']['storage'] . "mailNotify/",
	"logs"       => $preferences['locations']['storage'] . "logs/"
);

# PHP project paths
$preferences['locations'] += array(
	"phpCore"     => $preferences['locations']["classes"] . "core/",
	"phpEntities" => $preferences['locations']["classes"] . "entities/",
	"phpManagers" => $preferences['locations']["classes"] . "managers/",
	"phpHelpers"  => $preferences['locations']["classes"] . "helpers/"
);

# Resources URL paths
$preferences['resources'] = array(
	"css" => $preferences['site']['base'] . "css/",
	"img" => $preferences['site']['base'] . "img/",
	"jvs" => $preferences['site']['base'] . "jvs/",
);