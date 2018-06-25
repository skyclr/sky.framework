sky.action("pagination", {

	setPage: function(button, _, page) {

		/* Get pagination */
		var pagination = button.parents(".pagination").data("pagination");

		/* Correct page */
		if(page == "next") {
			button = false;
			page = pagination.current + 1;
		}

		/* Correct  */
		if(page == "previous") {
			button = false;
			page = pagination.current - 1;
		}

		/* Go to page */
		pagination.goToPage(page, button);

	},

	scrollTo: function(element, event) {

		/* Get pagination */
		var pagination = element.parents(".pagination").data("pagination");

		/* Move */
		pagination.scroll(event);

	},

	grab: function(runner) {

		/* Get pagination */
		var pagination = runner.parents(".pagination").data("pagination");

		/* Binds */
		$(window)
			.on("mouseup.pagination", function() {
				$(window).off("mouseup.pagination mousemove.pagination");
			}).on("mousemove.pagination", function(event) {
				pagination.scroll(event);
			});

	},

	next: function(button, _) {
		this.setPage(button, _, "next")
	},

	previous: function(button, _) {
		this.setPage(button, _, "previous")
	}

});