sky.service("actions", function ({exceptions}) {

	let list = {},
		actions = this.service = {

			/**
			 * Performs action
			 * @param element
			 * @param event
			 * @param action
			 * @param {Array} [options]
			 */
			perform: function (element, event, action, options) {

				/* Get parameters */
				let params = action.match(/(.+)\((.*)\)/);

				/* Parse */
				if (params) {

					/* Get function */
					action = params[1];

					/* Parse params */
					params = params[2].split(",");
					$.each(params, function (i, val) {
						params[i] = eval(val.trim());
					})
				}

				/* Options */
				if (options)
					params = $.extend(params || [], options);

				/* Get */
				let self = element ? $(element) : false,
					path = action.split("."),
					current = list,
					name = action;

				/* If disabled */
				if (self && self.isDisabled && self.isDisabled())
					return;

				$.each(path, function (i, elem) {

					/* Search */
					if (i + 1 < path.length && !current[elem])
						throw new exceptions.system.Error("No action - " + action + ", because can't find '" + elem + "'");

					/* Get new elem */
					if (i + 1 < path.length)
						current = current[elem];

					/* Save name */
					name = elem;

				});

				/* If no */
				if (!current[name])
					throw new exceptions.system.Error("No action - " + action);

				/* Call */
				current[name].apply(current, [self, event].concat(params || []));

			},

			/**
			 * Adds actions to list
			 * @param name Group name
			 * @param events List
			 */
			add: function (name, events) {

				if (typeof events === "function")
					events = events.safe(true)();

				// Check
				if (!events || typeof events !== 'object')
					throw new exceptions.system.Error("No event object for events '" + name + "' provided");

				// Save
				list[name] = $.extend(list[name] || {}, events);

			}

		};


	/**
	 * Adds special bind function
	 * @param {string} name Event name
	 * @param {*} selector Selector string
	 * @param {function} [action] Action function
	 * @returns {jQuery}
	 */
	$.fn.action = function(name, selector, action) {

		/* Parameters skip */
		if(typeof action === "undefined") { action = selector; selector = null; }

		/* Bind */
		return this.on(name, selector, function(event, data) {
			action.call(this, event, $(this), data);
		}.safe());
	};

	/*
	 * Bind declarative events
	 */
	$(document).action("click submit keyup keydown dblclick mouseover mouseout mouseleave mouseenter change mousedown mouseup touchstart", '[data-event]', function (event, self, data) {

		/* Get string */
		let skyEvent = this.getAttribute("data-event");

		/* If no such string */
		if (skyEvent.indexOf(event.type) === -1)
			return;

		/* If disabled */
		if (self.isDisabled && self.isDisabled()) {
			event.preventDefault();
			return;
		}

		/* Split */
		let list = skyEvent.split(";"), i;

		/* Go through */
		for (i = 0; i < list.length; i++) {

			/* Get elements */
			let parts = list[i].match(/(\w+):(.*)/);

			/* Wrong */
			if (parts.length !== 3)
				throw new exceptions.system.Error("Wrong action format in data-event: " + list[i]);

			/* Get elements */
			let name = parts[1].trim(),
				action = parts[2].trim();

			/* Another event */
			if (name !== event.type)
				continue;

			/* No default go */
			if (event.target === self.get(0))
				event.preventDefault();

			/* Passed data */
			if (data)
				event.data = data;

			/* Get action data */
			let actionData = self.data("skyActionData");

			/* Save */
			if (actionData)
				event.data = actionData;

			/* Dump action */
			if (action === "false")
				continue;

			/* Perform action */
			actions.perform(this, event, action);

		}

	});

});
sky.service("ajax", function({ callbacks }) {

	/**
	 * Advanced ajax execution
	 * To abort call stop() method instead of abort() because it's used for abort callback set, or .ajax.abort()
	 * You may skip type, don't skip it if lock is string set false in object and data
	 * @param {string} url				Requested url
	 * @param {object} [data]			Holds request parameters
	 * @param {jQuery} [object]			Object which performs request, to disable it during request
	 * @param {object} [ajaxExtend]		Additional ajax options, see http://api.jquery.com/jQuery.ajaxSetup/
	 * @param {object} [callbackData]	Additional params that passed to any callback
	 */
	this.service = function(url, data, { object = null, callbackData = {}, ajaxExtend = {} }) {

		/* Lock button */
		if(object)
			object = $(object).filter(":not(.disabled)").disable();

		/* New object to store callbacks */
		let ajaxCallbacks = new callbacks();
		ajaxCallbacks.stop = function() { ajaxCallbacks.ajax.abort(); };

		/* Perform ajax request */
		ajaxCallbacks.ajax = $.ajax($.extend(true, {

			/* Set base options */
			url     	: url,
			data    	: data,
			dataType	: "json",
			type    	: "post",
			timeout		: 480 * 1000,
			success: function(response, textStatus, jqXHR) {

				/* Possible params list */
				let params = $.extend({ jqXHR: jqXHR, textStatus: textStatus, object: object }, callbackData);

				/* If empty response */
				if(response === null) {
					params.error = "Данные небыли переданы";
					params.type = "noData";
				}

				/* If response returned with error */
				if(response.error) {
					params.error = response.text;
					params.type = "php";
				}

				/* If error type set */
				if(params.type)
					return ajaxCallbacks.fire("notSuccess, error", params); // No data

				/* Set response in possible params */
				params.response = params.data = response;

				/* User success function */
				return ajaxCallbacks.fire("preSuccess, success, notAbort", params);

			}.safe(),
			error: function(jqXHR, textStatus, errorThrown) {

				/* Defaults */
				let type        = "Unknown",
					errorText   = "Во время выполнения запроса произошла ошибка, пожалуйста попробуйте позже";

				/* Get error text according to response data */
				if(textStatus === "abort") {
					type 	  = "abort";
					errorText = 'Выполнение запроса прервано';
				} else if(textStatus === 'parsererror') {
					type 	  = "parse";
					errorText = "Ответ пришел в неверном формате, пожалуйста попробуйте позже, текст:<br/>" + jqXHR.responseText;
				} else if(textStatus === 'timeout') {
					type 	  = "timeout";
					errorText = 'Время ожидания ответа истекло';
				} else if(jqXHR.status === 0) {
					type 	  = "stopped";
					errorText = 'Загрузка остановлена, проверьте свои настройки сети';
				} else if(codes[jqXHR.status]) {
					type = jqXHR.status;
					errorText = 'Ошибка во времы выполнения запроса <br/> ' + codes[jqXHR.status];
				}

				/* Possible params list */
				let params = $.extend({
					error      : errorText,
					type       : type,
					code	   : type,
					jqXHR      : jqXHR,
					textStatus : textStatus,
					status     : textStatus,
					errorThrown: errorThrown,
					object     : object
				}, callbackData);

				/* Execute callback */
				ajaxCallbacks.fire("notSuccess", params);

				/* Execute special ajaxCallbacks */
				ajaxCallbacks.fire(textStatus === "abort" ? "abort" : "error, notAbort", params);

			}.safe()

		}, ajaxExtend));

		/* On always set */
		ajaxCallbacks.ajax.promise().always(function(jqXHR, textStatus, errorThrown) {

			/* Unlock objects */
			if(object)
				object.enable();

			/* Always callback */
			ajaxCallbacks.fire("always", { errorThrown: errorThrown, textStatus: textStatus, jqXHR: jqXHR, object: object});

		}.safe());

		return ajaxCallbacks;

	};

	/**
	 * Contains http codes
	 */
	let codes = {

		/* Request errors */
		400: "Неверный запрос",
		401: "Для выполнеия запроса нужня авторизация",
		402: "Для доступа к ресурсу необходима оплата",
		403: "Доступ к ресурсу запрещен",
		404: "Сервер для выполнения запроса не найден или запрос выполнялся слишком долго",
		405: "Не поддерживаемый метод HTTP",
		406: "Не приемлемо",
		407: "Необходима аутентификация прокси",
		408: "Истекло время ожидания",
		409: "Конфликт",
		410: "Ресурс удален",
		411: "В запросе не указана длинна",
		412: "Условие ложно",
		413: "Размер запроса слишком велик",
		414: "Запрашиваемый URI слишком длинный",
		415: "Неподдерживаемый тип данных",
		416: "Запрашиваемый диапазон не достижим",
		417: "Ожидаемое неприемлемо",
		422: "Необрабатываемый экземпляр",
		423: "Ресурс заблокирован",
		424: "Невыполненная зависимость",
		425: "Неупорядоченный набор",
		426: "Необходимо обновление",
		428: "Необходимо предусловие",
		429: "Слишком много запросов",
		431: "Поля заголовка запроса слишком большие",
		451: "Недоступно по юридическим причинам",
		456: "Некорректируемая ошибка",
		499: "Используется Nginx, соединение закрыто до получения ответа",

		/* Server error */
		500: "Внутренняя ошибка сервера",
		501: "Не реализовано",
		502: "Плохой или ошибочный шлюз",
		503: "Сервис недоступен",
		504: "Шлюз не отвечает",
		505: "Версия HTTP не поддерживается",
		506: "Вариант тоже проводит согласование",
		507: "Переполнение хранилища",
		508: "Запрос зациклен",
		509: "Исчерпана пропускная ширина канала",
		510: "Не расширено",
		511: "Требуется сетевая аутентификация"

	};

});
/** Class to work with drop zone for File api */
sky.service("ajaxFilesDropZone", function({ supported, callbacks }) {
	this.service = class {
		constructor({ zone, data, url, options }) {

			/* Save options */
			this.options   = options;
			this.zone      = zone;
			this.callbacks = callbacks();
			this.data      = data;
			this.url       = url;
			this.files     = [];

			/* If no XHR supported, no file drip needed */
			if(!supported.XHRIsSupported) {
				this.callbacks.fire("nonSupported");
				return this;
			}

			/* Bind events */
			this.attachEvents();

		}

		attachEvents() {

			/* While over event */
			this.zone.on({

				dragenter: (event) => { this.callbacks.fire("dragenter", this, [event]); },
				dragleave: (event) => { this.callbacks.fire("dragleave", this, [event]); },
				dragend  : (event) => { this.callbacks.fire("dragend", this, [event]); 	 },
				drop     : (event) => { this.callbacks.fire("drop", this, [event]);		 },
				dragover : (event) => {

					/* Get event */
					event = event.originalEvent;

					/* Check if drag is valid */
					if(!this.isValidFileDrag(event))
						return;

					/* Get effect */
					let effect = event.dataTransfer.effectAllowed;

					/* Set proper */
					if(effect === 'move' || effect === 'linkMove') {
						event.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)
					} else {
						event.dataTransfer.dropEffect = 'copy'; // for Chrome
					}

					/* Prevent */
					event.preventDefault();

				}
			});

			/* Stop file opening when drop on browser window */
			$(document).bind({
				dragover : function(e) {
					e = e.originalEvent;
					if(e.dataTransfer) {
						e.dataTransfer.dropEffect = 'none';
						e.preventDefault();
					}
				},
				dragenter: function(e) {
					if(typeof self.options.onStart !== "undefined")
						self.options.onStart.apply(self, [e]);
				}
			});
		}

		static isValidFileDrag(event) {

			let dt = event.dataTransfer,
			// do not check dt.types.contains in webkit, because it crashes safari 4
				isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;

			// dt.effectAllowed is none in Safari 5
			// dt.types.contains check is for firefox
			return dt && dt.effectAllowed !== 'none' &&
				(dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));

		}

	};

});
sky.service("ajaxFilesIFrame", function() {

	let AjaxFilesIFrame = function(options) {

		/* Save options */
		this.options 	= options;
		this.files    	= options.files;
		this.input   	= options.input;
		this.url  	 	= options.url;
		this.data 	 	= options.data;
		this.callbacks 	= options.callbacks;

	};

	AjaxFilesIFrame.prototype = {

		getName: function(name){

			// get input value and remove path to normalize
			return name.replace(/.*(\/|\\)/, "");

		},

		cancel: function(id){

			this.options.onAbort(id, this.getName(this.input.value));

			this.IFrame.setAttribute('src', 'javascript:false;').remove();

		},

		/**
		 * Upload file function
		 */
		send: function() {

			/* letiables */
			let self 	 = this;
			let input 	 = this.input;
			let fileName = this.getName(input.value);

			/* Create new input */
			$(input).clone().val("").insertBefore(input);

			/* Create elements */
			this.IFrame = this.createIframe();
			this.form = this.createForm(this.IFrame, this.options.data).append(input);

			this.attachLoadEvent(this.IFrame, function() {

				let response = self.getIframeContentJSON(self.IFrame);

				if(response) self.options.onSuccess(response);

				// timeout added to fix busy state in FF3.6
				setTimeout(function(){ self.IFrame.remove(); }, 1);

			});

			this.form.trigger("submit");

		},

		/**
		 * Attach load event to IFrame
		 */
		attachLoadEvent: function(iframe, callback){

			iframe.load(function(){

				if (!this.parentNode) return;

				// fixing Opera 10.53
				if (this.contentDocument &&
					this.contentDocument.body &&
					this.contentDocument.body.innerHTML === "false") return;

				callback();

			});

		},

		/**
		 * Returns json object received by IFrame from server.
		 */
		getIframeContentJSON: function(iframe){

			/* IFrame.contentWindow.document - for IE<7 */
			let doc = iframe.get(0).contentDocument ? iframe.get(0).contentDocument: iframe.get(0).contentWindow.document;

			let response = doc.body.innerHTML

			/* Check for empty response */
			if(response === "") {
				if(self.callbacks) self.callbacks.onError("Данные небыли переданы"); // No data
				return false;
			}


			/* Try to get json data */
			try {
				response = jQuery.parseJSON(response);
			} catch(e) {
				if(self.callbacks) {
					self.callbacks.onError("Неверный формат данных"); // No data
					console.log(response);
				}
				return false;
			}

			/* If response returned with error */
			if(response.error) {
				if(self.callbacks) self.callbacks.onError(response.text); // Execute user error handler
				return false;
			}

			return response;
		},

		/**
		 * Creates IFrame with unique name
		 */
		createIframe: function() {

			return $('<IFrame/>', { src: "javascript:false;", name: "uploadIFrame" + Math.floor(Math.random()*1000000) }).css("display", "none").appendTo('body');

		},

		/**
		 * Creates form, that will be submitted to IFrame
		 */
		createForm: function(iframe, params) {

			let queryString = this.url + "?" + jQuery.param(params);

			return $('<form/>', {
				method: "post", enctype: "multipart/form-data", action: queryString, target: iframe.attr("name")
			}).css("display", "none").appendTo('body');

		}

	};

});
/**
 * Module to work with ajax file upload
 */
