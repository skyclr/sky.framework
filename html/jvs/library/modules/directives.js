sky.service("directives", function ({exceptions}) {

	let list = {},
		directives = this.service = {

			/**
			 * Adds new directive
			 * @param {string} name Directive name
			 * @param {*} options Directive options
			 * @param {function} directive How to parse directive
			 */
			add: function (name, options, directive) {

				/* Reset */
				if (!directive && typeof options === "function") {
					directive = options;
					options = {};
				}
				options.directive = directive;
				options.selector = name;

				/* Save */
				list[name] = options;

				/* Self return*/
				return this;

			},

			/**
			 * Get element attributes
			 * @param element
			 * @returns {{}}
			 */
			getAttributes: function (element) {

				/* Holds attributes */
				let attributes = {};

				/* Copy them to list */
				$.each(element.get(0).attributes, function (_, attr) {
					attributes[attr.nodeName] = attr.nodeValue;
				});

				/* Return */
				return attributes;

			},

			/**
			 * Applies directive convert to element
			 * @param element
			 * @param options
			 */
			parseElement: function (element, options) {

				/* Get element */
				element = $(element);

				/* Get element attributes */
				let attributes = this.getAttributes(element);

				/* Parse body for jason data */
				if (options["json"] || options["jsonToData"]) {

					/* Get child */
					let jsonScript = element.children('script[type="application/json"]');

					/* If we have json encoded data */
					if (jsonScript.length) {

						try {

							/* Parse json */
							let json = JSON.parse(jsonScript.text());

							/* Extend */
							$.extend(attributes, json);

							/* Save to data */
							if (options["jsonToData"])
								element.data("json", json);

						} catch (e) {
							throw new exceptions.system.Error("Element " + options.selector + " should have json stored content, but error on parse appears");
						}
					}
				}

				/* Call parse function */
				if (typeof options.directive === "function")
					options.directive(element, attributes);
			},

			/**
			 * Searches and replaces directives in element
			 * @param element
			 */
			parse: function (element) {
				$.each(list, function (tag, options) {
					$(tag, element).each(function () {
						directives.parseElement(this, options);
					});
					if (element.is(tag))
						directives.parseElement(element, options);
				});
			}


		};

	/* Add jQuery fn */
	jQuery.fn.parseDirectives = function () {

		/* Parse */
		directives.parse(this);

		/* Return */
		return this;

	};

	/* Parse body for directives when all ready */
	sky.onReady(function () {
		$("body").parseDirectives();
	});

});