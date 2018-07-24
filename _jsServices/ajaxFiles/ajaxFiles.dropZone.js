/** Class to work with drop zone for File api */
sky.service("ajaxFilesDropZone", ["supported", "callbacks"], function({ supported, callbacks }) {
	this.service = class {
		constructor({ zone, data, url, options }) {

			/* Save options */
			this.options   = options;
			this.zone      = zone;
			this.callbacks = callbacks();
			this.data      = data;
			this.url       = url;
			this.files     = [];

			/* If no XHR supported, no file drop needed */
			if(!supported.XHRUpload) {
				this.callbacks.fire("nonSupported");
				return this;
			}

			/* Bind events */
			this.attachEvents();

		}

		attachEvents() {

			/* While over event */
			this.zone.on({

				dragenter: (event) => { this.callbacks.fire("dragenter", this, [event]); },
				dragleave: (event) => { this.callbacks.fire("dragleave", this, [event]); },
				dragend  : (event) => { this.callbacks.fire("dragend", this, [event]); 	 },
				drop     : (event) => { this.callbacks.fire("drop", this, [event]);		 },
				dragover : (event) => {

					/* Get event */
					event = event.originalEvent;

					/* Check if drag is valid */
					if(!this.isValidFileDrag(event))
						return;

					/* Get effect */
					let effect = event.dataTransfer.effectAllowed;

					/* Set proper */
					if(effect === 'move' || effect === 'linkMove') {
						event.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)
					} else {
						event.dataTransfer.dropEffect = 'copy'; // for Chrome
					}

					/* Prevent */
					event.preventDefault();

				}
			});

			/* Stop file opening when drop on browser window */
			$(document).bind({
				dragover : function(e) {
					e = e.originalEvent;
					if(e.dataTransfer) {
						e.dataTransfer.dropEffect = 'none';
						e.preventDefault();
					}
				},
				dragenter: function(e) {
					if(typeof self.options.onStart !== "undefined")
						self.options.onStart.apply(self, [e]);
				}
			});
		}

		static isValidFileDrag(event) {

			let dt = event.dataTransfer,
			// do not check dt.types.contains in webkit, because it crashes safari 4
				isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;

			// dt.effectAllowed is none in Safari 5
			// dt.types.contains check is for firefox
			return dt && dt.effectAllowed !== 'none' &&
				(dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));

		}

	};

});