sky.service("ajaxFiles", function({ callbacks, supported, ajaxFilesXHR, ajaxFilesIFrame }) {

	/**
	 * Class to work with dynamic file upload
	 * @param {html|string} input Input to be used to upload
	 * @param {string} url Url to upload
	 * @param {object} data Data to be send with request
	 */
	let AjaxFiles = this.service = function(input, url, data) {

		/* Self construct */
		if(!(this instanceof AjaxFiles))
			return new AjaxFiles(input, url, data);

		/* Save items */
		this.inputs 	= $(input);
		this.url   		= url;
		this.data  		= data;
		this.callbacks 	= callbacks();
		this.files		= [];

		/**
		 * Function to handle file input change
		 */
		this.saveFiles = function(input) {

			/* Get files list */
			if(supported.XHRUpload) {

				/* Get files from event */
				let files = input.get(0).files;

				/* Save them to this */
				for(let file of files)
					this.files.push({ file: file, input: input, inputName: input.attr("name") });

			} else this.files.push(input.get(0));

		};

		/**
		 * Sends ajax files
		 * @param {bool} parallel If try files would be send in parallel
		 * @returns {*}
		 */
		this.send = function(parallel) {

			/* Clear */
			this.files = [];

			/* Get files list */
			this.inputs.each((_, input) => { this.saveFiles($(input)); });

			/* If no files */
			if(!this.files.length)
				return false;

			/* Create supported handler */
			let handler;
			if(supported.XHRUpload)
				handler = new ajaxFilesXHR(this);
			else
				handler = new ajaxFilesIFrame(this);

			/* Send files */
			if(parallel)
				this.sendParallel(handler);
			else
				this.sendConsequentially(handler);

			/* return send handler */
			return handler;

		};

		/**
		 * Sends files consequentially
		 * @param handler
		 */
		this.sendConsequentially = function(handler) {

			/* First id */
			let id = 0;

			/* Set sending next after this one */
			this.callbacks.on("always", () => {
				id++;
				if(this.files[id])
					handler.send(this.files[id]);
			});

			/* Send first */
			handler.send(self.files[id]);

		};

		/**
		 * Sends files parallel
		 * @param handler
		 */
		this.sendParallel = function(handler) {

			/* Send files through them */
			for(let file of this.files)
				handler.send(file);

		};

		/* Self return */
		return this;

	};

	/**
	 * Performs default file send
	 * @param {string} url
	 * @param element
	 * @param data
	 */
	AjaxFiles.defaultSend = function(url, element, data) {

		// Get input
		let input = element.is("input[type=file]") ? element : element.closest("label, .label").find("input[type=file]"),
			exceptions = sky.service("exceptions"),
			templates = sky.service("templates"),
			notifications = sky.service("notifications"),
			windows = sky.service.windows("windows");

		// Check
		if(!input.length)
			throw new exceptions.system.Error("No proper input provided for file send");

		// Init
		let filesAjax = AjaxFiles(input, url, data),
			modal = windows.getLast(),
			currentFile;

		/*  Bind events */
		filesAjax.callbacks
			.on("begin", function (file) {
				if(modal) {
					modal.holder.find(".preview").remove();
					modal.lock();
				}
				currentFile = templates.render("files-single-upload", file).insertAfter(element.parent());
			})
			.on("always", function () {
				currentFile.remove();
				if(modal)
					modal.unlock();
			})
			.on("notSuccess", function (error) {
				modal.clearExceptTemplate();
				notifications.message({text: error}).appendToModal(modal);
			})
			.on("progress", function (totalPercent, percent) {
				currentFile.find(".total").html(percent + "%");
				currentFile.find(".progressBar div").css("width", percent + "%");

				// If loaded
				if (percent === 100)
					currentFile.find(".total").html("100%, обработка");


			})
			.on("start", function () {

			});

		/* Send */
		filesAjax.send();
		return filesAjax;

	};

});
/** Sends file data via HttpRequest */
sky.service("ajaxFilesXHR", function({supported, ajax, stackList}) {
	this.service = class {
		constructor(options) {

			/* Save options */
			this.options 		= options;
			this.files 			= options.files;
			this.input 			= options.input;
			this.url 			= options.url;
			this.data 			= options.data;
			this.callbacks 		= options.callbacks;
			this.toProceed 		= options.files.length;
			this.inProgress 	= 0;
			this.total 			= options.files.length;
			this.totalLoaded 	= 0;
			this.totalSize 		= 0;
			this.totalPercent 	= 0;
			this.current 		= 0;
			this.fileRequests 	= stackList();

			/* Go through */
			for(file of options.files)
				this.totalSize += file.size;

		}

		/**
		 * Get file name
		 * @param {*} file File
		 * @returns {string}
		 */
		static getName(file) {
			return file.name.replace(/.*(\/|\\)/, "");
		}

		/**
		 * Uploads file
		 * @param {*} file File name in files stack
		 */
		send(file) {

			/* This obj will store data associated with XHR */
			$.extend(file, {
				id     : Math.random(),
				name   : this.getName(file.file),
				size   : file.file.size,
				ajax   : false,
				percent: false,
				loaded : 0
			});

			/* Prepare params */
			let self        = this,
				params      = this.data || {},
				queryString = this.url + "?ajaxFile=" + file.name + "&" + jQuery.param(params);

			/**
			 * Params extend
			 * @param {object} args Object to be extended
			 * @returns {*}
			 */
			this.extend = function(args) {
				return jQuery.extend(args, {
					totalLoaded : self.totalLoaded,
					totalSize   : self.totalSize,
					totalPercent: self.totalPercent,
					file        : file,
					loaded      : file.loaded,
					size        : file.size,
					percent     : file.percent,
					toProceed   : self.toProceed,
					current     : self.current,
					total       : self.total
				});
			};

			/* Send */
			if(supported.formData) {

				/* Create form data sender */
				let form = new FormData();
				form.append(file.inputName, file.file);

				/* Send start */
				file.ajax = ajax(queryString, form, { ajaxExtend: {
						processData: false,
						contentType: false,
						type       : "POST",
						xhr        : (() => {
							try {

								/* Create XHR */
								let xhr = new XMLHttpRequest();

								/* Set special upload api handlers */
								xhr.upload["onloadstart"] = function() {
									this.inProgress++;
									this.callbacks.fire("begin", this.extend({}));
								};
								xhr.upload["onprogress"] = function(event) {
									this.totalLoaded += event.loaded - file.loaded;
									this.totalPercent = (this.totalLoaded / this.totalSize * 100).toFixed(0);
									this.onProgress(event, file);
								};

								/* Return create XHR */
								return xhr;

							} catch(e) {
								return undefined;
							}
						}).safe()
					}
				});

			} else {

				/* Send start */
				file.ajax = ajax(queryString, file.file, {
					processData: false,
					contentType: false,
					type       : "POST",
					beforeSend : sky.func(function(jqXHR) {
						jqXHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						jqXHR.setRequestHeader("X-File-Name", encodeURI(file.name));
						jqXHR.setRequestHeader("Content-Type", "multipart/form-data");
						jqXHR.setRequestHeader("Content-Disposition", 'attachment; filename="' + encodeURI(file.name) + '"');
						jqXHR.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
					})
				});

			}

			/* Set ajax callbacks */
			file.ajax.on({
				success:	(all) => { this.callbacks.fire("success", this.extend(all)); },
				error: 		(all) => { this.callbacks.fire("error", this.extend(all)); },
				notSuccess: (all) => { this.callbacks.fire("notSuccess", this.extend(all)); },
				always: 	(all) => {

					/* Counters */
					this.inProgress--;
					this.toProceed--;

					/* Call always method */
					this.callbacks.fire("always", this.extend(all));

					/* Delete connection */
					this.fileRequests.delete(file);

				}
			});

			/* Save */
			this.fileRequests.add(file);

		}

		/**
		 * Fores on progress change
		 * @param event
		 * @param fileRequestData
		 */
		onProgress(event, fileRequestData) {

			/* Count percentage */
			let percent = (event.loaded / event["total"] * 100).toFixed(0);
			fileRequestData.loaded = event.loaded;

			/* If percent changed */
			if(percent !== fileRequestData.percent && event["lengthComputable"]) {
				fileRequestData.percent = percent;
				this.callbacks.fire("progress", this.extend({}));
			}

		}

		/**
		 * Aborts current download
		 */
		abort() {

			/* Stop each request */
			this.fileRequests.each(request => { request.ajax.stop() });

			/* Call always method */
			this.callbacks.fire("abort", this.extend({}));

		}

	};

});
sky.service("calendar", function ({ templates }) {

	/* This class is for showing calendar to pick date on page */
	let calendar = {

		/* Days set */
		monthsNames: window.page.data.monthsNames || ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],

		renderDays: function () {

			/* Clone */
			let current = moment(this.date),
				weeks = [],
				currentWeek = false;

			/* From first */
			current.date(1);

			/* Go through */
			while (current.month() === this.date.month()) {

				/* Make week if new */
				if (!currentWeek || current.day() === 1) {
					currentWeek = {number: current.isoWeek(), days: []};
					weeks.push(currentWeek);
				}

				/* Push */
				currentWeek.days.push({date: current.clone(), dateStr: current.format("YYYY.MM.DD"), day: current.day() === 0 ? 6 : current.day() - 1});

				/* Go next day */
				current.add(1, "d");

			}

			/* Render */
			this.dates.html('').append(templates.render("calendar-dates", {
				weeks: weeks,
				dateStr: this.date.format("YYYY.MM.DD"),
				current: this.date,
				period: this.period,
				since: this.since,
				till: this.till
			}));

			/* Render */
			this.setTime();

		},

		/**
		 * When user picks date
		 * @param {*} dayDiv Div that user clicked, if he did
		 * @param notClose
		 */
		dayPick: function (dayDiv, notClose) {

			/* Set date */
			if (dayDiv)
				this.date.date(parseInt(dayDiv.html()));

			this.field.val(this.getInputValue()).trigger("change").trigger("keyup");
			if (!notClose) this.close();

		},

		getInputValue: function () {

			/* Get field new value */
			if (this.useTime)
				return this.date.format("DD.MM.YYYY HH:mm");
			else if (this.period && this.since.isSame(this.till))
				return this.since.format("DD.MM.YYYY");
			else if (this.period)
				return this.since.format("DD.MM.YYYY") + ' - ' + this.till.format("DD.MM.YYYY");

			/* Default */
			return this.date.format("DD.MM.YYYY");

		},

		setDayPick: function () {
			this.pickedDateView.html(this.getInputValue());
		},

		/**
		 * Position date picker
		 * @param {*} field Item that we should position under
		 */
		position: function (field) {

			this.holder.insertAfter(field.parent()).css({
				marginTop: 0,
				marginLeft: 0,
				position: "absolute"
			}).css({
				marginTop: field.offset().top - this.holder.offset().top + field.outerHeight() + 1,
				marginLeft: field.offset().left - this.holder.offset().left + 1
			});

		},

		/**
		 * Sets time inputs in calendar values
		 */
		setTime: function () {

			/* Set time */
			this.holder.find(".time .hour").val(this.date.format("HH"));
			this.holder.find(".time .minute").val(this.date.format("mm"));

		},

		periodChangeDay: function () {

			let reset = function () {
				calendar.since = calendar.date.clone();
				calendar.till = calendar.date.clone();
				calendar.lastModified = "none"
			};

			if (this.date.isBefore(this.since)) {
				if (this.lastModified !== "since") {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
				else reset();
			} else if (this.date.isAfter(this.till)) {
				if (this.lastModified !== "till") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else reset();
			} else if (this.date.isSame(this.till) || this.date.isSame(this.since))
				reset();
			else {
				if (this.lastModified === "since") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
			}

			calendar.markSelected();

		},

		markSelected: function () {

			this.dates.find(".day").removeClass("selected").removeClass("subSelected").each(function () {


				let element = $(this),
					date = calendar.date.clone().date(parseInt(element.html()));

				if (!calendar.period) {
					if (date.format("DD.MM.YYYY") === calendar.date.format("DD.MM.YYYY"))
						element.addClass("subSelected");
					return;
				}

				if (date.isAfter(calendar.since) && date.isBefore(calendar.till))
					element.addClass("subSelected");
				else if (date.isSame(calendar.since) || date.isSame(calendar.till))
					element.addClass("selected");

			});

		},

		/**
		 * Changes day
		 * @param {*} element Day picker
		 * @returns {undefined}
		 */
		changeDay: function (element) {

			/* If pick today */
			this.date.date(parseInt(element.html()));

			/* No more for period */
			if (this.period) {
				this.periodChangeDay();
				return;
			}

			calendar.markSelected();

			/* Set time */
			if (this.field.attr("name") === "since")
				this.date.hour(0).minute(0);
			else if (this.date.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))
				this.date.hour(moment().hour()).minute(moment().minute());
			else
				this.date.hour(23).minute(59);

			/* Pick */
			if (!this.useTime)
				this.dayPick(element);
			else
				this.setTime();

		},

		/**
		 * Sets specified year
		 * @param {int} year Year that need to be set
		 */
		changeYear: function (year) {

			/* Set year */
			this.date.year(year);

			/* Update */
			this.yearView.html(year);

			/* Dates redraw */
			this.renderDays();

		},

		/**
		 * Sets specified month
		 * @param {int} month Month to be set
		 */
		changeMonth: function (month) {

			/* Set year */
			this.date.month(month);

			/* Updates */
			this.monthView.html(this.monthsNames[this.date.month()] + ' ' + this.date.year());

			/* Reload year */
			this.changeYear(this.date.year());

		},

		getDatePeriod: function (dateString) {

			// Split and get since
			let parts = dateString.split('-'),
				till,
				since = this.getDate(parts[0].trim());

			// Get till
			if (parts.length > 1)
				till = this.getDate(parts[1].trim());
			else
				till = this.getDate(parts[0].trim());

			// Set inner lets
			this.since = since;
			this.till = till;
			this.date = since.clone();

		},

		/**
		 * Creates today date
		 */
		getDate: function (dateString) {

			/* Set calendar date */
			let date = false;

			/* If input has datetime format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/))
				date = moment(dateString, "YYYY-MM-DD HH:mm");

			/* Id input has date format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2}$/))
				date = moment(dateString, "YYYY-MM-DD");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4}$/))
				date = moment(dateString, "DD.MM.YYYY");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/))
				date = moment(dateString, "DD.MM.YYYY HH:mm");

			/*  If still no */
			if (!date) {
				date = moment();

				/* Set time */
				if (this.field.attr("name") === "since")
					date.hour(0).minute(0);
			}

			/* Reset time */
			if (!this.useTime)
				date.hour(0).minute(0);

			/* Additional check */
			return this.date = date;

		},

		/**
		 * Closes windows
		 */
		close: function () {

			/* Remove calendar */
			if (this.holder)
				this.holder.remove();

			/* Unset */
			if (this.field) {
				this.field.off("keyup.calendar");
				this.field = false;
			}
		}
	};

	let show = function (field, showTime) {

		/* Remove old calendars */
		this.close();

		/* Begins from current date */
		this.field = field;
		this.period = false;
		this.useTime = showTime ? showTime : false;
		this.lastPicked = "none";

		if (field.is("input.datePeriod")) {
			this.period = true;
			this.getDatePeriod(field.val());
		} else
			this.getDate(field.val());

		/* Render */
		this.holder = templates.render("calendar", this);

		/* Actions */
		this.holder

		/* Months changer */
			.action("click", ".month .next", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() + 1);
			})
			.action("click", ".month .prev", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() - 1);
			})

			/* Years */
			.action("click", ".year .next", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() + 1);
			})
			.action("click", ".year .prev", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() - 1);
			})
			.action("click", ".setNow", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setToday", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.hour(0);
				calendar.date.minute(0);
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setWeek", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.subtract(7, "d");
				calendar.renderDays();
				calendar.setTime();
			})

			/* Day */
			.action("click", ".dates .day", function (event) {
				event.preventDefault();
				let self = $(this);

				if (self.is(".selected") && !calendar.period)
					calendar.dayPick($(this));
				else {
					calendar.changeDay($(this));
					calendar.dayPick(false, true);
				}
			})

			/* Apply button */
			.action("click", ".apply", function (event) {
				event.preventDefault();
				calendar.dayPick();
			})

			/* Time */
			.action("click", ".time a", function (event) {
				event.preventDefault();
				calendar.date.hour(moment().hour());
				calendar.date.minute(moment().minute());
				calendar.setTime();
			})
			.action("keyup", ".time .hour", function () {
				calendar.date.hour(this.value);
			})
			.action("keyup", ".time .minute", function () {
				calendar.date.minute(this.value);
			});


		/* Close and containers */
		this.dates = this.holder.find(".dates");
		this.yearView = this.holder.find(".year .value");
		this.monthView = this.holder.find(".month .value");
		this.pickedDateView = this.holder.find(".pickedDate");

		/* Refresh days */
		this.renderDays();

		/* Reposition */
		this.position(field);
		this.setDayPick();

		/* Auto change */
		this.field.on("keyup.calendar", function () {
			show(field, showTime);
		});

		let dateOriginal;
		this.dates.on("touchstart", function (event) {

			let element = $(event.target);
			if (!element.is(".day")) return;
			dateOriginal = calendar.date.clone().date(parseInt(element.html()));

		}).on("touchmove", function (event) {

			/* No original event */
			event.preventDefault();

			let element = document.elementFromPoint((event.clientX || event.originalEvent.touches[0].clientX), (event.clientY || event.originalEvent.touches[0].clientY));
			element = $(element);

			if (!element.is(".day")) return;

			let date = dateOriginal.clone().date(parseInt(element.html()));

			if (date.isBefore(dateOriginal)) {
				calendar.since = date.clone();
				calendar.till = dateOriginal.clone();
			} else {
				calendar.since = dateOriginal.clone();
				calendar.till = date.clone();
			}
			calendar.lastModified = "none";
			calendar.markSelected();
			// $(this).trigger("click");

		});

	}.bind(calendar);

	/* Return */
	this.service = show;

});

