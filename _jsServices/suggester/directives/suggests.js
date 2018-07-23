sky.directive("[data-suggests]", function(element, attributes) {
	element.attr("data-event", "keyup: suggest." + attributes["data-suggests"]).attr("autocomplete", "off");
});