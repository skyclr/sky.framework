/** Sends file data via HttpRequest */
sky.service("ajaxFilesXHR", ["supported", "ajax", "stackList", "utils"], function({supported, ajax, stackList, utils}) {
	this.service = class {
		constructor(options) {

			/* Save options */
			this.options 		= options;
			this.files 			= options.files;
			this.input 			= options.input;
			this.url 			= options.url;
			this.data 			= options.data;
			this.callbacks 		= options.callbacks;
			this.toProceed 		= options.files.length;
			this.inProgress 	= 0;
			this.total 			= options.files.length;
			this.totalLoaded 	= 0;
			this.totalSize 		= 0;
			this.totalPercent 	= 0;
			this.current 		= 0;
			this.fileRequests 	= stackList();

			/* Go through */
			utils.each(options.files, (i, file) => { this.totalSize += file.file.size;	});

		}

		/**
		 * Get file name
		 * @param {*} file File
		 * @returns {string}
		 */
		getName(file) {
			return file.name.replace(/.*(\/|\\)/, "");
		}

		/**
		 * Uploads file
		 * @param {*} file File name in files stack
		 */
		send(file) {

			/* This obj will store data associated with XHR */
			utils.extend(file, {
				id     : Math.random(),
				name   : this.getName(file.file),
				size   : file.file.size,
				ajax   : false,
				percent: false,
				loaded : 0
			});

			/* Prepare params */
			let self        = this,
				params      = this.data || {},
				queryString = this.url + "?ajaxFile=" + file.name + "&" + jQuery.param(params);

			/**
			 * Params extend
			 * @param {object} args Object to be extended
			 * @returns {*}
			 */
			this.extend = function(args) {
				return utils.extend(args, {
					totalLoaded : self.totalLoaded,
					totalSize   : self.totalSize,
					totalPercent: self.totalPercent,
					file        : file,
					loaded      : file.loaded,
					size        : file.size,
					percent     : file.percent,
					toProceed   : self.toProceed,
					current     : self.current,
					total       : self.total
				});
			};

			/* Send */
			if(supported.formData) {

				/* Create form data sender */
				let form = new FormData();
				form.append(file.inputName, file.file);

				/* Send start */
				file.ajax = ajax(queryString, form, { ajaxExtend: {
						processData: false,
						contentType: false,
						type       : "POST",
						xhr        : (() => {
							try {

								/* Create XHR */
								let xhr = new XMLHttpRequest();

								/* Set special upload api handlers */
								xhr.upload["onloadstart"] = function() {
									self.inProgress++;
									self.callbacks.fire("begin", self.extend({}));
								};
								xhr.upload["onprogress"] = function(event) {
									self.totalLoaded += event.loaded - file.loaded;
									self.totalPercent = (self.totalLoaded / self.totalSize * 100).toFixed(0);
									self.onProgress(event, file);
								};

								/* Return create XHR */
								return xhr;

							} catch(e) {
								return undefined;
							}
						}).safe()
					}
				});

			} else {

				/* Send start */
				file.ajax = ajax(queryString, file.file, {
					processData: false,
					contentType: false,
					type       : "POST",
					beforeSend : function(jqXHR) {
						jqXHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						jqXHR.setRequestHeader("X-File-Name", encodeURI(file.name));
						jqXHR.setRequestHeader("Content-Type", "multipart/form-data");
						jqXHR.setRequestHeader("Content-Disposition", 'attachment; filename="' + encodeURI(file.name) + '"');
						jqXHR.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
					}
				});

			}

			/* Set ajax callbacks */
			file.ajax.on({
				success:	(all) => { self.callbacks.fire("success", self.extend(all)); },
				error: 		(all) => { self.callbacks.fire("error", self.extend(all)); },
				notSuccess: (all) => { self.callbacks.fire("notSuccess", self.extend(all)); },
				always: 	(all) => {

					/* Counters */
					self.inProgress--;
					self.toProceed--;

					/* Call always method */
					self.callbacks.fire("always", this.extend(all));

					/* Delete connection */
					self.fileRequests.remove(file);

				}
			});

			/* Save */
			this.fileRequests.add(file);

		}

		/**
		 * Fores on progress change
		 * @param event
		 * @param fileRequestData
		 */
		onProgress(event, fileRequestData) {

			/* Count percentage */
			let percent = (event.loaded / event["total"] * 100).toFixed(0);
			fileRequestData.loaded = event.loaded;

			/* If percent changed */
			if(percent !== fileRequestData.percent && event["lengthComputable"]) {
				fileRequestData.percent = percent;
				this.callbacks.fire("progress", this.extend({}));
			}

		}

		/**
		 * Aborts current download
		 */
		abort() {

			/* Stop each request */
			this.fileRequests.each(request => { request.ajax.stop() });

			/* Call always method */
			this.callbacks.fire("abort", this.extend({}));

		}

	};

});