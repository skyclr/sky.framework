sky.service("localStorage", [ "callbacks" ], function({ callbacks }) {

	//noinspection JSUnusedLocalSymbols
	let LocalStorage = this.service = class {
		constructor(options) {
			this.name = options.name || "global";
			this.events = callbacks();
		}

		/**
		 * Loads item form database
		 * @param {*} id Unique id
		 */
		load(id) {
			let items = this.getItems();
			return items ? items[id] : undefined;
		}

		getItems() {
			try {

				/* Try to get item from storage */
				let items = localStorage.getItem(this.name);

				/* Trigger error */
				if(items !== null)
					return $.parseJSON(items);

			} catch(e) {
				this.events.fire("error", { storage: this });
			}

			/* Undefined on error */
			return undefined;

		}

		/**
		 * Save data to storage
		 * @param id
		 * @param data
		 * @returns {*}
		 */
		save(id, data) {

			try {

				/* Save */
				let items = this.getItems();

				/* Add item */
				items[id] = data;

				/* Save keys */
				localStorage.setItem(this.name, JSON.stringify(items));

			} catch(e) {
				this.events.fire("error", { storage: this });
			}

			/* Self return */
			return this;

		}

		/**
		 * Removes from storage
		 * @param id
		 * @returns {*}
		 */
		remove(id) {
			try {

				/* Save */
				let items = this.getItems();

				/* Add item */
				delete items[id];

				/* Save keys */
				localStorage.setItem(this.name, JSON.stringify(items));

			} catch(e) {
				this.events.fire("error", { storage: this });
			}

			/* Self return */
			return this;

		}
	};

});