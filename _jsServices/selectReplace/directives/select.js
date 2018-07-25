sky.directive(".selectReplaceChoose", function(popup, attrs) {

		/* Get inputs */
		let labels = popup.find("label"),
			inputs = popup.find("input:radio, input:checkbox"),
			current, change, children, replace = popup.prev(),
			val = "",
            defaultValue = replace.html() || '-',
            defaultAllValue = replace.text() || "Все";

		replace.data("addItem", function(item) {
			let newInput = sky.templates.renderByText("{% skyImport forms as forms %}{{ forms.selectReplaceGroup(items, options) }}", { items: [item], options: {
				name: replace.attr("input"),
				multiple:  !replace.hasClass("single")
			}});
			newInput.insertAfter(inputs.filter(":last").parent());
			inputs = popup.find("input");
		});

		/* On change */
		$(document).on("change", '[data-input="'+ attrs["data-input"] + '"] input', change = function(event, data) {

			/* Remove selected styles */
			labels.removeClass("selected");

			/* Base text */
			val = "";
			children = false;

			/* Get checked */
			let filtered = inputs.filter(":checked").each(function() {
				current = $(this);
				current.closest("label").addClass("selected");
				val = (val && val + ", ") + current.next().text();
				children = current.next();
			});

			/* Make text shorter */
			if(val.length > 26)
				val = val.substr(0, 26).trim() + "...";

			if(filtered.length === inputs.length && !popup.hasClass("single"))
				val = defaultAllValue;

			if(popup.hasClass("single") && children)
				replace.html('').prepend(children.clone().removeClass("name"));
			else if(!children)
				replace.html(defaultValue);
			else
				replace.text(val);

			/* If not fake event */
			if(event && current) {
                replace.trigger("change", $.extend(data || {}, {
                    value: current.val(),
                    item: $(this)
                }));
            }

            if(popup.hasClass("single"))
				$(".selectReplaceChoose").addClass('hidden');
		});

		/* Trigger */
		setTimeout(function() { change(false) }, 1);

	});

sky.onReady(() => {
	$(document).on("click touchstart", function(event) {

		/* Get element */
		let element = $(event.target || event.srcElement);


		/* If click in replace we should not hide it */
		if(element.closest(".selectReplaceChoose").length || element.closest(".selectReplace").length)
			return;

		/* Hide all */
		$(".selectReplaceChoose").addClass('hidden');

	})
});
