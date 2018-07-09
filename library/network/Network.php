<?php

# Framework namespace
namespace sky;

/**
 * Class to work with network
 */
class Network {

	public static

		/**
		 * List if internal networks
		 * @var array
		 */
		$internalNetworks = [
			'10.0.0.0'    => '10.255.255.255',
			'172.16.0.0'  => '172.31.255.255',
			'192.168.0.0' => '192.168.255.255',
			'127.0.0.0'   => '127.0.0.1'
		],

		/** @noinspection SpellCheckingInspection
		 * Default headers to send
		 * @var array
		 */
		$defaultHeaders = [
			"Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/msword, */*",
			"Connection: Close",
			"Accept-Language: en-us",
			"Accept-Charset: iso-8859-1,*,utf-8",
			"Pragma: no-cache"
		];

	const CURL_SOCKS = "socks";
	const CURL_REQUEST = "request";
	const CURL_HEADERS = "headers";
	const CURL_POSTS = "post";
	const CURL_SSL = "ssl";
	const CURL_TIMEOUT = "timeout";
	const CURL_CONNECTION_TIMEOUT = "connectTimeout";
	const CURL_COOKIE_FILE = "cookieFile";

	const RETURN_RESPONSE = "response";
	const RETURN_HEADERS = "headers";
	const RETURN_INFO= "info";
	const RETURN_CURL = "curl";

	/**
	 * Preforms curl request
	 * @param string $url         URI of page to perform request
	 * @param array|bool $options Array of options to perform request
	 * @param array $curlOverride
	 * @return array
	 * @throws SystemErrorException
	 * @throws UserErrorException
	 */
	public static function curlRequest($url, $options = false, $curlOverride = []) {

		# Empty check
		if(empty($url))
			throw new UserErrorException("URL для выполнения запроса не задан");

		# Initializing curl
		$curl = curl_init();

		# Set parameters
		if(curl_setopt_array($curl, $curlOverride + self::compileCurlOptions($url, $options)) === false)
			throw new SystemErrorException("Can't set curl parameters");

		# Execute
		$returned = curl_exec($curl);

		# If some error
		if($returned === false) {

			# Can't resolve
			if(curl_errno($curl) == 6)
				throw new UserErrorException("Can't resolve server '$url'.");

			# Inactive
			if(curl_errno($curl) == 7)
				throw new UserErrorException("Server '$url' is inactive.");

			# Inactive
			if(curl_errno($curl) == 3)
				throw new UserErrorException("URI('$url') has wrong format.");

			# Unknown error
			throw new SystemErrorException("CURL error(#" . ($code = curl_errno($curl)) . "): " . Sky::$config["curlErrorCodes"][$code], $code);

		}

		# Fetching headers
		$headerSize = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
		$headers    = self::parseHeaders(substr($returned, 0, $headerSize - 4));

		# Resource moved
		if(empty($options["noRedirect"]) && (curl_getinfo($curl, CURLINFO_HTTP_CODE) == "301" || curl_getinfo($curl, CURLINFO_HTTP_CODE) == "302"))
			return self::curlRequest($headers["Location"], $options);

		# Fetch body
		$result = substr($returned, $headerSize);

		# Return in array
		return [self::RETURN_RESPONSE => $result, self::RETURN_HEADERS => $headers, self::RETURN_INFO => curl_getinfo($curl), self::RETURN_CURL => $curl];

	}

