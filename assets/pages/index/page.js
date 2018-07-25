sky.onReady(function({ ajax }) {

});
sky.action("page", function({ windows, tips, templates }) {
	return {
		submit: () => {
			windows.Modal("page-window", {}).holder.formatForm();
		},
		showMenu: (button) => {
			tips.Tip(button, { create: templates.render("page-menu") }).show('left').tip.addClass("menu");
		}
	}
});