sky.service("callback", function() {

	/**
	 * Creates callback object that holds functions list
	 * @param {string} [flags]
	 * @returns {*}
	 * @constructor
	 */
	let Callback = function(flags) {

		/* Self construct */
		if(!(this instanceof Callback))
			return new Callback(flags);

		/**
		 * Functions list holder
		 * @type {Array}
		 */
		this.functions = [];
		this.toRun =  0;
		this.context = this;

		/* Self return for next usage */
		return this;

	};

	/**
	 * Base
	 * @type {{functions: Array, toRun: number, context: *, add: add, removeByContext: removeByContext, fire: fire, fireNext: fireNext}}
	 */
	Callback.prototype = {

		/**
		 * Adds new function to stack
		 * @param {Function} func Function to add
		 * @param {Object} context Function context
		 * @param {Object} options Call options
		 */
		add: function(func, context, options) {
			this.functions.push({
				func: func,
				context: context || false,
				once: options && options.once
			});
			return this;
		},

		/**
		 * Removes function from list by context
		 * @param context
		 */
		removeByContext: function(context) {

			/* Find listener */
			$.each(this.functions, function(i, current) {
				if(current.context === context)
					this.functions.splice(i, 1);
			}.bind(this));

			/* Self return */
			return this;

		},

		/**
		 * Fires all functions
		 * @param {Object} context Function context
		 * @param {Array} args Arguments
		 */
		fire: function(context, args) {
			$.each(this.functions, function(_, func) {
				func.func.apply(func.context || context, args);
			});
		},

		/**
		 * Fires next function
		 * @param {Array|Object} args Arguments
		 * @param {Object} context Function context
		 */
		fireNext: function(args, context) {

			/* If no more to run */
			if(this.functions.length <= this.toRun)
				return false;

			/* Set next to run */
			this.toRun++;

			/* Function to run */
			let current = this.functions[this.toRun - 1],
				result,
				func = current.func;

			/* Set context */
			context = current.context || context || window;

			/* Get function in string */
			if(typeof func === "string")
				func = context[func];

			/* If no function found */
			if(!func)
				return true;

			/* Call function */
			result =  func.apply(current.context || context, args) !== false;

			/* If call once */
			if(current.once) {
				this.functions.splice(this.toRun - 2, 1);
				this.toRun--;
			}

			/* Return function result */
			return result;
		}

	};

	this.service = Callback;

});