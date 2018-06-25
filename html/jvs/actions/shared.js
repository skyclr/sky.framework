//noinspection JSUnusedGlobalSymbols
sky.action("shared", {

	advertFilter: function (element) {
		let adverts = [];
		element.closest("form").find('[name=advertId]:checked').each(function () {
			adverts.push(this.value);
		});

		element.closest("form").find('[name=campaignId]').each(function () {

			let self = $(this).parent(),
				conId = self.attr("data-connection-id");

			if (!conId || !adverts.length || $.inArray(conId, adverts) >= 0)
				self.removeClass('hidden');
			else
				self.addClass('hidden');

		});

	},

	/**
	 * Close parent window
	 * @param self
	 * @param event
	 */
	closeWindow: function (self, event) {

		/* Close */
		if (event.target && event.target === self.get(0))
			self.closest(".windowShadow").data("modalWindow").close();

	},

	/**
	 * Scrolls body to top
	 * @param _
	 * @param event
	 */
	toTop: function (_, event) {

		/* No # go */
		event.preventDefault();

		/* Scroll */
		$('#pageContentHolder').animate({scrollTop: 0}, "fast");

	},

	/**
	 * Stops form form submit if not valid
	 * @param form
	 * @param event
	 */
	validForm: function (form, event) {
		if (form.validForm())
			form.get(0).submit();
	},

	/**
	 * Stops form form submit if not valid
	 * @param button
	 * @param event
	 */
	clearForm: function (button, event) {
		let form = button.closest("form");
		form.get(0).reset();
		form.find("input").trigger("change");
	},

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
	},

	attachFile: function (input) {
		let label = input.closest(".label"),
			file = input.val().match(/[^\\\/]+(\.[^\\\/]+)?$/)[0] || input.val(),
			holder = sky.templates.render('page-fileHolder', {file: file}).append(input).insertBefore(label);

		$('<input type="file" name="attachment[]" sky-event="change: shared.attachFile">').appendTo(label.find(".button"))
	},

	toggleMenu: function (button, event) {
		$("#header").find(".menu").toggleClass("visible");
	},


	/**
	 * Reorders current result rows without request
	 * @param button
	 * @param _
	 * @param orderField
	 * @param type
	 */
	changeOrder: function (button, _, orderField, type) {

		let order = button.hasClass("desc") ? "asc" : "desc",
			table = button.closest("table"),
			first = table.find("th:last").parent(),
			trs = table.find("tr:not(.orderSkip):not(.footer):not(.header)"), cell1, cell2, convert = (type !== 'datetime' && type !== "text");

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Reorder
		trs.sort(function (firstTr, secondTr) {
			if (orderField) {
				cell1 = $(firstTr).find("[data-field=" + orderField + "]");
				cell2 = $(secondTr).find("[data-field=" + orderField + "]");
			} else {
				let buttonTr = button.closest("tr");
				let index = buttonTr.find("td, th").index(button.closest("td, th"));
				cell1 = $(firstTr).find("td:eq(" + index + ")");
				cell2 = $(secondTr).find("td:eq(" + index + ")");
			}

			// Get TDs values
			let val1 = cell1.attr("data-value") || cell1.html();
			let val2 = cell2.attr("data-value") || cell2.html();

			// Convert
			if (convert) {
				val1 = parseFloat(val1);
				val2 = parseFloat(val2);
			}

			// Compare
			if (val1 === val2 || (convert && isNaN(val1) && isNaN(val2)))
				return 0;
			else if (val1 > val2 || (convert && isNaN(val2)))
				return order === "desc" ? 1 : -1;
			else
				return order === "desc" ? -1 : 1;

		}).insertAfter(first);

	},

	changeOrderReload: function (button, _, orderField) {

		// Get order
		let order = button.hasClass("desc") ? "asc" : "desc";

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Set hash and reload
		page.history.set({order: order, orderField: orderField});
		page.currentLoader.reload();
	}

});