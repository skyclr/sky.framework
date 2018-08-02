"use strict";

sky.onReady(function (_ref) {
	var ajax = _ref.ajax;
});
sky.action("page", function (_ref2) {
	var windows = _ref2.windows,
	    tips = _ref2.tips,
	    templates = _ref2.templates;

	return {
		submit: function submit() {
			windows.modal("page-window", {}).holder.formatForm();
		},
		showMenu: function showMenu(button) {
			tips.Tip(button, { create: templates.render("page-menu"), className: "menu" }).show('left');
		}
	};
});
//# sourceMappingURL=page.js.map