sky.onReady(({calendar}) => {

	/* Calendar show */
	$(document).action("click.calendar", function (event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* Remove calendar */
		if (!element.is(".calendar") && !element.parents(".calendar").length)
			$(".calendar").remove();

		/* Calendar show */
		if (element.is("input.date"))
			calendar(element);

		/* Calendar show */
		if (element.is("input.datePeriod"))
			calendar(element, false, true);

		/* Calendar show */
		if (element.is("input.datetime"))
			calendar(element, true);

		/* Calendar show */
		if (element.is("input.datehour"))
			calendar(element, true);

	}).action("keydown.calendar", function (event) {
		if (event.keyCode === 13) {
			let calendars = $(".calendar");
			if (calendars.length) {
				calendars.find(".day.selected").trigger("click");
				event.preventDefault();
			}
		}
	});
});
sky.service("callback", function() {

	/**
	 * Creates callback object that holds functions list
	 * @param {string} [flags]
	 * @returns {*}
	 * @constructor
	 */
	let Callback = function(flags) {

		/* Self construct */
		if(!(this instanceof Callback))
			return new Callback(flags);

		/**
		 * Functions list holder
		 * @type {Array}
		 */
		this.functions = [];
		this.toRun =  0;
		this.context = this;

		/* Self return for next usage */
		return this;

	};

	/**
	 * Base
	 * @type {{functions: Array, toRun: number, context: *, add: add, removeByContext: removeByContext, fire: fire, fireNext: fireNext}}
	 */
	Callback.prototype = {

		/**
		 * Adds new function to stack
		 * @param {Function} func Function to add
		 * @param {Object} context Function context
		 * @param {Object} options Call options
		 */
		add: function(func, context, options) {
			this.functions.push({
				func: func,
				context: context || false,
				once: options && options.once
			});
			return this;
		},

		/**
		 * Removes function from list by context
		 * @param context
		 */
		removeByContext: function(context) {

			/* Find listener */
			$.each(this.functions, function(i, current) {
				if(current.context === context)
					this.functions.splice(i, 1);
			}.bind(this));

			/* Self return */
			return this;

		},

		/**
		 * Fires all functions
		 * @param {Object} context Function context
		 * @param {Array} args Arguments
		 */
		fire: function(context, args) {
			$.each(this.functions, function(_, func) {
				func.func.apply(func.context || context, args);
			});
		},

		/**
		 * Fires next function
		 * @param {Array|Object} args Arguments
		 * @param {Object} context Function context
		 */
		fireNext: function(args, context) {

			/* If no more to run */
			if(this.functions.length <= this.toRun)
				return false;

			/* Set next to run */
			this.toRun++;

			/* Function to run */
			let current = this.functions[this.toRun - 1],
				result,
				func = current.func;

			/* Set context */
			context = current.context || context || window;

			/* Get function in string */
			if(typeof func === "string")
				func = context[func];

			/* If no function found */
			if(!func)
				return true;

			/* Call function */
			result =  func.apply(current.context || context, args) !== false;

			/* If call once */
			if(current.once) {
				this.functions.splice(this.toRun - 2, 1);
				this.toRun--;
			}

			/* Return function result */
			return result;
		}

	};

	this.service = Callback;

});
sky.service("callbacks", function({ callback }) {

	/**
	 *
	 * Callbacks prepared object
	 * @param {*} [flags] Flags list for jQuery.Callbacks
	 * @constructor
	 */
	let Callbacks = function(flags) {

		/* Self construction */
		if(!(this instanceof Callbacks))
			return new Callbacks(flags);

		/* Add properties */
		$.extend(true, this, Callbacks.extend);

		/* Callbacks list */
		this.advancedCallbacks = {};

		/* Set default flags and self context */
		return this.flags(flags);

	};

	/**
	 * Prototype
	 * @type {{on: on, fire: fire, off: off, flags: flags, setContext: setContext}}
	 */
	Callbacks.prototype = {

			/**
			 * Flags for sky.Callback
			 * @param {object} flags Flags list
			 * @returns {*}
			 */
			flags: function(flags) {
				this.callbacksFlags = flags;
				return this;
			},

			/**
			 * Remove by listener
			 * @param {string} name Event name
			 * @param {string} listener Listener object
			 */
			removeListener: function(name, listener) {
				if(this.advancedCallbacks[name]) {
					this.advancedCallbacks[name].removeByContext(listener);
				}
			},

			/**
			 * Adds new event handler
			 * @param {string} 	 name 			Name of event
			 * @param {function|string} func 	Function be called on event fires
			 * @param {object}   [context]		Function options
			 * @param {object}   [options]		Function options
			 */
			on:  function(name, func, context, options) {


				if(name instanceof Object)
					$.each(name, (event, func) => { this.on(event, func) });

				else $.each(this.getEventsNames(name), (_, name) => {

					/* Create callbacks */
					if(!this.advancedCallbacks[name])
						this.advancedCallbacks[name] = callback(this.callbacksFlags);

					/* Add function */
					this.advancedCallbacks[name].add(func, context ? context : self.context, options || {});

				});

				return this;
			},

			/**
			 * Fires callbacks for specified event
			 * @param {string} name Name of event
			 * @param {object} args Arguments to be passed
			 * @param {object} [options] Additional options
			 */
			fire: function(name, args, options) {

				/* Success last */
				let events = this.getEventsNames(name),
					self = this,
					next = false;
					options = options || {};

				/* Remove global if need */
				if(options["noGlobal"])
					events = events.slice(1);

				/* Fire events */
				$.each(events, function(_, event) {

					/* If no callback */
					if(!self.advancedCallbacks[event])
						return;

					/* Run */
					do {
						next = self.advancedCallbacks[event].fireNext(jQuery.extend({ event: event }, args || []), self.context, options.possible);
					} while(next);

					/* Reset */
					if(!options.once)
						self.advancedCallbacks[event].toRun = 0;

				});

			},

			/**
			 * Get all event names from global name
			 * @param {String} name Global event name
			 * @returns {Array}
			 */
			getEventsNames: function(name) {

				/* Get events names */
				let names = name.split(","), events = [];

				/* Go through */
				$.each(names, function(i, name) {

					/* Remove spaces */
					name = name.replace(" ", "");

					/* Get elements */
					let elements = name.split(".");
					events.push(elements[0]);

					/* Go through */
					for(let j = 1; j < elements.length; j++)
						events.push(elements[0] + "." + elements[j]);

					/* Global event */
					if(elements.length > 2)
						events.push(elements.join("."));

				});

				/* Return */
				return events;

			},

			/**
			 * Removes event handlers and functions
			 * @param {string} name Event name
			 */
			off: function(name) {
				delete this.advancedCallbacks[name];
			}

		};

		this.service = Callbacks;

});
sky.service("dataOperator", function ({ inputsIO, notifications, templates, utils, ajax, actions }) {

	class searchField {
		constructor(name, virtual) {
			this.name = name;
			this.inputName = name;
			this.virtual = virtual || false;
			this.default = null;
			this.input = false;
			this.value = null;
		}
		valueOrNullOnDefault() {
			if ((this.default instanceof Array) && (this.value instanceof Array))
				return utils.isObjectsEqual(this.value, this.default) ? null : this.value;

			return this.value === this.default ? null : this.value;
		}
		read() {
			if (this.virtual === "search")
				return this.searchRead();
			else if (this.virtual)
				return this.hashRead();
			else if (this.input)
				this.value = inputsIO.readInputsValues(this.input);

			return this.value;
		}
		write() {
			if (this.input)
				inputsIO.writeInputsValue(this.value === null ? this.default : this.value, this.input);
			return this.value;
		}
		hashRead() {
			let hashValue = page.history.hashObject[this.name];
			return this.value = (typeof hashValue === "undefined") ? this.default : hashValue;
		}
		searchRead () {
			let searchValue = page.history.searchObject[this.name];
			return this.value = (typeof searchValue === "undefined") ? this.default : searchValue;
		}
	}

	/**
	 * Default options
	 * @type {{}}
	 */
	let baseOptions = {
		fields: {},
		historyType: "hash"
	};

	/* Creates new data operator */
	class DataOperator {
		constructor(options) {

			/* Stores last request object */
			this.lastRequestData = false;

			/* Func that calls before request */
			this.beforeRequest = false;
			
			/* Fields list */
			this.fields = {};

			/* Add base options, but only not set, that's why so fun construction */
			this.options = $.extend({}, baseOptions, true);

			/* Options init */
			this.setOptions(options);

		}

		/** Saves to options */
		setOptions(options) {

			/* Back link */
			let self = this;

			/* Set submit handler */
			if (options.form)
				$(options.form).action("submit", this.onFormSubmit.bind(this));

			/* Add to options */
			$.extend(this.options, options, true);

			/* Self return */
			return this;
		}

		/**
		 * On form submit
		 * @param event
		 */
		onFormSubmit(event) {

			/* Prevent */
			event.preventDefault();

			/* If form not valid */
			if (!$(this.options.form).validForm())
				return;

			let options = {force: true};

			if (this.fields["page"])
				options[this.options.historyType === "search" ? "search" : "hash"] = {page: 1};

			/* Update */
			this.reload(options);

		}

		prepareRequest(options) {

			/* On empty */
			options = options || {};

			/* Hash fields */
			if (options["hash"])
				page.history.set(options["hash"]);

			/* Hash fields */
			if (options["search"])
				page.history.search(options["search"]);

			/* Hash fields */
			if (options["virtual"]) {
				if (this.options.historyType === "search")
					page.history.search(options["virtual"]);
				else
					page.history.set(options["virtual"]);
			}

			/* Write to form from hash */
			if (options.fromUrl) {
				if (this.options.historyType === "search")
					this.readSearch().writeForm();
				else
					this.readHash().writeForm();
			}

			/* jQuery wrap */
			if (this.options.form && !$(this.options.form).validForm())
				return false;

			/* Read */
			let data = this.read();

			/* Add additional data */
			if (this.options["requestData"])
				data = $.extend(data, this.options["requestData"]);

			/* Check is same and no force requested */
			if (this.lastRequestData !== false && utils.isObjectsEqual(this.lastRequestData, data) && !options["force"])
				return false;

			/* Set hash data */
			if (!options.fromUrl && this.options.historyType === "search")
				this.writeSearch();
			else if (!options.fromUrl)
				this.writeHash();

			/* Before request call */
			if (this.beforeRequest)
				if (this.beforeRequest(data, options) === false)
					return false;

			/* Return data */
			return data;

		}

		/**
		 * Reloads data according to params
		 * @param options
		 * @returns {DataOperator}
		 */
		reload(options) {

			/* Prepare */
			let data = this.prepareRequest(options);

			/* Reload */
			if (data)
				this.request(data);

			/* Self return */
			return this;

		}

		/**
		 * Performs request to reload data
		 * @param data
		 */
		request(data) {

			/* Back link */
			let self = this;

			/* Save last data */
			self.lastRequestData = data;

			/* Stop old request */
			if (this.ajax)
				this.ajax.stop();

			/* Request */
			this.ajax = ajax(this.options.url, data)
				.on("success", function (response) {
					self.lastResponse = response;
					self.render(response, data);
				})
				.on("error", function (error) {
					self.error(error)
				})
				.on("always", function () {
					self.ajax = false;
				});

			/* Create loading, auto remove when ajax finishes */
			notifications.loading(this.ajax).reloadContent(this.options.holder);

		}

		/**
		 * On success, have to be overloaded
		 * @param data
		 * @param request
		 */
		render(data, request) {}

		/**
		 * On error, have to be overloaded
		 * @param error
		 */
		error(error) {}

		/**
		 * Adds list of fields to current list
		 * @param {Array} list List of names
		 * @param {Boolean} [virtual] Virtual fields flag
		 */
		fieldsList(list, virtual) {

			/* Back link */
			let self = this;

			/* Go through and push */
			$.each(list, function (_, item) {
				self.options.fields[item] = virtual;
			});

			/* Self return */
			return this;
			
		}

		/**
		 * Sets form fields
		 * @param list
		 * @returns {*}
		 */
		realFieldsList(list) {
			return this.fieldsList(list);
		}

		/**
		 * Set none forms fields
		 * @param list
		 * @returns {*}
		 */
		virtualFieldsList(list) {
			return this.fieldsList(list, true);
		}

		/**
		 * Reads real fields
		 * @returns {{}}
		 */
		readReal() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				if (field.virtual)
					return;

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;

		}

		/** Reads form to fields */
		read() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;
		}

		/** Write current field to form */
		writeForm() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.write();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readHash() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.hashRead();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readSearch() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.searchRead();
			});

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeHash() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.set(write);

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeSearch() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.search(write);

			/* Self return */
			return this;

		}

		/** Finds inputs associated with fields */
		initInputs() {

			/* Back link */
			let self = this;

			$.each(this.options.fields, function (fieldName, virtual) {

				// Create search field
				let field = new searchField(fieldName, virtual ? self.options.historyType : false);

				/** @let field searchField */
				if (!field.virtual) {

					/* Find input */
					if (field.name[0] === "*") {
						field.name = field.name.substring(1);
						field.input = $(self.options.form).find(".selectReplaceChoose[input=" + field.name + "]");
					}
					else
						field.input = $(self.options.form).find('[name="' + field.name + '"]');

					/* Remove fields without input */
					if (!field.input || !field.input.length) {
						delete self.fields[fieldName];
						return;
					}

					/* Save */
					self.fields[fieldName] = field;

					/* Read default */
					field.default = field.read();
					field.value = null;
				} else {
					if (self.options.historyType === "search")
						field.virtual = "search";
					self.fields[fieldName] = field;
				}
			});

			/* Self return */
			return this;
		}
	};

	/* Interface */
	this.service = {
		initOperator: options => new DataOperator(options),
		searchField: searchField,
		initLoader: function (loader, notifications, pagination, { reload = true, history = true }) {

			/* Add count */
			loader.beforeRequest = function (data, options) {
				if (!this.lastRequestData || options.force)
					data["count"] = true;
			};

			/* Render function */
			loader.render = function (response) {

				// Re render
				$(this.options.holder).html('').append(
					templates.render("page-result-render", response)
				);

				// Remove old
				if (this.pagination)
					this.pagination = this.pagination.remove();

				if (typeof response.pages !== "undefined") {

					// Pages holder
					let holder = $("#pages").html('');

					// Create new
					if (response.pages > 1 && pagination) {
						this.pagination = pagination.add({
							pages: response.pages,
							current: response.page,
							holder: holder
						});
						this.pagination.onPageChange = function (pageNum) {
							loader.reload({virtual: {page: pageNum}});
						}
					}
				}

			};

			/* On loading error */
			loader.error = function (error) {

				// Remove pagination on error
				if (this.pagination)
					this.pagination = this.pagination.remove();

				// Clear
				$(this.options.holder).html('').append(notifications.message({text: error}).render);
			};

			/* Reload */
			if (reload)
				loader.reload({fromUrl: true});

			/* Set handler */
			if (history)
				page.history.on("change", function (searchChanged, hashChanged) {
					if (searchChanged || hashChanged)
						loader.reload({fromUrl: true});
				});

		}
	}

});
sky.service("directives", function ({exceptions}) {

	let list = {},
		directives = this.service = {

			/**
			 * Adds new directive
			 * @param {string} name Directive name
			 * @param {*} options Directive options
			 * @param {function} directive How to parse directive
			 */
			add: function (name, options, directive) {

				/* Reset */
				if (!directive && typeof options === "function") {
					directive = options;
					options = {};
				}
				options.directive = directive;
				options.selector = name;

				/* Save */
				list[name] = options;

				/* Self return*/
				return this;

			},

			/**
			 * Get element attributes
			 * @param element
			 * @returns {{}}
			 */
			getAttributes: function (element) {

				/* Holds attributes */
				let attributes = {};

				/* Copy them to list */
				$.each(element.get(0).attributes, function (_, attr) {
					attributes[attr.nodeName] = attr.nodeValue;
				});

				/* Return */
				return attributes;

			},

			/**
			 * Applies directive convert to element
			 * @param element
			 * @param options
			 */
			parseElement: function (element, options) {

				/* Get element */
				element = $(element);

				/* Get element attributes */
				let attributes = this.getAttributes(element);

				/* Parse body for jason data */
				if (options["json"] || options["jsonToData"]) {

					/* Get child */
					let jsonScript = element.children('script[type="application/json"]');

					/* If we have json encoded data */
					if (jsonScript.length) {

						try {

							/* Parse json */
							let json = JSON.parse(jsonScript.text());

							/* Extend */
							$.extend(attributes, json);

							/* Save to data */
							if (options["jsonToData"])
								element.data("json", json);

						} catch (e) {
							throw new exceptions.system.Error("Element " + options.selector + " should have json stored content, but error on parse appears");
						}
					}
				}

				/* Call parse function */
				if (typeof options.directive === "function")
					options.directive(element, attributes);
			},

			/**
			 * Searches and replaces directives in element
			 * @param element
			 */
			parse: function (element) {
				$.each(list, function (tag, options) {
					$(tag, element).each(function () {
						directives.parseElement(this, options);
					});
					if (element.is(tag))
						directives.parseElement(element, options);
				});
			}


		};

	/* Add jQuery fn */
	jQuery.fn.parseDirectives = function () {

		/* Parse */
		directives.parse(this);

		/* Return */
		return this;

	};

	/* Parse body for directives when all ready */
	sky.onReady(function () {
		$("body").parseDirectives();
	});

});
sky.service("history", function ({ callbacks, supported }) {


	/**
	 * Get difference fields in objects
	 * @param {object} first  Object to compare
	 * @param {object} second Object to compare
	 */
    let getObjectsDifference = function (first, second) {

		let difference = {},
		    localDiff = false;

        /* If both arrays or objects */
		if ((first instanceof Array && second instanceof Array) || (first instanceof Object && second instanceof Object)) {

            /* Find what was changed or deleted in second */
			$.each(first, function (key, value) {

                /* If no such elements in second */
				if (typeof second[key] === "undefined")
					difference[key] = null; // Set to null

                /* Check if different */
				else if (localDiff = getObjectsDifference(value, second[key])) {
					difference[key] = localDiff;
				}

			});

            /* If was added */
			$.each(second, function (key, value) {
				if (typeof first[key] === "undefined")
					difference[key] = value;
			});

            /* Convert object to array */
			if (first instanceof Array) {
				let returnArray = [];
				$.each(difference, function (key) {
					returnArray.push(difference[key]);
				});
				difference = returnArray;
			}

		} else {
			if (first !== second) return second;
			else return false;
		}

        /* No array difference */
		if (difference.length === 0) return false;
		else return difference;

	};

    /**
     * History constructor
     * @param [options]
     * @returns {sky.History}
     * @constructor
     */
    sky.History = function (options) {

		/* Self creation */
        if (!(this instanceof sky.History))
            return new sky.History(options);

		/* Reset */
        this.options = options || {};

		/* Set events */
        this.events = this.options.events || new callbacks();
        this.options.events = this.events;

		/* Self return */
        return this;

    };

    /**
     * Extending
     */
    $.extend(sky.History.prototype, {

        /**
         * Stores last saved hash
         */
        hashString: "",

        /**
         * Stores last saved search
         */
        searchString: "",

        /**
         * Stores last saved path
         */
        pathString: "",

        /**
         * Stores object with hash params key/value pairs
         */
        hashObject: {},

        /**
         * Stores object with page search params key/value pairs
         */
        searchObject: {},

        /**
         * Stores events
         */
        events: undefined,

        /**
         * Holds hash check function interval id
         */
        intervalId: 0,

        /**
         * This page base url
         */
        base: "",

        /**
         * Changes current path to specified
         * @param {string} path PAth to navigate
         */
        navigate: function (path) {

            // Get path
            path = path.replace("~", this.base);

            // Get current
            let current = (window.location.pathname + window.location.search).substr(this.base.length);

            // If changes
            if (current !== path) {

                // Set new state
                history.pushState({ oldPath: this.pathString, newPath: path, search: this.searchObject}, path, path);

                // Get new
                this.pathString = window.location.pathname.substr(this.base.length);

                // Get search string
                this.searchString = this.getWindowSearch();

                // Fire event
                this.events.fire("navigate.path, always", {hash: this.hashObject, path: this.pathString, search: this.searchObject});

            }
        },

        /**
         * Fires on path change
         */
        change: function () {

			/* Hash difference holder */
            let hashDifference = {},
                searchDifference = {},
                old = this.pathString,
                hashChanged = false,
                searchChanged = false;

			/* If api supported */
            if (this.supported)
                this.pathString = window.location.pathname.substr(this.base.length);

			/* Check if hash changed */
            if (this.hashString !== this.getWindowHash()) {

				/* Get difference */
                hashDifference = this.getDifference(this.getWindowHash(), this.hashObject);

				/* Hash change flag */
                hashChanged = true;

            }

			/* Check if params changed */
            if (this.searchString !== this.getWindowSearch()) {

				/* Get difference */
                searchDifference = this.getDifference(this.getWindowSearch(), this.searchObject);

				/* Hash change flag */
                searchChanged = true;

            }

			/* If nothing changed */
            if (this.pathString === old && !hashChanged && !searchChanged)
                return;

			/* Rebuild hash object on new hash str */
            this.rebuild();

			/* Fire */
            this.events.fire("change, always", {
                hash: this.hashObject,
                hashDifference: hashDifference,
                searchDifference: searchDifference,
                path: this.pathString,
                oldPath: old,
                searchChanged: searchChanged,
                hashChanged: hashChanged,
                pathChanged: old !== this.pathString
            });

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setHash: function (path) {

			/* To not jump top */
            if (path === "" && window.location.hash !== "")
                path = "none";

			/* Save */
            this.hashString = path;

			/* Set hash */
            window.location.hash = encodeURI(path);//encodeURI(path);

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setSearch: function (path) {

			/* Set path */
            this.navigate(window.location.pathname + encodeURI(path !== "" ? "?" + path : ""));

        },

        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        set: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.hashObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, (key, value) => {

				/* If we need delete */
                if (value === null)
                    delete this.hashObject[key];
                else
                    this.hashObject[key] = value;

				/* Set as changed */
                changed = true;

            });

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setHash(decodeURIComponent(jQuery.param(this.hashObject).replace(/\+/g, " ")));

			/* Fire */
            this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },


        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        search: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.searchObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, $.proxy(function (key, value) {

				/* If we need delete */
                if (value === null)
                    delete this.searchObject[key];
                else
                    this.searchObject[key] = value;

				/* Set as changed */
                changed = true;

            }, this));

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setSearch(decodeURIComponent(jQuery.param(this.searchObject).replace(/\+/g, " ")));

			/* Fire */
			this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },

        /**
         * Makes hash from object
         * @param obj
         * @returns {*|void|string|XML}
         */
        stringFromObject: function (obj) {
            return jQuery.param(obj).replace(/\+/g, " ");
        },

        /**
         * Get objects according to hash string
         * @param {string} paramsString String which contains key=value pairs, would be parsed to object
         */
        getObjects: function (paramsString) {

            let objects = {};

			/* Remove sharp */
            if (paramsString.substr(0, 1) === '#' || paramsString.substr(0, 1) === '?')
                paramsString = paramsString.slice(1, paramsString.length);

			/* Split parameters */
            let subStrings = paramsString.split("&");

			/* Get params */
            $.each(subStrings, function (i, str) {

                let keyAndValue = str.split("=", 2);

				/* If no assign */
                if (keyAndValue.length < 2)
                    return;

                let name = keyAndValue[0];

				/* Truncate brackets */
                if (name.substr(-2) === "[]")
                    name = name.substr(0, name.length - 2);

				/* Special hash for "=" in value  */
                keyAndValue[1] = str.substr(keyAndValue[0].length + 1);

				/* If object repeats we create array */
                if (typeof objects[name] === "undefined") objects[name] = keyAndValue[1];
                else {
                    if (!(objects[name] instanceof Array)) objects[name] = [objects[name]];
                    objects[name].push(keyAndValue[1]);
                }
            });

            return objects;

        },

        /**
         * Finds difference between current stored hash and parameter
         * @returns {*}
         */
        getDifference: function (string, stored) {

			/* Init */
            let objects = this.getObjects(decodeURI(string));
            return getObjectsDifference(stored, objects);

        },

        /**
         * Rebuilds stored hash parameters according to current one
         */
        rebuild: function () {
            this.hashString = this.getWindowHash();
            this.hashObject = this.getObjects(this.hashString);
            this.searchString = this.getWindowSearch();
            this.searchObject = this.getObjects(this.searchString);
            this.pathString = window.location.pathname;
            return this;

        },

        /**
         * Gets current window hash without "#"
         * @returns {string}
         */
        getWindowHash: function () {

			/* Get decoded hash */
            let hash = decodeURI(window.location.hash);

			/* Remove sharp */
            if (hash.substr(0, 1) === '#')
                hash = hash.slice(1);

			/* Return */
            return hash;

        },

        /**
         * Gets current window parameters without "?"
         * @returns {string}
         */
        getWindowSearch: function () {

			/* Get decoded hash */
            let search = decodeURI(window.location.search);

			/* Remove question */
            if (search.substr(0, 1) === '?')
                search = search.slice(1);

			/* Return */
            return search;

        },

        /**
         * Set interval execution
         */
        start: function () {

            /* Set base if any */
			if (this.options.base)
				this.base = this.options.base;

			/* If supported history */
            if (window.history)
                window.onpopstate = this.change.bind(this);

            /* Timeout */
            if (!this.intervalId)
                this.intervalId = setInterval(this.change.bind(this), this.options.time || 500);

			/* Immediately event */
            this.change();
            return this;
        }

    });

});
sky.service("inputsIO", function () {

	this.service = {

		/**
		 * Get value of single input
		 * @param input
		 * @returns {*}
		 */
		readInputValue: function (input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// Read
				let data = this.readInputsValues(inputs);

				// If all checked
				if (data.length === inputs.length)
					return true;

				// Return data
				return data;

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.is(":checked") ? input.val() : false;
			} else
				return input.val() === "" ? false : input.val();


		},

		/**
		 * Get value of multiple inputs
		 * @param inputs
		 * @returns {*}
		 */
		readInputsValues: function (inputs) {

			/* If single input */
			if (inputs.length === 1)
				return this.readInputValue(inputs);

			/* Values holder */
			let valuesNamed = [],
				valuesLined = [],
				self = this;

			/* Go through */
			inputs.each(function () {

				/* Get value */
				let input = $(this),
					value = self.readInputValue(input);

				/* If we get values */
				if (value !== false) {
					valuesNamed.push({name: input.attr("name"), value: value});
					valuesLined.push(value);
				}

			});

			/* Single */
			if (valuesLined.length === 1) {
				return valuesLined[0];
			}

			/* Return */
			return valuesLined.length ? valuesLined : false;

		},

		/**
		 * Write single input value
		 * @param value
		 * @param input
		 * @returns {*}
		 */
		writeInputValue: function (value, input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// If all checked
				if (value === true)
					inputs.prop("checked", true);
				else
					this.writeInputsValue(value, inputs);

				if (inputs.length)
					inputs.first().trigger("change", {notByUser: true});

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.prop("checked", value !== false);
			} else
				return input.val(value === false ? "" : value);
		},

		/**
		 * Write multiple inputs value
		 * @param values
		 * @param inputs
		 * @returns {*}
		 */
		writeInputsValue: function (values, inputs) {

			/* Write single */
			if (inputs.length < 2)
				return this.writeInputValue(values, inputs);

			/* Multiple */
			if (inputs.is(":checkbox") || inputs.is(":radio")) {
				inputs.prop("checked", false);
				if (values instanceof Array) {
					$.each(values, function (_, val) {
						inputs.filter('[value="' + val + '"]').prop("checked", true);
					});
					inputs.first().trigger("change", {notByUser: true});
				} else {
					if (values === false || values === true)
						inputs.prop("checked", values).first().trigger("change", {notByUser: true});
					else
						inputs.filter('[value="' + values + '"]').prop("checked", true).trigger("change", {notByUser: true});
				}
			} else {
				inputs.val(values);
			}
		}

	}

});
sky.service("localStorage", function({ callbacks }) {

	/**
	 * Local storage class
	 * @param {Object} options Creation options
	 * @param {sky.Callbacks} [events] Events handler
	 * @returns {*}
	 * @constructor
	 */
	let LocalStorage = this.service = function(options, events) {

		/* If already */
		if(options instanceof LocalStorage)
			return options;

		/* Self creating if not in constructor */
		if(!(this instanceof LocalStorage))
			return new LocalStorage(options, events);

		/* Options */
		options = options || {};

		/* Set default name */
		if(!options.name)
			options.name = "global";

		/* Set prefix */
		if(!options.prefix)
			options.prefix = options.name;

		/* Set full name */
		this.fullName = ["sky", options.name].join("-");

		/* Stored item prefix */
		this.itemPrefix = ["sky", options.prefix].join("-");

		/* Get events */
		this.events = events || new callbacks();

		/* Ids list */
		this.ids = false;

		/* Return */
		return this;

	};

	/**
	 * Extending
	 */
	$.extend(LocalStorage.prototype, {

		/**
		 * Loads item form database
		 * @param {*} id Unique id
		 * @param {function} [onLoad] Calls when load complete
		 */
		load: function(id, onLoad) {

			/* Try to get item from storage */
			let item = localStorage.getItem([this.itemPrefix, id].join("-"));

			/* Trigger error */
			if(item === null)
				this.events.fire("load.error", { id: id, storage: this });

			/* Call function */
			if(onLoad)
				onLoad(item ? $.parseJSON(item) : undefined);

			/* Return */
			return item ? $.parseJSON(item) : undefined;

		},

		/**
		 * Get all ids from database
		 * @returns {*}
		 */
		getIds: function() {

			/* If already stored */
			if(this.ids instanceof Array)
				return this.ids;

			/* Gets ids list by key */
			let itemsIds = localStorage.getItem(this.fullName), self = this;

			/* SAve and return */
			itemsIds = itemsIds ? itemsIds.split(", ") : [];
			this.ids = [];

			/* remove duplicates */
			$.each(itemsIds, function(_, id) {
				if(self.ids.indexOf(id) < 0)
					self.ids.push(id);
			});

			/* return */
			return this.ids;

		},

		/**
		 * Loads all element from storage
		 * @param onLoad
		 */
		loadAll: function(onLoad) {

			/* Item holder */
			let self = this, items = {};

			/* Go through items */
			$.each(this.getIds(), function(_, id) {

				/* Get item */
				self.load(id, function(item) {

					/* Add parsed */
					if(item) items[id] = item;
					else delete self.ids[id];

				});

			});

			/* Trigger error */
			if(!self.ids.length)
				this.events.fire("empty", { storage: this });

			/* Return */
			onLoad.call(this, items);

		},

		/**
		 * Save data to storage
		 * @param id
		 * @param data
		 * @returns {*}
		 */
		save: function(id, data) {

			try {

				/* Save item */
				localStorage.setItem([this.itemPrefix, id].join("-"), JSON.stringify(data));

				/* Get ids */
				let ids = this.getIds();

				/* Save id */
				if(ids.indexOf(id) < 0)
					ids.push(id);

				/* Save keys */
				localStorage.setItem(this.fullName, ids.join(", "));

				/* Trigger event */
				this.events.fire("save.success", { storage: this, data: data, id: id });

			} catch(e) {
				console.log(e);
			}

			/* Self return */
			return this;

		},

		/**
		 * Saves all
		 * @param index
		 * @param models
		 * @returns {*}
		 */
		saveAll: function(index, models) {
			let self = this;

			/* Go through */
			$.each(models, function() {
				self.save(this.attr(index), this.attributes);
			});

			return this;
		},

		/**
		 * Removes from storage
		 * @param id
		 * @returns {*}
		 */
		remove: function(id) {

			/* Init */
			let index,
				ids = this.getIds(); // Get ids

			/* Remove item */
			localStorage.removeItem([this.itemPrefix, id].join("-"));

			/* Remove from list */
			if((index = ids.indexOf(id)) > -1) {

				/* Remove id */
				ids.splice(index, 1);

				/* Save keys */
				localStorage.setItem(this.fullName, ids.join(", "));

				/* Trigger event */
				this.events.fire("success.remove", { storage: this, id: id });

			}
			/* If no id */
			else
				this.events.fire("remove.error", { storage: this, id: id });


			/* Self return */
			return this;

		}
	});

});
/**
 * For work with different type of notifications
 */