	/**
	 * Compiles curl options
	 * @param string $url
	 * @param array $options
	 * @return array
	 * @throws SystemErrorException
	 */
	private static function compileCurlOptions($url, $options) {

		# Set curl parameters
		/** @noinspection SpellCheckingInspection */
		$parameters = [
			CURLOPT_URL            => $url,
			CURLOPT_CUSTOMREQUEST  => "GET",
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_SSL_VERIFYHOST => false,
			CURLOPT_HEADER         => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HTTPHEADER     => self::$defaultHeaders,
			CURLOPT_USERAGENT      => "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
			CURLOPT_ENCODING       => "",
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_TIMEOUT => 20,
			CURLOPT_CONNECTTIMEOUT => 10,
			CURLOPT_IPRESOLVE      => CURL_IPRESOLVE_V4
		];

		# Go through options
		foreach($options as $name => $value) {
			switch($name) {
				case self::CURL_SOCKS:
					$parameters[CURLOPT_PROXYTYPE] = CURLPROXY_SOCKS5;
					$parameters[CURLOPT_PROXY]     = $value[0];
					$parameters[CURLOPT_PROXYPORT] = $value[1];
					break;
				case self::CURL_REQUEST:
					$parameters[CURLOPT_CUSTOMREQUEST] = $value;
					if($value == "HEAD") $parameters[CURLOPT_HEADER] = 1;
					break;
				case self::CURL_HEADERS:
					$parameters[CURLOPT_HTTPHEADER] = $value;
					break;
				case self::CURL_TIMEOUT:
					$parameters[CURLOPT_TIMEOUT] = $value;
					break;
				case self::CURL_CONNECTION_TIMEOUT:
					$parameters[CURLOPT_CONNECTTIMEOUT] = $value;
					break;
				case self::CURL_COOKIE_FILE:
					$parameters[CURLOPT_COOKIEJAR]  = $value;
					$parameters[CURLOPT_COOKIEFILE] = $value;
					break;
				case self::CURL_POSTS:
					$parameters[CURLOPT_POST] = 1;				# Post data usage flag
					$parameters[CURLOPT_POSTFIELDS] = $value; 	# Set parameter
					break;
				default: throw new SystemErrorException("Unknown curl option: $name");
			}
		}

		return $parameters;
	}

	/**
	 * Would parse headers data
	 * @param string $data Headers data
	 * @return mixed
	 */
	static function parseHeaders($data) {

		$return = array();
		$data   = explode("\r\n", $data);

		foreach($data as $lineNumber => $headerText) {
			if(!$lineNumber)
				continue;
			$data = explode(": ", $headerText, 2);
			if(count($data) == 2)
				$return[$data[0]] = $data[1];
		}

		return $return;

	}

	# Get user's real IP address
	static function checkUserIp() {

		# Check for predefined variables
		if(!isset($_SERVER['HTTP_X_FORWARDED_FOR']) || empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			if(!isset($_SERVER['HTTP_X_REAL_IP']) || empty($_SERVER['HTTP_X_REAL_IP']))
				return false;
			$ip = $_SERVER['HTTP_X_REAL_IP'];
		} else
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];

		# Set ip string to int
		$ip = sprintf("%u\n", ip2long($ip));

		# Check for net affiliation of ip
		foreach(self::$internalNetworks as $firstIp => $lastIp) {

			# Set ip string to int
			$firstIp = sprintf("%u\n", ip2long($firstIp));
			$lastIp  = sprintf("%u\n", ip2long($lastIp));

			# Ignoring internal nets
			if(($firstIp <= $ip) && ($ip <= $lastIp))
				return false;
		}

		return $ip;
	}

	/**
	 * get IP address by host url
	 * @param string $url String contains url
	 * @throws UserErrorException
	 * @return int
	 * @internal param String $url Url which is host parameter of parse_url
	 */
	public static function getIpByAddress($url) {

		# Remove https and https
		if(mb_strpos($url, "https://", 0, "utf-8") === 0)
			$url = mb_substr($url, 8, mb_strlen($url, "utf-8"), "utf-8");
		elseif(mb_strpos($url, "http://", 0, "utf-8") === 0)
			$url = mb_substr($url, 7, mb_strlen($url, "utf-8"), "utf-8");

		# Remove last slash
		if($url[mb_strlen($url, "utf-8") - 1] == "/")
			$url = mb_substr($url, 0, mb_strlen($url, "utf-8") - 1, "utf-8");

		# Exec trace command
		exec("/usr/bin/dig $url A +short | /usr/bin/tail -1", $urlIp);

		# If no result
		if(!sizeof($urlIp))
			throw new UserErrorException("Невозможно определить IP-адрес по url: " . $url);

		# Convert
		$urlIpInt = ip2long($urlIp[0]);

		# Validate IP
		if($urlIpInt[0] == -1 || $urlIp[0] != long2ip($urlIpInt))
			throw new UserErrorException("Невозможно определить IP-адрес по url – " . $url);

		# Return
		return $urlIpInt;

	}

	public static function saveStringAsFile($string, $filename, $mime = false) {

		# Mime type
		if(!$mime)
			$mime = "application/octet-stream";

		# Draw headers
		header('Content-Disposition: attachment; filename="' . $filename . '"');
		header('Content-length: ' . strlen($string));
		header("Content-type: " . $mime);
		echo $string;
		exit();

	}

}
