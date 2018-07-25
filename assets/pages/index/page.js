sky.onReady(function({ ajax }) {

});
sky.action("page", function({ windows }) {
	return {
		submit: () => {
			windows.Modal("page-window", {});
		}
	}
});