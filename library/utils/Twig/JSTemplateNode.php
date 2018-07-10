<?php

/**
 * Class jsTemplate compiler
 */
class JSTemplateNode extends Twig_Node {

	/**
	 * @param Twig_Node            $body
	 * @param Twig_Node_Expression $value
	 * @param int                  $line
	 * @param null                 $tag
	 */
	public function __construct(Twig_Node $body, Twig_Node_Expression $value, $line, $tag = null) {
		parent::__construct(array('value' => $value, "body" => $body), array(), $line, $tag);
	}

	/**
	 * Compile tag
	 * @param Twig_Compiler $compiler
	 */
	public function compile(Twig_Compiler $compiler) {

		# Compile tag
		$compiler
			->write("echo '<script type=\"text/template\" id=\"'; echo")
			->subcompile($this->getNode('value'))
			->write(';echo "\">";')
			->subcompile($this->getNode('body'))
			->write('echo "</script>";');
	}
}