sky.service("notifications", function({ stackList, callbacks, visibleCalculator, templates, windows, tips }) {

	let notification = function(options) {
		/* Self creation */
		if(!(this instanceof notification))
			return new notification(options);

		this.render = templates.render("forms-notification", options);
	};
	let message = function(options) {

		/* Self creation */
		if(!(this instanceof message))
			return new message(options);

		this.render = templates.render("forms-message", options);
	};

	message.prototype = {
		modal: function() {
			return windows.Modal(this.render);
		},

		/**
		 * Append to holder of modal window
		 * @param {object} modal
		 */
		appendToModal: function(modal) {
			modal.holder.append(this.render);
		},

		tip: function(object, align) {
			tips.Tip(object, { create: this.render, close: 5 }).show(align || "top",);
		}
	};

	let loadings = stackList();

	/**
	 * Loading
	 */
	let loading = function(ajax, global = true) {

		/* Self creation */
        if(!(this instanceof loading))
            return new loading(ajax, global);

		/* Back link */
		this.global = global;

		/* Render */
		this.render = $('<div><div></div></div>').addClass("ajaxLoading");

		/* Global insert */
		if(this.global)
			this.render.addClass("fixed").appendTo("body");

		/* If stop possible */
		if(ajax) {
			$("<span/>").appendTo(this.render.addClass("cancelable")).click(function() { ajax.stop(); });
			ajax.on("always", () => { this.hide(); });
		}

		/* Callbacks */
		this.callbacks = callbacks();

		/* List save */
		loadings.add(this);

	};

	/**
	 * Prototype
	 * @type {{render: null, hide: hide}}
	 */
	loading.prototype = {

		/**
		 * Loads loading in modal window
		 * @param {object} modal Window
		 */
		inModalWindow: function(modal) {

			/* Hide */
			let content = modal.holder.children().hide();

			/* Insert */
			this.render.appendTo(modal.holder);

			/* Restore on hide */
			this.callbacks.on("hide", () => content.show());

		},

		/**
		 *
		 * @param contentHolder
		 */
		reloadContent: function(contentHolder) {

			/* If no holder */
			if(!this.holder.length)
				return;

			/* Safe */
			this.holder = contentHolder = $(contentHolder).addClass("withLoading");

			/* Get children */
			let content = contentHolder.children();

			/* Different content disable */
			if(this.global) {

				content.disable();

				/* Make sizes calculator */
				this.calc = visibleCalculator(contentHolder, this.render.outerHeight(), "body");

				/* Set position func */
				this.setPosition = function() {
					let position = this.calc.calculate();
					this.render.css({
						left: position.left + (position.width) / 2,
						top: position.top + (position.height) / 2
					})
				};
				this.setPosition();

				/* Re enable */
				this.callbacks.on("hide", () => {
					content.enable();
					$(window).off("scroll.notification");
				});

				$(window).on("scroll.notification", () => { this.setPosition();	});

			} else {

				/*  Hide */
				content.hide();

				/* Insert */
				this.render.appendTo(this.holder);

				/* Re enable */
				this.callbacks.on("hide", function() {
					content.show();
				});
			}

			return this;

		},

		setHolder: function(holder) {

			/* Append and save */
			this.holder = $(holder).addClass("withLoading").append(this.render);

			/* Self return */
			return this;

		},

		/**
		 * Hides current loading
		 */
		hide: function() {

			if(this.holder)
				this.holder.removeClass("withLoading");

			this.render.remove();
			this.callbacks.fire("hide");

			/* Remove from list */
			loadings.remove(this);

		}
	};

	return {
		loading: loading,
		message: message,
		reCalculate: function() {
			loadings.each(function(instance) {
				instance.calc.init();
				instance.setPosition();
			})
		}
	}

});
sky.services.add("pagination", function({ templates, stackList }) {

	let list = stackList();

	class Pagination {
		constructor({ pages, holder, current = 1, }) {

			/* Self creation */
			if(!(this instanceof Pagination))
				return new Pagination({ pages, holder, current });

			/* Save */
			list.add(this);

			/* Set total pages */
			this.pages 		= pages;
			this.current 	= current;
			this.pageWidth	= 50;
			this.id 		= last;

			/* No pages needed */
			if(this.pages < 2)
				return this;

			/* Counted params */
			this.dimensions = {
				startPage      : 1,
				lastStartPage  : 0,
				pagesVisible   : 0,
				pagesInvisible : 0,
				scrollAvailable: 0,
				scrollStart	   : 0,
				tumbler		   : 10
			};

			/* Render */
			this.dom = {};
			this.dom.holder  = templates.render("pagination", {}).data("pagination", this);
			this.dom.slider  = this.dom.holder.find(".pages");
			this.dom.pages   = this.dom.slider.children();
			this.dom.back 	 = this.dom.holder.children(".left");
			this.dom.forward = this.dom.holder.children(".right");

			/* Insert */
			if(holder)
				this.dom.holder.appendTo(holder);

			/* If bigger than 10000 */
			if(this.pages > 9999) {
				this.dom.slider.addClass("tenthousand");
				this.pageWidth = 80;
			}
			/* If bigger than 1000 */
			else if(this.pages > 999) {
				this.dom.slider.addClass("thousand");
				this.pageWidth = 70;
			}
			/* If bigger 100 */
			else if(this.pages > 99 ) {
				this.dom.slider.addClass("hundred");
				this.pageWidth = 60;
			}

			/* Make all */
			this.redraw();

			/* Mark page */
			this.goToPage(this.current);

			/* Self return */
			return this;

		}

		/** */
		onPageChange(newPage) {}

		/** Removes navigator */
		remove() {
			this.dom.holder.remove();
			list.remove(this);
		}

		/**
		 * Redraws pagination
		 */
		redraw() {

            /* No action on invisible */
            if(!this.dom.holder.is(":visible"))
                return;

			/* Reset width */
			this.dom.slider.css("width", "auto");

			/* Count visible sizes */
			this.dimensions.pagesVisible = Math.floor((this.dom.holder.innerWidth() - 100) / this.pageWidth);

			/* Count invisible */
			this.dimensions.pagesInvisible = (this.pages - this.dimensions.pagesVisible) > 0 ? this.pages - this.dimensions.pagesVisible : 0;

			/* Count last start */
			this.dimensions.lastStartPage = this.dimensions.pagesInvisible + 1;

			/* Get max pages */
			let toShow = this.dimensions.pagesVisible > this.pages ? this.pages : this.dimensions.pagesVisible;

			/* Crop */
			this.dom.slider.css("width", toShow * this.pageWidth);

			/* Redraw pages */
			this.drawPages(this.dimensions.startPage);

			/* Try to create scroll */
			this.createScroll();

			/* Set scroll position */
			if(this.dom.scrollLine)
				this.dom.runner.css("left", this.calculate().scroll);

		}

		/**
		 * Create scroll line if needed
		 */
		createScroll() {

			/* If no scroll needed */
			if(this.pages <= this.dimensions.pagesVisible) {
				if(this.dom.scrollLine) {
					this.dom.scrollLine.remove();
					this.dom.scrollLine = false;
				}
				return;
			} else if(!this.dom.scrollLine) {

				/* Create scroll */
				this.dom.scrollLine = templates.render("pagination-scroll", {}).appendTo(this.dom.slider);
				this.dom.runner = this.dom.scrollLine.children();
			}

			/* Count left */
			this.dimensions.scrollStart = this.dom.scrollLine.position().left + 2;

			/* Count scroll line width */
			this.dimensions.scrollAvailable = this.dom.scrollLine.outerWidth() - this.dom.scrollLine.children().outerWidth() - 4;
		
		}

		/**
		 * Calculates related coordinates between scroll and move part
		 */
		calculate(position) {

			/* Get position */
			if(position === undefined)
				position = this.dom.runner.offset().left  - this.dimensions.scrollStart;

			/* Remove start */
			position = position - this.dimensions.scrollStart;

			/* Correct */
			position = position > 0 ? position : 0;

			/* Count pages */
			return {
				pages : Math.floor(this.dimensions.pagesInvisible * (position / this.dimensions.scrollAvailable)) + 1,
				scroll: Math.floor(this.dimensions.scrollAvailable * (this.dimensions.startPage - 1)/ this.dimensions.pagesInvisible + this.dimensions.scrollStart)
			}

		}

		/**
		 * Draws pages according to start
		 * @param {int} start Page to start from
		 */
		drawPages(start) {

			/* Remove old pages */
			this.dom.pages.html("");

			/* Correct */
			if(start > this.dimensions.pagesInvisible)
				start = this.dimensions.pagesInvisible + 1;

			/* Correct */
			if(start < 1)
				start = 1;

			/* Start position */
			let i = start;

			/* Draw pages */
			while(i <= this.pages && i < start + this.dimensions.pagesVisible) {
				templates.render("pagination-page", { page: i, current: this.current }).appendTo(this.dom.pages);
				i++;
			}

			/* Reset start page */
			this.dimensions.startPage = start;


		}

		/**
		 * Sets page as active
		 * @param {int} page Page number
		 * @returns {Pagination}
		 */
		goToPage(page) {

			/* If no pages */
			if(this.pages < 2)
				return this;

			/* Parse */
			page = parseInt(page);

			/* Correct */
			if(page < 1)
				page = 1;
			else if(page > this.pages)
				page = this.pages;

			/* Checks if page is visible */
			let isVisible = this.dimensions.startPage <= page && page < this.dimensions.startPage + this.dimensions.pagesVisible;

			/* Redraws if needed */
			if(!isVisible) {
				this.drawPages(page);
				if(this.dom.scrollLine)
					this.dom.runner.css("left", this.calculate().scroll);
			}

			/* Make active */
			this.dom.pages.children().removeClass("active").filter("[page=" + page +"]").addClass("active");

			/* Forward buttons disable */
			if(page > 1) this.dom.back.enable();
			else this.dom.back.disable();

			/* Backward button disable */
			if(page === this.pages) this.dom.forward.disable();
			else this.dom.forward.enable();

			/* Callback */
			if(this.current !== page)
				this.onPageChange(page);

			/* Save page state */
			this.current = page;

			/* Self return */
			return this;

		}

		/** Set scroll */
		scroll(event) {

			let pos = event.pageX - 10;
			if(this.dimensions.scrollStart > pos)
				pos = this.dimensions.scrollStart;
			if(this.dimensions.scrollStart + this.dimensions.scrollAvailable < pos)
				pos = this.dimensions.scrollStart + this.dimensions.scrollAvailable;

			this.dom.runner.css({left: pos});
			this.drawPages(this.calculate(pos).pages);

		}

	}

	/* Bind windows events */
	$(window).on("resize", function() {
		list.each(() => { this.redraw(); });
	});

	/* Return */
	this.service = {
		add: function(options) {
			return new Pagination(options);
		}
	}

});
sky.service("stackList", function() {
	let List = this.service = function() {

		if(!(this instanceof List))
			return new List();

		let elements = {};
		let lastId = 0;
		let total = 0;

		this.last = function() {

			/* Holder */
			let last = false;

			/* Apply for windows */
			$.each(elements, function (_, element) { last = element });

			/* Return */
			return last;

		};

		this.add = function(element) {
			lastId++;
			total++;
			element[lastId] = element;
		};

		this.remove = function(element) {
			/* Apply for windows */
			$.each(elements, function (index, current) {
				if(element === current) {
					delete elements[index];
					total--;
				}
			});
		};

		this.total = function() {
			return total;
		};

		this.elements = function() {
			return elements;
		};

		this.each = function(callback) {
			for(let single of elements)
				callback.apply(single, single);
		};

	}
});
sky.onReady(({suggester}) => {
	$(document).on("click", function(event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* If click in replace we should not hide it */
		if(element.is("[type=submit]") || element.closest(".suggester").length || element.data("suggester"))
			return;

		/* Hide all */
		suggester.hide();

	});
});

