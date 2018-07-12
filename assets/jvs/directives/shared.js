sky.directive("[data-tip]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipName = attributes["data-tip"],
		event   = "click: shared.showTip('" + tipName + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-text]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipText = attributes["data-tip-hover"] || attributes["data-tip-text"],
		event   = "click: shared.showTipWithText('" + tipText + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-hover]", function(button, attributes) {

	// Get
	let tipText = attributes["data-tip-hover"];

	sky.service("tips").bind(button, "top", {create: tipText});

	// Set new
	let events = attributes["data-event"] || "",
		event  = "click: shared.showTipWithText('" + tipText + "')";
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-suggests]", function(element, attributes) {
	element.attr("data-event", "keyup: suggest." + attributes["data-suggests"]).attr("autocomplete", "off");
});
sky.directive("input.autoHttp", function(input) {
	input.on("focus", function() {
		if(input.val() === "") input.val("http://").get(0).selectionStart = 7;
	});
});