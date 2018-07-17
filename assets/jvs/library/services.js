/**
 * Library main part to work with services
 */
(function() {

	/**
	 * Services list
	 */
	let base = function(service, name) {

			this.name = name;

			/** Init flag */
			this.initialise = sky.Promise();

			/** Options */
			this.options = {};

			/** Service interface */
			this.service = service || {};

		/**
		 * Set or call init function
		 * @param func
		 * @param {Array} [dependencies]
		 */
			this.init = (func, dependencies) => {
				if(typeof func === "function") this.initialise.done(sky.func(func, dependencies, this));
				else this.initialise.resolve();
				return this;
			};

		};
	let list = { exceptions: new base(sky.exceptions) };

		/**
	 * Init service
	 * @type {{add: add}}
	 */
	sky.services = {

		/**
		 * Get function arguments list
		 * @param {function} func Function to get arguments list from
		 * @returns {Array|{index: number, input: string}}
		 */
		functionServices: function(func) {

			/* Get arguments list */
			let str = func.toString();

			/* Check if first is services list */
			if(str.indexOf('({') < 0) return Object.keys(list);

			/* Get services */
			let names = str.slice(str.indexOf('({') + 2, str.indexOf('}')).match(/[^\s,]+/g);

			/* Return */
			return names ? names : [];

		},

		/**
		 * Calls function with services as params
		 * @param func Function to call
		 * @param {*} [context] Context to call
		 * @param {Array} services Services list
		 */
		callWithServices: function(func, context, services) {

			/* Get services */
			let servicesList = {};

			/* Get from params if none */
			services = services && (services instanceof Array) ? services : this.functionServices(func);

			/* Go through */
			$.each(services, function(_, name) { servicesList[name] = sky.services.get(name) });

			return func.call(context || window, servicesList);

		},

		/**
		 * Return service and init it if none
		 * @param {string} name Service name
		 * @returns {{add: add}}
		 */
		get: function(name) {

			/* If no such thing */
			if(!list[name])
				throw new sky.exceptions.system.Error("Can't load service '" + name + "'");

			/* Return */
			return list[name].init().service;

		},

		/**
		 * Adds new services
		 * @param {string} name
		 * @param {*} [service]
		 * @param {Array} dependencies
		 */
		add: function(name, service = {}, dependencies) {

			/* Change order */
			if((service instanceof Array) && dependencies) {
				let tmp = dependencies;
				dependencies = service;
				service = tmp;
			}

			/* Check */
			if(typeof service !== "object" && typeof service !== "function")
				throw new sky.exceptions.system.Error("Service " + name + " have wrong type");

			/* Create base service */
			list[name] = new base(typeof service === "object" ? service : {}, name);

			/* If services declared with function for local scope and etc */
			if(typeof service === "function")
				list[name].init(service, dependencies);

			return list[name];

		}

	};

})();
