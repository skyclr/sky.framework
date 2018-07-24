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

		showTip: function() {

			let label = $(this);
			let originalTip = label.find(".checkItemTip");

			if(originalTip.length && !label.data("tip")) {
				let popup = label.closest(".selectReplaceChoose");
				let tip = originalTip.clone().removeClass("hidden").appendTo("body");
				tip.css({
					left: popup.offset().left,
					top : popup.offset().top + popup.outerHeight() + 5
				});
				label.data("tip", tip);
			}

		},

        hideTip: function() {

			let label = $(this);

			if(label.data("tip")) {
				label.data("tip").remove();
				label.removeData("tip");
			}

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
                dropOffset = visibleCalculator.getDropOffset(replace, popup);

			/* If visible just hide */
			if(dropOffset) {
				popup.removeClass('hidden').css({ marginLeft: dropOffset.left, margintop: dropOffset.top });

				if(replace.outerWidth() > popup.outerWidth())
					popup.css("width", replace.outerWidth());

                /* Search focus */
				if (popup.find(".search").length)
					popup.find(".search input").val('').focus();

            }

        },

        selectChange: function(element, _) {

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

        }

    }
});