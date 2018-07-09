<?php

# Framework namespace
namespace sky\info;

# Message
class Message {

	public
		$text,
		$type = "error",
		$subtype = "global";

	public function __construct($text, $type, $subtype) {
		$this->text = $text;
		$this->type = $type;
		$this->subtype = $subtype;
	}

}
