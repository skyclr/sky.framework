sky.service("inputsIO", function () {

	this.service = {

		/**
		 * Get value of single input
		 * @param input
		 * @returns {*}
		 */
		readInputValue: function (input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// Read
				let data = this.readInputsValues(inputs);

				// If all checked
				if (data.length === inputs.length)
					return true;

				// Return data
				return data;

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.is(":checked") ? input.val() : false;
			} else
				return input.val() === "" ? false : input.val();


		},

		/**
		 * Get value of multiple inputs
		 * @param inputs
		 * @returns {*}
		 */
		readInputsValues: function (inputs) {

			/* If single input */
			if (inputs.length === 1)
				return this.readInputValue(inputs);

			/* Values holder */
			let valuesNamed = [],
				valuesLined = [],
				self = this;

			/* Go through */
			inputs.each(function () {

				/* Get value */
				let input = $(this),
					value = self.readInputValue(input);

				/* If we get values */
				if (value !== false) {
					valuesNamed.push({name: input.attr("name"), value: value});
					valuesLined.push(value);
				}

			});

			/* Single */
			if (valuesLined.length === 1) {
				return valuesLined[0];
			}

			/* Return */
			return valuesLined.length ? valuesLined : false;

		},

		/**
		 * Write single input value
		 * @param value
		 * @param input
		 * @returns {*}
		 */
		writeInputValue: function (value, input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// If all checked
				if (value === true)
					inputs.prop("checked", true);
				else
					this.writeInputsValue(value, inputs);

				if (inputs.length)
					inputs.first().trigger("change", {notByUser: true});

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.prop("checked", value !== false);
			} else
				return input.val(value === false ? "" : value);
		},

		/**
		 * Write multiple inputs value
		 * @param values
		 * @param inputs
		 * @returns {*}
		 */
		writeInputsValue: function (values, inputs) {

			/* Write single */
			if (inputs.length < 2)
				return this.writeInputValue(values, inputs);

			/* Multiple */
			if (inputs.is(":checkbox") || inputs.is(":radio")) {
				inputs.prop("checked", false);
				if (values instanceof Array) {
					$.each(values, function (_, val) {
						inputs.filter('[value="' + val + '"]').prop("checked", true);
					});
					inputs.first().trigger("change", {notByUser: true});
				} else {
					if (values === false || values === true)
						inputs.prop("checked", values).first().trigger("change", {notByUser: true});
					else
						inputs.filter('[value="' + values + '"]').prop("checked", true).trigger("change", {notByUser: true});
				}
			} else {
				inputs.val(values);
			}
		}

	}

});