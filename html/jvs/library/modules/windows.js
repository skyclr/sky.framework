/**
 * Holds classes to work with modal/new windows
 */
sky.service('windows', function ({templates, callbacks, stackList}) {

	let tips = false,
		list = stackList(),
		windows = this.service = {

			/**
			 * Returns last open window if any
			 * @returns {windows.Modal|boolean}
			 */
			getLast: function () {
				return list.last()
			},

			/**
			 * Creates new modal window
			 * @param {*} name Window name
			 * @param {*} [data] Data to send with request
			 */
			Modal: function (name, data) {

				/* Self construct */
				if (!(this instanceof windows.Modal))
					return new windows.Modal(name, data);

				/* Create window */
				this.locked 		= false;
				this.background 	= templates.render("windows-modal", {}).appendTo("#pageContentHolder").data("modalWindow", this);
				this.dataContainer 	= this.background.children();
				this.holder 		= this.dataContainer.children(".windowData");
				this.closeButton 	= this.dataContainer.children(".close");

				/* Make body un scrollable */
				$(document.body).css("overflow", "hidden");

				/* Callbacks */
				this.callbacks = callbacks();

				/* Render content */
				try {
					this.reRender(name, data);
				} catch (e) {
					this.close(false);
					throw e;
				}

				/* Return */
				return this;

			}

		};

	/**
	 * Modal window prototype
	 */
	windows.Modal.prototype = {

		/**
		 * Renders window content
		 * @param {*} name Window name
		 * @param {*} [data] Data to send with request
		 */
		reRender: function (name, data) {

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Clear */
			this.holder.html('');

			/* Render content */
			if (name instanceof jQuery)
				this.template = name.appendTo(this.holder);
			else if (typeof name === "string")
				this.template = templates.render(name, data).appendTo(this.holder);

			/* Self return */
			return this;
		},

		/**
		 * Removes all except that was rendered
		 */
		clearExceptTemplate: function () {
			this.holder.children().detach();
			this.holder.append(this.template);
		},

		/**
		 * Removes all except that was rendered
		 */
		removeMessages: function () {
			this.holder.find(".notificationMessage").remove();
			return this;
		},

		/**
		 * Locks window so it can't be closed
		 * @returns {windows.Modal}
		 */
		lock: function (ajax) {
			this.locked = true;
			this.closeButton.hide();
			if (ajax) ajax
				.on("preSuccess", function () {
					this.dataContainer.css("height", this.dataContainer.innerHeight());
				}, this)
				.on("notAbort", function () {
					let self = this;
					this.unlock();
					this.dataContainer.css("height", this.holder.outerHeight());
					setTimeout(function () {
						self.dataContainer.css("height", "");
					}, 500)
				}, this)
				.on("abort", function () {
					this.unlock().close();
				}, this);
			return this;
		},

		/**
		 * Unlocks window so it can be closed
		 * @returns {windows.Modal}
		 */
		unlock: function () {
			this.locked = false;
			this.closeButton.show();
			return this;
		},

		/**
		 * Closes current window
		 * @param {boolean} [byUser] Indicates that window was closed not by user
		 */
		close: function (byUser = false) {

			/* If windows is locked */
			if (this.locked)
				return;

			/* Remove elements */
			this.background.fadeOut("fast", function () {
				$(this).remove()
			});

			/* Delete from list */
			list.remove(this);

			/* Call close callback */
			this.callbacks.fire("close", {byUser: byUser});

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Make body scrollable */
			if (list.total() < 1)
				$(document.body).css("overflow", "");

			return this;

		}

	};

	try {
		tips = sky.service("tips");
	} catch (e) {}

	/* Add handler to black area click */
	$(document)
		.on("keyup", sky.func(function (event) {
			let last;

			/* If slide show was disabled */
			if (document["webkitIsFullScreen"] || document["mozIsFullScreen"] || document["isFullScreen"])
				return;

			/* Close current window */
			if (event.keyCode === 27 && (last = windows.getLast()))
				last.close(true);

		}));

});