sky.service("suggester", function({templates}) {

	let render,
		object,
		lastList,
		suggester = this.service = {
			hide: function() {

				if(render) {
					render.remove();
					render = false;
				}
				if(object) {
					object.removeData("suggester");
					object = false;
				}
				$(document).off("keyup.suggester, keydown.suggester");
			},
			show: function(input, list) {

				/* Hide previous */
				suggester.hide();

				/* Save */
				lastList = list;
				render = templates.render("suggester", {items: list}).insertAfter(input.closest("label, .label"));
				object = input.data("suggester", render);

				/* Get positions */
				let elementPosition = input.offset(),
					renderPosition = render.offset();

				/* Show */
				render.css({
					"margin-left": elementPosition.left - renderPosition.left,
					"margin-top": elementPosition.top - renderPosition.top + input.outerHeight()
				});

				/* Add handlers */
				let children = render.children().on("click", function() {
					input.val($(this).html());
					suggester.hide();
					if(lastList[$(this).attr("data-index")].callback)
						lastList[$(this).attr("data-index")].callback();
				});

				$(document).on("keyup.suggester", function(event) {

					if(event.keyCode === 38 || event.keyCode === 40) {

						let selected = children.filter(".selected");
						children.removeClass("selected");

						// Up
						if(event.keyCode === 38) {
							if(!selected.length || !selected.prev().length)
								children.last().addClass("selected");
							else
								selected.prev().addClass("selected");
						}
						// Down
						if(event.keyCode === 40) {
							children.removeClass("selected");
							if(!selected.length || !selected.next().length) {
								children.first().addClass("selected")
							} else {
								selected.next().addClass("selected");
							}
						}
					}
					// Esc
					if(event.keyCode === 27) suggester.hide();


				}).on("keydown.suggester", function(event) {

					// Enter
					if(event.keyCode !== 13) return;

					let selected = children.filter(".selected");
					if(selected.length) {
						selected.trigger("click");
						event.preventDefault();
					} else {
						suggester.hide();
					}

				});
			}
		};
});
/**
 * Module to work with user services
 */
