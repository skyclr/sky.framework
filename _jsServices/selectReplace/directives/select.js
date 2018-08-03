sky.directive("select", (select, attrs) => {
	let options = attrs || {};
	options.items = [];
	options.selected = null;
	select.find("option").each((_, option) => {
		options.items.push({ html: option.innerHTML, value: option.value, checked: !!option.selected });
	});
	let replace = sky.service("templates").renderByText("{% import forms as forms %}{{ forms.selectReplace(options, items) }}", { options: options, items: options.items });
	replace.replaceElement(select);
});
sky.directive(".selectReplaceChoose", (popup, attrs) => {
		let replace = popup.prev();
		replace.data("defaults", {
			defaultValue: replace.html() || '-',
			defaultAllValue: replace.text() || "Все"
		});

		/* Trigger */
		setTimeout(() => { popup.find("input:radio, input:checkbox").first().trigger("change"); }, 1);

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
