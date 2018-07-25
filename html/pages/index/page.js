"use strict";

sky.onReady(function (_ref) {
	var ajax = _ref.ajax;
});
sky.action("page", function (_ref2) {
	var windows = _ref2.windows;

	return {
		submit: function submit() {
			windows.Modal("page-window", {});
		}
	};
});
//# sourceMappingURL=page.js.map
