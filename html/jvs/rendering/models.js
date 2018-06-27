sky.service("model", function({ modelsStorage }) {

	/**
	 * List of model definitions
	 */
	let modelsDefinition = {};

	class Model {
		constructor(type, data) {

			/* Self creation if as function call */
			if(!(this instanceof sky.model.Model))
				return new sky.model.Model(type, data);

			/* Init as base */
			this.definition = sky.model.BaseDefinition;

			/* Get special if defined */
			if(sky.model.modelsDefinition[type])
				this.definition = sky.model.modelsDefinition[type];

			/* Save id */
			this.id = data[this.definition.id] || null;
			this.type = type;
			this.data = {};
			this.callbacks = sky.Callbacks();
			this.definition.creation.call(this, $.extend({}, data, true));

		}
		removeFromStorage() {
			modelsStorage.remove(this);
		}
		extend(data) {
			this.definition.extension.call(this, data);
			return this.changed();
		}
		changed() {
			this.callbacks.fire("change", {model: this});
			return this;
		}
		addListener(func) {
			this.callbacks.on("change", func);
		}
		removeListener(func) {
			this.callbacks.off("change", func);
		}
	}

	/**
	 * Base model definition witch would be parented
	 */
	let BaseDefinition = {
		id: "id",
		constructor: function(data) {
			this.data = data;
		},
		extension: function(data) {
			$.extend(true, this.data, data);
		}
	};

	this.service = {
		/**
		 * Adds new models definition
		 * @param name
		 * @param definition
		 */
		addDefinition: function(name, definition) {
			modelsDefinition[name] = $.extend({}, BaseDefinition, definition);
		},

		fromData: function(type, data) {

			let model = new this.Model(type, data);
			let cached = modelsStorage.add(model);

			if(cached)
				return cached.extend(data);
			else
				return model;

		}
	};

});