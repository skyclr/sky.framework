sky.service("modelsManager", ["callbacks", "model"], function({callbacks, model}) {
	class Manager {
		constructor(type, arr) {

			this.items = [];
			this.type = type;
			this.events = callbacks();

			$.each(arr, (_, model) => {
				this.items.push(model)
			});
		}
		reloadFromArray(arr) {
			this.items = [];
			$.each(arr, (_, data) => {
				this.items.push(model.fromData(this.type, data))
			});
		}
		count() {
			return this.items.length;
		}
		addListener(func) {
			this.events.on("change", func);
		}
		removeListener(func) {
			this.events.off("change", func);
		}
	}

	this.service = {
		fromArray: function(type, arr) {
			let items = [];
			$.each(arr, (_, data) => {
				items.push(sky.model.fromData(type, data));
			});
			return new Manager(type, items);
		}
	};

});