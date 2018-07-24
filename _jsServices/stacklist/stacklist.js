sky.service("stackList", function() {
	let List = this.service = function() {

		if(!(this instanceof List))
			return new List();

		let elements = {};
		let lastId = 0;
		let total = 0;

		this.last = function() {

			/* Holder */
			let last;

			/* Apply for windows */
			for(let element of elements) last = element;

			/* Return */
			return last || false;

		};

		this.add = function(element) {
			lastId++;
			total++;
			element[lastId] = element;
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

		this.elements = function() {
			return elements;
		};

		this.each = function(callback) {
			for(let single of elements)
				callback.apply(single, single);
		};

	}
});