sky.service("supported", function () {
	try {
		this.service.fullScreen = typeof document["webkitIsFullScreen"] !== "undefined";
		this.service.formData = window.FormData && true;
		this.service.XHRIsSupported = XHRIsSupported;
		this.service.XHRUpload = (typeof new XMLHttpRequest().upload !== "undefined");
		this.service.localStorage = !!window.localStorage;
	} catch (e) {}
});
sky.service("templates", function({ localStorage, supported, directives, exceptions }) {

	
	let templatesList = {},
		templatesCompiled = {},
		Templates = this.service = {

		/** Globals list */
		globals : {},

		/** Local storage support */
		storage: supported.storage ? localStorage({ name: "jsTemplates" }) : false,

		/**
		 * Adds new template to list
		 * @param options
		 */
		add: function(options) {
			templatesList[options.name] = options.template;
			if(this.storage) {
				this.storage.save(options.name, templatesList[options.name]);
				//$.cookie("storedTemplates-" + options.name, options.date);
			}
		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderWithHolder: function(name, data, noDirectives) {

			/* Compile template */
			this.compile(name);

			/* Add globals */
			data = jQuery.extend(true, {}, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(templatesCompiled[name].render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp;

		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		render: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).children();

		},

		/**
		 * Renders specified template and returns text
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderToText: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).html();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {XMLList|*}
		 */
		renderByText: function(text, data, noDirectives) {

			/* Add globals */
			data = jQuery.extend(true, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(twig({ data: text }).render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp.children();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param noDirectives
		 * @returns {XMLList|*}
		 */
		renderByTextToText: function(text, data, noDirectives)  {
			return $('<div/>').append(this.renderByText(text, data, noDirectives)).html();
		},

		/**
		 * Compiles specified template
		 * @param {string} name Template name
		 */
		compile: function(name) {

			/* If already compiled */
			if(templatesCompiled[name])
				return;

			/* Load */
			this.load(name);

			/* Compile */
			let compiled = twig({ id: name, data: templatesList[name] });

			/* Check */
			if(!compiled)
				throw new exceptions.system.Error('Error during compiling template "' + name + '"');

			/* Save */
			templatesCompiled[name] = compiled;

		},

		/**
		 * Loads specified template
		 * @param {string} name Template name
		 */
		load: function(name) {

			/* Loaded */
			let fromLS;

			/* Try to load from storage */
			if(!templatesList[name] && this.storage && (fromLS = this.storage.load(name)))
				return templatesList[name] = fromLS;

			/* If already compiled */
			if(templatesList[name])
				return templatesList[name];

			/* Load template */
			if(!(templatesList[name] = $('script[type="text/template"][id='+ name +']').html()))
				throw new exceptions.system.Error("Can't find template – "  + name);

			/* Save to LS */
			if(this.storage)
				this.storage.save(name, { template: templatesList[name] });

			/* Return */
			return templatesList[name]

		}

	};

	/**
	 * Load templates on ready
	 */
	$(document).on("ready", sky.func(function() {

		/* Find templates and save them */
		$('script[type="text/template"]').each(function() {
			let self = $(this);
			Templates.add({
				name        : self.attr('id'),
				template    : self.html()
				//dependencies: self.attr('dependencies') ? self.attr('dependencies').replace(" ", "").split(",") : false
			});
		});

		/* Save templates files data */
		if(window.page.data["templates"] && Templates.storage) {
			$.each(window.page.data["templates"], function() {
				$.cookie("storedTemplates-" + this.path, this.date);
			});
		}

	}));

});

sky.service("tips", function({ stackList, callbacks }) {

    /** Class to work with tips */
    let list = stackList(),
        tips = this.service = {

        /**
         * Hides all visible tips
         * @param withoutAutoHide
         */
        hideAll: function(withoutAutoHide) {

            /* Hide all tips */
            $.each(list.elements(), function(_, tip) {
                if(withoutAutoHide || tip.autoHide)
                    this.hide();
            });

        },

        /**
         * Returns last open window if any
         * @returns {tips.Tip|boolean}
         */
        getLast: function() {
            list.last();
        },

        /**
         * Add show/hide functions
         * @param {string}            selector            Object to bind tips for
         * @param {string}            align                Align of tip
         * @param options
         * @see tips.tip
         */
        bind: function(selector, align, options) {

            /* Create binds */
            $(selector).on({
                "mouseenter": function() {
                    let tip = $(this).data("tip") || tips.Tip(this, options).show(align);
                },
                "mouseleave": function() {
                    let tip = $(this).data("tip");
                    if(tip) tip.hide(align);
                }
            });

        },

        /**
         * Creates new tip object
         * @param {object}            object                Object to show tip for
         * @param autoHide
         * @param create
         * @param close
         * @param ajax
         * @param highlight
         * @constructor
         */
        Tip: function(object, { autoHide = true, create = false, close = false, ajax = false, highlight = false } = {}) {

            /* Auto construct */
            if(!(this instanceof tips.Tip))
                return new tips.Tip(object, { autoHide, create, close, ajax, highlight });

            /* Manual create tip by create function */
            if(typeof create === "function") {

                /* Create tip */
                this.tip = create(object);

                /* If no tip */
                if(!this.tip) return this;

            }

            /* Object set */
            this.object = $(object).data("tip", this);

            /* Save callbacks */
            this.callbacks = callbacks();

            /* Auto hide */
            this.autoHide = autoHide;

            /* Manual create tip by create function */
            if(typeof create !== "function") {

                /* Create tip */
                this.tip = $("<div/>").addClass("tip").append('<div class="tipContent"></div>').insertBefore(object);

                /* Title using */
                if(!create && this.object.attr('title'))
					create = this.object.attr('title');
                else if(!create)
					create = "Пожалуйста подождите";

                this.tip.find(".tipContent").append(create);

            }

            if(highlight)
                this.shadow = $('<div/>').css({ opacity: 0, position:"absolute", width: "100%", height: "100%", left:0 ,top:0, background: "rgba(0,0,0,0.5)" }).appendTo("body");

            /* If count down */
            if(typeof close === "number")
                this.closeTimeout = setTimeout(() => this.hide(), close);

            /* If close button */
            else if(close)
                $('<div/>').addClass('close').appendTo(this.tip).on("click", () => this.hide());

            /* If stop possible */
            if(ajax)  ajax.on("always", () => this.hide());

            /* Add to list */
            this.tip.css("display", "none");
			list.add(this);
            return this;

        }

    };

    /**
     * Extends tip
     */
    $.extend(tips.Tip.prototype, /** @lends tips.tip */ {

        /**
         * Shows tip according to type
         * @param {string} [align] Way it would be shown
         */
        show: function(align) {

            /* Back link */
            let self   = this;
            let offset = this.tip.css({left: "", top: "", marginLeft: "", marginTop: "", display: ""}).offset();

            /* Stop animation and shows */
            this.tip.stop();

            /* Save way to show */
            if(align) this.align = align;

            /* If shadow */
            if(this.shadow)
                this.shadow.stop().show().animate({opacity: 1}, 100);

            /* Different actions according to tip position */
            switch(this.align) {

                /* If show righter than input */
                case "right":
                {
                    this.tip.addClass("right").css({
                        marginLeft: this.object.offset().left + this.object.outerWidth() - offset.left,
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "+=10"}, 100);
                    break;
                }
                /* If show righter than input */
                case "left":
                {
                    this.tip.addClass("left").css({
                        marginLeft: this.object.offset().left - offset.left - this.tip.outerWidth(),
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "top":
                {

                    // Count left offset
                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.addClass("top").css({
                        marginLeft: left,
                        marginTop : this.object.offset().top - this.tip.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "bottom":
                {

                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.addClass("bottom").css({
                        marginLeft: left,
                        marginTop : this.object.offset().top + this.object.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "+=10"}, 300);
                    break;
                }
                /* If we replace input with tip */
                case "instead":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.object.fadeOut(100, function() {
                        self.tip.fadeIn(100);
                    }).get(0).blur();
                    break;
                }
                case "inside":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.tip.css("opacity", 0).animate({opacity: 1}, 100);
                    break;
                }
                default:
                    break;
            }

            this.tip.css({left: "", top: ""});

            /* Self return */
            return this;

        },

        /**
         * Hides current tip
         */
        hide: function() {

            /* Remove count down if needed */
            if(this.closeTimeout)
                clearTimeout(this.closeTimeout);

            /* Stop animation */
            this.tip.stop();

            /* Get know how tip was shown */
            let align = this.align;

            /* Create end animation callback */
            let callback = () => {

                /* Delete record from global list */
                list.remove(this);

                /* Remove data */
                this.object.removeData("tip");

                /* Remove tip */
                this.tip.remove();

                /* Callback */
                this.callbacks.fire("hide", this);

            };

            /* If just shown */
            if(!align)
                callback();

            /* If shadow */
            if(this.shadow)
                this.shadow.animate({opacity: 0}, 100, () => { this.shadow.remove() });

            /* Right way hide */
            if(align === "right")
                this.tip.animate({opacity: 0, marginLeft: "+=10"}, 100, callback);

            /* Left way hide */
            if(align === "left")
                this.tip.animate({opacity: 0, marginLeft: "-=10"}, 100, callback);

            /* Instead way hide */
            if(align === "instead")
                this.tip.fadeOut({opacity: 0}, 200, callback);

            /* Top way hide */
            if(align === "top")
                this.tip.animate({opacity: 0, marginTop: "-=5"}, 200, callback);

            /* Bottom way hide */
            if(align === "bottom")
                this.tip.animate({opacity: 0, marginTop: "+=5"}, 200, callback);

            /* Inside way hide */
            if(align === "inside")
                this.tip.animate({opacity: 0}, 200, callback);

            /* Self return */
            return this;

        },

        /**
         * Gets tips dom
         * @returns {*}
         */
        get: function() {
            return this.tip;
        },

        /**
         * Sets tip text
         * @param {string|jQuery} text What to insert to tip body
         */
        set: function(text) {
            this.tip.children(".tipContent").html(text);
            return this;
        },

        /**
         * Adds something to tip
         * @param {string|jQuery} what What to append to tip body
         */
        add: function(what) {
            this.tip.children(".tipContent").append(what);
            return this;
        }

    });

});
sky.service("utils", function() {
	$.extend(sky, this.service = {

		/**
		 * Checks if object has same data
		 * @param first
		 * @param second
		 */
		isObjectsEqual: function(first, second) {

			/* Different types */
			if(typeof first !== typeof second)
				return false;

			/* If object or array we will compare each element */
			if(first instanceof Array || first instanceof Object) {
				let key;
				/* Check first */
				for(key in first) {
					if(!first.hasOwnProperty(key)) continue;
					if(typeof second[key] === "undefined") return false;
					else if(!this.isObjectsEqual(first[key], second[key])) return false;
				}

				/* Check second */
				for(key in second) {
					if(!second.hasOwnProperty(key)) continue;
					if(typeof first[key] === "undefined") return false;
				}

			} else if(first !== second) return false;    // For simple types

			/* All tests success */
			return true;

		},

		/**
		 * Adds zero
		 * @param value
		 * @returns {Number}
		 */
		addLeadingZero: function(value) {

			/* Parse */
			value = parseInt(value);

			/* Ad zero */
			if(value < 10)
				value = "0" + value;

			/* Val */
			return value;

		},

		encode: function(rawStr) {
			return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				return '&#'+i.charCodeAt(0)+';';
			});
		},

		/**
		 * Makes data to JSON past
		 * @param data
		 * @param [inputName]
		 * @returns {string}
		 */
		jsonData: function(data, inputName) {
			return '<script type="application/json"' + (inputName ? (' input-name="' + inputName + '"') : "") + '>' + sky.encode(JSON.stringify(data)) + '</script>';
		},

		prepareSelectData: function(items, func, { columnSplitOn = 6, maxColumns = 4 }) {

			let index = 0,
				groupHolder,
				compiled,
				columns = [],
				columnsCount = items.length / columnSplitOn;

			if(columnsCount < 1)
				columnsCount = 1;
			if(columnsCount > maxColumns)
				columnsCount = maxColumns;

			let perColumn = Math.ceil(items.length / columnsCount);

			$.each(items, function(_, item) {
				if(compiled = func({ item, index, column: columns.length })) {

					if (index % perColumn === 0) {
						groupHolder = [];
						columns.push(groupHolder);
					}

					groupHolder.push(compiled);
					index++;
				}
			});

			return index === 0 ? [] : {groups: columns}

		}
	});
});
sky.onReady(function({ validator }) {
	jQuery.fn.validForm = function() {
		return validator.validateForm(this);
	}.safe();
	jQuery.fn.validationRule = function(name, options) {
		return validator.addRule(this, name, options);
	}.safe();
	$(document).on("change keyup", "[data-validate]", function() {
		validator.validateElement($(this));
	});
});

sky.service("validator", function() {

	/**
	 * Main validation object
	 */
	let validator = this.service = {

		/**
		 * Validates specified form, or dom element
		 * @param form
		 */
		validateForm: function(form) {

			let pass = true,
				self = this;

			/* Go through all elements that need to be validate */
			form.find("input, select, textarea, .selectReplace, [data-validate]").filter(":visible").each(function() {

				/* Get element */
				let element = $(this);

				/* validate if needed to */
				if(self.shouldBeValidated(element) && !self.validateElement(element, form))
					pass = false;

			});

			/* Return result */
			return pass;

		},

		/**
		 * Add rule to specified element
		 * @param element
		 * @param name
		 * @param [options]
		 */
		addRule: function(element, name, options) {

			/* Get or make options and add rule */
			this.Options(element).addRule(name, options || {});

			/* Self return */
			return this;

		},

		/**
		 *
		 * Validates specified element
		 * @param {*} element Element to validate
		 * @param {*} [form] Form to validate
		 * @returns {boolean}
		 */
		validateElement: function(element, form) {

			let self = this,
				options = this.Options(element),
				totalPass = true,
				value = element.val(),
				lastError = false,
				firstError = false,
				lastSuccess = false,
				firstSuccess = false;

			/* Select replace */
			if(element.is(".selectReplace")) {
				let inputs = element.next().find("input:checked");
				if(!inputs.length)
					value = "";
				else if(element.is(".single"))
					value = element.next().find("input:checked").val();
				else
					value = element.next().find("input:checked").length ? "true" : "";
			}

			/* Go through rules */
			$.each(options.rules, function(name, ruleOverload) {

				/* Make compiled rule */
				let compiledRule = jQuery.extend(true, {}, self.rules[name] || self.Rule({}), ruleOverload || {});

				/* Execute message is needed */
				if(typeof compiledRule.message === "function")
					compiledRule.message = compiledRule.message.call(this);

				/* Check if element pass validation */
				let pass = self.validate(value, compiledRule, element, form);

				/* Perform action according to result */
				if(pass) {
					compiledRule.onSuccess(element, compiledRule);
					lastSuccess = compiledRule;
					if(!firstSuccess)
						firstSuccess = compiledRule;
				} else {
					compiledRule.onError(element, compiledRule);
					lastError = compiledRule;
					if(!firstError)
						firstError = compiledRule;
					totalPass = false;
				}

			});

			/* Total callbacks */
			if(totalPass)
				options.onSuccess(element, lastSuccess);
			else
				options.onError(element, firstError);

			/* Return true of element passed all validations */
			return totalPass;

		},

		/**
		 * Return true if element should be validated
		 * @param {*} element Element to validate
		 * @returns {boolean}
		 */
		shouldBeValidated: function(element) {
			return element.attr("data-validate") || element.data("validationOptions");
		},

		/**
		 * Return true if element passed validation
		 * @param element
		 * @param compiledRule
		 * @param form
		 * @returns {*}
		 * @param value
		 */
		validate: function(value, compiledRule, element, form) {
			return compiledRule.rule.call(compiledRule, value, element, form);
		}

	};

	/**
	 * Defaults
	 */
	validator.ruleDefaults = {

	};

	/**
	 * Defaults
	 * @type {{onSuccess: onSuccess, onError: onError}}
	 */
	validator.optionsDefaults = {

		/* Fires on success */
		onSuccess: function(element) {

			/* Remove error */
			element.removeClass(this.errorClass);

			/* Add success */
			if(this.successClass)
				element.addClass(this.successClass);

		},

		/* Fires on error */
		onError: function(element) {

			/* Add error */
			element.addClass(this.errorClass);

			/* Remove success */
			if(this.successClass)
				element.removeClass(this.successClass);

		}
	};

	/**
	 * Base rule object
	 * @param overload
	 * @returns {validator.Rule}
	 * @constructor
	 */
	validator.Rule = function(overload) {

		/* Self creation if needed */
		if(!(this instanceof validator.Rule))
			return new validator.Rule(overload);

		/* Dump rule to check validation */
		this.rule = function() { return true; };

		/* Dump message */
		this.message = "Это поле заполнено не верно";

		/* List of options to make validation according to */
		this.options = [];

		/* Fires on success */
		this.onSuccess = function(element) {};

		/* Fires on error */
		this.onError = function(element) {};

		/* Self extend with overload */
		jQuery.extend(this, overload);

		/* Return */
		return this;

	};

	/**
	 * List of default rules
	 * @type {{required: validator.Rule}}
	 */
	validator.rules = {
		required: validator.Rule({
			rule: function(value) {
				return !!value.length;
			},
			message: "Это поле необходимо заполнить"
		}),
		requiredIfFilled: validator.Rule({
			rule: function(value) {
				let item = $(this.options[0]);
				return item.is(":radio, :checkbox") ? !item.is(":checked") || value : item.val() === "" || value;
			},
			message: "Это поле необходимо заполнить"
		}),
		date: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}( \d{2}:\d{2}(:\d{2})?)?$/)
					);
			},
			message: "Дата указана неверно"
		}),
		period: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}\s*-\s*\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}$/)
					);
			},
			message: "Период указан неверно"
		}),
		email: validator.Rule({
			rule: function(value) {
				return value && value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
			},
			message: "Почтовый адрес указан неверно"
		}),
		same: validator.Rule({
			rule: function(value) {
				return value === $('[name="' + this.options[0] + '"]').val();
			},
			message: "Поля не совпадают"
		}),
		url: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^(https?:\/\/.+)$/);
			},
			message: "Не корректный адрес URI"
		}),
		regexp: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(new RegExp(this.options[0]));
			},
			message: "Введите корректное значение"
		}),
		numeric: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^-?[0-9]+(\.[0-9]+)?$/);
			},
			message: "Введите число"
		}),
		positive: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) > 0;
			},
			message: "Введите положительное число"
		}),
		max: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) <= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не обльше чем " + (this.options[0] || 0)
			}
		}),
		min: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) >= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не меньше чем " + (this.options[0] || 0);
			}
		}),
		minLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length >= (this.options[0] || 0)
			},
			message: "В этом поле нехватает символов"
		}),
		maxLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length <= (this.options[0] || 0)
			},
			message: "В этом поле слишком много символов"
		})
	};

	/**
	 * Holds element validation options
	 * @param element
	 * @constructor
	 */
	validator.Options = function(element) {

		/* Create or return */
		if(!(this instanceof validator.Options))
			return element.data("validationOptions") || new validator.Options(element);

		/* Callbacks after all checks */
		this.onSuccess = function() {};
		this.onError = function() {};

		/* Adds to element on success */
		this.successClass = false;

		/* Adds to element on error */
		this.errorClass   = "error";

		/* Overlay defaults */
		jQuery.extend(true, this, validator.optionsDefaults);

		/* Holds list of validating rules */
		this.rules = {};

		/* Save element */
		this.element = element;

		/* Get rules that declared in element definition */
		this.getDeclaredRules();

		/* Save option */
		this.element.data("validationOptions", this);

		/* Self return */
		return this;

	};

	validator.Options.prototype = {

		/**
		 * Gets list of rules that are set in declared way
		 */
		getDeclaredRules: function() {

			/* Get attribute value */
			let attr = this.element.attr("data-validate"),
				self = this;

			/* If none */
			if(!attr)
				return;

			/* Get list */
			$.each(attr.split(";"), function(_, name) {

				/* Get parameters */
				let params = name.match(/(\w+)\((.*)\)/);

				/* Parse */
				if(params) {

					/* Get function */
					name = params[1];

					/* Parse params */
					params = params[2].match(/(('[^']+')|([\d\w]+))/g);
					$.each(params, function(i, val) {
						params[i] = eval(val.trim());
					});
				}

				/* Add rule to options */
				self.addRule(name.trim(), { options: params || [] });

			});


		},

		/**
		 * Adds new rule for element
		 * @param {string} name Rule name
		 * @param {object} options Rule options
		 * @returns {validator.Options}
		 */
		addRule: function(name, options) {

			/* Create and save new rule */
			this.rules[name] = jQuery.extend({}, validator.ruleDefaults, options);

			/* Mark for auto validation */
			if(!this.element.attr("data-validate"))
				this.element.attr("data-validate", "true");

			/* Self returning */
			return this;
		}

	}

});
sky.service("visibleCalculator", function() {

	let Calculator = this.service = class {

		constructor(holder, minHeight, scrollable) {

			/* Check if class */
			if(!(this instanceof Calculator))
				return new Calculator(holder, minHeight, scrollable);

			/* Re get holder */
			this.holder = $(holder);
			this.scrollable = scrollable;
			this.minHeight = minHeight;

			/* Init */
			this.init();

		}

		/* Init func */
		init() {

			/* Count offset */
			let offset = this.holder.offset();

			/* Get holder rect */
			this.holderRect = {
				left  : offset.left,
				top   : offset.top,
				width : this.holder.outerWidth(),
				height: this.holder.outerHeight()
			};

		}

		/* Calculating function */
		calculate() {

			/* How much is scrolled */
			let scrollTop    = $(this.scrollable).scrollTop(),
				windowHeight = $(window).height(),
				windowWidth  = $(window).width(),
				sizes        = {
					left        : this.holderRect.left,
					right       : this.holderRect.left + this.holderRect.width,
					top         : this.holderRect.top - scrollTop,
					width       : this.holderRect.width,
					height      : this.holderRect.height,
					realHeight  : this.holderRect.height,
					scrollTop   : scrollTop,
					scrollLeft  : 0,
					windowHeight: windowHeight,
					windowWidth : windowWidth,
				};

			/* Min height */
			if(sizes.height < this.minHeight)
				sizes.height = this.minHeight;

			/* Count bottom */
			sizes.bottom = sizes.top + sizes.height;

			/* If top border near than holder */
			if(sizes.top < 0) {
				// If visible less than min
				if(sizes.bottom < this.minHeight) {
					sizes.bottom = sizes.bottom < 0 ? 0 : sizes.bottom;
					sizes.top = sizes.bottom - this.minHeight;
					sizes.height = this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = sizes.bottom;
					sizes.top = 0;
				}
			}

			/* Get visible bottom */
			if(windowHeight < sizes.bottom) {
				// If visible less than min
				if(windowHeight - sizes.top < this.minHeight) {
					sizes.height = this.minHeight;
					sizes.top = windowHeight - sizes.top < 0 ? 0 : sizes.top;
					sizes.bottom = sizes.top + this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = windowHeight - sizes.top;
					sizes.bottom = 0;
				}
			}

			/* Return */
			return sizes;

		}

		getDropOffset(replace, popup) {

			/* Get drop */
			if(!popup.is(":visible")) return;

			/* Set position to zeros to get max width and height */
			popup.removeClass('hidden').css({left: 0, top: 0});

			/* Init */
			let popupWidth  = popup.outerWidth(),
				popupHeight = popup.outerHeight();

			/* Reset position */
			popup.css({marginLeft: "", marginTop: "", width: "", left: "", top: ""});

			/* Init */
			let win            = $(window),
				replaceOffset  = replace.offset(),
				popupOffset    = popup.offset(),
				leftDifference = popupOffset.left - replaceOffset.left,
				topDifference  = popupOffset.top - replaceOffset.top,
				middle         = false,
				visible        = this.calculate();

			// Drop down
			if(visible.bottom + popupHeight >= visible.windowHeight)
				popup.css("marginTop", topDifference + visible.realHeight + 1);
			// Drop up
			else if(visible.top > popupHeight)
				popup.css("marginTop", -topDifference - 1);
			// Drop left
			else {
				popup.css("marginTop", -topDifference - (popupHeight - visible.realHeight) / 2);
				middle = true;
			}


			/* Set position */
			if(!middle) {
				if(visible.windowWidth > visible.left + popupWidth)
					popup.css("marginLeft", leftDifference);
				else
					popup.css("marginLeft", leftDifference - popupWidth + visible.width);
			} else {

				if(win.width() > selfOffset.left + popupWidth + selfWidth)
					popup.css({
						marginLeft: selfOffset.left - popupOffset.left + selfWidth
					});
				else
					popup.css({
						marginLeft: selfOffset.left - popupOffset.left - popupWidth
					});

			}

		}
	}

})
;
/**
 * Holds classes to work with modal/new windows
 */
