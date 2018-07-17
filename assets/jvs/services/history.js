sky.service("history", [ "callbacks", "supported" ], function ({ callbacks, supported }) {


	/**
	 * Get difference fields in objects
	 * @param {object} first  Object to compare
	 * @param {object} second Object to compare
	 */
    let getObjectsDifference = function (first, second) {

		let difference = {},
		    localDiff = false;

        /* If both arrays or objects */
		if ((first instanceof Array && second instanceof Array) || (first instanceof Object && second instanceof Object)) {

            /* Find what was changed or deleted in second */
			$.each(first, function (key, value) {

                /* If no such elements in second */
				if (typeof second[key] === "undefined")
					difference[key] = null; // Set to null

                /* Check if different */
				else if (localDiff = getObjectsDifference(value, second[key])) {
					difference[key] = localDiff;
				}

			});

            /* If was added */
			$.each(second, function (key, value) {
				if (typeof first[key] === "undefined")
					difference[key] = value;
			});

            /* Convert object to array */
			if (first instanceof Array) {
				let returnArray = [];
				$.each(difference, function (key) {
					returnArray.push(difference[key]);
				});
				difference = returnArray;
			}

		} else {
			if (first !== second) return second;
			else return false;
		}

        /* No array difference */
		if (difference.length === 0) return false;
		else return difference;

	};

    /**
     * History constructor
     * @param [options]
     * @returns {sky.History}
     * @constructor
     */
    sky.History = function (options) {

		/* Self creation */
        if (!(this instanceof sky.History))
            return new sky.History(options);

		/* Reset */
        this.options = options || {};

		/* Set events */
        this.events = this.options.events || new callbacks();
        this.options.events = this.events;

		/* Self return */
        return this;

    };

    /**
     * Extending
     */
    $.extend(sky.History.prototype, {

        /**
         * Stores last saved hash
         */
        hashString: "",

        /**
         * Stores last saved search
         */
        searchString: "",

        /**
         * Stores last saved path
         */
        pathString: "",

        /**
         * Stores object with hash params key/value pairs
         */
        hashObject: {},

        /**
         * Stores object with page search params key/value pairs
         */
        searchObject: {},

        /**
         * Stores events
         */
        events: undefined,

        /**
         * Holds hash check function interval id
         */
        intervalId: 0,

        /**
         * This page base url
         */
        base: "",

        /**
         * Changes current path to specified
         * @param {string} path PAth to navigate
         */
        navigate: function (path) {

            // Get path
            path = path.replace("~", this.base);

            // Get current
            let current = (window.location.pathname + window.location.search).substr(this.base.length);

            // If changes
            if (current !== path) {

                // Set new state
                history.pushState({ oldPath: this.pathString, newPath: path, search: this.searchObject}, path, path);

                // Get new
                this.pathString = window.location.pathname.substr(this.base.length);

                // Get search string
                this.searchString = this.getWindowSearch();

                // Fire event
                this.events.fire("navigate.path, always", {hash: this.hashObject, path: this.pathString, search: this.searchObject});

            }
        },

        /**
         * Fires on path change
         */
        change: function () {

			/* Hash difference holder */
            let hashDifference = {},
                searchDifference = {},
                old = this.pathString,
                hashChanged = false,
                searchChanged = false;

			/* If api supported */
            if (this.supported)
                this.pathString = window.location.pathname.substr(this.base.length);

			/* Check if hash changed */
            if (this.hashString !== this.getWindowHash()) {

				/* Get difference */
                hashDifference = this.getDifference(this.getWindowHash(), this.hashObject);

				/* Hash change flag */
                hashChanged = true;

            }

			/* Check if params changed */
            if (this.searchString !== this.getWindowSearch()) {

				/* Get difference */
                searchDifference = this.getDifference(this.getWindowSearch(), this.searchObject);

				/* Hash change flag */
                searchChanged = true;

            }

			/* If nothing changed */
            if (this.pathString === old && !hashChanged && !searchChanged)
                return;

			/* Rebuild hash object on new hash str */
            this.rebuild();

			/* Fire */
            this.events.fire("change, always", {
                hash: this.hashObject,
                hashDifference: hashDifference,
                searchDifference: searchDifference,
                path: this.pathString,
                oldPath: old,
                searchChanged: searchChanged,
                hashChanged: hashChanged,
                pathChanged: old !== this.pathString
            });

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setHash: function (path) {

			/* To not jump top */
            if (path === "" && window.location.hash !== "")
                path = "none";

			/* Save */
            this.hashString = path;

			/* Set hash */
            window.location.hash = encodeURI(path);//encodeURI(path);

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setSearch: function (path) {

			/* Set path */
            this.navigate(window.location.pathname + encodeURI(path !== "" ? "?" + path : ""));

        },

        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        set: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.hashObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, (key, value) => {

				/* If we need delete */
                if (value === null)
                    delete this.hashObject[key];
                else
                    this.hashObject[key] = value;

				/* Set as changed */
                changed = true;

            });

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setHash(decodeURIComponent(jQuery.param(this.hashObject).replace(/\+/g, " ")));

			/* Fire */
            this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },


        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        search: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.searchObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, $.proxy(function (key, value) {

				/* If we need delete */
                if (value === null)
                    delete this.searchObject[key];
                else
                    this.searchObject[key] = value;

				/* Set as changed */
                changed = true;

            }, this));

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setSearch(decodeURIComponent(jQuery.param(this.searchObject).replace(/\+/g, " ")));

			/* Fire */
			this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },

        /**
         * Makes hash from object
         * @param obj
         * @returns {*|void|string|XML}
         */
        stringFromObject: function (obj) {
            return jQuery.param(obj).replace(/\+/g, " ");
        },

        /**
         * Get objects according to hash string
         * @param {string} paramsString String which contains key=value pairs, would be parsed to object
         */
        getObjects: function (paramsString) {

            let objects = {};

			/* Remove sharp */
            if (paramsString.substr(0, 1) === '#' || paramsString.substr(0, 1) === '?')
                paramsString = paramsString.slice(1, paramsString.length);

			/* Split parameters */
            let subStrings = paramsString.split("&");

			/* Get params */
            $.each(subStrings, function (i, str) {

                let keyAndValue = str.split("=", 2);

				/* If no assign */
                if (keyAndValue.length < 2)
                    return;

                let name = keyAndValue[0];

				/* Truncate brackets */
                if (name.substr(-2) === "[]")
                    name = name.substr(0, name.length - 2);

				/* Special hash for "=" in value  */
                keyAndValue[1] = str.substr(keyAndValue[0].length + 1);

				/* If object repeats we create array */
                if (typeof objects[name] === "undefined") objects[name] = keyAndValue[1];
                else {
                    if (!(objects[name] instanceof Array)) objects[name] = [objects[name]];
                    objects[name].push(keyAndValue[1]);
                }
            });

            return objects;

        },

        /**
         * Finds difference between current stored hash and parameter
         * @returns {*}
         */
        getDifference: function (string, stored) {

			/* Init */
            let objects = this.getObjects(decodeURI(string));
            return getObjectsDifference(stored, objects);

        },

        /**
         * Rebuilds stored hash parameters according to current one
         */
        rebuild: function () {
            this.hashString = this.getWindowHash();
            this.hashObject = this.getObjects(this.hashString);
            this.searchString = this.getWindowSearch();
            this.searchObject = this.getObjects(this.searchString);
            this.pathString = window.location.pathname;
            return this;

        },

        /**
         * Gets current window hash without "#"
         * @returns {string}
         */
        getWindowHash: function () {

			/* Get decoded hash */
            let hash = decodeURI(window.location.hash);

			/* Remove sharp */
            if (hash.substr(0, 1) === '#')
                hash = hash.slice(1);

			/* Return */
            return hash;

        },

        /**
         * Gets current window parameters without "?"
         * @returns {string}
         */
        getWindowSearch: function () {

			/* Get decoded hash */
            let search = decodeURI(window.location.search);

			/* Remove question */
            if (search.substr(0, 1) === '?')
                search = search.slice(1);

			/* Return */
            return search;

        },

        /**
         * Set interval execution
         */
        start: function () {

            /* Set base if any */
			if (this.options.base)
				this.base = this.options.base;

			/* If supported history */
            if (window.history)
                window.onpopstate = this.change.bind(this);

            /* Timeout */
            if (!this.intervalId)
                this.intervalId = setInterval(this.change.bind(this), this.options.time || 500);

			/* Immediately event */
            this.change();
            return this;
        }

    });

});