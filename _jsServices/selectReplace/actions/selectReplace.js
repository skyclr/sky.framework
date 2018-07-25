sky.action("selectReplace", function({ visibleCalculator }) {

    let filter = function(self, event) {

        /* Get drop */
        let popup  = self.closest(".selectReplaceChoose"),
            inputs = popup.find("input[name]");

        /* On enter */
        if(event.which === 13) {
            let visible = popup.find("label:visible");
            if(visible.length > 0) {
                inputs.prop("checked", false);
                visible.children("input").prop("checked", true).trigger("change");
            }
            event.stopPropagation();
        }

        /* Get value */
		let value = self.val(),
			 rus              = "йцукенгшщзхъфывапролджэёячсмитьбю",
             eng              = "qwertyuiop[]asdfghjkl;'\\zxcvbnm,.",
             expression       = new RegExp(value.toLowerCase()),
             expressionInvert = new RegExp(value.toLowerCase().replace(/[a-zа-яё]/g, (character) => {
                if(rus.indexOf(character) > -1) return eng[rus.indexOf(character)];
                if(eng.indexOf(character) > -1) return rus[eng.indexOf(character)];
                return character;
            }));

        /* Hide */
        for(let input of inputs) {

            if(input.parent().hasClass('hidden'))
                return;

            let inputHtml = input.next().html().toLowerCase();

            try {
                if(!inputHtml.match(expression) && !inputHtml.match(expressionInvert)) input.parent().hide();
                else input.parent().show();
            } catch(e) {}

        }
    };

    return {

        filter: filter,

        selectAll: function(button) {

            /* Get drop */
            let popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", true).first().trigger("change");

        },

        unSelectAll: function(button) {

            /* Get drop */
            let popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", false).first().trigger("change");

        },

        close: function(element, event) {
            if(element.get(0) === event.target)
                $(".selectReplaceChoose").addClass('hidden');
        },

		showTip: function(label) {

			let originalTip = label.find(".checkItemTip");

			/* If no tip element or tip already shown */
			if(!originalTip.length || label.data("tip"))
			    return;

            let popup = label.closest(".selectReplaceChoose");
            let tip = originalTip.clone().removeClass("hidden").appendTo("body");
            tip.css({
                left: popup.offset().left,
                top : popup.offset().top + popup.outerHeight() + 5
            });
            label.data("tip", tip);


		},

        hideTip: function(label) {
			if(!label.data("tip"))
			    return;
            label.data("tip").remove();
            label.removeData("tip");
		},

        /**
         * Shows drop down
         * @param replace Input
         */
        drop: function (replace) {

            /* Hide all */
			$(".selectReplaceChoose").addClass('hidden');

            /* Get drop */
            let popup = replace.next(),
                dropOffset = (new visibleCalculator(replace)).getDropOffset(replace, popup.removeClass('hidden'));

            if(dropOffset) return;

			popup.css({ marginLeft: dropOffset.left, marginTop: dropOffset.top });

			if(replace.outerWidth() > popup.outerWidth())
				popup.css("width", replace.outerWidth());

			/* Search focus */
			if (popup.find(".search").length)
				popup.find(".search input").val('').focus();



        },

        change: function(element, event) {

			/* Get inputs */
			let popup = element.closest(".selectReplaceChoose"),
				inputs = popup.find("input:radio, input:checkbox"),
				current, change, children = false, replace = popup.prev(),
				val = "",
				defaultValue = replace.html() || '-',
				defaultAllValue = replace.text() || "Все";

			/* Un select all */
			popup.find("label").removeClass("selected");

            /* Get checked */
			let filtered = inputs.filter(":checked").each(function() {
				current = $(this);
				current.closest("label").addClass("selected");
				children = current.next();
				val = (val && val + ", ") + children.text();
			});

            /* Make text shorter */
			if(val.length > 26)
				val = val.substr(0, 26).trim() + "...";

			/* If all checked */
			if(filtered.length === inputs.length && !popup.hasClass("single"))
				val = defaultAllValue;

			/* Set input html */
			if(popup.hasClass("single") && children)
				replace.html('').prepend(children.clone().removeClass("name"));
			else if(!children)
				replace.html(defaultValue);
			else
				replace.text(val);

            /* If not fake event */
			if(event && current)
				replace.trigger("change", { value: current.val(), item: element });

			/* Hide on single-select */
			if(popup.hasClass("single"))
				popup.addClass('hidden');

        }

    }
});