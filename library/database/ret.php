<?php

# Special namespace
namespace sky\db;


/**
 * Class DBR, holds return values of query execution
 * @package sky\db
 */
abstract class ret {

	/** All rows in request */
	const ALL = "all";

	/** First result row */
	const SINGLE = "single";

	/** PDO cursor */
	const CURSOR = "cursor";

	/** Query string, no query would be performed */
	const QUERY = "query";

	/** Updated rows count */
	const UPDATED = "updated";

	/** Last inserted id */
	const ID = "id";

	/** True on success */
	const NONE = "none";

	/** First cell if first result row */
	const VALUE = "value";
}