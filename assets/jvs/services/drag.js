sky.service("drag", ["callbacks"], function({callbacks}) {
	let self = {
		bindEvents: (event, events) => {
			self.bind(event)
				.on("start", events.start)
				.on("move", events.move)
				.on("stop", events.stop)
		},
		bind: event => {

			// Get original event
			event = event.originalEvent || event;

			// Check button
			if(event.button && event.button !== 1)
				return;

			// Stop default action
			event.preventDefault();

			let started = false,
				callbacks = callbacks();

			$(document).on("mousemove.drag", function(event) {

				// Start
				if(!started) {
					started = true;
					callbacks.fire("start", { event: event, x: event.pageX, y: event.pageY });
				}
				// Move
				else callbacks.fire("move", { event: event, x: event.pageX, y: event.pageY });

				// Prevent default
				event.preventDefault();
				return false;

			}).on("mouseup.drag", function(event) {

				// Off events
				$(document).off("mousemove.drag").off("mouseup.drag");

				// If not started
				if(!started)
					return;

				// Stop default action
				event.preventDefault();

				// Call stop callback
				callbacks.fire("stop", { event: event, x: event.pageX, y: event.pageY });

			});

			return callbacks;
		}
	};
	return self;
});