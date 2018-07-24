Adds actions support
You can use .action instead of .on in jquery, form make safe event handlers,
its same as use Function.prototype.safe in handler callback
Also adds support for declarative actions definitions in tag attributes.
Use data-event attribute to define callbacks, they supports parameters, multiple callbacks separated by semicolon