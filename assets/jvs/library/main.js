"use strict";

Function.prototype.safe = function(services = false) {
	return sky.func(this, services);
};
Function.prototype.exec = function() {
	return sky.exec(this);
};

/**
 * Main module
 */
$.extend(sky, {

	/**
	 * Return function with try catch wrapper
	 * @param {function} func Function
	 * @param {boolean|Array} [services] If true arguments would be filled with services
	 * @param {*} context Context
	 * @returns {Function}
	 */
	func: function(func, services = false, context = false) {
		return function() {
			try {
				return services ? sky.services.callWithServices(func, context || this, services) : func.apply(context || this, arguments);
			} catch(e) {
				return sky.exceptionHandler(e);
			}
		}
	},

	/**
	 * Main system exception handler function
	 * @param e
	 */
	exceptionHandler: function(e) {

		/* Log error */
		if(console && console.error)
			console.error(e.message, e);

		/* User fault error */
		if(sky.exceptions && e instanceof sky.exceptions.Exception)
			return e.handle();

		/* Show error */
		alert("Во время работы произошла ошибка, пожалуйста сообщите администрации");

	}

});
