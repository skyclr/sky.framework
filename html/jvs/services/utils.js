sky.service("utils", function() {
	$.extend(sky, this.service = {

		/**
		 * Checks if object has same data
		 * @param first
		 * @param second
		 */
		isObjectsEqual: function(first, second) {

			/* Different types */
			if(typeof first !== typeof second)
				return false;

			/* If object or array we will compare each element */
			if(first instanceof Array || first instanceof Object) {
				let key;
				/* Check first */
				for(key in first) {
					if(!first.hasOwnProperty(key)) continue;
					if(typeof second[key] === "undefined") return false;
					else if(!this.isObjectsEqual(first[key], second[key])) return false;
				}

				/* Check second */
				for(key in second) {
					if(!second.hasOwnProperty(key)) continue;
					if(typeof first[key] === "undefined") return false;
				}

			} else if(first !== second) return false;    // For simple types

			/* All tests success */
			return true;

		},

		/**
		 * Adds zero
		 * @param value
		 * @returns {Number}
		 */
		addLeadingZero: function(value) {

			/* Parse */
			value = parseInt(value);

			/* Ad zero */
			if(value < 10)
				value = "0" + value;

			/* Val */
			return value;

		},

		encode: function(rawStr) {
			return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				return '&#'+i.charCodeAt(0)+';';
			});
		},

		/**
		 * Makes data to JSON past
		 * @param data
		 * @param [inputName]
		 * @returns {string}
		 */
		jsonData: function(data, inputName) {
			return '<script type="application/json"' + (inputName ? (' input-name="' + inputName + '"') : "") + '>' + sky.encode(JSON.stringify(data)) + '</script>';
		},

		prepareSelectData: function(items, func, { columnSplitOn = 6, maxColumns = 4 }) {

			let index = 0,
				groupHolder,
				compiled,
				columns = [],
				columnsCount = items.length / columnSplitOn;

			if(columnsCount < 1)
				columnsCount = 1;
			if(columnsCount > maxColumns)
				columnsCount = maxColumns;

			let perColumn = Math.ceil(items.length / columnsCount);

			$.each(items, function(_, item) {
				if(compiled = func({ item, index, column: columns.length })) {

					if (index % perColumn === 0) {
						groupHolder = [];
						columns.push(groupHolder);
					}

					groupHolder.push(compiled);
					index++;
				}
			});

			return index === 0 ? [] : {groups: columns}

		}
	});
});