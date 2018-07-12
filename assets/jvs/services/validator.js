sky.onReady(function({ validator }) {
	jQuery.fn.validForm = function() {
		return validator.validateForm(this);
	}.safe();
	jQuery.fn.validationRule = function(name, options) {
		return validator.addRule(this, name, options);
	}.safe();
	$(document).on("change keyup", "[data-validate]", function() {
		validator.validateElement($(this));
	});
});

sky.service("validator", function() {

	/**
	 * Main validation object
	 */
	let validator = this.service = {

		/**
		 * Validates specified form, or dom element
		 * @param form
		 */
		validateForm: function(form) {

			let pass = true,
				self = this;

			/* Go through all elements that need to be validate */
			form.find("input, select, textarea, .selectReplace, [data-validate]").filter(":visible").each(function() {

				/* Get element */
				let element = $(this);

				/* validate if needed to */
				if(self.shouldBeValidated(element) && !self.validateElement(element, form))
					pass = false;

			});

			/* Return result */
			return pass;

		},

		/**
		 * Add rule to specified element
		 * @param element
		 * @param name
		 * @param [options]
		 */
		addRule: function(element, name, options) {

			/* Get or make options and add rule */
			this.Options(element).addRule(name, options || {});

			/* Self return */
			return this;

		},

		/**
		 *
		 * Validates specified element
		 * @param {*} element Element to validate
		 * @param {*} [form] Form to validate
		 * @returns {boolean}
		 */
		validateElement: function(element, form) {

			let self = this,
				options = this.Options(element),
				totalPass = true,
				value = element.val(),
				lastError = false,
				firstError = false,
				lastSuccess = false,
				firstSuccess = false;

			/* Select replace */
			if(element.is(".selectReplace")) {
				let inputs = element.next().find("input:checked");
				if(!inputs.length)
					value = "";
				else if(element.is(".single"))
					value = element.next().find("input:checked").val();
				else
					value = element.next().find("input:checked").length ? "true" : "";
			}

			/* Go through rules */
			$.each(options.rules, function(name, ruleOverload) {

				/* Make compiled rule */
				let compiledRule = jQuery.extend(true, {}, self.rules[name] || self.Rule({}), ruleOverload || {});

				/* Execute message is needed */
				if(typeof compiledRule.message === "function")
					compiledRule.message = compiledRule.message.call(this);

				/* Check if element pass validation */
				let pass = self.validate(value, compiledRule, element, form);

				/* Perform action according to result */
				if(pass) {
					compiledRule.onSuccess(element, compiledRule);
					lastSuccess = compiledRule;
					if(!firstSuccess)
						firstSuccess = compiledRule;
				} else {
					compiledRule.onError(element, compiledRule);
					lastError = compiledRule;
					if(!firstError)
						firstError = compiledRule;
					totalPass = false;
				}

			});

			/* Total callbacks */
			if(totalPass)
				options.onSuccess(element, lastSuccess);
			else
				options.onError(element, firstError);

			/* Return true of element passed all validations */
			return totalPass;

		},

		/**
		 * Return true if element should be validated
		 * @param {*} element Element to validate
		 * @returns {boolean}
		 */
		shouldBeValidated: function(element) {
			return element.attr("data-validate") || element.data("validationOptions");
		},

		/**
		 * Return true if element passed validation
		 * @param element
		 * @param compiledRule
		 * @param form
		 * @returns {*}
		 * @param value
		 */
		validate: function(value, compiledRule, element, form) {
			return compiledRule.rule.call(compiledRule, value, element, form);
		}

	};

	/**
	 * Defaults
	 */
	validator.ruleDefaults = {

	};

	/**
	 * Defaults
	 * @type {{onSuccess: onSuccess, onError: onError}}
	 */
	validator.optionsDefaults = {

		/* Fires on success */
		onSuccess: function(element) {

			/* Remove error */
			element.removeClass(this.errorClass);

			/* Add success */
			if(this.successClass)
				element.addClass(this.successClass);

		},

		/* Fires on error */
		onError: function(element) {

			/* Add error */
			element.addClass(this.errorClass);

			/* Remove success */
			if(this.successClass)
				element.removeClass(this.successClass);

		}
	};

	/**
	 * Base rule object
	 * @param overload
	 * @returns {validator.Rule}
	 * @constructor
	 */
	validator.Rule = function(overload) {

		/* Self creation if needed */
		if(!(this instanceof validator.Rule))
			return new validator.Rule(overload);

		/* Dump rule to check validation */
		this.rule = function() { return true; };

		/* Dump message */
		this.message = "Это поле заполнено не верно";

		/* List of options to make validation according to */
		this.options = [];

		/* Fires on success */
		this.onSuccess = function(element) {};

		/* Fires on error */
		this.onError = function(element) {};

		/* Self extend with overload */
		jQuery.extend(this, overload);

		/* Return */
		return this;

	};

	/**
	 * List of default rules
	 * @type {{required: validator.Rule}}
	 */
	validator.rules = {
		required: validator.Rule({
			rule: function(value) {
				return !!value.length;
			},
			message: "Это поле необходимо заполнить"
		}),
		requiredIfFilled: validator.Rule({
			rule: function(value) {
				let item = $(this.options[0]);
				return item.is(":radio, :checkbox") ? !item.is(":checked") || value : item.val() === "" || value;
			},
			message: "Это поле необходимо заполнить"
		}),
		date: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}( \d{2}:\d{2}(:\d{2})?)?$/)
					);
			},
			message: "Дата указана неверно"
		}),
		period: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}\s*-\s*\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}$/)
					);
			},
			message: "Период указан неверно"
		}),
		email: validator.Rule({
			rule: function(value) {
				return value && value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
			},
			message: "Почтовый адрес указан неверно"
		}),
		same: validator.Rule({
			rule: function(value) {
				return value === $('[name="' + this.options[0] + '"]').val();
			},
			message: "Поля не совпадают"
		}),
		url: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^(https?:\/\/.+)$/);
			},
			message: "Не корректный адрес URI"
		}),
		regexp: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(new RegExp(this.options[0]));
			},
			message: "Введите корректное значение"
		}),
		numeric: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^-?[0-9]+(\.[0-9]+)?$/);
			},
			message: "Введите число"
		}),
		positive: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) > 0;
			},
			message: "Введите положительное число"
		}),
		max: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) <= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не обльше чем " + (this.options[0] || 0)
			}
		}),
		min: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) >= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не меньше чем " + (this.options[0] || 0);
			}
		}),
		minLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length >= (this.options[0] || 0)
			},
			message: "В этом поле нехватает символов"
		}),
		maxLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length <= (this.options[0] || 0)
			},
			message: "В этом поле слишком много символов"
		})
	};

	/**
	 * Holds element validation options
	 * @param element
	 * @constructor
	 */
	validator.Options = function(element) {

		/* Create or return */
		if(!(this instanceof validator.Options))
			return element.data("validationOptions") || new validator.Options(element);

		/* Callbacks after all checks */
		this.onSuccess = function() {};
		this.onError = function() {};

		/* Adds to element on success */
		this.successClass = false;

		/* Adds to element on error */
		this.errorClass   = "error";

		/* Overlay defaults */
		jQuery.extend(true, this, validator.optionsDefaults);

		/* Holds list of validating rules */
		this.rules = {};

		/* Save element */
		this.element = element;

		/* Get rules that declared in element definition */
		this.getDeclaredRules();

		/* Save option */
		this.element.data("validationOptions", this);

		/* Self return */
		return this;

	};

	validator.Options.prototype = {

		/**
		 * Gets list of rules that are set in declared way
		 */
		getDeclaredRules: function() {

			/* Get attribute value */
			let attr = this.element.attr("data-validate"),
				self = this;

			/* If none */
			if(!attr)
				return;

			/* Get list */
			$.each(attr.split(";"), function(_, name) {

				/* Get parameters */
				let params = name.match(/(\w+)\((.*)\)/);

				/* Parse */
				if(params) {

					/* Get function */
					name = params[1];

					/* Parse params */
					params = params[2].match(/(('[^']+')|([\d\w]+))/g);
					$.each(params, function(i, val) {
						params[i] = eval(val.trim());
					});
				}

				/* Add rule to options */
				self.addRule(name.trim(), { options: params || [] });

			});


		},

		/**
		 * Adds new rule for element
		 * @param {string} name Rule name
		 * @param {object} options Rule options
		 * @returns {validator.Options}
		 */
		addRule: function(name, options) {

			/* Create and save new rule */
			this.rules[name] = jQuery.extend({}, validator.ruleDefaults, options);

			/* Mark for auto validation */
			if(!this.element.attr("data-validate"))
				this.element.attr("data-validate", "true");

			/* Self returning */
			return this;
		}

	}

});