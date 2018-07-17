/**
 * For work with different type of notifications
 */
sky.service("notifications", [ "stackList", "callbacks", "visibleCalculator", "templates", "windows", "tips" ], function({ stackList, callbacks, visibleCalculator, templates, windows, tips }) {

	let notification = function(options) {
		/* Self creation */
		if(!(this instanceof notification))
			return new notification(options);

		this.render = templates.render("forms-notification", options);
	};
	let message = function(options) {

		/* Self creation */
		if(!(this instanceof message))
			return new message(options);

		this.render = templates.render("forms-message", options);
	};

	message.prototype = {
		modal: function() {
			return windows.Modal(this.render);
		},

		/**
		 * Append to holder of modal window
		 * @param {object} modal
		 */
		appendToModal: function(modal) {
			modal.holder.append(this.render);
		},

		tip: function(object, align) {
			tips.Tip(object, { create: this.render, close: 5 }).show(align || "top",);
		}
	};

	let loadings = stackList();

	/**
	 * Loading
	 */
	let loading = function(ajax, global = true) {

		/* Self creation */
        if(!(this instanceof loading))
            return new loading(ajax, global);

		/* Back link */
		this.global = global;

		/* Render */
		this.render = $('<div><div></div></div>').addClass("ajaxLoading");

		/* Global insert */
		if(this.global)
			this.render.addClass("fixed").appendTo("body");

		/* If stop possible */
		if(ajax) {
			$("<span/>").appendTo(this.render.addClass("cancelable")).click(function() { ajax.stop(); });
			ajax.on("always", () => { this.hide(); });
		}

		/* Callbacks */
		this.callbacks = callbacks();

		/* List save */
		loadings.add(this);

	};

	/**
	 * Prototype
	 * @type {{render: null, hide: hide}}
	 */
	loading.prototype = {

		/**
		 * Loads loading in modal window
		 * @param {object} modal Window
		 */
		inModalWindow: function(modal) {

			/* Hide */
			let content = modal.holder.children().hide();

			/* Insert */
			this.render.appendTo(modal.holder);

			/* Restore on hide */
			this.callbacks.on("hide", () => content.show());

		},

		/**
		 *
		 * @param contentHolder
		 */
		reloadContent: function(contentHolder) {

			/* If no holder */
			if(!this.holder.length)
				return;

			/* Safe */
			this.holder = contentHolder = $(contentHolder).addClass("withLoading");

			/* Get children */
			let content = contentHolder.children();

			/* Different content disable */
			if(this.global) {

				content.disable();

				/* Make sizes calculator */
				this.calc = visibleCalculator(contentHolder, this.render.outerHeight(), "body");

				/* Set position func */
				this.setPosition = function() {
					let position = this.calc.calculate();
					this.render.css({
						left: position.left + (position.width) / 2,
						top: position.top + (position.height) / 2
					})
				};
				this.setPosition();

				/* Re enable */
				this.callbacks.on("hide", () => {
					content.enable();
					$(window).off("scroll.notification");
				});

				$(window).on("scroll.notification", () => { this.setPosition();	});

			} else {

				/*  Hide */
				content.hide();

				/* Insert */
				this.render.appendTo(this.holder);

				/* Re enable */
				this.callbacks.on("hide", function() {
					content.show();
				});
			}

			return this;

		},

		setHolder: function(holder) {

			/* Append and save */
			this.holder = $(holder).addClass("withLoading").append(this.render);

			/* Self return */
			return this;

		},

		/**
		 * Hides current loading
		 */
		hide: function() {

			if(this.holder)
				this.holder.removeClass("withLoading");

			this.render.remove();
			this.callbacks.fire("hide");

			/* Remove from list */
			loadings.remove(this);

		}
	};

	return {
		loading: loading,
		message: message,
		reCalculate: function() {
			loadings.each(function(instance) {
				instance.calc.init();
				instance.setPosition();
			})
		}
	}

});