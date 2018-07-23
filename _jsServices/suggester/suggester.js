sky.onReady(({suggester}) => {
	$(document).on("click", function(event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* If click in replace we should not hide it */
		if(element.is("[type=submit]") || element.closest(".suggester").length || element.data("suggester"))
			return;

		/* Hide all */
		suggester.hide();

	});
});

sky.service("suggester", ["templates"], function({templates}) {

	let render,
		object,
		lastList,
		suggester = this.service = {
			hide: function() {

				if(render) {
					render.remove();
					render = false;
				}
				if(object) {
					object.removeData("suggester");
					object = false;
				}
				$(document).off("keyup.suggester, keydown.suggester");
			},
			show: function(input, list) {

				/* Hide previous */
				suggester.hide();

				/* Save */
				lastList = list;
				render = templates.render("suggester", {items: list}).insertAfter(input.closest("label, .label"));
				object = input.data("suggester", render);

				/* Get positions */
				let elementPosition = input.offset(),
					renderPosition = render.offset();

				/* Show */
				render.css({
					"margin-left": elementPosition.left - renderPosition.left,
					"margin-top": elementPosition.top - renderPosition.top + input.outerHeight()
				});

				/* Add handlers */
				let children = render.children().on("click", function() {
					input.val($(this).html());
					suggester.hide();
					if(lastList[$(this).attr("data-index")].callback)
						lastList[$(this).attr("data-index")].callback();
				});

				$(document).on("keyup.suggester", function(event) {

					if(event.keyCode === 38 || event.keyCode === 40) {

						let selected = children.filter(".selected");
						children.removeClass("selected");

						// Up
						if(event.keyCode === 38) {
							if(!selected.length || !selected.prev().length)
								children.last().addClass("selected");
							else
								selected.prev().addClass("selected");
						}
						// Down
						if(event.keyCode === 40) {
							children.removeClass("selected");
							if(!selected.length || !selected.next().length) {
								children.first().addClass("selected")
							} else {
								selected.next().addClass("selected");
							}
						}
					}
					// Esc
					if(event.keyCode === 27) suggester.hide();


				}).on("keydown.suggester", function(event) {

					// Enter
					if(event.keyCode !== 13) return;

					let selected = children.filter(".selected");
					if(selected.length) {
						selected.trigger("click");
						event.preventDefault();
					} else {
						suggester.hide();
					}

				});
			}
		};
});