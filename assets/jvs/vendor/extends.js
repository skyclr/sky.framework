(function($) {
	/**
	 * Extends base jquery functionality
	 */
	$.extend($.fn,
		/** @lends jQuery */
		{

			/**
			 * Puts current set instead of "what"
			 * @param what
			 */
			replaceElement: function(what) {
				$(what).replaceWith(this);
				return this;
			},

			/**
             * Reload this image
			 */
			reloadImage: function() {
                if(this.is("img")) {
                    var url = this.attr("src"), hashPos = url.indexOf("#");
                    if(hashPos > -1)
                        url = url.substr(0, hashPos);
                    this.attr("src", url + "#rand= " + Math.random());
                }
				return this;
			},

			/**
			 * Removes old content and append this
			 * @param what
			 */
			setAsContentOf: function(what) {
				$(what).html('').append(this);
				return this;
			},

			/**
			 * Enables element
			 */
			enable: function() {
				this.removeClass("disabled").prop("disabled", false).css("opacity", 1).css("filter", "");
				return this;
			},

			/**
			 * Disables controls, if param true then return true if already disabled
			 * @param {boolean} [check] If we should check before disable
			 */
			disable: function(check) {

				/* If objetc already disabled */
				if(check && this.isDisabled())
					return false;

				/* Disable form elements */
				this.filter(":input").prop("disabled", "disabled");

				/* Add classes */
				this.addClass("disabled");

				/* Add opacity */
				this.not("form").not(".button").not("label").css("opacity", 0.3).css("filter", "blur(10px)");

				/* Return true if check */
				return check ? true : this;

			},

			/**
			 * Checks first of matched elements if control disabled
			 */
			isDisabled: function() {
				return this.hasClass("disabled") || this.prop("disabled") === true;
			},

			/**
			 * Convert form inputs to object
			 */
			readForm: function() {

				/* Read object */
				var read = this.serializeArray(),
					readed = {},
					parse = function(input) {

						/* If array */
						if(input.name.match(/\[\]$/)) {

							/* Remove brackets */
							input.name = input.name.substr(0, input.name.length - 2);

							/* Make array if none */
							if(!readed[input.name])
								readed[input.name] = [];

							/* Add value */
							readed[input.name].push(input.value);

							/* If single */
						} else readed[input.name] = input.value;

					};


				/* Compile */
				$.each(read, function(_, input) {
					parse(input);
				});

				/* Parse json data */
				$('script[type="application/json"]').each(function() {

					/* Init */
					var self = $(this),
						name = self.attr("input-name");

					/* If no name */
					if(!name)
						return;

					parse({name: name, value: JSON.parse(self.html())})

				});

				return readed;

			},

			/**
			 * Formats elements on form or same
			 */
			formatForm: function() {

				var maxWidth = 0;
				var items = $();


				/* Get span with names */
				$("span.name:not(.notFormatForm)", this).filter(":visible").width('auto').each(function() {

					var item = $(this);

					if(item.closest(".notFormatForm, .small").length)
						return;

					if(item.width() > maxWidth)
						maxWidth = $(this).width();

					items = items.add(item);

				});

				items.css('width', maxWidth+1);

				/* Get inputs */
				/* removed: input.date, input.datetime, input.datehour,  */
				//$("input:radio, input[type=file]", this).filter(":visible").each(function() {
				//	var self = $(this);
				//	if(self.outerHeight() < self.parent().innerHeight()) {
				//		var margin = Math.floor((self.parent().innerHeight() - self.outerHeight()) / 2);
				//		self.css("margin-top", margin);
				//	}
				//});

				/* To resize modal windows */
				$(window).trigger("resize");

				/* Return objects */
				return this;

			},

			/**
			 * Convert form inputs to object
			 */
			readFormAlternative: function() {

				/* Read object */
				var readed = this.serializeObject();

				/* Parse json data */
				$('script[type="application/json"]').each(function() {

					/* Init */
					var self = $(this),
						name = self.attr("input-name");

					/* If no name */
					if(!name)
						return;

					parse({name: name, value: JSON.parse(self.html())})

				});

				return readed;

			}

		});
})(jQuery);

Function.prototype.proxy = function(context) {
	var self = this;
	return function() {
		self.apply(context, arguments);
	};
};

/* Twig extensions */
Twig.extendFilter("selected", function(value) {
	return value ? 'selected="selected"' : "";
});

/* Twig extensions */
Twig.extendFilter("checked", function(value) {
	return value ? 'checked="checked"' : "";
});

/* Twig extensions */
Twig.extendFilter("addClass", function(value, options) {
	return value ? 'class="' + options + '"' : "";
});

/* Twig extensions */
Twig.extendFilter("else", function(value, options) {
	return value ? value : options[0];
});

/* Twig extensions */
Twig.extendFilter("onTrue", function(value, options) {
	return value ? options[0] : '';
});

