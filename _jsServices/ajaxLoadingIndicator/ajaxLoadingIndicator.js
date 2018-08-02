sky.service("ajaxLoadingIndicator", ["stackList"], function({ stackList }) {

	let loadings = stackList();

	/**
	 * Loading
	 */
	class Loading {
		constructor(ajax, global = true) {

			/* List save */
			loadings.add(this);

			/* Back link */
			this.global = global;

			/* Render */
			this.render = $('<div/>').html('<div></div>').addClass("ajaxLoading");

			/* Global insert */
			if(this.global)
				this.render.addClass("fixed").appendTo("body");

			/* If stop possible */
			if(ajax) {
				$("<span/>").appendTo(this.render.addClass("cancelable")).click(function() {
					ajax.stop();
				});
				ajax.on("always", () => this.hide());
			}

			/* Callbacks */
			this.events = callbacks();

		}

		/**
		 * Loads loading in modal window
		 * @param {object} modal Window
		 */
		inModalWindow(modal) {

			/* Hide */
			let content = modal.holder.children().hide();

			/* Insert */
			this.render.appendTo(modal.holder);

			/* Restore on hide */
			this.events.on("hide", () => content.show());

		}

		/**
		 *
		 * @param contentHolder
		 */
		reloadContent(contentHolder) {

			this.setHolder(contentHolder);

			/* If no holder */
			if(!this.holder.length)
				return;

			/* Get children */
			let content = this.holder.children();

			/* Different content disable */
			if(this.global) {

				/* Disable content */
				content.disable();

				/* Make sizes calculator */
				this.calc = visibleCalculator(contentHolder, this.render.outerHeight(), "body");

				/* Re enable */
				this.events.on("hide", () => {
					content.enable();
					$(window).off("scroll.notification");
				});

				/* Bind scroll handler */
				$(window).on("scroll.notification", () => {
					let position = this.calc.calculate();
					this.render.css({
						left: position.left + (position.width) / 2,
						top : position.top + (position.height) / 2
					})
				}).trigger("scroll");

			} else {

				/*  Hide */
				content.hide();

				/* Insert */
				this.render.appendTo(this.holder);

				/* Re enable */
				this.events.on("hide", function() {
					content.show();
				});
			}

			return this;

		}

		setHolder(holder) {

			/* Append and save */
			this.holder = $(holder).addClass("withLoading").append(this.render);

			/* Self return */
			return this;

		}

		/**
		 * Hides current loading
		 */
		hide() {

			if(this.holder)
				this.holder.removeClass("withLoading");

			this.render.remove();
			this.events.fire("hide");

			/* Remove from list */
			loadings.remove(this);

		}
	}

	this.service = {
		loading: (ajax, global = true) => new Loading(ajax, global),
	}

});