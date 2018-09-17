/**
 * Holds classes to work with modal/new windows
 */
sky.service('windows', ["templates", "callbacks", "stackList"], function ({templates, callbacks, stackList}) {

	let tips = false,
		list = stackList(),
		windows = this.service = {
			/**
			 * Returns last open window if any
			 * @returns {Modal|undefined}
			 */
			getLast: () => list.last(),
			/**
			 * Returns new modal window
			 * @returns {Modal}
			 */
			modal: (name, data) => new Modal(name, data),

			modalAjax: (ajax) => {
				try {

					let loading = sky.service("ajaxLoadingIndicator").loading(ajax, false),
						modal = (new Modal(loading.render));

					ajax.on("always", () => { modal.unlock(); })
						.on("abort", () => { modal.unlock().close(); })
						.on("error", ({ error }) => {
							sky.service("notifications").message({ text: error }).appendToModal(modal);
						});

					modal.lock();

				} catch(e) {}
			}

		};


	/**
	 * Creates new modal window
	 * @param {*} name Window name
	 * @param {*} [data] Data to send with request
	 */
	class Modal {
		constructor (name, data) {

			/* Add to list */
			list.add(this);

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

		/**
		 * Renders window content
		 * @param {*} name Window name
		 * @param {*} [data] Data to send with request
		 */
		reRender(name, data) {

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
		}

		/**
		 * Removes all except that was rendered
		 */
		clearExceptTemplate() {
			this.holder.children().detach();
			this.holder.append(this.template);
			return this;
		}

		/**
		 * Removes all except that was rendered
		 */
		removeNotifications() {
			try {
				sky.service("notifications").findInElement(this.holder).remove();
			} catch(e) {}
		}

		/**
		 * Locks window so it can't be closed
		 * @var {*} ajax Ajax object
		 * @returns {Modal}
		 */
		lock(ajax = false) {
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
		}

		/**
		 * Unlocks window so it can be closed
		 * @returns {Modal}
		 */
		unlock() {
			this.locked = false;
			this.closeButton.show();
			return this;
		}

		/**
		 * Closes current window
		 * @param {boolean} [byUser] Indicates that window was closed not by user
		 */
		close(byUser = false) {

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
			try {
				tips = sky.service("tips").hideAll(true);
			} catch (e) {}

			/* Make body scrollable */
			if (list.total() < 1)
				$(document.body).css("overflow", "");

			return this;

		}
	}

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