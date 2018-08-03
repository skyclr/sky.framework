sky.service("calendar", [ "templates", "visibleCalculator" ], function ({ templates, visibleCalculator }) {

	/* This class is for showing calendar to pick date on page */
	let calendar = {

		/* Days set */
		monthsNames: window.page.data.monthsNames || ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],

		renderDays: function () {

			/* Clone */
			let current = moment(this.date),
				weeks = [],
				currentWeek = false;

			/* From first */
			current.date(1);

			/* Go through */
			while (current.month() === this.date.month()) {

				/* Make week if new */
				if (!currentWeek || current.day() === 1) {
					currentWeek = {number: current.isoWeek(), days: []};
					weeks.push(currentWeek);
				}

				/* Push */
				currentWeek.days.push({date: current.clone(), dateStr: current.format("YYYY.MM.DD"), day: current.day() === 0 ? 6 : current.day() - 1});

				/* Go next day */
				current.add(1, "d");

			}

			/* Render */
			this.dates.html('').append(templates.render("calendar-dates", {
				weeks: weeks,
				dateStr: this.date.format("YYYY.MM.DD"),
				current: this.date,
				period: this.period,
				since: this.since,
				till: this.till
			}));

			/* Render */
			this.setTime();

		},

		/**
		 * When user picks date
		 * @param {*} dayDiv Div that user clicked, if he did
		 * @param notClose
		 */
		dayPick: function (dayDiv, notClose) {

			/* Set date */
			if (dayDiv)
				this.date.date(parseInt(dayDiv.html()));

			this.field.val(this.getInputValue()).trigger("change").trigger("keyup");
			if (!notClose) this.close();

		},

		getInputValue: function () {

			/* Get field new value */
			if (this.useTime)
				return this.date.format("DD.MM.YYYY HH:mm");
			else if (this.period && this.since.isSame(this.till))
				return this.since.format("DD.MM.YYYY");
			else if (this.period)
				return this.since.format("DD.MM.YYYY") + ' - ' + this.till.format("DD.MM.YYYY");

			/* Default */
			return this.date.format("DD.MM.YYYY");

		},

		setDayPick: function () {
			this.pickedDateView.html(this.getInputValue());
		},

		/**
		 * Position date picker
		 * @param {*} field Item that we should position under
		 */
		position: function (field) {

			this.holder.insertAfter(field.parent()).css("position", "absolute");

			let calculator = new visibleCalculator(field),
				offset = calculator.getDropOffset(field, this.holder);

			this.holder.css({
				marginTop: offset.top,
				marginLeft: offset.left,
				width: offset.width
			});

		},

		/**
		 * Sets time inputs in calendar values
		 */
		setTime: function () {

			/* Set time */
			this.holder.find(".time .hour").val(this.date.format("HH"));
			this.holder.find(".time .minute").val(this.date.format("mm"));

		},

		periodChangeDay: function () {

			let reset = function () {
				calendar.since = calendar.date.clone();
				calendar.till = calendar.date.clone();
				calendar.lastModified = "none"
			};

			if (this.date.isBefore(this.since)) {
				if (this.lastModified !== "since") {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
				else reset();
			} else if (this.date.isAfter(this.till)) {
				if (this.lastModified !== "till") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else reset();
			} else if (this.date.isSame(this.till) || this.date.isSame(this.since))
				reset();
			else {
				if (this.lastModified === "since") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
			}

			calendar.markSelected();

		},

		markSelected: function () {

			this.dates.find(".day").removeClass("selected").removeClass("subSelected").each(function () {


				let element = $(this),
					date = calendar.date.clone().date(parseInt(element.html()));

				if (!calendar.period) {
					if (date.format("DD.MM.YYYY") === calendar.date.format("DD.MM.YYYY"))
						element.addClass("subSelected");
					return;
				}

				if (date.isAfter(calendar.since) && date.isBefore(calendar.till))
					element.addClass("subSelected");
				else if (date.isSame(calendar.since) || date.isSame(calendar.till))
					element.addClass("selected");

			});

		},

		/**
		 * Changes day
		 * @param {*} element Day picker
		 * @returns {undefined}
		 */
		changeDay: function (element) {

			/* If pick today */
			this.date.date(parseInt(element.html()));

			/* No more for period */
			if (this.period) {
				this.periodChangeDay();
				return;
			}

			calendar.markSelected();

			/* Set time */
			if (this.field.attr("name") === "since")
				this.date.hour(0).minute(0);
			else if (this.date.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))
				this.date.hour(moment().hour()).minute(moment().minute());
			else
				this.date.hour(23).minute(59);

			/* Pick */
			if (this.useTime)
				this.setTime();

		},

		/**
		 * Sets specified year
		 * @param {int} year Year that need to be set
		 */
		changeYear: function (year) {

			/* Set year */
			this.date.year(year);

			/* Update */
			this.yearView.html(year);

			/* Dates redraw */
			this.renderDays();

		},

		/**
		 * Sets specified month
		 * @param {int} month Month to be set
		 */
		changeMonth: function (month) {

			/* Set year */
			this.date.month(month);

			/* Updates */
			this.monthView.html(this.monthsNames[this.date.month()] + ' ' + this.date.year());

			/* Reload year */
			this.changeYear(this.date.year());

		},

		getDatePeriod: function (dateString) {

			// Split and get since
			let parts = dateString.split('-'),
				till,
				since = this.getDate(parts[0].trim());

			// Get till
			if (parts.length > 1)
				till = this.getDate(parts[1].trim());
			else
				till = this.getDate(parts[0].trim());

			// Set inner lets
			this.since = since;
			this.till = till;
			this.date = since.clone();

		},

		/**
		 * Creates today date
		 */
		getDate: function (dateString) {

			/* Set calendar date */
			let date = false;

			/* If input has datetime format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/))
				date = moment(dateString, "YYYY-MM-DD HH:mm");

			/* Id input has date format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2}$/))
				date = moment(dateString, "YYYY-MM-DD");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4}$/))
				date = moment(dateString, "DD.MM.YYYY");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/))
				date = moment(dateString, "DD.MM.YYYY HH:mm");

			/*  If still no */
			if (!date) {
				date = moment();

				/* Set time */
				if (this.field.attr("name") === "since")
					date.hour(0).minute(0);
			}

			/* Reset time */
			if (!this.useTime)
				date.hour(0).minute(0);

			/* Additional check */
			return this.date = date;

		},

		/**
		 * Closes windows
		 */
		close: function () {

			/* Remove calendar */
			if (this.holder)
				this.holder.remove();

			/* Unset */
			if (this.field) {
				this.field.off("keyup.calendar");
				this.field = false;
			}
		}
	};

	let show = function (field, showTime) {

		/* Remove old calendars */
		this.close();

		/* Begins from current date */
		this.field = field;
		this.period = false;
		this.useTime = showTime ? showTime : false;
		// this.lastPicked = "none";

		if (field.is("input.datePeriod")) {
			this.period = true;
			this.getDatePeriod(field.val());
		} else
			this.getDate(field.val());

		/* Render */
		this.holder = templates.render("calendar", this);

		/* Actions */
		this.holder

		/* Months changer */
			.action("click", ".month .next", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() + 1);
			})
			.action("click", ".month .prev", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() - 1);
			})

			/* Years */
			.action("click", ".year .next", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() + 1);
			})
			.action("click", ".year .prev", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() - 1);
			})
			.action("click", ".setNow", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setToday", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.hour(0);
				calendar.date.minute(0);
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setWeek", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.subtract(7, "d");
				calendar.renderDays();
				calendar.setTime();
			})

			/* Day */
			.action("click", ".dates .day", function (event) {
				event.preventDefault();
				let self = $(this);

				if (self.is(".selected") && !calendar.period)
					calendar.dayPick($(this));
				else {
					calendar.changeDay($(this));
					calendar.dayPick(false, true);
				}
			})

			/* Apply button */
			.action("click", ".apply", function (event) {
				event.preventDefault();
				calendar.dayPick();
			})

			/* Time */
			.action("click", ".time a", function (event) {
				event.preventDefault();
				calendar.date.hour(moment().hour());
				calendar.date.minute(moment().minute());
				calendar.setTime();
			})
			.action("keyup", ".time .hour", function () {
				calendar.date.hour(this.value);
			})
			.action("keyup", ".time .minute", function () {
				calendar.date.minute(this.value);
			});


		/* Close and containers */
		this.dates = this.holder.find(".dates");
		this.yearView = this.holder.find(".year .value");
		this.monthView = this.holder.find(".month .value");
		this.pickedDateView = this.holder.find(".pickedDate");

		/* Refresh days */
		this.renderDays();

		/* Reposition */
		this.position(field);
		this.setDayPick();

		/* Auto change */
		this.field.on("keyup.calendar", function () {
			show(field, showTime);
		});

		let dateOriginal;
		this.dates.on("touchstart", function (event) {

			let element = $(event.target);
			if (!element.is(".day")) return;
			dateOriginal = calendar.date.clone().date(parseInt(element.html()));

		}).on("touchmove", function (event) {

			/* No original event */
			event.preventDefault();

			let element = document.elementFromPoint((event.clientX || event.originalEvent.touches[0].clientX), (event.clientY || event.originalEvent.touches[0].clientY));
			element = $(element);

			if (!element.is(".day")) return;

			let date = dateOriginal.clone().date(parseInt(element.html()));

			if (date.isBefore(dateOriginal)) {
				calendar.since = date.clone();
				calendar.till = dateOriginal.clone();
			} else {
				calendar.since = dateOriginal.clone();
				calendar.till = date.clone();
			}
			calendar.lastModified = "none";
			calendar.markSelected();
			// $(this).trigger("click");

		});

	}.bind(calendar);

	/* Return */
	this.service = show;

});

sky.onReady(({calendar}) => {

	/* Calendar show */
	$(document).action("click.calendar", function (event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* Remove calendar */
		if (!element.is(".calendar") && !element.parents(".calendar").length)
			$(".calendar").remove();

		/* Calendar show */
		if (element.is("input.date"))
			calendar(element);

		/* Calendar show */
		if (element.is("input.datePeriod"))
			calendar(element, false, true);

		/* Calendar show */
		if (element.is("input.datetime"))
			calendar(element, true);

		/* Calendar show */
		if (element.is("input.datehour"))
			calendar(element, true);

	}).action("keydown.calendar", function (event) {
		if (event.keyCode === 13) {
			let calendars = $(".calendar");
			if (calendars.length) {
				calendars.find(".day.selected").trigger("click");
				event.preventDefault();
			}
		}
	});
});