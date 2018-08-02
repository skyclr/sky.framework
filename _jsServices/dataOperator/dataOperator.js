sky.service("dataOperator", [ "searchField", "templates", "utils", "ajax", "stackList", "ajaxLoadingIndicator" ], function ({ searchField, templates, utils, ajax, stackList, ajaxLoadingIndicator }) {

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
			this.fields = stackList();

			/* Add base options, but only not set, that's why so fun construction */
			this.options = utils.extend({}, baseOptions, true);

			/* Options init */
			this.setOptions(options);

		}

		/** Saves to options */
		setOptions(options) {

			/* Add to options */
			utils.extend(this.options, options, true);

			/* Set submit handler */
			if(this.options.form)
				$(this.options.form).action("submit", this.onFormSubmit.bind(this));

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

			if (this.fields.getById("page"))
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
				data = utils.extend(data, this.options["requestData"]);

			/* Check is same and no force requested */
			if (this.lastRequestData !== false && utils.isObjectsEqual(this.lastRequestData, data) && !options["force"])
				return false;

			/* Set hash data */
			if (!options.fromUrl)
				this.writeURI(this.options.historyType);

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
			ajaxLoadingIndicator.loading(this.ajax).reloadContent(this.options.holder);

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

			/* Go through and push */
			utils.each(list, (_, item) => {
				this.options.fields[item] = virtual;
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
		 * @val {string} type Field type - "real" or "virtual"
		 * @returns {{}}
		 */
		read(type = false) {

			/* Data holder */
			let data = {};

			/* Go through */
			this.fields.each(field => {

				/** @let field searchField */
				if (type && (type === "real" && field.virtual || !field.virtual))
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

		/** Write current field to form */
		writeForm() {
			this.fields.each(field => field.write());
			return this;
		}

		/** Reads hash to fields */
		readHash() {
			this.fields.each(field => field.hashRead());
			return this;
		}

		/** Reads hash to fields */
		readSearch() {
			this.fields.each(field => field.searchRead());
			return this;
		}

		/** Writes current fields to hash */
		writeURI(type = "hash") {

			/* To write */
			let write = {};

			/* Go through */
			this.fields.each(field => {
				write[field.name]  = field.valueOrNullOnDefault();
			});

			/* Write to URI */
			type === "search" ? page.history.search(write) : page.history.set(write);

			/* Self return */
			return this;

		}

		/** Finds inputs associated with fields */
		initInputs() {

			/* Back link */
			let self = this;

			utils.each(this.options.fields, (fieldName, virtual) => {

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
					self.fields[fieldName] = field;
				}
			});

			/* Self return */
			return this;
		}
	}

	/* Interface */
	this.service = {
		initOperator: options => new DataOperator(options),
		searchField: searchField,
		initLoader: function (loader, notifications, pagination, { reload = true, history = true }) {

			/* Add count */
			loader.beforeRequest = function (data, options) {
				if (!loader.lastRequestData || options.force)
					data["count"] = true;
			};

			/* Render function */
			loader.render = function (response) {

				// Re render
				$(loader.options.holder).html('').append(
					templates.render("page-result-render", response)
				);

				// Remove old
				if (loader.pagination)
					loader.pagination = loader.pagination.remove();

				if (typeof response.pages !== "undefined") {

					// Pages holder
					let holder = $("#pages").html('');

					// Create new
					if (response.pages > 1 && pagination) {
						loader.pagination = pagination.add({
							pages: response.pages,
							current: response.page,
							holder: holder
						});
						loader.pagination.onPageChange = function (pageNum) {
							loader.reload({virtual: {page: pageNum}});
						}
					}
				}

			};

			/* On loading error */
			loader.error = function (error) {

				// Remove pagination on error
				if (loader.pagination)
					loader.pagination = this.pagination.remove();

				// Clear
				$(loader.options.holder).html('').append(notifications.message({text: error}).render);

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