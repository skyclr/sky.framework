sky.service("searchField", ["utils", "inputsIO"], function ({ utils, inputsIO }) {
	this.service = class {
		constructor(name, virtual) {
			this.name = name;
			this.inputName = name;
			this.virtual = virtual || false;
			this.default = null;
			this.input = false;
			this.value = null;
		}
		valueOrNullOnDefault() {
			if ((this.default instanceof Array) && (this.value instanceof Array))
				return utils.isObjectsEqual(this.value, this.default) ? null : this.value;

			return this.value === this.default ? null : this.value;
		}
		read() {
			if (this.virtual === "search")
				return this.searchRead();
			else if (this.virtual)
				return this.hashRead();
			else if (this.input)
				this.value = inputsIO.readInputsValues(this.input);

			return this.value;
		}
		write() {
			if (this.input)
				inputsIO.writeInputsValue(this.value === null ? this.default : this.value, this.input);
			return this.value;
		}
		hashRead() {
			let hashValue = page.history.hashObject[this.name];
			return this.value = (typeof hashValue === "undefined") ? this.default : hashValue;
		}
		searchRead () {
			let searchValue = page.history.searchObject[this.name];
			return this.value = (typeof searchValue === "undefined") ? this.default : searchValue;
		}
	}
});