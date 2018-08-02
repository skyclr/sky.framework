sky.service("stackList", ["utils"], function({ utils }) {
	let List = this.service = function() {

		if(!(this instanceof List))
			return new List();

		let elements = {};
		let lastId = 0;
		let total = 0;

		this.last = function() {

			/* Holder */
			let last = undefined;

			/* Apply for windows */
			this.each(element => { last = element });

			/* Return */
			return last;

		};

		this.add = function(element, id = false) {
			lastId++;
			total++;
			elements[id || lastId] = element;
		};

		this.remove = function(element) {
			/* Apply for windows */
			for(let index in elements)
				if(elements.hasOwnProperty(index) && elements[index] === element) {
					delete elements[index];
					total--;
				}
		};

		this.total = function() {
			return total;
		};

		this.getById = function(id) {
			return elements[id];
		};

		this.elements = function() {
			return elements;
		};

		this.each = function(callback) {
			utils.each(elements, (id, single) => {
				callback.apply(single, [single, id]);
			});

		};

	}
});