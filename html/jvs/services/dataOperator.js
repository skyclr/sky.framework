sky.service("dataOperator", function ({ inputsIO, notifications, templates, utils, ajax, actions }) {

	class searchField {
		constructor(name, virtual) {
			this.name = name;
			this.inputName = name;
			this.virtual = virtual || false;
			this.default = null;
			this.input = false;
			this.value = null;
		}
		valueOrNullOnDefault() {
			if ((this.default instanceof Array) && (this.value instanceof Array))
				return utils.isObjectsEqual(this.value, this.default) ? null : this.value;

			return this.value === this.default ? null : this.value;
		}
		read() {
			if (this.virtual === "search")
				return this.searchRead();
			else if (this.virtual)
				return this.hashRead();
			else if (this.input)
				this.value = inputsIO.readInputsValues(this.input);

			return this.value;
		}
		write() {
			if (this.input)
				inputsIO.writeInputsValue(this.value === null ? this.default : this.value, this.input);
			return this.value;
		}
		hashRead() {
			let hashValue = page.history.hashObject[this.name];
			return this.value = (typeof hashValue === "undefined") ? this.default : hashValue;
		}
		searchRead () {
			let searchValue = page.history.searchObject[this.name];
			return this.value = (typeof searchValue === "undefined") ? this.default : searchValue;
		}
	}

	/**
	 * Default options
	 * @type {{}}
	 */
	let baseOptions = {
		fields: {},
		historyType: "hash"
	};

	/* Creates new data operator */
	class DataOperator {
		constructor(options) {

			/* Stores last request object */
			this.lastRequestData = false;

			/* Func that calls before request */
			this.beforeRequest = false;
			
			/* Fields list */
			this.fields = {};

			/* Add base options, but only not set, that's why so fun construction */
			this.options = $.extend({}, baseOptions, true);

			/* Options init */
			this.setOptions(options);

		}

		/** Saves to options */
		setOptions(options) {

			/* Back link */
			let self = this;

			/* Set submit handler */
			if (options.form)
				$(options.form).action("submit", this.onFormSubmit.bind(this));

			/* Add to options */
			$.extend(this.options, options, true);

			/* Self return */
			return this;
		}

		/**
		 * On form submit
		 * @param event
		 */
		onFormSubmit(event) {

			/* Prevent */
			event.preventDefault();

			/* If form not valid */
			if (!$(this.options.form).validForm())
				return;

			let options = {force: true};

			if (this.fields["page"])
				options[this.options.historyType === "search" ? "search" : "hash"] = {page: 1};

			/* Update */
			this.reload(options);

		}

		prepareRequest(options) {

			/* On empty */
			options = options || {};

			/* Hash fields */
			if (options["hash"])
				page.history.set(options["hash"]);

			/* Hash fields */
			if (options["search"])
				page.history.search(options["search"]);

			/* Hash fields */
			if (options["virtual"]) {
				if (this.options.historyType === "search")
					page.history.search(options["virtual"]);
				else
					page.history.set(options["virtual"]);
			}

			/* Write to form from hash */
			if (options.fromUrl) {
				if (this.options.historyType === "search")
					this.readSearch().writeForm();
				else
					this.readHash().writeForm();
			}

			/* jQuery wrap */
			if (this.options.form && !$(this.options.form).validForm())
				return false;

			/* Read */
			let data = this.read();

			/* Add additional data */
			if (this.options["requestData"])
				data = $.extend(data, this.options["requestData"]);

			/* Check is same and no force requested */
			if (this.lastRequestData !== false && utils.isObjectsEqual(this.lastRequestData, data) && !options["force"])
				return false;

			/* Set hash data */
			if (!options.fromUrl && this.options.historyType === "search")
				this.writeSearch();
			else if (!options.fromUrl)
				this.writeHash();

			/* Before request call */
			if (this.beforeRequest)
				if (this.beforeRequest(data, options) === false)
					return false;

			/* Return data */
			return data;

		}

		/**
		 * Reloads data according to params
		 * @param options
		 * @returns {DataOperator}
		 */
		reload(options) {

			/* Prepare */
			let data = this.prepareRequest(options);

			/* Reload */
			if (data)
				this.request(data);

			/* Self return */
			return this;

		}

		/**
		 * Performs request to reload data
		 * @param data
		 */
		request(data) {

			/* Back link */
			let self = this;

			/* Save last data */
			self.lastRequestData = data;

			/* Stop old request */
			if (this.ajax)
				this.ajax.stop();

			/* Request */
			this.ajax = ajax(this.options.url, data)
				.on("success", function (response) {
					self.lastResponse = response;
					self.render(response, data);
				})
				.on("error", function (error) {
					self.error(error)
				})
				.on("always", function () {
					self.ajax = false;
				});

			/* Create loading, auto remove when ajax finishes */
			notifications.loading(this.ajax).reloadContent(this.options.holder);

		}

		/**
		 * On success, have to be overloaded
		 * @param data
		 * @param request
		 */
		render(data, request) {}

		/**
		 * On error, have to be overloaded
		 * @param error
		 */
		error(error) {}

		/**
		 * Adds list of fields to current list
		 * @param {Array} list List of names
		 * @param {Boolean} [virtual] Virtual fields flag
		 */
		fieldsList(list, virtual) {

			/* Back link */
			let self = this;

			/* Go through and push */
			$.each(list, function (_, item) {
				self.options.fields[item] = virtual;
			});

			/* Self return */
			return this;
			
		}

		/**
		 * Sets form fields
		 * @param list
		 * @returns {*}
		 */
		realFieldsList(list) {
			return this.fieldsList(list);
		}

		/**
		 * Set none forms fields
		 * @param list
		 * @returns {*}
		 */
		virtualFieldsList(list) {
			return this.fieldsList(list, true);
		}

		/**
		 * Reads real fields
		 * @returns {{}}
		 */
		readReal() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				if (field.virtual)
					return;

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;

		}

		/** Reads form to fields */
		read() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;
		}

		/** Write current field to form */
		writeForm() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.write();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readHash() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.hashRead();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readSearch() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.searchRead();
			});

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeHash() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.set(write);

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeSearch() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.search(write);

			/* Self return */
			return this;

		}

		/** Finds inputs associated with fields */
		initInputs() {

			/* Back link */
			let self = this;

			$.each(this.options.fields, function (fieldName, virtual) {

				// Create search field
				let field = new searchField(fieldName, virtual ? self.options.historyType : false);

				/** @let field searchField */
				if (!field.virtual) {

					/* Find input */
					if (field.name[0] === "*") {
						field.name = field.name.substring(1);
						field.input = $(self.options.form).find(".selectReplaceChoose[data-input=" + field.name + "]");
					}
					else
						field.input = $(self.options.form).find('[name="' + field.name + '"]');

					/* Remove fields without input */
					if (!field.input || !field.input.length) {
						delete self.fields[fieldName];
						return;
					}

					/* Save */
					self.fields[fieldName] = field;

					/* Read default */
					field.default = field.read();
					field.value = null;
				} else {
					if (self.options.historyType === "search")
						field.virtual = "search";
					self.fields[fieldName] = field;
				}
			});

			/* Self return */
			return this;
		}
	};

	/* Interface */
	this.service = {
		initOperator: options => new DataOperator(options),
		searchField: searchField,
		initLoader: function (loader, notifications, pagination, { reload = true, history = true }) {

			/* Add count */
			loader.beforeRequest = function (data, options) {
				if (!this.lastRequestData || options.force)
					data["count"] = true;
			};

			/* Render function */
			loader.render = function (response) {

				// Re render
				$(this.options.holder).html('').append(
					templates.render("page-result-render", response)
				);

				// Remove old
				if (this.pagination)
					this.pagination = this.pagination.remove();

				if (typeof response.pages !== "undefined") {

					// Pages holder
					let holder = $("#pages").html('');

					// Create new
					if (response.pages > 1 && pagination) {
						this.pagination = pagination.add({
							pages: response.pages,
							current: response.page,
							holder: holder
						});
						this.pagination.onPageChange = function (pageNum) {
							loader.reload({virtual: {page: pageNum}});
						}
					}
				}

			};

			/* On loading error */
			loader.error = function (error) {

				// Remove pagination on error
				if (this.pagination)
					this.pagination = this.pagination.remove();

				// Clear
				$(this.options.holder).html('').append(notifications.message({text: error}).render);
			};

			/* Reload */
			if (reload)
				loader.reload({fromUrl: true});

			/* Set handler */
			if (history)
				page.history.on("change", function (searchChanged, hashChanged) {
					if (searchChanged || hashChanged)
						loader.reload({fromUrl: true});
				});

		}
	}

});