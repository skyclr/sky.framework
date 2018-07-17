sky.service("templates", ["localStorage", "supported", "directives", "exceptions"], function({ localStorage, supported, directives, exceptions }) {

	
	let templatesList = {},
		templatesCompiled = {},
		Templates = this.service = {

		/** Globals list */
		globals : {},

		/** Local storage support */
		storage: supported.localStorage ? localStorage({ name: "jsTemplates" }) : false,

		/**
		 * Adds new template to list
		 * @param options
		 */
		add: function(options) {
			templatesList[options.name] = options.template;
			if(this.storage) {
				this.storage.save(options.name, templatesList[options.name]);
				//$.cookie("storedTemplates-" + options.name, options.date);
			}
		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderWithHolder: function(name, data, noDirectives) {

			/* Compile template */
			this.compile(name);

			/* Add globals */
			data = $.extend(true, {}, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(templatesCompiled[name].render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp;

		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		render: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).children();

		},

		/**
		 * Renders specified template and returns text
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderToText: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).html();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {XMLList|*}
		 */
		renderByText: function(text, data, noDirectives) {

			/* Add globals */
			data = jQuery.extend(true, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(twig({ data: text }).render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp.children();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param noDirectives
		 * @returns {XMLList|*}
		 */
		renderByTextToText: function(text, data, noDirectives)  {
			return $('<div/>').append(this.renderByText(text, data, noDirectives)).html();
		},

		/**
		 * Compiles specified template
		 * @param {string} name Template name
		 */
		compile: function(name) {

			/* If already compiled */
			if(templatesCompiled[name])
				return;

			/* Load */
			this.load(name);

			/* Compile */
			let compiled = twig({ id: name, data: templatesList[name] });

			/* Check */
			if(!compiled)
				throw new exceptions.system.Error('Error during compiling template "' + name + '"');

			/* Save */
			templatesCompiled[name] = compiled;

		},

		/**
		 * Loads specified template
		 * @param {string} name Template name
		 */
		load: function(name) {

			/* Loaded */
			let fromLS;

			/* Try to load from storage */
			if(!templatesList[name] && this.storage && (fromLS = this.storage.load(name)))
				return templatesList[name] = fromLS;

			/* If already compiled */
			if(templatesList[name])
				return templatesList[name];

			/* Load template */
			if(!(templatesList[name] = $('script[type="text/template"][id='+ name +']').html()))
				throw new exceptions.system.Error("Can't find template – "  + name);

			/* Save to LS */
			if(this.storage)
				this.storage.save(name, { template: templatesList[name] });

			/* Return */
			return templatesList[name]

		}

	};

	/**
	 * Load templates on ready
	 */
	$(document).on("ready", sky.func(function() {

		/* Find templates and save them */
		$('script[type="text/template"]').each(function() {
			let self = $(this);
			Templates.add({
				name        : self.attr('id'),
				template    : self.html()
				//dependencies: self.attr('dependencies') ? self.attr('dependencies').replace(" ", "").split(",") : false
			});
		});

		/* Save templates files data */
		if(window.page.data["templates"] && Templates.storage) {
			$.each(window.page.data["templates"], function() {
				$.cookie("storedTemplates-" + this.path, this.date);
			});
		}

	}));

});
