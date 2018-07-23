sky.service("callbacks", ["callback"], function({ callback }) {

	/**
	 *
	 * Callbacks prepared object
	 * @param {*} [flags] Flags list for jQuery.Callbacks
	 * @constructor
	 */
	let Callbacks = function(flags) {

		/* Self construction */
		if(!(this instanceof Callbacks))
			return new Callbacks(flags);

		/* Add properties */
		$.extend(true, this, Callbacks.extend);

		/* Callbacks list */
		this.advancedCallbacks = {};

		/* Set default flags and self context */
		return this.flags(flags);

	};

	/**
	 * Prototype
	 * @type {{on: on, fire: fire, off: off, flags: flags, setContext: setContext}}
	 */
	Callbacks.prototype = {

			/**
			 * Flags for sky.Callback
			 * @param {object} flags Flags list
			 * @returns {*}
			 */
			flags: function(flags) {
				this.callbacksFlags = flags;
				return this;
			},

			/**
			 * Remove by listener
			 * @param {string} name Event name
			 * @param {string} listener Listener object
			 */
			removeListener: function(name, listener) {
				if(this.advancedCallbacks[name]) {
					this.advancedCallbacks[name].removeByContext(listener);
				}
			},

			/**
			 * Adds new event handler
			 * @param {string} 	 name 			Name of event
			 * @param {function|string} func 	Function be called on event fires
			 * @param {object}   [context]		Function options
			 * @param {object}   [options]		Function options
			 */
			on:  function(name, func, context, options) {


				if(name instanceof Object)
					$.each(name, (event, func) => { this.on(event, func) });

				else $.each(this.getEventsNames(name), (_, name) => {

					/* Create callbacks */
					if(!this.advancedCallbacks[name])
						this.advancedCallbacks[name] = callback(this.callbacksFlags);

					/* Add function */
					this.advancedCallbacks[name].add(func, context ? context : self.context, options || {});

				});

				return this;
			},

			/**
			 * Fires callbacks for specified event
			 * @param {string} name Name of event
			 * @param {object} args Arguments to be passed
			 * @param {object} [options] Additional options
			 */
			fire: function(name, args, options) {

				/* Success last */
				let events = this.getEventsNames(name),
					self = this,
					next = false;
					options = options || {};

				/* Remove global if need */
				if(options["noGlobal"])
					events = events.slice(1);

				/* Fire events */
				$.each(events, function(_, event) {

					/* If no callback */
					if(!self.advancedCallbacks[event])
						return;

					/* Run */
					do {
						next = self.advancedCallbacks[event].fireNext(jQuery.extend({ event: event }, args || []), self.context, options.possible);
					} while(next);

					/* Reset */
					if(!options.once)
						self.advancedCallbacks[event].toRun = 0;

				});

			},

			/**
			 * Get all event names from global name
			 * @param {String} name Global event name
			 * @returns {Array}
			 */
			getEventsNames: function(name) {

				/* Get events names */
				let names = name.split(","), events = [];

				/* Go through */
				$.each(names, function(i, name) {

					/* Remove spaces */
					name = name.replace(" ", "");

					/* Get elements */
					let elements = name.split(".");
					events.push(elements[0]);

					/* Go through */
					for(let j = 1; j < elements.length; j++)
						events.push(elements[0] + "." + elements[j]);

					/* Global event */
					if(elements.length > 2)
						events.push(elements.join("."));

				});

				/* Return */
				return events;

			},

		/**
		 * Removes event handlers and functions
		 * @param {string} name Event name
		 * @param func
		 */
			off: function(name, func = null) {
				if(func && this.advancedCallbacks[name])
					this.advancedCallbacks[name].removeByCallback(func);
				else
					delete this.advancedCallbacks[name];
			}

		};

		this.service = Callbacks;

});