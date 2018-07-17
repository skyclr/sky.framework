/**
 * Module to work with ajax file upload
 */
sky.service("ajaxFiles", ["supported", "callbacks", "ajaxFilesXHR", "ajaxFilesIFrame"], function({ callbacks, supported, ajaxFilesXHR, ajaxFilesIFrame }) {

	/**
	 * Class to work with dynamic file upload
	 * @param {html|string} input Input to be used to upload
	 * @param {string} url Url to upload
	 * @param {object} data Data to be send with request
	 */
	let AjaxFiles = this.service = function(input, url, data) {

		/* Self construct */
		if(!(this instanceof AjaxFiles))
			return new AjaxFiles(input, url, data);

		/* Save items */
		this.inputs 	= $(input);
		this.url   		= url;
		this.data  		= data;
		this.callbacks 	= callbacks();
		this.files		= [];

		/**
		 * Function to handle file input change
		 */
		this.saveFiles = function(input) {

			/* Get files list */
			if(supported.XHRUpload) {

				/* Get files from event */
				let files = input.get(0).files;

				/* Save them to this */
				for(let file of files)
					this.files.push({ file: file, input: input, inputName: input.attr("name") });

			} else this.files.push(input.get(0));

		};

		/**
		 * Sends ajax files
		 * @param {bool} parallel If try files would be send in parallel
		 * @returns {*}
		 */
		this.send = function(parallel) {

			/* Clear */
			this.files = [];

			/* Get files list */
			this.inputs.each((_, input) => { this.saveFiles($(input)); });

			/* If no files */
			if(!this.files.length)
				return false;

			/* Create supported handler */
			let handler;
			if(supported.XHRUpload)
				handler = new ajaxFilesXHR(this);
			else
				handler = new ajaxFilesIFrame(this);

			/* Send files */
			if(parallel)
				this.sendParallel(handler);
			else
				this.sendConsequentially(handler);

			/* return send handler */
			return handler;

		};

		/**
		 * Sends files consequentially
		 * @param handler
		 */
		this.sendConsequentially = function(handler) {

			/* First id */
			let id = 0;

			/* Set sending next after this one */
			this.callbacks.on("always", () => {
				id++;
				if(this.files[id])
					handler.send(this.files[id]);
			});

			/* Send first */
			handler.send(self.files[id]);

		};

		/**
		 * Sends files parallel
		 * @param handler
		 */
		this.sendParallel = function(handler) {

			/* Send files through them */
			for(let file of this.files)
				handler.send(file);

		};

		/* Self return */
		return this;

	};

	/**
	 * Performs default file send
	 * @param {string} url
	 * @param element
	 * @param data
	 */
	AjaxFiles.defaultSend = function(url, element, data) {

		// Get input
		let input = element.is("input[type=file]") ? element : element.closest("label, .label").find("input[type=file]"),
			exceptions = sky.service("exceptions"),
			templates = sky.service("templates"),
			notifications = sky.service("notifications"),
			windows = sky.service.windows("windows");

		// Check
		if(!input.length)
			throw new exceptions.system.Error("No proper input provided for file send");

		// Init
		let filesAjax = AjaxFiles(input, url, data),
			modal = windows.getLast(),
			currentFile;

		/*  Bind events */
		filesAjax.callbacks
			.on("begin", function (file) {
				if(modal) {
					modal.holder.find(".preview").remove();
					modal.lock();
				}
				currentFile = templates.render("files-single-upload", file).insertAfter(element.parent());
			})
			.on("always", function () {
				currentFile.remove();
				if(modal)
					modal.unlock();
			})
			.on("notSuccess", function (error) {
				modal.clearExceptTemplate();
				notifications.message({text: error}).appendToModal(modal);
			})
			.on("progress", function (totalPercent, percent) {
				currentFile.find(".total").html(percent + "%");
				currentFile.find(".progressBar div").css("width", percent + "%");

				// If loaded
				if (percent === 100)
					currentFile.find(".total").html("100%, обработка");


			})
			.on("start", function () {

			});

		/* Send */
		filesAjax.send();
		return filesAjax;

	};

});