/* Twig extensions */
Twig.extendFilter("richText", function(value) {
	if(value)  {
		value = value.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
		value = value.replace(/\[b\](.*)\[\/b\]/g, '<b>$1</b>');
		value = value.replace(/\[i\](.*)\[\/i\]/g, '<i>$1</i>');
		value = value.replace(/\n/g, "<br/>");
	}
	return value;
});

/* Nl2br filter */
Twig.extendFilter("nl2br", function(value) {
	if(!value) console.log(value);
	return value ? value.replace(/\n/g, "<br/>") : "";
});

/* Special JSON filter */
Twig.extendFilter("json", function(value, inputName) {
	return sky.jsonData(value, inputName);
});

/* Special JSON filter */
Twig.extendFilter("json_pure", function(value, inputName) {
	return sky.encode(JSON.stringify(value, null, 4));
});

/* Special JSON filter */
Twig.extendFilter("anyIn", function(value, fields) {
	var found = false;
	$.each(value, function(_, val) {
		if($.inArray(val, fields[0]) > -1) {
			found = true;
			return false;
		}
	});
	return found;
});

/* Special JSON filter */
Twig.extendFilter("countIn", function(value, fields) {
	var count = 0;
	$.each(value, function(_, val) {
		if($.inArray(val, fields[0]) > -1)
			count++;
	});
	return count;
});

/* Special truncate filter */
Twig.extendFilter("truncate", function(value, max) {
	if(value.length > max)
		value = value.substr(0, max) + "…";
	return value;
});

/* Special truncate filter */
Twig.extendFilter("subRender", function(name, options) {
    return $("<div/>").append(sky.templates.render(name, options[0])).html();
});

/* Special string filter */
Twig.extendFilter("isString", function(name) {
    return typeof name == "string";
});
	
	/* Moment filter */
	Twig.extendFilter("moment", function(time, format) {
		return moment(time);
	});

/* Special truncate filter */
Twig.extendFilter("subRenderModel", function(name, options) {
    return $("<div/>").append(sky.templates.renderModel(name, options[0])).html();
});

/* Special truncate filter */
Twig.extendFilter("dataToModel", function(data, options) {
    return sky.model.fromData(options[0], data);
});

/* Special truncate filter */
Twig.extendFilter("pretty_phone", function(data, options) {
    var parts = data.match(/(\d)(\d{3})(\d{3})(\d+)/);
    return "" + parts[1] + " (" + parts[2] + ") " + parts[3] + "-" + parts[4];
});

/* Expose the internal Twig object for extension */
Twig.extend(function(Twig) {

	sky.Twig = Twig;
	Twig.options = Twig.options || {};
	Twig.options.rethrow = true;
	//
	// /* Exceptions remake */
	// Twig.log.error = function(text) {
	// 	throw new sky.exceptions.system.Error(text);
	// };

	/* Special import tag */
	Twig.exports.extendTag({

		type: Twig.logic.type.import_,
		regex: /^import\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/,
		next: [ ],
		open: true,
		compile: function (token) {
			let expression = token.match[1].trim(),
				contextName = token.match[2].trim();
			delete token.match;

			token.expression = expression;
			token.contextName = contextName;

			token.stack = Twig.expression.compile.call(this, {
				type: Twig.expression.type.expression,
				value: expression
			}).stack;

			return token;
		},
		parse: function (token, context, chain) {

			if (token.expression === '_self') {
				context[token.contextName] = this.macros;
				return Twig.Promise.resolve({ chain: chain, output: '' });
			}

			let template = sky.service("templates").load(token.expression),
				compiled = new Twig.Template({ data: template });

			compiled.options = {};
			context[token.contextName] = compiled.render({ globals: sky.service("templates").globals }, { output: 'macros' });

			return { chain : chain, output: '' }
		}
	});
});



/**
 * Changes tab
 * @param tabs
 * @param _
 * @param tabName
 */

page.changeTab = function(tabs, _, tabName) {

	/* Saved by default */
    if(!tabName)
        tabName = tabs.find(".active").attr("data-tab");
    else {
        $("h1 > .tabs [data-tab=" +tabName + "]").trigger("click");
        return;
    }

	/* Hide other tab bodies and show current */
    $(".tabData").addClass("hidden").filter("[tab=" + tabName + "]").removeClass("hidden");

	/* Save */
    page.currentLoader = page[tabName + "Loader"];

	/* redraw pagination */
    if(page.currentLoader.pagination)
        page.currentLoader.pagination.redraw();

	/* If we should get current hash and use it for loading current tab */
    if(page.first) {
        page.currentLoader.reload({fromHash: true});
        page.first = false;

		/* If we should replace hash with current tab data */
    } else {

		/* Set tab */
        page.history.set({tab: tabName}, true);

		/* Write hash data and reload if not loaded already */
        if(!page.currentLoader.writeHash().lastRequestData)
            page.currentLoader.reload({});
    }
};

