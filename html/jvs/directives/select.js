sky.directive(".selectReplaceChoose", function(popup, attrs) {

		/* Get inputs */
		let labels = popup.find("label"),
			inputs = popup.find("input:radio, input:checkbox"),
			current, change, children, replace = popup.prev(),
			val = "",
            defaultValue = replace.html() || '-',
            defaultAllValue = replace.text() || "Все";

		replace.data("addItem", function(item) {
			var newInput = sky.templates.renderByText("{% skyImport forms as forms %}{{ forms.selectReplaceGroup(items, options) }}", { items: [item], options: {
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
			var filtered = inputs.filter(":checked").each(function() {
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


$(document)
	.on("click touchstart", function(event) {

		/* Get element */
		var element = $(event.target || event.srcElement);


		/* If click in replace we should not hide it */
		if(element.closest(".selectReplaceChoose").length || element.closest(".selectReplace").length)
			return;

		/* Hide all */
		$(".selectReplaceChoose").addClass('hidden');

	}).on("change", ".specialSelect input", function(event) {
		var root = $(this).closest(".specialSelect");
		root.find(".selected").removeClass("selected");
		root.find("input").each(function() {
			var self = $(this);

			if(self.is(":checked"))
				self.parent().addClass("selected");

		});

		//root.closest("form").trigger("submit");

	}).on("mouseover", ".selectReplaceChoose label", function() {

		var label = $(this);
		var originalTip = label.find(".checkItemTip");

		if(originalTip.length && !label.data("tip")) {
			var popup = label.closest(".selectReplaceChoose");
			var tip = originalTip.clone().removeClass("hidden").appendTo("body");
			tip.css({
				left: popup.offset().left,
				top: popup.offset().top + popup.outerHeight() + 5
			});
			label.data("tip", tip);
		}

	}).on("mouseout", ".selectReplaceChoose label", function() {

		var label = $(this);

		if(label.data("tip")) {
			label.data("tip").remove();
			label.removeData("tip");
		}

	})

;
