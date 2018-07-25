sky.action("tips", ({actions, tips}) => {
	var self = {

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
			let target;

			if(event && event.target) {
				target = $(event.target);
				if(target.is("[tip]") || target.is("[tip-text]") || target.closest(".tipContent").length)
					return;
			}

			tips.hideAll();

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