page.changeOrder = function (button, _, order) {
    var desc = button.hasClass("desc");
    button.closest("tr").find("a").removeClass("asc desc");
    if (desc) {
        button.removeClass("desc").addClass("asc");
        page.history.set({ order_asc: order, order_desc: null });
    } else {
        button.removeClass("asc").addClass("desc");
        page.history.set({ order_desc : order, order_asc : null });
    }

    page.currentLoader.reload();
};


/**
 * Generates chart, replace base settings with specified
 * @param {object} settings Chart settings
 */
page.makeChart = function(settings) {

    var options = {
        chart: {
            renderTo            : settings.holderId,
            zoomType            : 'x',
            spacingRight        : 20,
            defaultSeriesType   : settings.type ? settings.type : "area"
        },
        title: {
            text : "",
            style: { color: '#333' }
        },
        subtitle: {
            text : 'Для увеличения графика выделите прямоугольную область',
            style: { color: '#888' }
        },
        xAxis: {
            type		: 'linear',
            //title		: null,
            categories	: false
        },
        yAxis: {
            title			: { text: null, style: { color: '#888' } },
            min				: 0,
            //startOnTick		: false,
            //showFirstLabel	: false
        },
        tooltip: {
            shared      : true,
            formatter   : settings.formatter ? settings.formatter : false
        },
        legend: {
            enabled     : settings.legend ? settings.legend : false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: [0, 0, 0, 300],
                    stops: [
                        [0, "#DF662E"],
                        [1, 'rgba(255,205,41,0)']
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false,
                    states: {
                        hover: { enabled: true, radius: 5 }
                    }
                },
                shadow: false,
                states: {
                    hover: { lineWidth: 1 }
                }
            }
        },
        colors  : [ "#FF9900", "#C40000", "#666666", "#0094ff", "#00b01b", "#a500ff" ],
        series	: [],
        credits : {
            enabled: false
        }
    };

	/* Prepares title */
    if(settings.title) {
        if(typeof settings.title == "string") options.title.text = settings.title;
        else $.extend(true, options.title, settings.title);
    }

	/* Prepares subtitle */
    if(settings.subtitle) {
        if(typeof settings.subtitle == "string") options.subtitle.text = settings.subtitle;
        else $.extend(true, options.subtitle, settings.subtitle);
    }

	/* Prepares xAxis */
    if(settings.xAxis) {
        if(typeof settings.xAxis == "string") options.xAxis.title = settings.xAxis;
        else $.extend(true, options.xAxis, settings.xAxis);
    }

	/* Prepares yAxis */
    if(settings.yAxis) {
        if(typeof settings.yAxis == "string") options.yAxis.title.text = settings.yAxis;
        else options.yAxis = settings.yAxis;
    }

	/* Prepares tooltip */
    if(settings.tooltip) {
        if(typeof settings.tooltip == "function") options.tooltip.formatter = settings.tooltip;
        else $.extend(true, options.tooltip, settings.tooltip);
    }

	/* Prepares legend */
    if(settings.legend) {
        if(typeof settings.legend == "boolean") options.legend.enabled = settings.legend;
        else $.extend(true, options.legend, settings.legend);
    }

	/* Prepares legend */
    if(settings.plotOptions)
        $.extend(true, options.plotOptions, settings.plotOptions);


	/* Prepares chart */
    if(settings.chart)
        $.extend(true, options.chart, settings.chart);


	/* Prepares colors */
    if(settings.colors) {
        if(typeof settings.colors == "string") options.colors = [settings.colors];
        else options.colors = settings.colors;
    }

	/* Prepares series */
    if(settings.series) {
        if(!(settings.series instanceof Array)) settings.series = [settings.series];
        options.series = settings.series;
    }

	/* Create chart */
    var chart =  new Highcharts.Chart(options);

	/* To move all */
    $(window).trigger("resize");

    return chart;

};


/**
 * Add special function
 * @param {string} pointStart String to be converted to start point
 */
page.makeChart.startPoint = function(dateString) {

    var date = new Date();

	/* If input has datetime format value */
    if(dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/))
        date = moment(dateString, "YYYY-MM-DD HH:mm");

	/* Id input has date format value */
    if(dateString.match(/^\d{4}-\d{2}-\d{2}$/))
        date = moment(dateString, "YYYY-MM-DD");

	/* Id input has date format value */
    if(dateString.match(/^\d{2}.\d{2}.\d{4}$/))
        date = moment(dateString, "DD.MM.YYYY");

	/* Id input has date format value */
    if(dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/))
        date = moment(dateString, "DD.MM.YYYY HH:mm");

    return parseInt(date.add(3, "hours").format("x"));

};