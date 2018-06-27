sky.service("modelsManager", function() {

    /**
     * Manager class
     * @param type Models name
     * @param arr  Array of models
     * @constructor
     */
    let Manager = function(type, arr) {

        var self = this;
        this.items = [];
        this.type = type;

        $.each(arr, function(_, model) {
            self.items.push(model)
        });

        this.reloadFromArray = function(arr) {
            this.items = [];
            $.each(arr, function(_, data) {
                self.items.push(sky.model.fromData(type, data))
            });
        };

        this.count = function() {
            return this.items.length;
        };

        this.callbacks = sky.Callbacks();

        this.addListener = function(func) {
            this.callbacks.on("change", func);
        };

        this.removeListener = function(func) {
            this.callbacks.off("change", func);
        };

    },

    /**
     * Creates new manager from array of data objects
     * @param {string} type Model name
     * @param {array} arr Array of data objects
     * @returns {sky.model.manager.Manager}
     */
    fromArray: function(type, arr) {
        var items = [];
        $.each(arr, function(_, data) {
            items.push(sky.model.fromData(type, data));
        });
        return new sky.model.manager.Manager(type, items);
    }

};