sky.service('windows', function ({templates, callbacks, stackList}) {

	let tips = false,
		list = stackList(),
		windows = this.service = {

			/**
			 * Returns last open window if any
			 * @returns {windows.Modal|boolean}
			 */
			getLast: function () {
				return list.last()
			},

			/**
			 * Creates new modal window
			 * @param {*} name Window name
			 * @param {*} [data] Data to send with request
			 */
			Modal: function (name, data) {

				/* Self construct */
				if (!(this instanceof windows.Modal))
					return new windows.Modal(name, data);

				/* Create window */
				this.locked 		= false;
				this.background 	= templates.render("windows-modal", {}).appendTo("#pageContentHolder").data("modalWindow", this);
				this.dataContainer 	= this.background.children();
				this.holder 		= this.dataContainer.children(".windowData");
				this.closeButton 	= this.dataContainer.children(".close");

				/* Make body un scrollable */
				$(document.body).css("overflow", "hidden");

				/* Callbacks */
				this.callbacks = callbacks();

				/* Render content */
				try {
					this.reRender(name, data);
				} catch (e) {
					this.close(false);
					throw e;
				}

				/* Return */
				return this;

			}

		};

	/**
	 * Modal window prototype
	 */
	windows.Modal.prototype = {

		/**
		 * Renders window content
		 * @param {*} name Window name
		 * @param {*} [data] Data to send with request
		 */
		reRender: function (name, data) {

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Clear */
			this.holder.html('');

			/* Render content */
			if (name instanceof jQuery)
				this.template = name.appendTo(this.holder);
			else if (typeof name === "string")
				this.template = templates.render(name, data).appendTo(this.holder);

			/* Self return */
			return this;
		},

		/**
		 * Removes all except that was rendered
		 */
		clearExceptTemplate: function () {
			this.holder.children().detach();
			this.holder.append(this.template);
		},

		/**
		 * Removes all except that was rendered
		 */
		removeMessages: function () {
			this.holder.find(".notificationMessage").remove();
			return this;
		},

		/**
		 * Locks window so it can't be closed
		 * @returns {windows.Modal}
		 */
		lock: function (ajax) {
			this.locked = true;
			this.closeButton.hide();
			if (ajax) ajax
				.on("preSuccess", function () {
					this.dataContainer.css("height", this.dataContainer.innerHeight());
				}, this)
				.on("notAbort", function () {
					let self = this;
					this.unlock();
					this.dataContainer.css("height", this.holder.outerHeight());
					setTimeout(function () {
						self.dataContainer.css("height", "");
					}, 500)
				}, this)
				.on("abort", function () {
					this.unlock().close();
				}, this);
			return this;
		},

		/**
		 * Unlocks window so it can be closed
		 * @returns {windows.Modal}
		 */
		unlock: function () {
			this.locked = false;
			this.closeButton.show();
			return this;
		},

		/**
		 * Closes current window
		 * @param {boolean} [byUser] Indicates that window was closed not by user
		 */
		close: function (byUser = false) {

			/* If windows is locked */
			if (this.locked)
				return;

			/* Remove elements */
			this.background.fadeOut("fast", function () {
				$(this).remove()
			});

			/* Delete from list */
			list.remove(this);

			/* Call close callback */
			this.callbacks.fire("close", {byUser: byUser});

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Make body scrollable */
			if (list.total() < 1)
				$(document.body).css("overflow", "");

			return this;

		}

	};

	try {
		tips = sky.service("tips");
	} catch (e) {}

	/* Add handler to black area click */
	$(document)
		.on("keyup", sky.func(function (event) {
			let last;

			/* If slide show was disabled */
			if (document["webkitIsFullScreen"] || document["mozIsFullScreen"] || document["isFullScreen"])
				return;

			/* Close current window */
			if (event.keyCode === 27 && (last = windows.getLast()))
				last.close(true);

		}));

});
/**
 * Fire services init done
 */
