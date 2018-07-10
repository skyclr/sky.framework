<?php

require_once "JSTemplateNode.php";

/**
 * Class for parsing jsTemplate Tag
 */
class JSTemplateTag extends Twig_TokenParser {

	/**
	 * Tag parse
	 * @param Twig_Token $token
	 * @return JSTemplateNode
	 * @throws Twig_Error_Syntax
	 */
	public function parse(Twig_Token $token) {
		$value = $this->parser->getExpressionParser()->parseExpression();
		$stream = $this->parser->getStream();
		$body = $this->parser->subparse(array($this, 'decideIfEnd'));
		$stream->next()->getValue();
		$stream->expect(Twig_Token::BLOCK_END_TYPE);

		return new JSTemplateNode($body, $value, $token->getLine(), $this->getTag());
	}

	/**
	 * Defines open tag
	 * @return string
	 */
	public function getTag() {
		return 'JSTemplate';
	}

	/**
	 * Defines close tag
	 * @param Twig_Token $token
	 * @return bool
	 */
	public function decideIfEnd(Twig_Token $token) {
		return $token->test(array('endJSTemplate'));
	}

}