/**
 * Module to work with ajax file upload
 */
sky.service("ajaxFiles", ["supported", "callbacks", "ajaxFilesXHR", "ajaxFilesIFrame", "utils", "exceptions", "windows", "notifications" ,"templates"],
				function({ supported,   callbacks,   ajaxFilesXHR,   ajaxFilesIFrame,   utils,   exceptions,   windows,   notifications, templates }) {

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
				utils.each(files, (i, file) => {
					this.files.push({file: file, input: input, inputName: input.attr("name")});
				});

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

			/* Start callback */
			this.callbacks.fire("start", {});

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
			handler.send(this.files[id]);

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
		let input = element.is("input[type=file]") ? element : element.closest("label, .label").find("input[type=file]");

		// Check
		if(!input.length)
			throw new exceptions.system.Error("No proper input provided for file send");

		// Init
		let filesAjax = AjaxFiles(input, url, data),
			modal = windows.getLast(),
			uploadedFiles = [],
			progressForm = new AjaxFiles.ProgressForm();

		/* Associate with AjaxFiles */
		progressForm.bindAjaxFiles(filesAjax);

		/*  Bind events */
		filesAjax.callbacks
			.on("success", function({file}) {
				uploadedFiles.push(file);
			})
			.on("always", function({toProceed}) {
				if(modal && !toProceed)
					modal.unlock();
			})
			.on("notSuccess", function({error}) {
				if(modal) {
					modal.clearExceptTemplate();
					notifications.message({text: error}).appendToModal(modal);
				} else  alert(error);
			})
			.on("start", function() {

				/* Append new form */
				if(modal)
					modal.lock().holder.html('').append(progressForm.getForm());
				else
					modal = windows.Modal(progressForm.getForm()).lock();

			});

		/* Send */
		filesAjax.send();
		return filesAjax;

	};

	AjaxFiles.ProgressForm = function(holder) {

		let currentFile,
			form,
			self = this;

		this.setFilesLeft = function(total, toProceed) {
			if(form) {
				form.find(".toProceed").html(toProceed);
				form.find(".progress .total").html(total);
			}
		};
		this.fileUploadStart = function(file) {
			currentFile = templates.render("files-single-upload", file).appendTo(form.find(".filesProgress")).data("file", file);
		};
		this.fileUploadDone = function(filesLeft) {
			if(currentFile) currentFile.remove();
		};
		this.setProgressPercent = function(totalPercent, percent) {

			currentFile.find(".total").html(percent + "%");
			currentFile.find(".progressBar div").css("width", percent + "%");
			form.find(".progress .progressBar div").css("width", totalPercent + "%");

			// If loaded
			if(percent === 100) {
				currentFile.find(".total").html("100%, обработка");
				currentFile.find("a").hide();
			}

		};
		this.getForm = function() {
			return form = form || templates.render("files-upload", {});
		};
		this.bindAjaxFiles = function(filesAjax) {
			filesAjax.callbacks
				.on("begin", function({file}) { self.fileUploadStart(file) })
				.on("always, begin", function({toProceed, total}) { self.setFilesLeft(total, toProceed) })
				.on("always", function({toProceed}) { self.fileUploadDone(toProceed) })
				.on("progress", function({totalPercent, percent}) { self.setProgressPercent(totalPercent, percent);});
		}

	}

});