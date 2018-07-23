sky.action("pagination", {

	setPage: function(button, _, page) {

		/* Get pagination */
		let pagination = button.parents(".pagination").data("pagination");

		/* Correct page */
		if(page === "next")
			page = pagination.current + 1;

		/* Correct  */
		if(page === "previous")
			page = pagination.current - 1;

		/* Go to page */
		pagination.goToPage(page);

	},

	scrollTo: function(element, event) {

		/* Get pagination */
		let pagination = element.parents(".pagination").data("pagination");

		/* Move */
		pagination.scroll(event);

	},

	grab: function(runner) {

		/* Get pagination */
		let pagination = runner.parents(".pagination").data("pagination");

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