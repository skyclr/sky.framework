<?php

# Set namespace
namespace sky\db;

# Exceptions required
use sky\baseException;
use sky\databaseException;

# Core
require_once("core.php");
require_once("ret.php");
require_once("join.php");
require_once("condition.php");

# Exceptions required
require_once("databaseQuery.php");


/**
 * This class will provide main abstraction level to
 * work with databases
 */
class DB2 extends Core {

	protected
		$queryCount, # Number of queries performed in this page
		$queryStats, # Queries info
		$saveQueriesInfo = false,
		$databaseType, # Database type
		$databaseHost, # MySQL host address
		$databaseName, # Database name
		$databaseUser, # User name
		$databasePassword, # Password

		/**
		 * PDO connection object
		 * @var \PDO
		 */
		$databaseLink,

		/**
		 * Available return types
		 * @var array
		 */
		$returnTypes = array(
			"all", 		# All data in one array of arrays
			"single", 	# Array of first row
			"cursor", 	# PDOStatement
			"query", 	# Query string, no query performed
			"updated", 	# Number of updated/deleted rows
			"id", 		# Last inserted id
			"none", 	# True
			"value"), 	# First value of first row

		$traceTypes = array(true, "time", "safe");

	/**
	 * Creates new database connector instance, works through PDO
	 * @param String $address  Database url or ip
	 * @param String $database Database name
	 * @param String $user     User name to access
	 * @param String $password Password to access
	 * @param String $type     Type of database, all types which are imported in to your PDO class
	 */
	public function __construct($address, $database, $user, $password, $type = "mysql") {

		$this->databaseHost     = $address;
		$this->databaseName     = $database;
		$this->databaseUser     = $user;
		$this->databasePassword = $password;
		$this->databaseType     = $type;
		$this->queryCount       = 0;
	}

	/**
	 *
	 * Prepares query object
	 * @param array|string|boolean $tables Table or list of table
	 * @return DatabaseQuery
	 */
	public function make($tables = false) {

		# Get new query builder
		return new DatabaseQuery($this, $tables);

	}

	/**
	 * Return database connection object
	 * @return \PDO
	 * @throws databaseException
	 */
	private function connect() {

		# Checks connection parameters
		if(!isset($this->databaseHost) || !isset($this->databaseName) || !isset($this->databaseUser) || !isset($this->databasePassword))
			throw new databaseException("Connection parameters doesn't initialized");

		# Checks if link exists
		if(isset($this->databaseLink))
			return $this->databaseLink;

		try {

			$link = @new \PDO($this->databaseType . ":dbname=" .
				$this->databaseName . ";host=" .
				$this->databaseHost,
				$this->databaseUser,
				$this->databasePassword);
			#,array(PDO::ATTR_PERSISTENT => true));

			$data = $link->query('SET NAMES UTF8');
			$data->closeCursor();

		} catch(\PDOException $e) {
			throw new databaseException("Database connection error: " . $e->getMessage());
		}

		# If all ok
		return $this->databaseLink = $link; # Save link to DB in global variable

	}

	/**
	 * Performs query
	 * @param String      $query  Query string to be performed
	 * @param bool|String $return Return data type
	 * @param bool|String $trace  Tracing query type
	 * @throws ..\databaseException
	 * @return mixed
	 */
	public function query($query, $return = false, $trace = false) {

		# Check trace type
		if($trace && !in_array($trace, $this->traceTypes))
			throw new databaseException("Wrong trace type: " . $trace);

		# Connect if needed
		$link = $this->connect();

		try {

			# Tracing output
			$beginTime = microtime(true);
			if($trace === true) echo "Query was: $query";
			if($trace === "safe") {
				echo "Query was: $query";
				return false;
			}
			if($return === "query") return $query;

			if($this->saveQueriesInfo) {
				$stat = array("query" => $query, "return" => $return, "trace" => $trace);
				$this->queryStats[] = &$stat;
			}

			# Prepare request
			$statement = $link->prepare($query);

			# Is statement not prepared
			if($statement === false) {
				$error = $link->errorInfo();
				throw new databaseException("Database query error: " . $error[2] . "\nQuery was: " . $query);
			}

			# Executes query
			$error = $statement->execute();

			# If error occupied
			if($error === false) {
				$error = $statement->errorInfo();
				throw new databaseException("Database query error: " . $error[2] . "\nQuery was: " . $query);
			}

			# Query count incrementation
			$this->queryCount++;

			if($this->saveQueriesInfo)
				$stat["time"] = round((microtime(true) - $beginTime), 4);

			# Cursor return
			if($trace === "time")
				echo "Query \"$query\" <br/>execution time: " . round((microtime(true) - $beginTime), 4) . "sec";

			# Returns
			switch($return) {
				case Ret::CURSOR:
					return $statement;
				case Ret::NONE:
					return true;
				case Ret::UPDATED:
					$data = $statement->rowCount();
					break;
				case Ret::ID:
					$data = $link->lastInsertId();
					break;
				case Ret::VALUE:
					$data = $statement->fetch(\PDO::FETCH_NUM);
					$data = $data ? $data[0] : false;
					break;
				case Ret::SINGLE:
					$data = $statement->fetch(\PDO::FETCH_ASSOC);
					break;
				case Ret::ALL_NUM:
					$data = $statement->fetchAll(\PDO::FETCH_NUM);
					break;
				default:
					$data = $statement->fetchAll(\PDO::FETCH_ASSOC);
			}

			# Clear cursor
			$statement->closeCursor();
			$statement = null;

			# Return
			return $data;

		} catch(\PDOException $e) {
			throw new databaseException("Database error($return): " . $e->getMessage() . " file: " . $e->getFile(). ", line: " . $e->getLine() . "\nQuery was: $query");
		}
	}

	/**
	 * Returns pointer for current connection
	 * @return \PDO connection resource or FALSE if no connection initialized
	 */
	public function getLink() {
		return $this->databaseLink;
	}

	/**
	 * Returns number of executed queries
	 */
	public function getQueriesCount() {
		return $this->queryCount;
	}

	/**
	 * Returns info of executed queries
	 * saveQueriesInfo must be called before this
	 */
	public function getQueriesInfo() {
		return $this->queryStats;
	}

	/**
	 * Returns info of executed queries
	 * saveQueriesInfo must be called before this
	 */
	public function clearQueriesInfo() {
		return $this->queryStats = false;
	}

	/**
	 * If set to TRUE all queries would be saved
	 * @param bool $save
	 * @return $this
	 */
	public function saveQueriesInfo($save = true) {
		$this->saveQueriesInfo = $save;
		return $this;
	}



}