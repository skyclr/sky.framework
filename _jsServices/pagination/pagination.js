sky.service("pagination", ["templates", "stackList"], function({ templates, stackList }) {

	let list = stackList();

	class Pagination {
		constructor({ pages, holder, current = 1, }) {

			/* Save */
			list.add(this);

			/* Set total pages */
			this.pages 		= pages;
			this.current 	= current;
			this.pageWidth	= 50;

			/* No pages needed */
			if(this.pages < 2)
				return this;

			/* Counted params */
			this.dimensions = {
				startPage      : 1,
				pagesVisible   : 0,
				pagesInvisible : 0,
				scrollAvailable: 0,
				scrollStart	   : 0,
				tumbler		   : 10
			};

			/* Render */
			this.dom = {};
			this.dom.holder  = templates.render("pagination", {}).data("pagination", this);
			this.dom.slider  = this.dom.holder.find(".pages");
			this.dom.pages   = this.dom.slider.children();
			this.dom.back 	 = this.dom.holder.children(".left");
			this.dom.forward = this.dom.holder.children(".right");

			/* Insert */
			if(holder)
				this.dom.holder.appendTo(holder);

			/* If bigger than 10000 */
			if(this.pages > 9999) {
				this.dom.slider.addClass("tenthousand");
				this.pageWidth = 80;
			}
			/* If bigger than 1000 */
			else if(this.pages > 999) {
				this.dom.slider.addClass("thousand");
				this.pageWidth = 70;
			}
			/* If bigger 100 */
			else if(this.pages > 99 ) {
				this.dom.slider.addClass("hundred");
				this.pageWidth = 60;
			}

			/* Make all */
			this.redraw();

			/* Mark page */
			this.goToPage(this.current);

			/* Self return */
			return this;

		}

		/** */
		onPageChange(newPage) {}

		/** Removes navigator */
		remove() {
			this.dom.holder.remove();
			list.remove(this);
		}

		/**
		 * Redraws pagination
		 */
		redraw() {

            /* No action on invisible */
            if(!this.dom.holder.is(":visible"))
                return;

			/* Reset width */
			this.dom.slider.css("width", "auto");

			/* Count visible sizes */
			this.dimensions.pagesVisible = Math.floor((this.dom.holder.innerWidth() - 100) / this.pageWidth);

			/* Count invisible */
			this.dimensions.pagesInvisible = (this.pages - this.dimensions.pagesVisible) > 0 ? this.pages - this.dimensions.pagesVisible : 0;

			/* Get max pages */
			let toShow = this.dimensions.pagesVisible > this.pages ? this.pages : this.dimensions.pagesVisible;

			/* Crop */
			this.dom.slider.css("width", toShow * this.pageWidth);

			/* Redraw pages */
			this.drawPages(this.dimensions.startPage);

			/* Try to create scroll */
			this.createScroll();

			/* Set scroll position */
			if(this.dom.scrollLine)
				this.dom.runner.css("left", this.calculate().scroll);

		}

		/**
		 * Create scroll line if needed
		 */
		createScroll() {

			/* If no scroll needed */
			if(this.pages <= this.dimensions.pagesVisible) {
				if(this.dom.scrollLine) {
					this.dom.scrollLine.remove();
					this.dom.scrollLine = false;
				}
				return;
			} else if(!this.dom.scrollLine) {

				/* Create scroll */
				this.dom.scrollLine = templates.render("pagination-scroll", {}).appendTo(this.dom.slider);
				this.dom.runner = this.dom.scrollLine.children();
			}

			/* Count left */
			this.dimensions.scrollStart = this.dom.scrollLine.position().left + 2;

			/* Count scroll line width */
			this.dimensions.scrollAvailable = this.dom.scrollLine.outerWidth() - this.dom.scrollLine.children().outerWidth() - 4;
		
		}

		/**
		 * Calculates related coordinates between scroll and move part
		 */
		calculate(position) {

			/* Get position */
			if(position === undefined)
				position = this.dom.runner.offset().left  - this.dimensions.scrollStart;

			/* Remove start */
			position = position - this.dimensions.scrollStart;

			/* Correct */
			position = position > 0 ? position : 0;

			/* Count pages */
			return {
				pages : Math.floor(this.dimensions.pagesInvisible * (position / this.dimensions.scrollAvailable)) + 1,
				scroll: Math.floor(this.dimensions.scrollAvailable * (this.dimensions.startPage - 1)/ this.dimensions.pagesInvisible + this.dimensions.scrollStart)
			}

		}

		/**
		 * Draws pages according to start
		 * @param {int} start Page to start from
		 */
		drawPages(start) {

			/* Remove old pages */
			this.dom.pages.html("");

			/* Correct */
			if(start > this.dimensions.pagesInvisible)
				start = this.dimensions.pagesInvisible + 1;

			/* Correct */
			if(start < 1)
				start = 1;

			/* Start position */
			let i = start;

			/* Draw pages */
			while(i <= this.pages && i < start + this.dimensions.pagesVisible) {
				templates.render("pagination-page", { page: i, current: this.current }).appendTo(this.dom.pages);
				i++;
			}

			/* Reset start page */
			this.dimensions.startPage = start;


		}

		/**
		 * Sets page as active
		 * @param {int} page Page number
		 * @returns {Pagination}
		 */
		goToPage(page = 1) {

			/* Parse */
			page = parseInt(page);

			/* Correct */
			if(page < 1)
				page = 1;
			else if(page > this.pages)
				page = this.pages;

			/* Checks if page is visible */
			let isVisible = this.dimensions.startPage <= page && page < this.dimensions.startPage + this.dimensions.pagesVisible;

			/* Redraws if needed */
			if(!isVisible) {
				this.drawPages(page);
				if(this.dom.scrollLine)
					this.dom.runner.css("left", this.calculate().scroll);
			}

			/* Make active */
			this.dom.pages.children().removeClass("active").filter("[data-page=" + page +"]").addClass("active");

			/* Forward buttons disable */
			page > 1 ? this.dom.back.enable() : this.dom.back.disable();

			/* Backward button disable */
			page === this.pages ? this.dom.forward.disable() : this.dom.forward.enable();

			/* Callback */
			if(this.current !== page)
				this.onPageChange(page);

			/* Save page state */
			this.current = page;

			/* Self return */
			return this;

		}

		/** Set scroll */
		scroll(event) {

			let pos = event.pageX - 10;
			if(this.dimensions.scrollStart > pos)
				pos = this.dimensions.scrollStart;
			if(this.dimensions.scrollStart + this.dimensions.scrollAvailable < pos)
				pos = this.dimensions.scrollStart + this.dimensions.scrollAvailable;

			this.dom.runner.css({left: pos});
			this.drawPages(this.calculate(pos).pages);

		}

	}

	/* Bind windows events */
	$(window).on("resize", function() {
		list.each((pages) => { pages.redraw(); });
	});

	/* Return */
	this.service = {
		add: function(options) {
			return new Pagination(options);
		}
	}

});