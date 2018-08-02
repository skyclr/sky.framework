sky.service("templates", ["localStorage", "supported", "directives", "exceptions", "utils"], function({localStorage, supported, directives, exceptions, utils}) {


	let templatesList     = {},
		templatesCompiled = {},
		Templates         = this.service = {

			/** Globals list */
			globals: {},

			/** Local storage support */
			storage: supported.localStorage ? new localStorage({name: "jsTemplates"}) : false,

			/**
			 * Adds new template to list
			 * @param options
			 */
			add: function(options) {
				templatesList[options.name] = options.template;
				if(this.storage) {
					this.storage.save(options.name, options.template);
					$.cookie("storedTemplates-" + options.name, options.date);
				}
			},

			renderByNameWithHolder: function(name, data, noDirectives) {

				/* Compile template */
				let template = this.compile(name);

				/* Add globals */
				data = utils.extend(true, {}, data, {globals: this.globals});

				/* return */
				return this.coverWithHolder(template.render(data), noDirectives);

			},

			renderByTextWithHolder: function(text, data, noDirectives) {


				/* Add globals */
				data = utils.extend(true, {}, data, {globals: this.globals});

				/* return */
				return this.coverWithHolder(Twig.twig({data: text}).render(data), noDirectives);

			},

			coverWithHolder: function(text, noDirectives) {

				/* Render */
				let temp = document.createElement('div');
				temp.innerHTML = text.trim();

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
				return $(this.renderByNameWithHolder(name, data, noDirectives).childNodes);

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
				return this.renderByNameWithHolder(name, data, noDirectives).innerHTML;

			},

			/**
			 * Renders template by its text as parameter
			 * @param {string} text Template text
			 * @param {Object} data Inner data
			 * @param {bool} [noDirectives]
			 * @returns {XMLList|*}
			 */
			renderByText: function(text, data, noDirectives) {
				return $(this.renderByTextWithHolder(text, data, noDirectives).childNodes);
			},

			/**
			 * Renders template by its text as parameter
			 * @param {string} text Template text
			 * @param {Object} data Inner data
			 * @param noDirectives
			 * @returns {XMLList|*}
			 */
			renderByTextToText: function(text, data, noDirectives) {
				return this.renderByTextWithHolder(text, data, noDirectives).innerHTML;
			},

			/**
			 * Compiles specified template
			 * @param {string} name Template name
			 */
			compile: function(name) {

				/* If already compiled */
				if(!templatesCompiled[name]) {

					/* Load */
					let template = this.load(name);

					/* Compile */
					let compiled = Twig.twig({ id: name, data: template });

					/* Check */
					if(!compiled)
						throw new exceptions.system.Error('Error during compiling template "' + name + '"');

					/* Save */
					templatesCompiled[name] = compiled;

				}

				/* Save */
				return templatesCompiled[name];

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
				if(!(templatesList[name] = $('script[type="text/template"][id=' + name + ']').html()))
					throw new exceptions.system.Error("Can't find template – " + name);

				/* Save to LS */
				if(this.storage)
					this.storage.save(name, {template: templatesList[name]});

				/* Return */
				return templatesList[name]

			}

		};

	sky.directive('script[type="text/template"], template', function(template, attrs) {
		Templates.add({
			name    : attrs.id,
			template: template.html()
		});
	});


	/* Save templates files data */
	sky.onReady(() => {
		if(window.page.data.templates && supported.localStorage) {
			utils.each(window.page.data.templates, function(_, template) {
				$.cookie("storedTemplates-" + template.path, template.date);
			});
		}
	});

});
