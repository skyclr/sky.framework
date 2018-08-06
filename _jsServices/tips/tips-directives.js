sky.directive("[data-tip]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipName = attributes["data-tip"],
		event   = "click: tips.showTip('" + tipName + "')";

	// Set new
	events = events ? events + "; " + event: event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-text]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipText = attributes["data-tip-hover"] || attributes["data-tip-text"],
		event   = "click: tips.showTipWithText('" + tipText + "')";

	// Set new
	events = events ? events + "; " + event: event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-hover]", function(button, attributes) {

	// Get
	let tipText = attributes["data-tip-hover"];

	sky.service("tips").bind(button, "top", {create: tipText});

	// Set new
	let events = attributes["data-event"] || "",
		event  = "click: tips.showTipWithText('" + tipText + "')";
	events = events ? events + "; " + event : event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});