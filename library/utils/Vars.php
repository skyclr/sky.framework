<?php 

# Framework namespace
namespace sky;

/** Class to work with user and other variables */
class Vars {

	/**
	 * Reorders array by specified field, uses it values in keys
	 * @param array       $data    Array of data to sort
	 * @param String      $name    Name of keys to sort by values of
	 * @param bool|String $key     Special key name which will be used in $name $return[$record[$name]][$key] = $record;
	 * @return array
	 */
	public static function reorderByKey($data, $name = "id", $key = false) {

		# Result array
		$result = array();

		# If no data then empty result
		if(!is_array($data)) 
			return $result;

		# Go through data
		foreach($data as $record) {
			
			# Adds additional key
			if($key !== false) 
				$result[$record[$name]][$key] = $record[$key];
			# Or simple key ordering
			else 
				$result[$record[$name]] = $record;
			
		}

		# Return
		return $result;
		
	}

	/**
	 * Reorders array by specified field, uses it values in keys
	 * @param array $data  Array of data to sort
	 * @param String $name Name of keys to sort by values of
	 * @param string $secondName
	 * @return array
	 */
	public static function doubleReorderByKey($data, $name, $secondName) {

		# Result array
		$result = array();

		# If no data then empty result
		if(!is_array($data))
			return $result;

		# Go through data
		foreach($data as $record) {

			if(!isset($result[$record[$name]]))
				$result[$record[$name]] = [];

			$result[$record[$name]][$record[$secondName]] = $record;
		}

		# Return
		return $result;

	}
	/**
	 * Gets list of values from array of arrays
	 * @param array  $data Array of arrays
	 * @param string $name Name in each array
	 * @param bool   $key
	 * @return array
	 */
    public static function getByKey($data, $name = 'id', $key = false) {

		# Empty result
    	$result = array();

		# If wrong data
		if(!is_array($data))
			return $result;

    	# Go through array
    	foreach($data as $item) {

			# If not suck key value
    		if(!isset($item[$name])) 
				continue;

			# If need order key
			if($key)	
				$result[$item[$key]] = $item[$name];
			# Simple value get otherwise
			else		
				$result[] = $item[$name];
    	}
    	
		# Return
    	return $result;
    
    }

	/**
	 * Returns POST or GET action variable
	 * @param array|bool $availableActions is set search action value in this array and return false on no entry
	 * @return string|bool String of action or may return FALSE if no set or not in array
	 */
    public static function action($availableActions = false) {

		# If no get
		if (!isset($_GET['action'])) {
			
			# The we'll search post
            if (isset($_POST['action'])) $action = $_POST['action'];
            else $action = false;
        }
        else $action = $_GET['action'];

		# If no correction
        if ($availableActions === false)
			return $action;

        # If AT not an array
        if (!is_array($availableActions) && $action == $availableActions)
			return $action;

		# If in array
        if(in_array($action, $availableActions))
			return $action;

        # If no match
        return false;
 
    }

	/**
	 * Returns POST or GET subtype variable
	 * @param array|bool $availableTypes Array of types if not math return false
	 * @return string|bool String or false if not set or not math available types
	 */
     public static function subtype($availableTypes = false) {

		# If no get
		if (!isset($_GET['subtype'])) {
			
			# The we'll search post
            if (isset($_POST['subtype'])) $type = $_POST['subtype'];
            else $type = false;
        }
        else $type = $_GET['subtype'];

		# If no correction
        if ($availableTypes === false) 
			return $type;

        # If AT not an array
        if (!is_array($availableTypes) && $type == $availableTypes) 
			return $type;

		# If in array
        if(in_array($type, $availableTypes)) 
			return $type;

        # If no match
        return false;
    }

    public static function valuesToFloat($data) {
     	foreach($data as &$val)
     		$val = (float)$val;
     	return $data;
	}

	/**
	 * Creates new array where keys are SUM of $data values arrays [[a=>1,b=>2][a=>3,b=>4]] => [a=>4,b=>6]
	 * @param array $data Array of arrays
	 * @return array
	 */
    public static function sumKeys($data) {

    	# Result
     	$result = [];

     	# Go through rows
     	foreach($data as $row) {

     		# Go through values
     		foreach($row as $name => $value) {

     			# Add if not
				if(!isset($result[$name]))
					$result[$name] = 0;

				# Sum
				$result[$name] += $value;

			}
		}

		# Return
     	return $result;

	}

	/**
	 * Appends string to each array element
	 * @param $data
	 * @param $string
	 * @return array|string
	 */
	public static function appendString($data, $string) {
		if(is_array($data)) {
			foreach($data as $i => $value)
				$data[$i] = self::appendString($value, $string);
			return $data;
		}
		return $data . $string;
	}

	/**
	 * Trims each string in array
	 * @param $data
	 * @return array|string
	 */
	public static function trim($data) {
		if(is_array($data)) {
			foreach($data as $i => $value)
				$data[$i] = self::trim($value);
			return $data;
		}
		if(is_string($data))
			return trim($data);

		return $data;
	}
	
}