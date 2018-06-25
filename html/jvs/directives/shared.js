sky.directive("[sky-tip]", function(button, attributes) {

	// Get
	let events  = attributes["sky-event"] || "",
		tipName = attributes["sky-tip"],
		event   = "click: shared.showTip('" + tipName + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("sky-event", events).addClass("dashed");

})
.add("[sky-tip-text]", function(button, attributes) {

	// Get
	let events  = attributes["sky-event"] || "",
		tipText = attributes["sky-tip-hover"] || attributes["sky-tip-text"],
		event   = "click: shared.showTipWithText('" + tipText + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("sky-event", events).addClass("dashed");

})
.add("[sky-tip-hover]", function(button, attributes) {

	// Get
	let tipText = attributes["sky-tip-hover"];

	sky.tips.bind(button, "top", {create: tipText});

	// Set new
	let events = attributes["sky-event"] || "",
		event  = "click: shared.showTipWithText('" + tipText + "')";
	events = events ? event : events + "; " + event;

	// Add
	button.attr("sky-event", events).addClass("dashed");

})
.add("[data-suggests]", function(element, attributes) {
	element.attr("sky-event", "keyup: suggest." + attributes["data-suggests"]).attr("autocomplete", "off");
})
.add("input.autoHttp", function(input) {
	input.on("focus", function() {
		if(input.val() === "") input.val("http://").get(0).selectionStart = 7;
	});
});