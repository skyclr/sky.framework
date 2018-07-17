sky.service("actions", ["exceptions"], function ({exceptions}) {

	let list = {},
		actions = this.service = {

			/**
			 * Performs action
			 * @param element
			 * @param event
			 * @param action
			 * @param {Array} [options]
			 */
			perform: function (element, event, action, options) {

				/* Get parameters */
				let params = action.match(/(.+)\((.*)\)/);

				/* Parse */
				if (params) {

					/* Get function */
					action = params[1];

					/* Parse params */
					params = params[2].split(",");
					$.each(params, function (i, val) {
						params[i] = eval(val.trim());
					})
				}

				/* Options */
				if (options)
					params = $.extend(params || [], options);

				/* Get */
				let self = element ? $(element) : false,
					path = action.split("."),
					current = list,
					name = action;

				/* If disabled */
				if (self && self.isDisabled && self.isDisabled())
					return;

				$.each(path, function (i, elem) {

					/* Search */
					if (i + 1 < path.length && !current[elem])
						throw new exceptions.system.Error("No action - " + action + ", because can't find '" + elem + "'");

					/* Get new elem */
					if (i + 1 < path.length)
						current = current[elem];

					/* Save name */
					name = elem;

				});

				/* If no */
				if (!current[name])
					throw new exceptions.system.Error("No action - " + action);

				/* Call */
				current[name].apply(current, [self, event].concat(params || []));

			},

			/**
			 * Adds actions to list
			 * @param name Group name
			 * @param events List
			 */
			add: function (name, events) {

				if (typeof events === "function")
					events = events.safe(true)();

				// Check
				if (!events || typeof events !== 'object')
					throw new exceptions.system.Error("No event object for events '" + name + "' provided");

				// Save
				list[name] = $.extend(list[name] || {}, events);

			}

		};


	/**
	 * Adds special bind function
	 * @param {string} name Event name
	 * @param {*} selector Selector string
	 * @param {function} [action] Action function
	 * @returns {jQuery}
	 */
	$.fn.action = function(name, selector, action) {

		/* Parameters skip */
		if(typeof action === "undefined") { action = selector; selector = null; }

		/* Bind */
		return this.on(name, selector, function(event, data) {
			action.call(this, event, $(this), data);
		}.safe());
	};

	/*
	 * Bind declarative events
	 */
	$(document).action("click submit keyup keydown dblclick mouseover mouseout mouseleave mouseenter change mousedown mouseup touchstart", '[data-event]', function (event, self, data) {

		/* Get string */
		let skyEvent = this.getAttribute("data-event");

		/* If no such string */
		if (skyEvent.indexOf(event.type) === -1)
			return;

		/* If disabled */
		if (self.isDisabled && self.isDisabled()) {
			event.preventDefault();
			return;
		}

		/* Split */
		let list = skyEvent.split(";"), i;

		/* Go through */
		for (i = 0; i < list.length; i++) {

			/* Get elements */
			let parts = list[i].match(/(\w+):(.*)/);

			/* Wrong */
			if (parts.length !== 3)
				throw new exceptions.system.Error("Wrong action format in data-event: " + list[i]);

			/* Get elements */
			let name = parts[1].trim(),
				action = parts[2].trim();

			/* Another event */
			if (name !== event.type)
				continue;

			/* No default go */
			if (event.target === self.get(0))
				event.preventDefault();

			/* Passed data */
			if (data)
				event.data = data;

			/* Get action data */
			let actionData = self.data("skyActionData");

			/* Save */
			if (actionData)
				event.data = actionData;

			/* Dump action */
			if (action === "false")
				continue;

			/* Perform action */
			actions.perform(this, event, action);

		}

	});

});