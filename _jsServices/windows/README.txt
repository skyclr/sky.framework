Modal windows service
service name: windows
methods:
	getLast - return last modal windows or null
	modal - creates new modal window
		name - String or jQuery, if string then template with this name would be rendered, if jQuery - appended
		data - Data that passed to template render
    modalAjax - creates new modal window with ajax loading indicator, locks it and unlocks on ajax resolve
    	ajax - Ajax call object from ajax service
classes:
	Modal - Creates new modal window
	class methods:
		constructor(name, data)
			Creates new modal window
			name - String or jQuery, if string then template with this name would be rendered, if jQuery - appended
			data - Data that passed to template render
		reRender(name, data)
			Fill window with content
			name - String or jQuery, if string then template with this name would be rendered, if jQuery - appended
			data - Data that passed to template render
		clearExceptTemplate()
			Removes window child elements that don't inserted via reRender or constructor
		removeNotifications()
			Removes all notification messages
		lock(ajax)
			Locks window so it can't be closed until unlock method call
			ajax - Ajax request, if passed - unlock would be called on done
		unlock()
			Unlocks current windows so it can be closed
		close(byUser = false)
			Would do nothing on locked window
			Closes current window. If tips service included, all tips would be closed
			byUser - this parameter would be passed to event handler
