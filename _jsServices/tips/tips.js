sky.service("tips", ["stackList", "callbacks"], function({ stackList, callbacks }) {

    /** Class to work with tips */
    let list = stackList(),
        tips = this.service = {

			/**
			 * Hides all visible tips
			 * @param withoutAutoHide
			 * @param caller
			 */
        hideAll: function(withoutAutoHide, caller) {

            /* Hide all tips */
            list.each((tip) => {
                if(withoutAutoHide)
					tip.hide();
                else if(tip.autoHide && (!caller || !caller.closest(tip.tip).length && !caller.closest(tip.object).length)) {
					tip.hide();
                }
            });

        },

        /**
         * Returns last open window if any
         * @returns {tips.Tip|boolean}
         */
        getLast: function() {
            list.last();
        },

        /**
         * Add show/hide functions
         * @param {string}            selector            Object to bind tips for
         * @param {string}            align                Align of tip
         * @param options
         * @see tips.tip
         */
        bind: function(selector, align, options) {

            /* Create binds */
            $(selector).on({
                "mouseenter": function() {
                    let tip = $(this).data("tip") || tips.Tip(this, options).show(align);
                },
                "mouseleave": function() {
                    let tip = $(this).data("tip");
                    if(tip) tip.hide(align);
                }
            });

        },

        /**
         * Creates new tip object
         * @param {object}            object                Object to show tip for
         * @param autoHide
         * @param create
         * @param close
         * @param ajax
         * @param highlight
         * @param className
         * @constructor
         */
        Tip: function(object, { autoHide = true, create = false, close = false, ajax = false, highlight = false, className = false } = {}) {

            /* Auto construct */
            if(!(this instanceof tips.Tip))
                return new tips.Tip(object, { autoHide, create, close, ajax, highlight, className });

            /* Old tip exists */
            if($(object).data("tip"))
                return $(object).data("tip");

            /* Add to list */
			list.add(this);

            /* Manual create tip by create function */
            if(typeof create === "function") {

                /* Create tip */
                this.tip = create(object);

                /* If no tip */
                if(!this.tip) return this;

            }

            /* Object set */
            this.object = $(object).data("tip", this);

            /* Save callbacks */
            this.callbacks = callbacks();

            /* Auto hide */
            this.autoHide = autoHide;

            /* Manual create tip by create function */
            if(typeof create !== "function") {

                /* Create tip */
                this.tip = $("<div/>").addClass("tip").append('<div class="tipContent"></div>').insertBefore(object);

                /* Title using */
                if(!create && this.object.attr('title'))
					create = this.object.attr('title');
                else if(!create)
					create = "Пожалуйста подождите";

                this.tip.find(".tipContent").append(create);

            }

            if(highlight)
                this.shadow = $('<div/>').css({ opacity: 0, position:"absolute", width: "100%", height: "100%", left:0 ,top:0, background: "rgba(0,0,0,0.5)" }).appendTo("body");

            /* If count down */
            if(typeof close === "number")
                this.closeTimeout = setTimeout(() => this.hide(), close);

            /* If close button */
            else if(close)
                $('<div/>').addClass('close').appendTo(this.tip).on("click", () => this.hide());

            /* If stop possible */
            if(ajax)  ajax.on("always", () => this.hide());

            /* Add to list */
            if(className)
                this.tip.addClass(className);

            /* Add to list */
            this.tip.css("display", "none");

            return this;

        }

    };

    /**
     * Extends tip
     */
    $.extend(tips.Tip.prototype, /** @lends tips.tip */ {

        /**
         * Shows tip according to type
         * @param {string} [align] Way it would be shown
         */
        show: function(align) {

            /* Back link */
            let self   = this;
            let offset = this.tip.css({left: "", top: "", marginLeft: "", marginTop: "", display: ""}).addClass(align).offset();

            /* Stop animation and shows */
            this.tip.stop();

            /* Save way to show */
            if(align) this.align = align;

            /* If shadow */
            if(this.shadow)
                this.shadow.stop().show().animate({opacity: 1}, 100);

            /* Different actions according to tip position */
            switch(this.align) {

                /* If show righter than input */
                case "right":
                {
                    this.tip.css({
                        marginLeft: this.object.offset().left + this.object.outerWidth() - offset.left,
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "+=10"}, 100);
                    break;
                }
                /* If show righter than input */
                case "left":
                {
                    this.tip.css({
                        marginLeft: this.object.offset().left - offset.left - this.tip.outerWidth(),
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "top":
                {

                    // Count left offset
                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.css({
                        marginLeft: left,
                        marginTop : this.object.offset().top - this.tip.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "bottom":
                {

                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.css({
                        marginLeft: left,
                        marginTop : this.object.offset().top + this.object.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "+=10"}, 300);
                    break;
                }
                /* If we replace input with tip */
                case "instead":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.object.fadeOut(100, function() {
                        self.tip.fadeIn(100);
                    }).get(0).blur();
                    break;
                }
                case "inside":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.tip.css("opacity", 0).animate({opacity: 1}, 100);
                    break;
                }
                default:
                    break;
            }

            this.tip.css({left: "", top: ""});

            /* Self return */
            return this;

        },

        /**
         * Hides current tip
         */
        hide: function() {

            /* Remove count down if needed */
            if(this.closeTimeout)
                clearTimeout(this.closeTimeout);

            /* Stop animation */
            this.tip.stop();

            /* Get know how tip was shown */
            let align = this.align;

            /* Create end animation callback */
            let callback = () => {

                /* Delete record from global list */
                list.remove(this);

                /* Remove data */
                this.object.removeData("tip");

                /* Remove tip */
                this.tip.remove();

                /* Callback */
                this.callbacks.fire("hide", this);

            };

            /* If just shown */
            if(!align)
                callback();

            /* If shadow */
            if(this.shadow)
                this.shadow.animate({opacity: 0}, 100, () => { this.shadow.remove() });

            /* Right way hide */
            if(align === "right")
                this.tip.animate({opacity: 0, marginLeft: "+=10"}, 100, callback);

            /* Left way hide */
            if(align === "left")
                this.tip.animate({opacity: 0, marginLeft: "-=10"}, 100, callback);

            /* Instead way hide */
            if(align === "instead")
                this.tip.fadeOut({opacity: 0}, 200, callback);

            /* Top way hide */
            if(align === "top")
                this.tip.animate({opacity: 0, marginTop: "-=5"}, 200, callback);

            /* Bottom way hide */
            if(align === "bottom")
                this.tip.animate({opacity: 0, marginTop: "+=5"}, 200, callback);

            /* Inside way hide */
            if(align === "inside")
                this.tip.animate({opacity: 0}, 200, callback);

            /* Self return */
            return this;

        },

        /**
         * Gets tips dom
         * @returns {*}
         */
        get: function() {
            return this.tip;
        },

        /**
         * Sets tip text
         * @param {string|jQuery} text What to insert to tip body
         */
        set: function(text) {
            this.tip.children(".tipContent").html('').append(text);
            return this;
        },

        /**
         * Adds something to tip
         * @param {string|jQuery} what What to append to tip body
         */
        add: function(what) {
            this.tip.children(".tipContent").append(what);
            return this;
        }

    });

});