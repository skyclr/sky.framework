sky.directive("select", (select, attrs) => {
	let options = attrs || {};
	options.items = [];
	select.find("option").each(option => {
		options.items.push({ html: option.html(), value: option.attr("value") });
	});
	let replace = sky.service("templates").renderByText("{% import forms as forms %}{{ forms.selectReplace(options) }}", { options: options });
	replace.replaceElement(select);
});
sky.directive(".selectReplaceChoose", (popup, attrs) => {
		let replace = popup.prev();
		replace.data("defaults", {
			defaultValue: replace.html() || '-',
			defaultAllValue: replace.text() || "Все"
		});

		/* Trigger */
		setTimeout(function() { popup.find("input:radio, input:checkbox").first().trigger("change") }, 1);

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
