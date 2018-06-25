sky.model = {

    /**
     * List of model definitions
     */
    modelsDefinition: {},

    /**
     * Model
     * @param type  Model type name
     * @param data  Data
     * @constructor
     */
    Model: function(type, data) {

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

        this.removeFromStorage = function() {
            sky.model.storage.remove(this);
        };

        this.extend = function(data) {
            this.definition.extension.call(this, data);
            return this.changed();
        };

        this.changed = function() {
            this.callbacks.fire("change", { model: this });
            return this;
        };

        this.addListener = function(func) {
            this.callbacks.on("change", func);
        };

        this.removeListener = function(func) {
            this.callbacks.off("change", func);
        };

    },

    /**
     * Base model definition witch would be parented
     */
    BaseDefinition: {
        id: "id",
        creation: function(data) {
            this.data = data;
        },
        extension: function(data) {
            $.extend(true, this.data, data);
        }
    },

    /**
     * Adds new models definition
     * @param name
     * @param definition
     */
    addDefinition: function(name, definition) {
        this.modelsDefinition[name] = $.extend({}, this.BaseDefinition, definition);
    },

    /**
     * Create new model from data
     * @param type
     * @param data
     * @returns {sky.model.Model}
     */
    fromData: function(type, data) {

        var model = new this.Model(type, data);
        var cached = sky.model.storage.add(model);

        if(cached)
            return cached.extend(data);
        else
            return model;

    }

};

sky.model.addDefinition("file", {
    creation: function (data) {
        if(data.comments) {
            var commentsList = [];
            $.each(data.comments, function(_, comment) {
                commentsList.push(sky.model.fromData("comment", comment).data);
            });
            data.comments = commentsList;
        }
        this.data = data;
    }
});