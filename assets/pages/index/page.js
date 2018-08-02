sky.onReady(function({ ajax }) {

});
sky.action("page", function({ windows, tips, templates }) {
	return {
		submit: () => {
			windows.modal("page-window", {}).holder.formatForm();
		},
		showMenu: (button) => {
			tips.Tip(button, { create: templates.render("page-menu"), className: "menu" }).show('left');
		}
	}
});