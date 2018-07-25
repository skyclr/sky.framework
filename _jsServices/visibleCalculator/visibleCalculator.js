sky.service("visibleCalculator", function() {

	let Calculator = class {

		constructor(holder, minHeight, scrollable) {

			/* Check if class */
			if(!(this instanceof Calculator))
				return new Calculator(holder, minHeight, scrollable);

			/* Re get holder */
			this.holder = $(holder);
			this.scrollable = scrollable || $('body');
			this.minHeight = minHeight || 0;

			/* Init */
			this.init();

		}

		/* Init func */
		init() {

			/* Count offset */
			let offset = this.holder.offset();

			/* Get holder rect */
			this.holderRect = {
				left  : offset.left,
				top   : offset.top,
				width : this.holder.outerWidth(),
				height: this.holder.outerHeight()
			};

		}

		/* Calculating function */
		calculate() {

			/* How much is scrolled */
			let scrollTop    = $(this.scrollable).scrollTop(),
				windowHeight = $(window).height(),
				windowWidth  = $(window).width(),
				sizes        = {
					left        : this.holderRect.left,
					right       : this.holderRect.left + this.holderRect.width,
					top         : this.holderRect.top - scrollTop,
					width       : this.holderRect.width,
					height      : this.holderRect.height,
					realHeight  : this.holderRect.height,
					bottom		: 0,
					scrollTop   : scrollTop,
					scrollLeft  : 0,
					windowHeight: windowHeight,
					windowWidth : windowWidth,
				};

			/* Min height */
			if(sizes.height < this.minHeight)
				sizes.height = this.minHeight;

			/* Count bottom */
			sizes.bottom = sizes.top + sizes.height;

			/* If top border near than holder */
			if(sizes.top < 0) {
				// If visible less than min
				if(sizes.bottom < this.minHeight) {
					sizes.bottom = sizes.bottom < 0 ? 0 : sizes.bottom;
					sizes.top = sizes.bottom - this.minHeight;
					sizes.height = this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = sizes.bottom;
					sizes.top = 0;
				}
			}

			/* Get visible bottom */
			if(windowHeight < sizes.bottom) {
				// If visible less than min
				if(windowHeight - sizes.top < this.minHeight) {
					sizes.height = this.minHeight;
					sizes.top = windowHeight - sizes.top < 0 ? 0 : sizes.top;
					sizes.bottom = sizes.top + this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = windowHeight - sizes.top;
					sizes.bottom = 0;
				}
			}

			/* Return */
			return sizes;

		}

		getDropOffset(replace, popup) {

			/* Get drop */
			if(!popup.is(":visible")) return;

			/* Set position to zeros to get max width and height */
			popup.removeClass('hidden').css({left: 0, top: 0});

			/* Init */
			let popupWidth  = popup.outerWidth(),
				popupHeight = popup.outerHeight();

			/* Reset position */
			popup.css({marginLeft: "", marginTop: "", width: "", left: "", top: ""});

			/* Init */
			let win            = $(window),
				replaceOffset  = replace.offset(),
				popupOffset    = popup.offset(),
				leftDifference = popupOffset.left - replaceOffset.left,
				topDifference  = popupOffset.top - replaceOffset.top,
				middle         = false,
				visible        = this.calculate(),
				top = 0, left = 0;

			// Drop down
			if(visible.bottom + popupHeight <= visible.windowHeight)
				top = topDifference + visible.realHeight + 1;
			// Drop up
			else if(visible.top > popupHeight)
				top = -topDifference - 1;
			// Drop left
			else {
				top = -topDifference - (popupHeight - visible.realHeight) / 2;
				middle = true;
			}
			
			/* Set position */
			if(!middle) {
				if(visible.windowWidth > visible.left + popupWidth)
					left = -leftDifference;
				else
					left = -leftDifference - popupWidth + visible.width;
			} else {
				if(win.width() > replaceOffset.left + popupWidth + visible.width)
					left = replaceOffset.left - popupOffset.left + visible.width;
				else
					left = replaceOffset.left - popupOffset.left - popupWidth;
			}

			return { top, left };
			
		}
	};
	this.service = Calculator;
});