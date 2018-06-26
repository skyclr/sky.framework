(function() {
	let Exception = class extends Error {
		handle() {
			alert("Error | " + this.message);
		}
	};
	sky.exceptions = {
		Exception: Exception,
		user:{
			Error: class extends Exception {}
		},
		system: {
			Error: class extends Exception {}
		}
	};
})();