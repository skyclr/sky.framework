//noinspection JSUnusedGlobalSymbols
sky.action("shared", {

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
	 * Stops form form submit if not valid
	 * @param form
	 */
	validForm: function (form) {
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