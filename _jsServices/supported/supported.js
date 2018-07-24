/**
 * Module to work with user services
 */
sky.service("supported", function () {
	try {
		this.service.fullScreen = typeof document["webkitIsFullScreen"] !== "undefined";
		this.service.formData = window.FormData && true;
		// this.service.XHRIsSupported = XHRIsSupported;
		this.service.XHRUpload = (typeof new XMLHttpRequest().upload !== "undefined");
		this.service.localStorage = !!window.localStorage;
	} catch (e) {}
});