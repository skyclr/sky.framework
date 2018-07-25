sky.action("tips", ({ tips }) => {

	// Get
	let body = $('body'),
		events  = body.attr("data-event") || "",
		event   = "click: tips.hideTips";

	// Add
	body.attr("data-event", events ? events + "; " + event: event);

	let self = {

		showTip: function(button, _, name) {

			if(button.data("tip")) {
				button.data("tip").hide();
				return;
			}

			// Hide others
			self.hideTips(button, false);

			// Create
			let tip = tips.Tip(button, {
				create: $('<div/>').css("overflow", "hidden").append($("#" + name + "TipText").html())
			});

			// Show
			tip.show("top");

		},

		showTipWithText: function(button, _, text) {

			if(button.data("tip")) {
				button.data("tip").hide();
				return;
			}

			// Hide others
			self.hideTips(button, false);

			// Create
			let tip = tips.Tip(button, {
				create: $('<div/>').css("overflow", "hidden").append(text)
			});

			// Show
			tip.show("top");

		},

		hideTips: function(element, event) {
			tips.hideAll(false, $(event.target));
		},

		/**
		 *
		 */
		forceHideTips: function() {
			tips.hideAll(true);
		}
	};
	return self;
});