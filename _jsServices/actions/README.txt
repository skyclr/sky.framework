Adds actions support
You can use .action instead of .on in jquery, form make safe event handlers,
its same as use Function.prototype.safe in handler callback
Also adds support for declarative actions definitions in tag attributes.
Use data-event attribute to define callbacks, they supports parameters.
Multiple callbacks separated by semicolon
For declarative way you should define actions list with namespace.
Example:
sky.action("myActions", {
	action: function(element, event) {
		event.preventDefault();
		alert("Hello world");
	}
});

and then you may user it like

<a href="#" data-event="click: myActions.action">My button</a>