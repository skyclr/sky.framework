sky.action("tips", {

	showTip: function (button, _, name) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips", [name]);

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append($("#" + name + "TipText").html())
		});

		// Show
		tip.show();

	},

	showTipWithText: function (button, _, text) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips");

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append(text)
		});

		// Show
		tip.show();

	},

	hideTips: function (element, event) {
		let target;

		if (event && event.target) {
			target = $(event.target);
			if (target.is("[sky-tip]") || target.is("[sky-tip-text]") || target.closest(".tipContent").length)
				return;
		}

		sky.tips.hideAll();

	},

	/**
	 *
	 */
	forceHideTips: function () {
		sky.tips.hideAll(true);
	}
});