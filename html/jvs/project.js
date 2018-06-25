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
sky.action("selectReplace", function() {


    var filter = function(self, event) {


        /* Get value */
        var value = self.val();

        /* Get drop */
        var popup  = self.closest(".selectReplaceChoose"),
            inputs = popup.find("input[name]");

        /* On enter */
        if(event.which == 13) {
            var visible = popup.find("label:visible");
            if(visible.length == 1) {
                inputs.prop("checked", false);
                visible.children("input").prop("checked", true).trigger("change");
            }
            event.stopPropagation();
        }

        /* Show all */
        if(value == "")
            self.show();

        /* Hide */
        inputs.each(function() {

            /* Get input */
            var input = $(this);

            if(input.parent().hasClass('hidden'))
                return;

            try {
                var rus              = "йцукенгшщзхъфывапролджэёячсмитьбю";
                var eng              = "qwertyuiop[]asdfghjkl;'\\zxcvbnm,.";
                var expression       = new RegExp(value.toLowerCase());
                var expressionInvert = new RegExp(value.toLowerCase().replace(/[A-Za-zА-Яа-яЁё]/g, function(character) {
                    if(rus.indexOf(character) > -1)
                        return eng[rus.indexOf(character)];
                    if(eng.indexOf(character) > -1)
                        return rus[eng.indexOf(character)];
                    return character;
                }.safe()).toLowerCase());
                if(!input.next().html().toLowerCase().match(expression) && !input.next().html().toLowerCase().match(expressionInvert)) {
                    input.parent().hide();
                } else {
                    input.parent().show();
                }
            } catch(e) {
            }

        });
    };

    return {

        filter: filter,

        selectAll: function(button) {

            /* Get drop */
            var popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", true).first().trigger("change");

        },

        unSelectAll: function(button) {

            /* Get drop */
            var popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", false).first().trigger("change");

        },

        close: function(element, event) {
            if(element.get(0) === event.target)
                $(".selectReplaceChoose").addClass('hidden');
        },

        /**
         * Shows drop down
         * @param replace Input
         * @param event Event
         * @param id Id of drop down
         */
        drop: function (replace, event, id) {

            /* Get drop */
            var popup = replace.next(), 
                visible = popup.is(":visible");
            
            /* Hide all */
			$(".selectReplaceChoose").addClass('hidden');
			
			/* If visible just hide */
			if(visible)
			    return;
			
            /* Set position */
            popup.removeClass('hidden').css({
                left: 0,
                top: 0
            });

            /* Init */
            var popupWidth = popup.outerWidth(),
                popupHeight = popup.outerHeight();

            /* Set position */
            popup.css({
                marginLeft: "",
                marginTop: "",
                width: "",
                left: "",
                top: ""
            });

            /* Init */
            var win = $(window),
                selfOffset = replace.offset(),
                popupOffset = popup.offset(),
                selfWidth = replace.outerWidth(),
                selfHeight = replace.outerHeight(),
                middle = false;

            // Drop down
            if (win.outerHeight() + win.scrollTop() >= selfOffset.top + popupHeight + selfHeight) {
                popup.css({
                    left: "", top: "",
                    marginTop: selfOffset.top - popupOffset.top + selfHeight + 1
                });
            }
            // Drop up
            else if(selfOffset.top - win.scrollTop() >= popupHeight) {
                popup.css({
                    left: "", top: "",
                    marginTop: selfOffset.top - popupOffset.top - popupHeight - 1
                });
                // Drop left
            } else {
                popup.css({
                    left: "", top: "",
                    marginTop: selfOffset.top - popupOffset.top - (popupHeight - selfHeight) / 2
                });
                middle = true;
            }


            /* Set position */
            if(!middle) {
                if (win.width() > selfOffset.left + popupWidth)
                    popup.css({
                        marginLeft: selfOffset.left - popupOffset.left + 1
                    });
                else
                    popup.css({
                        marginLeft: selfOffset.left - popupOffset.left - popupWidth + selfWidth
                    });
            } else {

                if (win.width() > selfOffset.left + popupWidth + selfWidth)
                    popup.css({
                        marginLeft: selfOffset.left - popupOffset.left + selfWidth
                    });
                else
                    popup.css({
                        marginLeft: selfOffset.left - popupOffset.left - popupWidth
                    });

            }

            if(replace.outerWidth() > popup.outerWidth())
                popup.css("width", replace.outerWidth());

            /* Search focus */
            if (popup.find(".search").length)
                popup.find(".search input").val('').focus();

        }
    }
});
//noinspection JSUnusedGlobalSymbols
sky.action("shared", {

	advertFilter: function (element) {
		let adverts = [];
		element.closest("form").find('[name=advertId]:checked').each(function () {
			adverts.push(this.value);
		});

		element.closest("form").find('[name=campaignId]').each(function () {

			let self = $(this).parent(),
				conId = self.attr("data-connection-id");

			if (!conId || !adverts.length || $.inArray(conId, adverts) >= 0)
				self.removeClass('hidden');
			else
				self.addClass('hidden');

		});

	},

	/**
	 * Close parent window
	 * @param self
	 * @param event
	 */
	closeWindow: function (self, event) {

		/* Close */
		if (event.target && event.target === self.get(0))
			self.closest(".windowShadow").data("modalWindow").close();

	},

	/**
	 * Scrolls body to top
	 * @param _
	 * @param event
	 */
	toTop: function (_, event) {

		/* No # go */
		event.preventDefault();

		/* Scroll */
		$('#pageContentHolder').animate({scrollTop: 0}, "fast");

	},

	/**
	 * Stops form form submit if not valid
	 * @param form
	 * @param event
	 */
	validForm: function (form, event) {
		if (form.validForm())
			form.get(0).submit();
	},

	/**
	 * Stops form form submit if not valid
	 * @param button
	 * @param event
	 */
	clearForm: function (button, event) {
		let form = button.closest("form");
		form.get(0).reset();
		form.find("input").trigger("change");
	},

	showTip: function (button, _, name) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips", [name]);

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append($("#" + name + "TipText").html())
		});

		// Show
		tip.show();

	},

	showTipWithText: function (button, _, text) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips");

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append(text)
		});

		// Show
		tip.show();

	},

	hideTips: function (element, event) {
		let target;

		if (event && event.target) {
			target = $(event.target);
			if (target.is("[sky-tip]") || target.is("[sky-tip-text]") || target.closest(".tipContent").length)
				return;
		}

		sky.tips.hideAll();

	},

	/**
	 *
	 */
	forceHideTips: function () {
		sky.tips.hideAll(true);
	},

	attachFile: function (input) {
		let label = input.closest(".label"),
			file = input.val().match(/[^\\\/]+(\.[^\\\/]+)?$/)[0] || input.val(),
			holder = sky.templates.render('page-fileHolder', {file: file}).append(input).insertBefore(label);

		$('<input type="file" name="attachment[]" sky-event="change: shared.attachFile">').appendTo(label.find(".button"))
	},

	toggleMenu: function (button, event) {
		$("#header").find(".menu").toggleClass("visible");
	},


	/**
	 * Reorders current result rows without request
	 * @param button
	 * @param _
	 * @param orderField
	 * @param type
	 */
	changeOrder: function (button, _, orderField, type) {

		let order = button.hasClass("desc") ? "asc" : "desc",
			table = button.closest("table"),
			first = table.find("th:last").parent(),
			trs = table.find("tr:not(.orderSkip):not(.footer):not(.header)"), cell1, cell2, convert = (type !== 'datetime' && type !== "text");

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Reorder
		trs.sort(function (firstTr, secondTr) {
			if (orderField) {
				cell1 = $(firstTr).find("[data-field=" + orderField + "]");
				cell2 = $(secondTr).find("[data-field=" + orderField + "]");
			} else {
				let buttonTr = button.closest("tr");
				let index = buttonTr.find("td, th").index(button.closest("td, th"));
				cell1 = $(firstTr).find("td:eq(" + index + ")");
				cell2 = $(secondTr).find("td:eq(" + index + ")");
			}

			// Get TDs values
			let val1 = cell1.attr("data-value") || cell1.html();
			let val2 = cell2.attr("data-value") || cell2.html();

			// Convert
			if (convert) {
				val1 = parseFloat(val1);
				val2 = parseFloat(val2);
			}

			// Compare
			if (val1 === val2 || (convert && isNaN(val1) && isNaN(val2)))
				return 0;
			else if (val1 > val2 || (convert && isNaN(val2)))
				return order === "desc" ? 1 : -1;
			else
				return order === "desc" ? -1 : 1;

		}).insertAfter(first);

	},

	changeOrderReload: function (button, _, orderField) {

		// Get order
		let order = button.hasClass("desc") ? "asc" : "desc";

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Set hash and reload
		page.history.set({order: order, orderField: orderField});
		page.currentLoader.reload();
	}

});
sky.action("suggest", function(suggester) {
   return {
       adverts: function(input, event) {

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/members/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.adverts || !response.adverts.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.adverts, function(_, advert) {
                       filtered.push(advert.username);
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });

       },

       campaigns: function(input, event){

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name });
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       },

       campaignsSpecial: function(input, event){
           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           if(this.suggestAjax)
               this.suggestAjax.stop();

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name+" ("+campaign.advert.username+")", callback: function(){
                           sky.actions.perform(null, null, "page.selectCampaign", [campaign.id]);
                       }});
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       }
   }
});

/**
 * Main init
 */
sky.exec(function() {
    $('body').removeClass("hidden");
    sky.execDeferredProject.resolve();
});