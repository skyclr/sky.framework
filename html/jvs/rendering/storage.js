

sky.model.storage = {

    /**
     * Models cache
     */
    cache: {},

    /**
     * Adds model
     * @param {sky.model.Model} model
     */
    add: function(model) {

        // Search in cache
        var cache = this.search(model.type, model.id);

        // If found extend
        if(cache)
            return cache;
        // Else add
        else {

            // Create type storage if none
            if(!this.cache[model.type])
                this.cache[model.type] = {};

            // Save model
            this.cache[model.type][model.id] = model;
            return false;
        }
    },

    /**
     * Storage search
     * @param type
     * @param id
     * @returns {*}
     */
    search: function(type, id) {

        // Cache search
        if(this.cache[type] && this.cache[type][id])
            return this.cache[type][id];

        // On miss
        return false;
    },

    /**
     * Removes model
     * @param {sky.model.Model} model
     */
    remove: function(model) {
        delete this.storage[model.type][model.id];
    }

};