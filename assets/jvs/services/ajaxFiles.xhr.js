/** Sends file data via HttpRequest */
sky.service("ajaxFilesXHR", function({supported, ajax, stackList}) {
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
			for(file of options.files)
				this.totalSize += file.size;

		}

		/**
		 * Get file name
		 * @param {*} file File
		 * @returns {string}
		 */
		static getName(file) {
			return file.name.replace(/.*(\/|\\)/, "");
		}

		/**
		 * Uploads file
		 * @param {*} file File name in files stack
		 */
		send(file) {

			/* This obj will store data associated with XHR */
			$.extend(file, {
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
				return jQuery.extend(args, {
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
									this.inProgress++;
									this.callbacks.fire("begin", this.extend({}));
								};
								xhr.upload["onprogress"] = function(event) {
									this.totalLoaded += event.loaded - file.loaded;
									this.totalPercent = (this.totalLoaded / this.totalSize * 100).toFixed(0);
									this.onProgress(event, file);
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
					beforeSend : sky.func(function(jqXHR) {
						jqXHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						jqXHR.setRequestHeader("X-File-Name", encodeURI(file.name));
						jqXHR.setRequestHeader("Content-Type", "multipart/form-data");
						jqXHR.setRequestHeader("Content-Disposition", 'attachment; filename="' + encodeURI(file.name) + '"');
						jqXHR.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
					})
				});

			}

			/* Set ajax callbacks */
			file.ajax.on({
				success:	(all) => { this.callbacks.fire("success", this.extend(all)); },
				error: 		(all) => { this.callbacks.fire("error", this.extend(all)); },
				notSuccess: (all) => { this.callbacks.fire("notSuccess", this.extend(all)); },
				always: 	(all) => {

					/* Counters */
					this.inProgress--;
					this.toProceed--;

					/* Call always method */
					this.callbacks.fire("always", this.extend(all));

					/* Delete connection */
					this.fileRequests.delete(file);

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