sky.exec(function() {
	sky.servicesDeferred.resolve();
});
sky.action("pagination", {

	setPage: function(button, _, page) {

		/* Get pagination */
		var pagination = button.parents(".pagination").data("pagination");

		/* Correct page */
		if(page == "next") {
			button = false;
			page = pagination.current + 1;
		}

		/* Correct  */
		if(page == "previous") {
			button = false;
			page = pagination.current - 1;
		}

		/* Go to page */
		pagination.goToPage(page, button);

	},

	scrollTo: function(element, event) {

		/* Get pagination */
		var pagination = element.parents(".pagination").data("pagination");

		/* Move */
		pagination.scroll(event);

	},

	grab: function(runner) {

		/* Get pagination */
		var pagination = runner.parents(".pagination").data("pagination");

		/* Binds */
		$(window)
			.on("mouseup.pagination", function() {
				$(window).off("mouseup.pagination mousemove.pagination");
			}).on("mousemove.pagination", function(event) {
				pagination.scroll(event);
			});

	},

	next: function(button, _) {
		this.setPage(button, _, "next")
	},

	previous: function(button, _) {
		this.setPage(button, _, "previous")
	}

});
sky.action("selectReplace", function({ visibleCalculator }) {

    let filter = function(self, event) {

        /* Get drop */
        let popup  = self.closest(".selectReplaceChoose"),
            inputs = popup.find("input[name]");

        /* On enter */
        if(event.which === 13) {
            let visible = popup.find("label:visible");
            if(visible.length > 0) {
                inputs.prop("checked", false);
                visible.children("input").prop("checked", true).trigger("change");
            }
            event.stopPropagation();
        }

        /* Get value */
		let value = self.val(),
			 rus              = "йцукенгшщзхъфывапролджэёячсмитьбю",
             eng              = "qwertyuiop[]asdfghjkl;'\\zxcvbnm,.",
             expression       = new RegExp(value.toLowerCase()),
             expressionInvert = new RegExp(value.toLowerCase().replace(/[a-zа-яё]/g, (character) => {
                if(rus.indexOf(character) > -1) return eng[rus.indexOf(character)];
                if(eng.indexOf(character) > -1) return rus[eng.indexOf(character)];
                return character;
            }));

        /* Hide */
        for(let input of inputs) {

            if(input.parent().hasClass('hidden'))
                return;

            let inputHtml = input.next().html().toLowerCase();

            try {
                if(!inputHtml.match(expression) && !inputHtml.match(expressionInvert)) input.parent().hide();
                else input.parent().show();
            } catch(e) {}

        }
    };

    return {

        filter: filter,

        selectAll: function(button) {

            /* Get drop */
            let popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", true).first().trigger("change");

        },

        unSelectAll: function(button) {

            /* Get drop */
            let popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", false).first().trigger("change");

        },

        close: function(element, event) {
            if(element.get(0) === event.target)
                $(".selectReplaceChoose").addClass('hidden');
        },

        /**
         * Shows drop down
         * @param replace Input
         */
        drop: function (replace) {

            /* Hide all */
			$(".selectReplaceChoose").addClass('hidden');

            /* Get drop */
            let popup = replace.next(),
                dropOffset = visibleCalculator.getDropOffset(replace, popup);

			/* If visible just hide */
			if(dropOffset) {
				popup.removeClass('hidden').css({ marginLeft: dropOffset.left, margintop: dropOffset.top });

				if(replace.outerWidth() > popup.outerWidth())
					popup.css("width", replace.outerWidth());

                /* Search focus */
				if (popup.find(".search").length)
					popup.find(".search input").val('').focus();

            }

        }
    }
});
//noinspection JSUnusedGlobalSymbols
sky.action("shared", {

	advertFilter: function (element) {
		let adverts = [];
		element.closest("form").find('[name=advertId]:checked').each(function () {
			adverts.push(this.value);
		});

		element.closest("form").find('[name=campaignId]').each(function () {

			let self = $(this).parent(),
				conId = self.attr("data-connection-id");

			if (!conId || !adverts.length || $.inArray(conId, adverts) >= 0)
				self.removeClass('hidden');
			else
				self.addClass('hidden');

		});

	},

	/**
	 * Close parent window
	 * @param self
	 * @param event
	 */
	closeWindow: function (self, event) {

		/* Close */
		if (event.target && event.target === self.get(0))
			self.closest(".windowShadow").data("modalWindow").close();

	},

	/**
	 * Scrolls body to top
	 * @param _
	 * @param event
	 */
	toTop: function (_, event) {

		/* No # go */
		event.preventDefault();

		/* Scroll */
		$('#pageContentHolder').animate({scrollTop: 0}, "fast");

	},

	/**
	 * Stops form form submit if not valid
	 * @param form
	 * @param event
	 */
	validForm: function (form, event) {
		if (form.validForm())
			form.get(0).submit();
	},

	/**
	 * Stops form form submit if not valid
	 * @param button
	 * @param event
	 */
	clearForm: function (button, event) {
		let form = button.closest("form");
		form.get(0).reset();
		form.find("input").trigger("change");
	},

	showTip: function (button, _, name) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips", [name]);

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append($("#" + name + "TipText").html())
		});

		// Show
		tip.show();

	},

	showTipWithText: function (button, _, text) {

		if (button.data("tip")) {
			button.data("tip").hide();
			return;
		}

		// Hide others
		sky.actions.perform(button, false, "shared.hideTips");

		// Create
		let tip = sky.tips.Tip("bottom", button, {
			create: $('<div/>').css("overflow", "hidden").append(text)
		});

		// Show
		tip.show();

	},

	hideTips: function (element, event) {
		let target;

		if (event && event.target) {
			target = $(event.target);
			if (target.is("[sky-tip]") || target.is("[sky-tip-text]") || target.closest(".tipContent").length)
				return;
		}

		sky.tips.hideAll();

	},

	/**
	 *
	 */
	forceHideTips: function () {
		sky.tips.hideAll(true);
	},

	attachFile: function (input) {
		let label = input.closest(".label"),
			file = input.val().match(/[^\\\/]+(\.[^\\\/]+)?$/)[0] || input.val(),
			holder = sky.templates.render('page-fileHolder', {file: file}).append(input).insertBefore(label);

		$('<input type="file" name="attachment[]" sky-event="change: shared.attachFile">').appendTo(label.find(".button"))
	},

	toggleMenu: function (button, event) {
		$("#header").find(".menu").toggleClass("visible");
	},


	/**
	 * Reorders current result rows without request
	 * @param button
	 * @param _
	 * @param orderField
	 * @param type
	 */
	changeOrder: function (button, _, orderField, type) {

		let order = button.hasClass("desc") ? "asc" : "desc",
			table = button.closest("table"),
			first = table.find("th:last").parent(),
			trs = table.find("tr:not(.orderSkip):not(.footer):not(.header)"), cell1, cell2, convert = (type !== 'datetime' && type !== "text");

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Reorder
		trs.sort(function (firstTr, secondTr) {
			if (orderField) {
				cell1 = $(firstTr).find("[data-field=" + orderField + "]");
				cell2 = $(secondTr).find("[data-field=" + orderField + "]");
			} else {
				let buttonTr = button.closest("tr");
				let index = buttonTr.find("td, th").index(button.closest("td, th"));
				cell1 = $(firstTr).find("td:eq(" + index + ")");
				cell2 = $(secondTr).find("td:eq(" + index + ")");
			}

			// Get TDs values
			let val1 = cell1.attr("data-value") || cell1.html();
			let val2 = cell2.attr("data-value") || cell2.html();

			// Convert
			if (convert) {
				val1 = parseFloat(val1);
				val2 = parseFloat(val2);
			}

			// Compare
			if (val1 === val2 || (convert && isNaN(val1) && isNaN(val2)))
				return 0;
			else if (val1 > val2 || (convert && isNaN(val2)))
				return order === "desc" ? 1 : -1;
			else
				return order === "desc" ? -1 : 1;

		}).insertAfter(first);

	},

	changeOrderReload: function (button, _, orderField) {

		// Get order
		let order = button.hasClass("desc") ? "asc" : "desc";

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Set hash and reload
		page.history.set({order: order, orderField: orderField});
		page.currentLoader.reload();
	}

});
sky.action("suggest", function(suggester) {
   return {
       adverts: function(input, event) {

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/members/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.adverts || !response.adverts.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.adverts, function(_, advert) {
                       filtered.push(advert.username);
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });

       },

       campaigns: function(input, event){

           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Stop if any other
           if(this.suggestAjax)
               this.suggestAjax.stop();

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name });
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       },

       campaignsSpecial: function(input, event){
           // Events
           if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27)
               return;

           // Nothing
           if(input.val() == "" || input.val().length < 2) {
               suggester.hideAll();
               return;
           }

           if(this.suggestAjax)
               this.suggestAjax.stop();

           this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() })
               .on("success", function(response) {

                   // No filtered
                   if(!response.campaigns || !response.campaigns.length)
                       suggester.hideAll();

                   var filtered = [];

                   $.each(response.campaigns, function(_, campaign) {

                       filtered.push({ html: campaign.name+" ("+campaign.advert.username+")", callback: function(){
                           sky.actions.perform(null, null, "page.selectCampaign", [campaign.id]);
                       }});
                   });

                   // Show
                   suggester.show(input, filtered);

               }).on("error", function() {
                   suggester.hideAll();
               });
       }
   }
});
sky.directive(".selectReplaceChoose", function(popup, attrs) {

		/* Get inputs */
		let labels = popup.find("label"),
			inputs = popup.find("input:radio, input:checkbox"),
			current, change, children, replace = popup.prev(),
			val = "",
            defaultValue = replace.html() || '-',
            defaultAllValue = replace.text() || "Все";

		replace.data("addItem", function(item) {
			var newInput = sky.templates.renderByText("{% skyImport forms as forms %}{{ forms.selectReplaceGroup(items, options) }}", { items: [item], options: {
				name: replace.attr("input"),
				multiple:  !replace.hasClass("single")
			}});
			newInput.insertAfter(inputs.filter(":last").parent());
			inputs = popup.find("input");
		});

		/* On change */
		$(document).on("change", '[data-input="'+ attrs["data-input"] + '"] input', change = function(event, data) {

			/* Remove selected styles */
			labels.removeClass("selected");

			/* Base text */
			val = "";
			children = false;

			/* Get checked */
			var filtered = inputs.filter(":checked").each(function() {
				current = $(this);
				current.closest("label").addClass("selected");
				val = (val && val + ", ") + current.next().text();
				children = current.next();
			});

			/* Make text shorter */
			if(val.length > 26)
				val = val.substr(0, 26).trim() + "...";

			if(filtered.length === inputs.length && !popup.hasClass("single"))
				val = defaultAllValue;

			if(popup.hasClass("single") && children)
				replace.html('').prepend(children.clone().removeClass("name"));
			else if(!children)
				replace.html(defaultValue);
			else
				replace.text(val);

			/* If not fake event */
			if(event && current) {
                replace.trigger("change", $.extend(data || {}, {
                    value: current.val(),
                    item: $(this)
                }));
            }

            if(popup.hasClass("single"))
				$(".selectReplaceChoose").addClass('hidden');
		});

		/* Trigger */
		setTimeout(function() { change(false) }, 1);

	});


$(document)
	.on("click touchstart", function(event) {

		/* Get element */
		var element = $(event.target || event.srcElement);


		/* If click in replace we should not hide it */
		if(element.closest(".selectReplaceChoose").length || element.closest(".selectReplace").length)
			return;

		/* Hide all */
		$(".selectReplaceChoose").addClass('hidden');

	}).on("change", ".specialSelect input", function(event) {
		var root = $(this).closest(".specialSelect");
		root.find(".selected").removeClass("selected");
		root.find("input").each(function() {
			var self = $(this);

			if(self.is(":checked"))
				self.parent().addClass("selected");

		});

		//root.closest("form").trigger("submit");

	}).on("mouseover", ".selectReplaceChoose label", function() {

		var label = $(this);
		var originalTip = label.find(".checkItemTip");

		if(originalTip.length && !label.data("tip")) {
			var popup = label.closest(".selectReplaceChoose");
			var tip = originalTip.clone().removeClass("hidden").appendTo("body");
			tip.css({
				left: popup.offset().left,
				top: popup.offset().top + popup.outerHeight() + 5
			});
			label.data("tip", tip);
		}

	}).on("mouseout", ".selectReplaceChoose label", function() {

		var label = $(this);

		if(label.data("tip")) {
			label.data("tip").remove();
			label.removeData("tip");
		}

	})

;

sky.directive("[data-tip]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipName = attributes["data-tip"],
		event   = "click: shared.showTip('" + tipName + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-text]", function(button, attributes) {

	// Get
	let events  = attributes["data-event"] || "",
		tipText = attributes["data-tip-hover"] || attributes["data-tip-text"],
		event   = "click: shared.showTipWithText('" + tipText + "')";

	// Set new
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-tip-hover]", function(button, attributes) {

	// Get
	let tipText = attributes["data-tip-hover"];

	sky.service("tips").bind(button, "top", {create: tipText});

	// Set new
	let events = attributes["data-event"] || "",
		event  = "click: shared.showTipWithText('" + tipText + "')";
	events = events ? event : events + "; " + event;

	// Add
	button.attr("data-event", events).addClass("dashed");

});
sky.directive("[data-suggests]", function(element, attributes) {
	element.attr("data-event", "keyup: suggest." + attributes["data-suggests"]).attr("autocomplete", "off");
});
sky.directive("input.autoHttp", function(input) {
	input.on("focus", function() {
		if(input.val() === "") input.val("http://").get(0).selectionStart = 7;
	});
});
/**
 * Fire project init done
 */
sky.exec(function() {
    $('body').removeClass("hidden");
    sky.projectDeffered.resolve();
});