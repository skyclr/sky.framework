/**
 * For work with different type of notifications
 */
sky.service("notifications", ["templates", "windows", "tips"], function({templates, windows, tips}) {

	class Message {
		constructor({text, type = "error"}) {
			this.render = templates.render("forms-message", {type, text});
		}

		/**
		 * Creates new modal window and appends message to it
		 * @returns {*}
		 */
		modal() {
			return windows.modal(this.render);
		}

		/**
		 * Append to holder of modal window
		 * @param {object} modal
		 */
		appendToModal(modal) {
			modal.holder.append(this.render);
		}

		/**
		 * Shows notification in tip
		 * @param object
		 * @param align
		 */
		tip(object, align) {
			tips.Tip(object, {create: this.render, close: 5}).show(align || "top");
		}
	}

	return {
		message      : ({text, type = "error"}) => new Message({text, type}),
		findInElement: element => element.find(".notificationMessage")
	}

});