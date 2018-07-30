sky.service("model", [ "modelsStorage", "callbacks" ], function({ modelsStorage, callbacks }) {

	/**
	 * List of model definitions
	 */
	let modelsDefinition = {};

	class Model {
		constructor(type, data) {

			/* Init as base */
			this.definition = BaseDefinition;

			/* Get special if defined */
			if(modelsDefinition[type])
				this.definition = modelsDefinition[type];

			/* Save id */
			this.id = data[this.definition.id] || null;
			this.type = type;
			this.data = {};
			this.events = callbacks();
			this.definition.creation.bind(this)($.extend({}, data, true));

		}
		extend(data) {
			this.definition.extension.bind(this)($.extend({}, data, true));
			return this.changed();
		}
		changed() {
			this.events.fire("change", {model: this});
			return this;
		}
		removeFromStorage() {
			modelsStorage.remove(this);
		}
	}

	/**
	 * Base model definition witch would be parented
	 */
	let BaseDefinition = {
		id       : function() {
			return this.data["id"]
		},
		creation : function(data) {
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

			return model;

		}
	};

});