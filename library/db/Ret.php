<?php

# Special namespace
namespace sky\db;


/**
 * Class DBR, holds return values of query execution
 * @package sky\db
 */
abstract class Ret {

	/** All rows in request */
	const ALL = "all";

	/** All rows in request as array without keys */
	const ALL_NUM = "all_num";

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