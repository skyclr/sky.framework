sky.service("modelsStorage", function() {

    let cache = {};

    this.service = {
		add: function(model) {

			// Search in cache
			let cached = this.search(model.type, model.id);

			// If found extend
			if(cached)
				return cached;

            // Create type storage if none
            if(!this.cache[model.type])
                this.cache[model.type] = {};

            // Save model
            this.cache[model.type][model.id] = model;

		},

		search: function(type, id) {

			// Cache search
			if(cache[type] && cache[type][id])
				return cache[type][id];

			// On miss
			return false;
		},

		remove: function(model) {
			delete cache[model.type][model.id];
		}
	}
});