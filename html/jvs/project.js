"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

sky.service("actions", ["exceptions"], function (_ref) {
	var exceptions = _ref.exceptions;


	var list = {},
	    actions = this.service = {

		/**
   * Performs action
   * @param element
   * @param event
   * @param action
   * @param {Array} [options]
   */
		perform: function perform(element, event, action, options) {

			/* Get parameters */
			var params = action.match(/(.+)\((.*)\)/);

			/* Parse */
			if (params) {

				/* Get function */
				action = params[1];

				/* Parse params */
				params = params[2].split(",");
				$.each(params, function (i, val) {
					params[i] = eval(val.trim());
				});
			}

			/* Options */
			if (options) params = $.extend(params || [], options);

			/* Get */
			var self = element ? $(element) : false,
			    path = action.split("."),
			    current = list,
			    name = action;

			/* If disabled */
			if (self && self.isDisabled && self.isDisabled()) return;

			$.each(path, function (i, elem) {

				/* Search */
				if (i + 1 < path.length && !current[elem]) throw new exceptions.system.Error("No action - " + action + ", because can't find '" + elem + "'");

				/* Get new elem */
				if (i + 1 < path.length) current = current[elem];

				/* Save name */
				name = elem;
			});

			/* If no */
			if (!current[name]) throw new exceptions.system.Error("No action - " + action);

			/* Call */
			current[name].apply(current, [self, event].concat(params || []));
		},

		/**
   * Adds actions to list
   * @param name Group name
   * @param events List
   */
		add: function add(name, events) {

			if (typeof events === "function") events = events.safe(true)();

			// Check
			if (!events || (typeof events === "undefined" ? "undefined" : _typeof(events)) !== 'object') throw new exceptions.system.Error("No event object for events '" + name + "' provided");

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
	$.fn.action = function (name, selector, action) {

		/* Parameters skip */
		if (typeof action === "undefined") {
			action = selector;selector = null;
		}

		/* Bind */
		return this.on(name, selector, function (event, data) {
			action.call(this, event, $(this), data);
		}.safe());
	};

	/*
  * Bind declarative events
  */
	$(document).action("click submit keyup keydown dblclick mouseover mouseout mouseleave mouseenter change mousedown mouseup touchstart", '[data-event]', function (event, self, data) {
		var _this = this;

		/* Get string */
		var skyEvent = this.getAttribute("data-event");

		/* If no such event in data-event attribute */
		if (skyEvent.indexOf(event.type) === -1) return;

		/* If disabled */
		if (self.isDisabled && self.isDisabled()) {
			event.preventDefault();
			return;
		}

		skyEvent.split(";").map(function (eventString) {

			/* Get elements */
			var parts = eventString.match(/(\w+):(.*)/);

			/* Wrong */
			if (parts.length !== 3) throw new exceptions.system.Error("Wrong action format in data-event: " + eventString);

			/* Get elements */
			var name = parts[1].trim(),
			    action = parts[2].trim();

			/* Another event */
			if (name !== event.type) return;

			/* No default go */
			if (event.target === self.get(0)) event.preventDefault();

			/* Passed data */
			event.data = data;

			/* Perform action */
			actions.perform(_this, event, action);
		});
	});
});
"use strict";

sky.service("ajax", ["callbacks"], function (_ref) {
	var callbacks = _ref.callbacks;


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
	this.service = function (url, data, _ref2) {
		var _ref2$object = _ref2.object,
		    object = _ref2$object === undefined ? null : _ref2$object,
		    _ref2$callbackData = _ref2.callbackData,
		    callbackData = _ref2$callbackData === undefined ? {} : _ref2$callbackData,
		    _ref2$ajaxExtend = _ref2.ajaxExtend,
		    ajaxExtend = _ref2$ajaxExtend === undefined ? {} : _ref2$ajaxExtend;


		/* Lock button */
		if (object) object = $(object).filter(":not(.disabled)").disable();

		/* New object to store callbacks */
		var ajaxCallbacks = new callbacks();
		ajaxCallbacks.stop = function () {
			ajaxCallbacks.ajax.abort();
		};

		/* Perform ajax request */
		ajaxCallbacks.ajax = $.ajax($.extend(true, {

			/* Set base options */
			url: url,
			data: data,
			dataType: "json",
			type: "post",
			timeout: 480 * 1000,
			success: function (response, textStatus, jqXHR) {

				/* Possible params list */
				var params = $.extend({ jqXHR: jqXHR, textStatus: textStatus, object: object }, callbackData);

				/* If empty response */
				if (response === null) {
					params.error = "Данные небыли переданы";
					params.type = "noData";
				}

				/* If response returned with error */
				if (response.error) {
					params.error = response.text;
					params.type = "php";
				}

				/* If error type set */
				if (params.type) return ajaxCallbacks.fire("notSuccess, error", params); // No data

				/* Set response in possible params */
				params.response = params.data = response;

				/* User success function */
				return ajaxCallbacks.fire("preSuccess, success, notAbort", params);
			}.safe(),
			error: function (jqXHR, textStatus, errorThrown) {

				/* Defaults */
				var type = "Unknown",
				    errorText = "Во время выполнения запроса произошла ошибка, пожалуйста попробуйте позже";

				/* Get error text according to response data */
				if (textStatus === "abort") {
					type = "abort";
					errorText = 'Выполнение запроса прервано';
				} else if (textStatus === 'parsererror') {
					type = "parse";
					errorText = "Ответ пришел в неверном формате, пожалуйста попробуйте позже, текст:<br/>" + jqXHR.responseText;
				} else if (textStatus === 'timeout') {
					type = "timeout";
					errorText = 'Время ожидания ответа истекло';
				} else if (jqXHR.status === 0) {
					type = "stopped";
					errorText = 'Загрузка остановлена, проверьте свои настройки сети';
				} else if (codes[jqXHR.status]) {
					type = jqXHR.status;
					errorText = 'Ошибка во времы выполнения запроса <br/> ' + codes[jqXHR.status];
				}

				/* Possible params list */
				var params = $.extend({
					error: errorText,
					type: type,
					code: type,
					jqXHR: jqXHR,
					textStatus: textStatus,
					status: textStatus,
					errorThrown: errorThrown,
					object: object
				}, callbackData);

				/* Execute callback */
				ajaxCallbacks.fire("notSuccess", params);

				/* Execute special ajaxCallbacks */
				ajaxCallbacks.fire(textStatus === "abort" ? "abort" : "error, notAbort", params);
			}.safe()

		}, ajaxExtend));

		/* On always set */
		ajaxCallbacks.ajax.promise().always(function (jqXHR, textStatus, errorThrown) {

			/* Unlock objects */
			if (object) object.enable();

			/* Always callback */
			ajaxCallbacks.fire("always", { errorThrown: errorThrown, textStatus: textStatus, jqXHR: jqXHR, object: object });
		}.safe());

		return ajaxCallbacks;
	};

	/**
  * Contains http codes
  */
	var codes = {

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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class to work with drop zone for File api */
sky.service("ajaxFilesDropZone", ["supported", "callbacks"], function (_ref) {
	var supported = _ref.supported,
	    callbacks = _ref.callbacks;

	this.service = function () {
		function _class(_ref2) {
			var zone = _ref2.zone,
			    data = _ref2.data,
			    url = _ref2.url,
			    options = _ref2.options;

			_classCallCheck(this, _class);

			/* Save options */
			this.options = options;
			this.zone = zone;
			this.callbacks = callbacks();
			this.data = data;
			this.url = url;
			this.files = [];

			/* If no XHR supported, no file drop needed */
			if (!supported.XHRUpload) {
				this.callbacks.fire("nonSupported");
				return this;
			}

			/* Bind events */
			this.attachEvents();
		}

		_createClass(_class, [{
			key: "attachEvents",
			value: function attachEvents() {
				var _this = this;

				/* While over event */
				this.zone.on({

					dragenter: function dragenter(event) {
						_this.callbacks.fire("dragenter", _this, [event]);
					},
					dragleave: function dragleave(event) {
						_this.callbacks.fire("dragleave", _this, [event]);
					},
					dragend: function dragend(event) {
						_this.callbacks.fire("dragend", _this, [event]);
					},
					drop: function drop(event) {
						_this.callbacks.fire("drop", _this, [event]);
					},
					dragover: function dragover(event) {

						/* Get event */
						event = event.originalEvent;

						/* Check if drag is valid */
						if (!_this.isValidFileDrag(event)) return;

						/* Get effect */
						var effect = event.dataTransfer.effectAllowed;

						/* Set proper */
						if (effect === 'move' || effect === 'linkMove') {
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
					dragover: function dragover(e) {
						e = e.originalEvent;
						if (e.dataTransfer) {
							e.dataTransfer.dropEffect = 'none';
							e.preventDefault();
						}
					},
					dragenter: function dragenter(e) {
						if (typeof self.options.onStart !== "undefined") self.options.onStart.apply(self, [e]);
					}
				});
			}
		}], [{
			key: "isValidFileDrag",
			value: function isValidFileDrag(event) {

				var dt = event.dataTransfer,

				// do not check dt.types.contains in webkit, because it crashes safari 4
				isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;

				// dt.effectAllowed is none in Safari 5
				// dt.types.contains check is for firefox
				return dt && dt.effectAllowed !== 'none' && (dt.files || !isWebkit && dt.types.contains && dt.types.contains('Files'));
			}
		}]);

		return _class;
	}();
});
"use strict";

sky.service("ajaxFilesIFrame", function () {

	var AjaxFilesIFrame = function AjaxFilesIFrame(options) {

		/* Save options */
		this.options = options;
		this.files = options.files;
		this.input = options.input;
		this.url = options.url;
		this.data = options.data;
		this.callbacks = options.callbacks;
	};

	AjaxFilesIFrame.prototype = {

		getName: function getName(name) {

			// get input value and remove path to normalize
			return name.replace(/.*(\/|\\)/, "");
		},

		cancel: function cancel(id) {

			this.options.onAbort(id, this.getName(this.input.value));

			this.IFrame.setAttribute('src', 'javascript:false;').remove();
		},

		/**
   * Upload file function
   */
		send: function send() {

			/* letiables */
			var self = this;
			var input = this.input;
			var fileName = this.getName(input.value);

			/* Create new input */
			$(input).clone().val("").insertBefore(input);

			/* Create elements */
			this.IFrame = this.createIframe();
			this.form = this.createForm(this.IFrame, this.options.data).append(input);

			this.attachLoadEvent(this.IFrame, function () {

				var response = self.getIframeContentJSON(self.IFrame);

				if (response) self.options.onSuccess(response);

				// timeout added to fix busy state in FF3.6
				setTimeout(function () {
					self.IFrame.remove();
				}, 1);
			});

			this.form.trigger("submit");
		},

		/**
   * Attach load event to IFrame
   */
		attachLoadEvent: function attachLoadEvent(iframe, callback) {

			iframe.load(function () {

				if (!this.parentNode) return;

				// fixing Opera 10.53
				if (this.contentDocument && this.contentDocument.body && this.contentDocument.body.innerHTML === "false") return;

				callback();
			});
		},

		/**
   * Returns json object received by IFrame from server.
   */
		getIframeContentJSON: function getIframeContentJSON(iframe) {

			/* IFrame.contentWindow.document - for IE<7 */
			var doc = iframe.get(0).contentDocument ? iframe.get(0).contentDocument : iframe.get(0).contentWindow.document;

			var response = doc.body.innerHTML;

			/* Check for empty response */
			if (response === "") {
				if (self.callbacks) self.callbacks.onError("Данные небыли переданы"); // No data
				return false;
			}

			/* Try to get json data */
			try {
				response = jQuery.parseJSON(response);
			} catch (e) {
				if (self.callbacks) {
					self.callbacks.onError("Неверный формат данных"); // No data
					console.log(response);
				}
				return false;
			}

			/* If response returned with error */
			if (response.error) {
				if (self.callbacks) self.callbacks.onError(response.text); // Execute user error handler
				return false;
			}

			return response;
		},

		/**
   * Creates IFrame with unique name
   */
		createIframe: function createIframe() {

			return $('<IFrame/>', { src: "javascript:false;", name: "uploadIFrame" + Math.floor(Math.random() * 1000000) }).css("display", "none").appendTo('body');
		},

		/**
   * Creates form, that will be submitted to IFrame
   */
		createForm: function createForm(iframe, params) {

			var queryString = this.url + "?" + jQuery.param(params);

			return $('<form/>', {
				method: "post", enctype: "multipart/form-data", action: queryString, target: iframe.attr("name")
			}).css("display", "none").appendTo('body');
		}

	};
});
"use strict";

/**
 * Module to work with ajax file upload
 */
sky.service("ajaxFiles", ["supported", "callbacks", "ajaxFilesXHR", "ajaxFilesIFrame"], function (_ref) {
	var callbacks = _ref.callbacks,
	    supported = _ref.supported,
	    ajaxFilesXHR = _ref.ajaxFilesXHR,
	    ajaxFilesIFrame = _ref.ajaxFilesIFrame;


	/**
  * Class to work with dynamic file upload
  * @param {html|string} input Input to be used to upload
  * @param {string} url Url to upload
  * @param {object} data Data to be send with request
  */
	var AjaxFiles = this.service = function (input, url, data) {

		/* Self construct */
		if (!(this instanceof AjaxFiles)) return new AjaxFiles(input, url, data);

		/* Save items */
		this.inputs = $(input);
		this.url = url;
		this.data = data;
		this.callbacks = callbacks();
		this.files = [];

		/**
   * Function to handle file input change
   */
		this.saveFiles = function (input) {

			/* Get files list */
			if (supported.XHRUpload) {

				/* Get files from event */
				var files = input.get(0).files;

				/* Save them to this */
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var file = _step.value;

						this.files.push({ file: file, input: input, inputName: input.attr("name") });
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			} else this.files.push(input.get(0));
		};

		/**
   * Sends ajax files
   * @param {bool} parallel If try files would be send in parallel
   * @returns {*}
   */
		this.send = function (parallel) {
			var _this = this;

			/* Clear */
			this.files = [];

			/* Get files list */
			this.inputs.each(function (_, input) {
				_this.saveFiles($(input));
			});

			/* If no files */
			if (!this.files.length) return false;

			/* Create supported handler */
			var handler = void 0;
			if (supported.XHRUpload) handler = new ajaxFilesXHR(this);else handler = new ajaxFilesIFrame(this);

			/* Send files */
			if (parallel) this.sendParallel(handler);else this.sendConsequentially(handler);

			/* return send handler */
			return handler;
		};

		/**
   * Sends files consequentially
   * @param handler
   */
		this.sendConsequentially = function (handler) {
			var _this2 = this;

			/* First id */
			var id = 0;

			/* Set sending next after this one */
			this.callbacks.on("always", function () {
				id++;
				if (_this2.files[id]) handler.send(_this2.files[id]);
			});

			/* Send first */
			handler.send(self.files[id]);
		};

		/**
   * Sends files parallel
   * @param handler
   */
		this.sendParallel = function (handler) {

			/* Send files through them */
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var file = _step2.value;

					handler.send(file);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
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
	AjaxFiles.defaultSend = function (url, element, data) {

		// Get input
		var input = element.is("input[type=file]") ? element : element.closest("label, .label").find("input[type=file]"),
		    exceptions = sky.service("exceptions"),
		    templates = sky.service("templates"),
		    notifications = sky.service("notifications"),
		    windows = sky.service.windows("windows");

		// Check
		if (!input.length) throw new exceptions.system.Error("No proper input provided for file send");

		// Init
		var filesAjax = AjaxFiles(input, url, data),
		    modal = windows.getLast(),
		    currentFile = void 0;

		/*  Bind events */
		filesAjax.callbacks.on("begin", function (file) {
			if (modal) {
				modal.holder.find(".preview").remove();
				modal.lock();
			}
			currentFile = templates.render("files-single-upload", file).insertAfter(element.parent());
		}).on("always", function () {
			currentFile.remove();
			if (modal) modal.unlock();
		}).on("notSuccess", function (error) {
			modal.clearExceptTemplate();
			notifications.message({ text: error }).appendToModal(modal);
		}).on("progress", function (totalPercent, percent) {
			currentFile.find(".total").html(percent + "%");
			currentFile.find(".progressBar div").css("width", percent + "%");

			// If loaded
			if (percent === 100) currentFile.find(".total").html("100%, обработка");
		}).on("start", function () {});

		/* Send */
		filesAjax.send();
		return filesAjax;
	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Sends file data via HttpRequest */
sky.service("ajaxFilesXHR", ["supported", "ajax", "stackList"], function (_ref) {
	var supported = _ref.supported,
	    ajax = _ref.ajax,
	    stackList = _ref.stackList;

	this.service = function () {
		function _class(options) {
			_classCallCheck(this, _class);

			/* Save options */
			this.options = options;
			this.files = options.files;
			this.input = options.input;
			this.url = options.url;
			this.data = options.data;
			this.callbacks = options.callbacks;
			this.toProceed = options.files.length;
			this.inProgress = 0;
			this.total = options.files.length;
			this.totalLoaded = 0;
			this.totalSize = 0;
			this.totalPercent = 0;
			this.current = 0;
			this.fileRequests = stackList();

			/* Go through */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = options.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					file = _step.value;

					this.totalSize += file.size;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		/**
   * Get file name
   * @param {*} file File
   * @returns {string}
   */


		_createClass(_class, [{
			key: "send",


			/**
    * Uploads file
    * @param {*} file File name in files stack
    */
			value: function send(file) {
				var _this = this;

				/* This obj will store data associated with XHR */
				$.extend(file, {
					id: Math.random(),
					name: this.getName(file.file),
					size: file.file.size,
					ajax: false,
					percent: false,
					loaded: 0
				});

				/* Prepare params */
				var self = this,
				    params = this.data || {},
				    queryString = this.url + "?ajaxFile=" + file.name + "&" + jQuery.param(params);

				/**
     * Params extend
     * @param {object} args Object to be extended
     * @returns {*}
     */
				this.extend = function (args) {
					return jQuery.extend(args, {
						totalLoaded: self.totalLoaded,
						totalSize: self.totalSize,
						totalPercent: self.totalPercent,
						file: file,
						loaded: file.loaded,
						size: file.size,
						percent: file.percent,
						toProceed: self.toProceed,
						current: self.current,
						total: self.total
					});
				};

				/* Send */
				if (supported.formData) {

					/* Create form data sender */
					var form = new FormData();
					form.append(file.inputName, file.file);

					/* Send start */
					file.ajax = ajax(queryString, form, { ajaxExtend: {
							processData: false,
							contentType: false,
							type: "POST",
							xhr: function () {
								try {

									/* Create XHR */
									var xhr = new XMLHttpRequest();

									/* Set special upload api handlers */
									xhr.upload["onloadstart"] = function () {
										this.inProgress++;
										this.callbacks.fire("begin", this.extend({}));
									};
									xhr.upload["onprogress"] = function (event) {
										this.totalLoaded += event.loaded - file.loaded;
										this.totalPercent = (this.totalLoaded / this.totalSize * 100).toFixed(0);
										this.onProgress(event, file);
									};

									/* Return create XHR */
									return xhr;
								} catch (e) {
									return undefined;
								}
							}.safe()
						}
					});
				} else {

					/* Send start */
					file.ajax = ajax(queryString, file.file, {
						processData: false,
						contentType: false,
						type: "POST",
						beforeSend: sky.func(function (jqXHR) {
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
					success: function success(all) {
						_this.callbacks.fire("success", _this.extend(all));
					},
					error: function error(all) {
						_this.callbacks.fire("error", _this.extend(all));
					},
					notSuccess: function notSuccess(all) {
						_this.callbacks.fire("notSuccess", _this.extend(all));
					},
					always: function always(all) {

						/* Counters */
						_this.inProgress--;
						_this.toProceed--;

						/* Call always method */
						_this.callbacks.fire("always", _this.extend(all));

						/* Delete connection */
						_this.fileRequests.delete(file);
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

		}, {
			key: "onProgress",
			value: function onProgress(event, fileRequestData) {

				/* Count percentage */
				var percent = (event.loaded / event["total"] * 100).toFixed(0);
				fileRequestData.loaded = event.loaded;

				/* If percent changed */
				if (percent !== fileRequestData.percent && event["lengthComputable"]) {
					fileRequestData.percent = percent;
					this.callbacks.fire("progress", this.extend({}));
				}
			}

			/**
    * Aborts current download
    */

		}, {
			key: "abort",
			value: function abort() {

				/* Stop each request */
				this.fileRequests.each(function (request) {
					request.ajax.stop();
				});

				/* Call always method */
				this.callbacks.fire("abort", this.extend({}));
			}
		}], [{
			key: "getName",
			value: function getName(file) {
				return file.name.replace(/.*(\/|\\)/, "");
			}
		}]);

		return _class;
	}();
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("ajaxLoadingIndicator", ["stackList"], function (_ref) {
	var stackList = _ref.stackList;


	var loadings = stackList();

	/**
  * Loading
  */

	var Loading = function () {
		function Loading(ajax) {
			var _this = this;

			var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			_classCallCheck(this, Loading);

			/* List save */
			loadings.add(this);

			/* Back link */
			this.global = global;

			/* Render */
			this.render = $('<div/>').html('<div></div>').addClass("ajaxLoading");

			/* Global insert */
			if (this.global) this.render.addClass("fixed").appendTo("body");

			/* If stop possible */
			if (ajax) {
				$("<span/>").appendTo(this.render.addClass("cancelable")).click(function () {
					ajax.stop();
				});
				ajax.on("always", function () {
					return _this.hide();
				});
			}

			/* Callbacks */
			this.events = callbacks();
		}

		/**
   * Loads loading in modal window
   * @param {object} modal Window
   */


		_createClass(Loading, [{
			key: "inModalWindow",
			value: function inModalWindow(modal) {

				/* Hide */
				var content = modal.holder.children().hide();

				/* Insert */
				this.render.appendTo(modal.holder);

				/* Restore on hide */
				this.events.on("hide", function () {
					return content.show();
				});
			}

			/**
    *
    * @param contentHolder
    */

		}, {
			key: "reloadContent",
			value: function reloadContent(contentHolder) {
				var _this2 = this;

				this.setHolder(contentHolder);

				/* If no holder */
				if (!this.holder.length) return;

				/* Get children */
				var content = this.holder.children();

				/* Different content disable */
				if (this.global) {

					/* Disable content */
					content.disable();

					/* Make sizes calculator */
					this.calc = visibleCalculator(contentHolder, this.render.outerHeight(), "body");

					/* Re enable */
					this.events.on("hide", function () {
						content.enable();
						$(window).off("scroll.notification");
					});

					/* Bind scroll handler */
					$(window).on("scroll.notification", function () {
						var position = _this2.calc.calculate();
						_this2.render.css({
							left: position.left + position.width / 2,
							top: position.top + position.height / 2
						});
					}).trigger("scroll");
				} else {

					/*  Hide */
					content.hide();

					/* Insert */
					this.render.appendTo(this.holder);

					/* Re enable */
					this.events.on("hide", function () {
						content.show();
					});
				}

				return this;
			}
		}, {
			key: "setHolder",
			value: function setHolder(holder) {

				/* Append and save */
				this.holder = $(holder).addClass("withLoading").append(this.render);

				/* Self return */
				return this;
			}

			/**
    * Hides current loading
    */

		}, {
			key: "hide",
			value: function hide() {

				if (this.holder) this.holder.removeClass("withLoading");

				this.render.remove();
				this.events.fire("hide");

				/* Remove from list */
				loadings.remove(this);
			}
		}]);

		return Loading;
	}();

	this.service = {
		loading: function loading(ajax) {
			var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			return new Loading(ajax, global);
		}
	};
});
"use strict";

sky.service("calendar", ["templates", "visibleCalculator"], function (_ref) {
	var templates = _ref.templates,
	    visibleCalculator = _ref.visibleCalculator;


	/* This class is for showing calendar to pick date on page */
	var calendar = {

		/* Days set */
		monthsNames: window.page.data.monthsNames || ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],

		renderDays: function renderDays() {

			/* Clone */
			var current = moment(this.date),
			    weeks = [],
			    currentWeek = false;

			/* From first */
			current.date(1);

			/* Go through */
			while (current.month() === this.date.month()) {

				/* Make week if new */
				if (!currentWeek || current.day() === 1) {
					currentWeek = { number: current.isoWeek(), days: [] };
					weeks.push(currentWeek);
				}

				/* Push */
				currentWeek.days.push({ date: current.clone(), dateStr: current.format("YYYY.MM.DD"), day: current.day() === 0 ? 6 : current.day() - 1 });

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
		dayPick: function dayPick(dayDiv, notClose) {

			/* Set date */
			if (dayDiv) this.date.date(parseInt(dayDiv.html()));

			this.field.val(this.getInputValue()).trigger("change").trigger("keyup");
			if (!notClose) this.close();
		},

		getInputValue: function getInputValue() {

			/* Get field new value */
			if (this.useTime) return this.date.format("DD.MM.YYYY HH:mm");else if (this.period && this.since.isSame(this.till)) return this.since.format("DD.MM.YYYY");else if (this.period) return this.since.format("DD.MM.YYYY") + ' - ' + this.till.format("DD.MM.YYYY");

			/* Default */
			return this.date.format("DD.MM.YYYY");
		},

		setDayPick: function setDayPick() {
			this.pickedDateView.html(this.getInputValue());
		},

		/**
   * Position date picker
   * @param {*} field Item that we should position under
   */
		position: function position(field) {

			this.holder.insertAfter(field.parent()).css("position", "absolute");

			var calculator = new visibleCalculator(field),
			    offset = calculator.getDropOffset(field, this.holder);

			this.holder.css({
				marginTop: offset.top,
				marginLeft: offset.left,
				width: offset.width
			});
		},

		/**
   * Sets time inputs in calendar values
   */
		setTime: function setTime() {

			/* Set time */
			this.holder.find(".time .hour").val(this.date.format("HH"));
			this.holder.find(".time .minute").val(this.date.format("mm"));
		},

		periodChangeDay: function periodChangeDay() {

			var reset = function reset() {
				calendar.since = calendar.date.clone();
				calendar.till = calendar.date.clone();
				calendar.lastModified = "none";
			};

			if (this.date.isBefore(this.since)) {
				if (this.lastModified !== "since") {
					this.since = this.date.clone();
					this.lastModified = "since";
				} else reset();
			} else if (this.date.isAfter(this.till)) {
				if (this.lastModified !== "till") {
					this.till = this.date.clone();
					this.lastModified = "till";
				} else reset();
			} else if (this.date.isSame(this.till) || this.date.isSame(this.since)) reset();else {
				if (this.lastModified === "since") {
					this.till = this.date.clone();
					this.lastModified = "till";
				} else {
					this.since = this.date.clone();
					this.lastModified = "since";
				}
			}

			calendar.markSelected();
		},

		markSelected: function markSelected() {

			this.dates.find(".day").removeClass("selected").removeClass("subSelected").each(function () {

				var element = $(this),
				    date = calendar.date.clone().date(parseInt(element.html()));

				if (!calendar.period) {
					if (date.format("DD.MM.YYYY") === calendar.date.format("DD.MM.YYYY")) element.addClass("subSelected");
					return;
				}

				if (date.isAfter(calendar.since) && date.isBefore(calendar.till)) element.addClass("subSelected");else if (date.isSame(calendar.since) || date.isSame(calendar.till)) element.addClass("selected");
			});
		},

		/**
   * Changes day
   * @param {*} element Day picker
   * @returns {undefined}
   */
		changeDay: function changeDay(element) {

			/* If pick today */
			this.date.date(parseInt(element.html()));

			/* No more for period */
			if (this.period) {
				this.periodChangeDay();
				return;
			}

			calendar.markSelected();

			/* Set time */
			if (this.field.attr("name") === "since") this.date.hour(0).minute(0);else if (this.date.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")) this.date.hour(moment().hour()).minute(moment().minute());else this.date.hour(23).minute(59);

			/* Pick */
			if (this.useTime) this.setTime();
		},

		/**
   * Sets specified year
   * @param {int} year Year that need to be set
   */
		changeYear: function changeYear(year) {

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
		changeMonth: function changeMonth(month) {

			/* Set year */
			this.date.month(month);

			/* Updates */
			this.monthView.html(this.monthsNames[this.date.month()] + ' ' + this.date.year());

			/* Reload year */
			this.changeYear(this.date.year());
		},

		getDatePeriod: function getDatePeriod(dateString) {

			// Split and get since
			var parts = dateString.split('-'),
			    till = void 0,
			    since = this.getDate(parts[0].trim());

			// Get till
			if (parts.length > 1) till = this.getDate(parts[1].trim());else till = this.getDate(parts[0].trim());

			// Set inner lets
			this.since = since;
			this.till = till;
			this.date = since.clone();
		},

		/**
   * Creates today date
   */
		getDate: function getDate(dateString) {

			/* Set calendar date */
			var date = false;

			/* If input has datetime format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/)) date = moment(dateString, "YYYY-MM-DD HH:mm");

			/* Id input has date format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) date = moment(dateString, "YYYY-MM-DD");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4}$/)) date = moment(dateString, "DD.MM.YYYY");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/)) date = moment(dateString, "DD.MM.YYYY HH:mm");

			/*  If still no */
			if (!date) {
				date = moment();

				/* Set time */
				if (this.field.attr("name") === "since") date.hour(0).minute(0);
			}

			/* Reset time */
			if (!this.useTime) date.hour(0).minute(0);

			/* Additional check */
			return this.date = date;
		},

		/**
   * Closes windows
   */
		close: function close() {

			/* Remove calendar */
			if (this.holder) this.holder.remove();

			/* Unset */
			if (this.field) {
				this.field.off("keyup.calendar");
				this.field = false;
			}
		}
	};

	var show = function (field, showTime) {

		/* Remove old calendars */
		this.close();

		/* Begins from current date */
		this.field = field;
		this.period = false;
		this.useTime = showTime ? showTime : false;
		// this.lastPicked = "none";

		if (field.is("input.datePeriod")) {
			this.period = true;
			this.getDatePeriod(field.val());
		} else this.getDate(field.val());

		/* Render */
		this.holder = templates.render("calendar", this);

		/* Actions */
		this.holder

		/* Months changer */
		.action("click", ".month .next", function (event) {
			event.preventDefault();
			calendar.changeMonth(calendar.date.month() + 1);
		}).action("click", ".month .prev", function (event) {
			event.preventDefault();
			calendar.changeMonth(calendar.date.month() - 1);
		})

		/* Years */
		.action("click", ".year .next", function (event) {
			event.preventDefault();
			calendar.changeYear(calendar.date.year() + 1);
		}).action("click", ".year .prev", function (event) {
			event.preventDefault();
			calendar.changeYear(calendar.date.year() - 1);
		}).action("click", ".setNow", function (event) {
			event.preventDefault();
			calendar.date = moment();
			calendar.renderDays();
			calendar.setTime();
		}).action("click", ".setToday", function (event) {
			event.preventDefault();
			calendar.date = moment();
			calendar.date.hour(0);
			calendar.date.minute(0);
			calendar.renderDays();
			calendar.setTime();
		}).action("click", ".setWeek", function (event) {
			event.preventDefault();
			calendar.date = moment();
			calendar.date.subtract(7, "d");
			calendar.renderDays();
			calendar.setTime();
		})

		/* Day */
		.action("click", ".dates .day", function (event) {
			event.preventDefault();
			var self = $(this);

			if (self.is(".selected") && !calendar.period) calendar.dayPick($(this));else {
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
		}).action("keyup", ".time .hour", function () {
			calendar.date.hour(this.value);
		}).action("keyup", ".time .minute", function () {
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

		var dateOriginal = void 0;
		this.dates.on("touchstart", function (event) {

			var element = $(event.target);
			if (!element.is(".day")) return;
			dateOriginal = calendar.date.clone().date(parseInt(element.html()));
		}).on("touchmove", function (event) {

			/* No original event */
			event.preventDefault();

			var element = document.elementFromPoint(event.clientX || event.originalEvent.touches[0].clientX, event.clientY || event.originalEvent.touches[0].clientY);
			element = $(element);

			if (!element.is(".day")) return;

			var date = dateOriginal.clone().date(parseInt(element.html()));

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

sky.onReady(function (_ref2) {
	var calendar = _ref2.calendar;


	/* Calendar show */
	$(document).action("click.calendar", function (event) {

		/* Get element */
		var element = $(event.target || event.srcElement);

		/* Remove calendar */
		if (!element.is(".calendar") && !element.parents(".calendar").length) $(".calendar").remove();

		/* Calendar show */
		if (element.is("input.date")) calendar(element);

		/* Calendar show */
		if (element.is("input.datePeriod")) calendar(element, false, true);

		/* Calendar show */
		if (element.is("input.datetime")) calendar(element, true);

		/* Calendar show */
		if (element.is("input.datehour")) calendar(element, true);
	}).action("keydown.calendar", function (event) {
		if (event.keyCode === 13) {
			var calendars = $(".calendar");
			if (calendars.length) {
				calendars.find(".day.selected").trigger("click");
				event.preventDefault();
			}
		}
	});
});
"use strict";

sky.service("callback", function () {

	/**
  * Creates callback object that holds functions list
  * @param {string} [flags]
  * @returns {*}
  * @constructor
  */
	var Callback = function Callback(flags) {

		/* Self construct */
		if (!(this instanceof Callback)) return new Callback(flags);

		/**
   * Functions list holder
   * @type {Array}
   */
		this.functions = [];
		this.toRun = 0;
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
		add: function add(func, context, options) {
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
		removeByContext: function removeByContext(context) {

			/* Find listener */
			var i = void 0;
			for (i in this.functions) {
				if (this.functions[i].context === context) this.functions.splice(i, 1);
			} /* Self return */
			return this;
		},

		/**
   * Removes function from list by context
   * @param func
   */
		removeByCallback: function removeByCallback(func) {

			/* Find listener */
			var i = void 0;
			for (i in this.functions) {
				if (this.functions[i].func === func) this.functions.splice(i, 1);
			} /* Self return */
			return this;
		},

		/**
   * Fires all functions
   * @param {Object} context Function context
   * @param {Array} args Arguments
   */
		fire: function fire(context, args) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.functions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var func = _step.value;

					func.func.apply(func.context || context, args);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		},

		/**
   * Fires next function
   * @param {Array|Object} args Arguments
   * @param {Object} context Function context
   */
		fireNext: function fireNext(args, context) {

			/* If no more to run */
			if (this.functions.length <= this.toRun) return false;

			/* Set next to run */
			this.toRun++;

			/* Function to run */
			var current = this.functions[this.toRun - 1],
			    result = void 0,
			    func = current.func;

			/* Set context */
			context = current.context || context || window;

			/* Get function in string */
			if (typeof func === "string") func = context[func];

			/* If no function found */
			if (!func) return true;

			/* Call function */
			result = func.apply(current.context || context, args) !== false;

			/* If call once */
			if (current.once) {
				this.functions.splice(this.toRun - 2, 1);
				this.toRun--;
			}

			/* Return function result */
			return result;
		}

	};

	this.service = Callback;
});
"use strict";

sky.service("callbacks", ["callback"], function (_ref) {
	var callback = _ref.callback;


	/**
  *
  * Callbacks prepared object
  * @param {*} [flags] Flags list for jQuery.Callbacks
  * @constructor
  */
	var Callbacks = function Callbacks(flags) {

		/* Self construction */
		if (!(this instanceof Callbacks)) return new Callbacks(flags);

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
		flags: function flags(_flags) {
			this.callbacksFlags = _flags;
			return this;
		},

		/**
   * Remove by listener
   * @param {string} name Event name
   * @param {string} listener Listener object
   */
		removeListener: function removeListener(name, listener) {
			if (this.advancedCallbacks[name]) {
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
		on: function on(name, func, context, options) {
			var _this = this;

			if (name instanceof Object) $.each(name, function (event, func) {
				_this.on(event, func);
			});else $.each(this.getEventsNames(name), function (_, name) {

				/* Create callbacks */
				if (!_this.advancedCallbacks[name]) _this.advancedCallbacks[name] = callback(_this.callbacksFlags);

				/* Add function */
				_this.advancedCallbacks[name].add(func, context ? context : self.context, options || {});
			});

			return this;
		},

		/**
   * Fires callbacks for specified event
   * @param {string} name Name of event
   * @param {object} args Arguments to be passed
   * @param {object} [options] Additional options
   */
		fire: function fire(name, args, options) {

			/* Success last */
			var events = this.getEventsNames(name),
			    self = this,
			    next = false;
			options = options || {};

			/* Remove global if need */
			if (options["noGlobal"]) events = events.slice(1);

			/* Fire events */
			$.each(events, function (_, event) {

				/* If no callback */
				if (!self.advancedCallbacks[event]) return;

				/* Run */
				do {
					next = self.advancedCallbacks[event].fireNext(jQuery.extend({ event: event }, args || []), self.context, options.possible);
				} while (next);

				/* Reset */
				if (!options.once) self.advancedCallbacks[event].toRun = 0;
			});
		},

		/**
   * Get all event names from global name
   * @param {String} name Global event name
   * @returns {Array}
   */
		getEventsNames: function getEventsNames(name) {

			/* Get events names */
			var names = name.split(","),
			    events = [];

			/* Go through */
			$.each(names, function (i, name) {

				/* Remove spaces */
				name = name.replace(" ", "");

				/* Get elements */
				var elements = name.split(".");
				events.push(elements[0]);

				/* Go through */
				for (var j = 1; j < elements.length; j++) {
					events.push(elements[0] + "." + elements[j]);
				} /* Global event */
				if (elements.length > 2) events.push(elements.join("."));
			});

			/* Return */
			return events;
		},

		/**
   * Removes event handlers and functions
   * @param {string} name Event name
   * @param func
   */
		off: function off(name) {
			var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (func && this.advancedCallbacks[name]) this.advancedCallbacks[name].removeByCallback(func);else delete this.advancedCallbacks[name];
		}

	};

	this.service = Callbacks;
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("dataOperator", ["searchField", "templates", "utils", "ajax", "stackList", "ajaxLoadingIndicator"], function (_ref) {
	var searchField = _ref.searchField,
	    templates = _ref.templates,
	    utils = _ref.utils,
	    ajax = _ref.ajax,
	    stackList = _ref.stackList,
	    ajaxLoadingIndicator = _ref.ajaxLoadingIndicator;


	/**
  * Default options
  * @type {{}}
  */
	var baseOptions = {
		fields: {},
		historyType: "hash"
	};

	/* Creates new data operator */

	var DataOperator = function () {
		function DataOperator(options) {
			_classCallCheck(this, DataOperator);

			/* Stores last request object */
			this.lastRequestData = false;

			/* Func that calls before request */
			this.beforeRequest = false;

			/* Fields list */
			this.fields = stackList();

			/* Add base options, but only not set, that's why so fun construction */
			this.options = utils.extend({}, baseOptions, true);

			/* Options init */
			this.setOptions(options);
		}

		/** Saves to options */


		_createClass(DataOperator, [{
			key: "setOptions",
			value: function setOptions(options) {

				/* Add to options */
				utils.extend(this.options, options, true);

				/* Set submit handler */
				if (this.options.form) $(this.options.form).action("submit", this.onFormSubmit.bind(this));

				/* Self return */
				return this;
			}

			/**
    * On form submit
    * @param event
    */

		}, {
			key: "onFormSubmit",
			value: function onFormSubmit(event) {

				/* Prevent */
				event.preventDefault();

				/* If form not valid */
				if (!$(this.options.form).validForm()) return;

				var options = { force: true };

				if (this.fields.getById("page")) options[this.options.historyType === "search" ? "search" : "hash"] = { page: 1 };

				/* Update */
				this.reload(options);
			}
		}, {
			key: "prepareRequest",
			value: function prepareRequest(options) {

				/* On empty */
				options = options || {};

				/* Hash fields */
				if (options["hash"]) page.history.set(options["hash"]);

				/* Hash fields */
				if (options["search"]) page.history.search(options["search"]);

				/* Hash fields */
				if (options["virtual"]) {
					if (this.options.historyType === "search") page.history.search(options["virtual"]);else page.history.set(options["virtual"]);
				}

				/* Write to form from hash */
				if (options.fromUrl) {
					if (this.options.historyType === "search") this.readSearch().writeForm();else this.readHash().writeForm();
				}

				/* jQuery wrap */
				if (this.options.form && !$(this.options.form).validForm()) return false;

				/* Read */
				var data = this.read();

				/* Add additional data */
				if (this.options["requestData"]) data = utils.extend(data, this.options["requestData"]);

				/* Check is same and no force requested */
				if (this.lastRequestData !== false && utils.isObjectsEqual(this.lastRequestData, data) && !options["force"]) return false;

				/* Set hash data */
				if (!options.fromUrl) this.writeURI(this.options.historyType);

				/* Before request call */
				if (this.beforeRequest) if (this.beforeRequest(data, options) === false) return false;

				/* Return data */
				return data;
			}

			/**
    * Reloads data according to params
    * @param options
    * @returns {DataOperator}
    */

		}, {
			key: "reload",
			value: function reload(options) {

				/* Prepare */
				var data = this.prepareRequest(options);

				/* Reload */
				if (data) this.request(data);

				/* Self return */
				return this;
			}

			/**
    * Performs request to reload data
    * @param data
    */

		}, {
			key: "request",
			value: function request(data) {

				/* Back link */
				var self = this;

				/* Save last data */
				self.lastRequestData = data;

				/* Stop old request */
				if (this.ajax) this.ajax.stop();

				/* Request */
				this.ajax = ajax(this.options.url, data).on("success", function (response) {
					self.lastResponse = response;
					self.render(response, data);
				}).on("error", function (error) {
					self.error(error);
				}).on("always", function () {
					self.ajax = false;
				});

				/* Create loading, auto remove when ajax finishes */
				ajaxLoadingIndicator.loading(this.ajax).reloadContent(this.options.holder);
			}

			/**
    * On success, have to be overloaded
    * @param data
    * @param request
    */

		}, {
			key: "render",
			value: function render(data, request) {}

			/**
    * On error, have to be overloaded
    * @param error
    */

		}, {
			key: "error",
			value: function error(_error) {}

			/**
    * Adds list of fields to current list
    * @param {Array} list List of names
    * @param {Boolean} [virtual] Virtual fields flag
    */

		}, {
			key: "fieldsList",
			value: function fieldsList(list, virtual) {
				var _this = this;

				/* Go through and push */
				utils.each(list, function (_, item) {
					_this.options.fields[item] = virtual;
				});

				/* Self return */
				return this;
			}

			/**
    * Sets form fields
    * @param list
    * @returns {*}
    */

		}, {
			key: "realFieldsList",
			value: function realFieldsList(list) {
				return this.fieldsList(list);
			}

			/**
    * Set none forms fields
    * @param list
    * @returns {*}
    */

		}, {
			key: "virtualFieldsList",
			value: function virtualFieldsList(list) {
				return this.fieldsList(list, true);
			}

			/**
    * Reads real fields
    * @val {string} type Field type - "real" or "virtual"
    * @returns {{}}
    */

		}, {
			key: "read",
			value: function read() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


				/* Data holder */
				var data = {};

				/* Go through */
				this.fields.each(function (field) {

					/** @let field searchField */
					if (type && (type === "real" && field.virtual || !field.virtual)) return;

					/* Read */
					field.read();

					/* Get non default or null */
					var val = field.valueOrNullOnDefault();

					/* If value not same as default */
					if (val !== null) data[field.name] = val;
				});

				/* Self return */
				return data;
			}

			/** Write current field to form */

		}, {
			key: "writeForm",
			value: function writeForm() {
				this.fields.each(function (field) {
					return field.write();
				});
				return this;
			}

			/** Reads hash to fields */

		}, {
			key: "readHash",
			value: function readHash() {
				this.fields.each(function (field) {
					return field.hashRead();
				});
				return this;
			}

			/** Reads hash to fields */

		}, {
			key: "readSearch",
			value: function readSearch() {
				this.fields.each(function (field) {
					return field.searchRead();
				});
				return this;
			}

			/** Writes current fields to hash */

		}, {
			key: "writeURI",
			value: function writeURI() {
				var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hash";


				/* To write */
				var write = {};

				/* Go through */
				this.fields.each(function (field) {
					write[field.name] = field.valueOrNullOnDefault();
				});

				/* Write to URI */
				type === "search" ? page.history.search(write) : page.history.set(write);

				/* Self return */
				return this;
			}

			/** Finds inputs associated with fields */

		}, {
			key: "initInputs",
			value: function initInputs() {

				/* Back link */
				var self = this;

				utils.each(this.options.fields, function (fieldName, virtual) {

					// Create search field
					var field = new searchField(fieldName, virtual ? self.options.historyType : false);

					/** @let field searchField */
					if (!field.virtual) {

						/* Find input */
						if (field.name[0] === "*") {
							field.name = field.name.substring(1);
							field.input = $(self.options.form).find(".selectReplaceChoose[data-input=" + field.name + "]");
						} else field.input = $(self.options.form).find('[name="' + field.name + '"]');

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
						self.fields[fieldName] = field;
					}
				});

				/* Self return */
				return this;
			}
		}]);

		return DataOperator;
	}();

	/* Interface */


	this.service = {
		initOperator: function initOperator(options) {
			return new DataOperator(options);
		},
		searchField: searchField,
		initLoader: function initLoader(loader, notifications, pagination, _ref2) {
			var _ref2$reload = _ref2.reload,
			    reload = _ref2$reload === undefined ? true : _ref2$reload,
			    _ref2$history = _ref2.history,
			    history = _ref2$history === undefined ? true : _ref2$history;


			/* Add count */
			loader.beforeRequest = function (data, options) {
				if (!loader.lastRequestData || options.force) data["count"] = true;
			};

			/* Render function */
			loader.render = function (response) {

				// Re render
				$(loader.options.holder).html('').append(templates.render("page-result-render", response));

				// Remove old
				if (loader.pagination) loader.pagination = loader.pagination.remove();

				if (typeof response.pages !== "undefined") {

					// Pages holder
					var holder = $("#pages").html('');

					// Create new
					if (response.pages > 1 && pagination) {
						loader.pagination = pagination.add({
							pages: response.pages,
							current: response.page,
							holder: holder
						});
						loader.pagination.onPageChange = function (pageNum) {
							loader.reload({ virtual: { page: pageNum } });
						};
					}
				}
			};

			/* On loading error */
			loader.error = function (error) {

				// Remove pagination on error
				if (loader.pagination) loader.pagination = this.pagination.remove();

				// Clear
				$(loader.options.holder).html('').append(notifications.message({ text: error }).render);
			};

			/* Reload */
			if (reload) loader.reload({ fromUrl: true });

			/* Set handler */
			if (history) page.history.on("change", function (searchChanged, hashChanged) {
				if (searchChanged || hashChanged) loader.reload({ fromUrl: true });
			});
		}
	};
});
"use strict";

sky.service("inputsIO", function () {

	this.service = {

		/**
   * Get value of single input
   * @param input
   * @returns {*}
   */
		readInputValue: function readInputValue(input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				var inputs = input.find("input");

				// Read
				var data = this.readInputsValues(inputs);

				// If all checked
				if (data.length === inputs.length) return true;

				// Return data
				return data;
			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.is(":checked") ? input.val() : false;
			} else return input.val() === "" ? false : input.val();
		},

		/**
   * Get value of multiple inputs
   * @param inputs
   * @returns {*}
   */
		readInputsValues: function readInputsValues(inputs) {

			/* If single input */
			if (inputs.length === 1) return this.readInputValue(inputs);

			/* Values holder */
			var valuesNamed = [],
			    valuesLined = [],
			    self = this;

			/* Go through */
			inputs.each(function () {

				/* Get value */
				var input = $(this),
				    value = self.readInputValue(input);

				/* If we get values */
				if (value !== false) {
					valuesNamed.push({ name: input.attr("name"), value: value });
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
		writeInputValue: function writeInputValue(value, input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				var inputs = input.find("input");

				// If all checked
				if (value === true) inputs.prop("checked", true);else this.writeInputsValue(value, inputs);

				if (inputs.length) inputs.first().trigger("change", { notByUser: true });
			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.prop("checked", value !== false);
			} else return input.val(value === false ? "" : value);
		},

		/**
   * Write multiple inputs value
   * @param values
   * @param inputs
   * @returns {*}
   */
		writeInputsValue: function writeInputsValue(values, inputs) {

			/* Write single */
			if (inputs.length < 2) return this.writeInputValue(values, inputs);

			/* Multiple */
			if (inputs.is(":checkbox") || inputs.is(":radio")) {
				inputs.prop("checked", false);
				if (values instanceof Array) {
					$.each(values, function (_, val) {
						inputs.filter('[value="' + val + '"]').prop("checked", true);
					});
					inputs.first().trigger("change", { notByUser: true });
				} else {
					if (values === false || values === true) inputs.prop("checked", values).first().trigger("change", { notByUser: true });else inputs.filter('[value="' + values + '"]').prop("checked", true).trigger("change", { notByUser: true });
				}
			} else {
				inputs.val(values);
			}
		}

	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("searchField", ["utils", "inputsIO"], function (_ref) {
	var utils = _ref.utils,
	    inputsIO = _ref.inputsIO;

	this.service = function () {
		function _class(name, virtual) {
			_classCallCheck(this, _class);

			this.name = name;
			this.inputName = name;
			this.virtual = virtual || false;
			this.default = null;
			this.input = false;
			this.value = null;
		}

		_createClass(_class, [{
			key: "valueOrNullOnDefault",
			value: function valueOrNullOnDefault() {
				if (this.default instanceof Array && this.value instanceof Array) return utils.isObjectsEqual(this.value, this.default) ? null : this.value;

				return this.value === this.default ? null : this.value;
			}
		}, {
			key: "read",
			value: function read() {
				if (this.virtual === "search") return this.searchRead();else if (this.virtual) return this.hashRead();else if (this.input) this.value = inputsIO.readInputsValues(this.input);

				return this.value;
			}
		}, {
			key: "write",
			value: function write() {
				if (this.input) inputsIO.writeInputsValue(this.value === null ? this.default : this.value, this.input);
				return this.value;
			}
		}, {
			key: "hashRead",
			value: function hashRead() {
				var hashValue = page.history.hashObject[this.name];
				return this.value = typeof hashValue === "undefined" ? this.default : hashValue;
			}
		}, {
			key: "searchRead",
			value: function searchRead() {
				var searchValue = page.history.searchObject[this.name];
				return this.value = typeof searchValue === "undefined" ? this.default : searchValue;
			}
		}]);

		return _class;
	}();
});
"use strict";

sky.service("directives", ["exceptions", "utils", "stackList"], function (_ref) {
	var exceptions = _ref.exceptions,
	    utils = _ref.utils,
	    stackList = _ref.stackList;


	var list = stackList(),
	    directives = this.service = {

		/**
   * Adds new directive
   * @param {string} name Directive name
   * @param {*} options Directive options
   * @param {function} directive How to parse directive
   */
		add: function add(name, options, directive) {

			/* Reset */
			if (!directive && typeof options === "function") {
				directive = options;
				options = {};
			}
			options.directive = directive;
			options.selector = name;

			/* Save */
			list.add(options);

			/* Self return*/
			return this;
		},

		/**
   * Get element attributes
   * @param element
   * @returns {{}}
   */
		getAttributes: function getAttributes(element) {

			/* Holds attributes */
			var attributes = {};

			/* Copy them to list */
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = element.get(0).attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var attr = _step.value;

					attributes[attr.nodeName] = attr.nodeValue;
				} /* Return */
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return attributes;
		},

		/**
   * Applies directive convert to element
   * @param element
   * @param options
   */
		parseElement: function parseElement(element, options) {

			/* Get element */
			element = $(element);

			/* Get element attributes */
			var attributes = this.getAttributes(element);

			/* Parse body for jason data */
			if (options["json"] || options["jsonToData"]) {

				/* Get child */
				var jsonScript = element.children('script[type="application/json"]');

				/* If we have json encoded data */
				if (jsonScript.length) {

					try {

						/* Parse json */
						var json = JSON.parse(jsonScript.text());

						/* Extend */
						utils.extend(attributes, json);

						/* Save to data */
						if (options["jsonToData"]) element.data("json", json);
					} catch (e) {
						throw new exceptions.system.Error("Element " + options.selector + " should have json stored content, but error on parse appears");
					}
				}
			}

			/* Call parse function */
			if (typeof options.directive === "function") options.directive(element, attributes);
		},

		/**
   * Searches and replaces directives in element
   * @param element
   */
		parse: function parse(element) {
			list.each(function (directive) {
				$(directive.selector, element).each(function () {
					directives.parseElement(this, directive);
				});
				if ($(element).is(directive.selector)) directives.parseElement(element, directive);
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
"use strict";

sky.service("drag", ["callbacks"], function (_ref) {
	var callbacks = _ref.callbacks;

	var self = {
		bindEvents: function bindEvents(event, events) {
			self.bind(event).on("start", events.start).on("move", events.move).on("stop", events.stop);
		},
		bind: function bind(event) {

			// Get original event
			event = event.originalEvent || event;

			// Init vars
			var started = false,
			    callbacks = callbacks();

			// Check button
			if (event.button && event.button !== 1) return callbacks;

			// Stop default action
			event.preventDefault();

			$(document).on("mousemove.drag", function (event) {

				// Start
				if (!started) {
					started = true;
					callbacks.fire("start", { event: event, x: event.pageX, y: event.pageY });
				}
				// Move
				else callbacks.fire("move", { event: event, x: event.pageX, y: event.pageY });

				// Prevent default
				event.preventDefault();
				return false;
			}).on("mouseup.drag", function (event) {

				// Off events
				$(document).off("mousemove.drag").off("mouseup.drag");

				// If not started
				if (!started) return;

				// Stop default action
				event.preventDefault();

				// Call stop callback
				callbacks.fire("stop", { event: event, x: event.pageX, y: event.pageY });
			});

			return callbacks;
		}
	};
	return self;
});
"use strict";

sky.service("history", ["callbacks", "supported"], function (_ref) {
  var callbacks = _ref.callbacks,
      supported = _ref.supported;


  /**
   * Get difference fields in objects
   * @param {object} first  Object to compare
   * @param {object} second Object to compare
   */
  var getObjectsDifference = function getObjectsDifference(first, second) {

    var difference = {},
        localDiff = false;

    /* If both arrays or objects */
    if (first instanceof Array && second instanceof Array || first instanceof Object && second instanceof Object) {

      /* Find what was changed or deleted in second */
      $.each(first, function (key, value) {

        /* If no such elements in second */
        if (typeof second[key] === "undefined") difference[key] = null; // Set to null

        /* Check if different */
        else if (localDiff = getObjectsDifference(value, second[key])) {
            difference[key] = localDiff;
          }
      });

      /* If was added */
      $.each(second, function (key, value) {
        if (typeof first[key] === "undefined") difference[key] = value;
      });

      /* Convert object to array */
      if (first instanceof Array) {
        var returnArray = [];
        $.each(difference, function (key) {
          returnArray.push(difference[key]);
        });
        difference = returnArray;
      }
    } else {
      if (first !== second) return second;else return false;
    }

    /* No array difference */
    if (difference.length === 0) return false;else return difference;
  };

  /**
   * History constructor
   * @param [options]
   * @returns {sky.History}
   * @constructor
   */
  sky.History = function (options) {

    /* Self creation */
    if (!(this instanceof sky.History)) return new sky.History(options);

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
    navigate: function navigate(path) {

      // Get path
      path = path.replace("~", this.base);

      // Get current
      var current = (window.location.pathname + window.location.search).substr(this.base.length);

      // If changes
      if (current !== path) {

        // Set new state
        history.pushState({ oldPath: this.pathString, newPath: path, search: this.searchObject }, path, path);

        // Get new
        this.pathString = window.location.pathname.substr(this.base.length);

        // Get search string
        this.searchString = this.getWindowSearch();

        // Fire event
        this.events.fire("navigate.path, always", { hash: this.hashObject, path: this.pathString, search: this.searchObject });
      }
    },

    /**
     * Fires on path change
     */
    change: function change() {

      /* Hash difference holder */
      var hashDifference = {},
          searchDifference = {},
          old = this.pathString,
          hashChanged = false,
          searchChanged = false;

      /* If api supported */
      if (this.supported) this.pathString = window.location.pathname.substr(this.base.length);

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
      if (this.pathString === old && !hashChanged && !searchChanged) return;

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
    setHash: function setHash(path) {

      /* To not jump top */
      if (path === "" && window.location.hash !== "") path = "none";

      /* Save */
      this.hashString = path;

      /* Set hash */
      window.location.hash = encodeURI(path); //encodeURI(path);
    },

    /**
     * Navigates to specified path
     * @param path
     */
    setSearch: function setSearch(path) {

      /* Set path */
      this.navigate(window.location.pathname + encodeURI(path !== "" ? "?" + path : ""));
    },

    /**
     * Sets hash letiable
     * @param {object}    elements Fields to be set
     * @param {boolean}    [force]     Replace all stored fields with elements object
     */
    set: function set(elements, force) {
      var _this = this;

      var changed = false;

      /* Force rewrite */
      if (force) this.hashObject = elements;

      /* Go through elements and add or change them */
      $.each(elements, function (key, value) {

        /* If we need delete */
        if (value === null) delete _this.hashObject[key];else _this.hashObject[key] = value;

        /* Set as changed */
        changed = true;
      });

      /* If any changes we rebuild hash */
      if (changed || force) this.setHash(decodeURIComponent(jQuery.param(this.hashObject).replace(/\+/g, " ")));

      /* Fire */
      this.events.fire("set, always", { elements: elements, hash: this.hashObject, path: this.pathString });
    },

    /**
     * Sets hash letiable
     * @param {object}    elements Fields to be set
     * @param {boolean}    [force]     Replace all stored fields with elements object
     */
    search: function search(elements, force) {

      var changed = false;

      /* Force rewrite */
      if (force) this.searchObject = elements;

      /* Go through elements and add or change them */
      $.each(elements, $.proxy(function (key, value) {

        /* If we need delete */
        if (value === null) delete this.searchObject[key];else this.searchObject[key] = value;

        /* Set as changed */
        changed = true;
      }, this));

      /* If any changes we rebuild hash */
      if (changed || force) this.setSearch(decodeURIComponent(jQuery.param(this.searchObject).replace(/\+/g, " ")));

      /* Fire */
      this.events.fire("set, always", { elements: elements, hash: this.hashObject, path: this.pathString });
    },

    /**
     * Makes hash from object
     * @param obj
     * @returns {*|void|string|XML}
     */
    stringFromObject: function stringFromObject(obj) {
      return jQuery.param(obj).replace(/\+/g, " ");
    },

    /**
     * Get objects according to hash string
     * @param {string} paramsString String which contains key=value pairs, would be parsed to object
     */
    getObjects: function getObjects(paramsString) {

      var objects = {};

      /* Remove sharp */
      if (paramsString.substr(0, 1) === '#' || paramsString.substr(0, 1) === '?') paramsString = paramsString.slice(1, paramsString.length);

      /* Split parameters */
      var subStrings = paramsString.split("&");

      /* Get params */
      $.each(subStrings, function (i, str) {

        var keyAndValue = str.split("=", 2);

        /* If no assign */
        if (keyAndValue.length < 2) return;

        var name = keyAndValue[0];

        /* Truncate brackets */
        if (name.substr(-2) === "[]") name = name.substr(0, name.length - 2);

        /* Special hash for "=" in value  */
        keyAndValue[1] = str.substr(keyAndValue[0].length + 1);

        /* If object repeats we create array */
        if (typeof objects[name] === "undefined") objects[name] = keyAndValue[1];else {
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
    getDifference: function getDifference(string, stored) {

      /* Init */
      var objects = this.getObjects(decodeURI(string));
      return getObjectsDifference(stored, objects);
    },

    /**
     * Rebuilds stored hash parameters according to current one
     */
    rebuild: function rebuild() {
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
    getWindowHash: function getWindowHash() {

      /* Get decoded hash */
      var hash = decodeURI(window.location.hash);

      /* Remove sharp */
      if (hash.substr(0, 1) === '#') hash = hash.slice(1);

      /* Return */
      return hash;
    },

    /**
     * Gets current window parameters without "?"
     * @returns {string}
     */
    getWindowSearch: function getWindowSearch() {

      /* Get decoded hash */
      var search = decodeURI(window.location.search);

      /* Remove question */
      if (search.substr(0, 1) === '?') search = search.slice(1);

      /* Return */
      return search;
    },

    /**
     * Set interval execution
     */
    start: function start() {

      /* Set base if any */
      if (this.options.base) this.base = this.options.base;

      /* If supported history */
      if (window.history) window.onpopstate = this.change.bind(this);

      /* Timeout */
      if (!this.intervalId) this.intervalId = setInterval(this.change.bind(this), this.options.time || 500);

      /* Immediately event */
      this.change();
      return this;
    }

  });
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("localStorage", ["callbacks"], function (_ref) {
	var callbacks = _ref.callbacks;


	//noinspection JSUnusedLocalSymbols
	var LocalStorage = this.service = function () {
		function _class(options) {
			_classCallCheck(this, _class);

			this.name = options.name || "global";
			this.events = callbacks();
		}

		/**
   * Loads item form database
   * @param {*} id Unique id
   */


		_createClass(_class, [{
			key: "load",
			value: function load(id) {
				var items = this.getItems();
				return items ? items[id] : undefined;
			}
		}, {
			key: "getItems",
			value: function getItems() {
				try {

					/* Try to get item from storage */
					var items = localStorage.getItem(this.name);

					/* Trigger error */
					if (items !== null) return $.parseJSON(items);
				} catch (e) {
					this.events.fire("error", { storage: this });
				}

				/* Undefined on error */
				return undefined;
			}

			/**
    * Save data to storage
    * @param id
    * @param data
    * @returns {*}
    */

		}, {
			key: "save",
			value: function save(id, data) {

				try {

					/* Save */
					var items = this.getItems() || {};

					/* Add item */
					items[id] = data;

					/* Save keys */
					localStorage.setItem(this.name, JSON.stringify(items));
				} catch (e) {
					this.events.fire("error", { storage: this });
				}

				/* Self return */
				return this;
			}

			/**
    * Removes from storage
    * @param id
    * @returns {*}
    */

		}, {
			key: "remove",
			value: function remove(id) {
				try {

					/* Save */
					var items = this.getItems();

					/* Add item */
					delete items[id];

					/* Save keys */
					localStorage.setItem(this.name, JSON.stringify(items));
				} catch (e) {
					this.events.fire("error", { storage: this });
				}

				/* Self return */
				return this;
			}
		}]);

		return _class;
	}();
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("model", ["modelsStorage", "callbacks"], function (_ref) {
	var modelsStorage = _ref.modelsStorage,
	    callbacks = _ref.callbacks;


	/**
  * List of model definitions
  */
	var modelsDefinition = {};

	var Model = function () {
		function Model(type, data) {
			_classCallCheck(this, Model);

			/* Init as base */
			this.definition = BaseDefinition;

			/* Get special if defined */
			if (modelsDefinition[type]) this.definition = modelsDefinition[type];

			/* Save id */
			this.id = data[this.definition.id] || null;
			this.type = type;
			this.data = {};
			this.events = callbacks();
			this.definition.creation.bind(this)($.extend({}, data, true));
		}

		_createClass(Model, [{
			key: "extend",
			value: function extend(data) {
				this.definition.extension.bind(this)($.extend({}, data, true));
				return this.changed();
			}
		}, {
			key: "changed",
			value: function changed() {
				this.events.fire("change", { model: this });
				return this;
			}
		}, {
			key: "removeFromStorage",
			value: function removeFromStorage() {
				modelsStorage.remove(this);
			}
		}]);

		return Model;
	}();

	/**
  * Base model definition witch would be parented
  */


	var BaseDefinition = {
		id: function id() {
			return this.data["id"];
		},
		creation: function creation(data) {
			this.data = data;
		},
		extension: function extension(data) {
			$.extend(true, this.data, data);
		}
	};

	this.service = {
		/**
   * Adds new models definition
   * @param name
   * @param definition
   */
		addDefinition: function addDefinition(name, definition) {
			modelsDefinition[name] = $.extend({}, BaseDefinition, definition);
		},

		fromData: function fromData(type, data) {

			var model = new this.Model(type, data);
			var cached = modelsStorage.add(model);

			if (cached) return cached.extend(data);

			return model;
		}
	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("modelsManager", ["callbacks", "model"], function (_ref) {
	var callbacks = _ref.callbacks,
	    model = _ref.model;

	var Manager = function () {
		function Manager(type, arr) {
			var _this = this;

			_classCallCheck(this, Manager);

			this.items = [];
			this.type = type;
			this.events = callbacks();

			$.each(arr, function (_, model) {
				_this.items.push(model);
			});
		}

		_createClass(Manager, [{
			key: "reloadFromArray",
			value: function reloadFromArray(arr) {
				var _this2 = this;

				this.items = [];
				$.each(arr, function (_, data) {
					_this2.items.push(model.fromData(_this2.type, data));
				});
			}
		}, {
			key: "count",
			value: function count() {
				return this.items.length;
			}
		}, {
			key: "addListener",
			value: function addListener(func) {
				this.events.on("change", func);
			}
		}, {
			key: "removeListener",
			value: function removeListener(func) {
				this.events.off("change", func);
			}
		}]);

		return Manager;
	}();

	this.service = {
		fromArray: function fromArray(type, arr) {
			var items = [];
			$.each(arr, function (_, data) {
				items.push(sky.model.fromData(type, data));
			});
			return new Manager(type, items);
		}
	};
});
"use strict";

sky.service("modelsStorage", function () {

	var cache = {};

	this.service = {
		add: function add(model) {

			// Search in cache
			var cached = this.search(model.type, model.id());

			// If found extend
			if (cached) return cached;

			// Create type storage if none
			if (!this.cache[model.type]) this.cache[model.type] = {};

			// Save model
			this.cache[model.type][model.id()] = model;
		},

		search: function search(type, id) {

			// Cache search
			if (cache[type] && cache[type][id]) return cache[type][id];

			// On miss
			return false;
		},

		remove: function remove(model) {
			delete cache[model.type][model.id()];
		}
	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * For work with different type of notifications
 */
sky.service("notifications", ["templates", "windows", "tips"], function (_ref) {
	var templates = _ref.templates,
	    windows = _ref.windows,
	    tips = _ref.tips;

	var Message = function () {
		function Message(_ref2) {
			var text = _ref2.text,
			    _ref2$type = _ref2.type,
			    type = _ref2$type === undefined ? "error" : _ref2$type;

			_classCallCheck(this, Message);

			this.render = templates.render("forms-message", { type: type, text: text });
		}

		/**
   * Creates new modal window and appends message to it
   * @returns {*}
   */


		_createClass(Message, [{
			key: "modal",
			value: function modal() {
				return windows.modal(this.render);
			}

			/**
    * Append to holder of modal window
    * @param {object} modal
    */

		}, {
			key: "appendToModal",
			value: function appendToModal(modal) {
				modal.holder.append(this.render);
			}

			/**
    * Shows notification in tip
    * @param object
    * @param align
    */

		}, {
			key: "tip",
			value: function tip(object, align) {
				tips.Tip(object, { create: this.render, close: 5 }).show(align || "top");
			}
		}]);

		return Message;
	}();

	return {
		message: function message(_ref3) {
			var text = _ref3.text,
			    _ref3$type = _ref3.type,
			    type = _ref3$type === undefined ? "error" : _ref3$type;
			return new Message({ text: text, type: type });
		},
		findInElement: function findInElement(element) {
			return element.find(".notificationMessage");
		}
	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("pagination", ["templates", "stackList"], function (_ref) {
	var templates = _ref.templates,
	    stackList = _ref.stackList;


	var list = stackList();

	var Pagination = function () {
		function Pagination(_ref2) {
			var pages = _ref2.pages,
			    holder = _ref2.holder,
			    _ref2$current = _ref2.current,
			    current = _ref2$current === undefined ? 1 : _ref2$current;

			_classCallCheck(this, Pagination);

			/* Self creation */
			if (!(this instanceof Pagination)) return new Pagination({ pages: pages, holder: holder, current: current });

			/* Save */
			list.add(this);

			/* Set total pages */
			this.pages = pages;
			this.current = current;
			this.pageWidth = 50;
			this.id = last;

			/* No pages needed */
			if (this.pages < 2) return this;

			/* Counted params */
			this.dimensions = {
				startPage: 1,
				lastStartPage: 0,
				pagesVisible: 0,
				pagesInvisible: 0,
				scrollAvailable: 0,
				scrollStart: 0,
				tumbler: 10
			};

			/* Render */
			this.dom = {};
			this.dom.holder = templates.render("pagination", {}).data("pagination", this);
			this.dom.slider = this.dom.holder.find(".pages");
			this.dom.pages = this.dom.slider.children();
			this.dom.back = this.dom.holder.children(".left");
			this.dom.forward = this.dom.holder.children(".right");

			/* Insert */
			if (holder) this.dom.holder.appendTo(holder);

			/* If bigger than 10000 */
			if (this.pages > 9999) {
				this.dom.slider.addClass("tenthousand");
				this.pageWidth = 80;
			}
			/* If bigger than 1000 */
			else if (this.pages > 999) {
					this.dom.slider.addClass("thousand");
					this.pageWidth = 70;
				}
				/* If bigger 100 */
				else if (this.pages > 99) {
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


		_createClass(Pagination, [{
			key: "onPageChange",
			value: function onPageChange(newPage) {}

			/** Removes navigator */

		}, {
			key: "remove",
			value: function remove() {
				this.dom.holder.remove();
				list.remove(this);
			}

			/**
    * Redraws pagination
    */

		}, {
			key: "redraw",
			value: function redraw() {

				/* No action on invisible */
				if (!this.dom.holder.is(":visible")) return;

				/* Reset width */
				this.dom.slider.css("width", "auto");

				/* Count visible sizes */
				this.dimensions.pagesVisible = Math.floor((this.dom.holder.innerWidth() - 100) / this.pageWidth);

				/* Count invisible */
				this.dimensions.pagesInvisible = this.pages - this.dimensions.pagesVisible > 0 ? this.pages - this.dimensions.pagesVisible : 0;

				/* Count last start */
				this.dimensions.lastStartPage = this.dimensions.pagesInvisible + 1;

				/* Get max pages */
				var toShow = this.dimensions.pagesVisible > this.pages ? this.pages : this.dimensions.pagesVisible;

				/* Crop */
				this.dom.slider.css("width", toShow * this.pageWidth);

				/* Redraw pages */
				this.drawPages(this.dimensions.startPage);

				/* Try to create scroll */
				this.createScroll();

				/* Set scroll position */
				if (this.dom.scrollLine) this.dom.runner.css("left", this.calculate().scroll);
			}

			/**
    * Create scroll line if needed
    */

		}, {
			key: "createScroll",
			value: function createScroll() {

				/* If no scroll needed */
				if (this.pages <= this.dimensions.pagesVisible) {
					if (this.dom.scrollLine) {
						this.dom.scrollLine.remove();
						this.dom.scrollLine = false;
					}
					return;
				} else if (!this.dom.scrollLine) {

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

		}, {
			key: "calculate",
			value: function calculate(position) {

				/* Get position */
				if (position === undefined) position = this.dom.runner.offset().left - this.dimensions.scrollStart;

				/* Remove start */
				position = position - this.dimensions.scrollStart;

				/* Correct */
				position = position > 0 ? position : 0;

				/* Count pages */
				return {
					pages: Math.floor(this.dimensions.pagesInvisible * (position / this.dimensions.scrollAvailable)) + 1,
					scroll: Math.floor(this.dimensions.scrollAvailable * (this.dimensions.startPage - 1) / this.dimensions.pagesInvisible + this.dimensions.scrollStart)
				};
			}

			/**
    * Draws pages according to start
    * @param {int} start Page to start from
    */

		}, {
			key: "drawPages",
			value: function drawPages(start) {

				/* Remove old pages */
				this.dom.pages.html("");

				/* Correct */
				if (start > this.dimensions.pagesInvisible) start = this.dimensions.pagesInvisible + 1;

				/* Correct */
				if (start < 1) start = 1;

				/* Start position */
				var i = start;

				/* Draw pages */
				while (i <= this.pages && i < start + this.dimensions.pagesVisible) {
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

		}, {
			key: "goToPage",
			value: function goToPage(page) {

				/* If no pages */
				if (this.pages < 2) return this;

				/* Parse */
				page = parseInt(page);

				/* Correct */
				if (page < 1) page = 1;else if (page > this.pages) page = this.pages;

				/* Checks if page is visible */
				var isVisible = this.dimensions.startPage <= page && page < this.dimensions.startPage + this.dimensions.pagesVisible;

				/* Redraws if needed */
				if (!isVisible) {
					this.drawPages(page);
					if (this.dom.scrollLine) this.dom.runner.css("left", this.calculate().scroll);
				}

				/* Make active */
				this.dom.pages.children().removeClass("active").filter("[page=" + page + "]").addClass("active");

				/* Forward buttons disable */
				if (page > 1) this.dom.back.enable();else this.dom.back.disable();

				/* Backward button disable */
				if (page === this.pages) this.dom.forward.disable();else this.dom.forward.enable();

				/* Callback */
				if (this.current !== page) this.onPageChange(page);

				/* Save page state */
				this.current = page;

				/* Self return */
				return this;
			}

			/** Set scroll */

		}, {
			key: "scroll",
			value: function scroll(event) {

				var pos = event.pageX - 10;
				if (this.dimensions.scrollStart > pos) pos = this.dimensions.scrollStart;
				if (this.dimensions.scrollStart + this.dimensions.scrollAvailable < pos) pos = this.dimensions.scrollStart + this.dimensions.scrollAvailable;

				this.dom.runner.css({ left: pos });
				this.drawPages(this.calculate(pos).pages);
			}
		}]);

		return Pagination;
	}();

	/* Bind windows events */


	$(window).on("resize", function () {
		var _this = this;

		list.each(function () {
			_this.redraw();
		});
	});

	/* Return */
	this.service = {
		add: function add(options) {
			return new Pagination(options);
		}
	};
});
"use strict";

sky.service("stackList", ["utils"], function (_ref) {
	var utils = _ref.utils;

	var List = this.service = function () {

		if (!(this instanceof List)) return new List();

		var elements = {};
		var lastId = 0;
		var total = 0;

		this.last = function () {

			/* Holder */
			var last = undefined;

			/* Apply for windows */
			this.each(function (element) {
				last = element;
			});

			/* Return */
			return last;
		};

		this.add = function (element) {
			var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			lastId++;
			total++;
			elements[id || lastId] = element;
		};

		this.remove = function (element) {
			/* Apply for windows */
			for (var index in elements) {
				if (elements.hasOwnProperty(index) && elements[index] === element) {
					delete elements[index];
					total--;
				}
			}
		};

		this.total = function () {
			return total;
		};

		this.getById = function (id) {
			return elements[id];
		};

		this.elements = function () {
			return elements;
		};

		this.each = function (callback) {
			utils.each(elements, function (id, single) {
				callback.apply(single, [single, id]);
			});
		};
	};
});
"use strict";

sky.onReady(function (_ref) {
	var suggester = _ref.suggester;

	$(document).on("click", function (event) {

		/* Get element */
		var element = $(event.target || event.srcElement);

		/* If click in replace we should not hide it */
		if (element.is("[type=submit]") || element.closest(".suggester").length || element.data("suggester")) return;

		/* Hide all */
		suggester.hide();
	});
});

sky.service("suggester", ["templates"], function (_ref2) {
	var templates = _ref2.templates;


	var render = void 0,
	    object = void 0,
	    lastList = void 0,
	    suggester = this.service = {
		hide: function hide() {

			if (render) {
				render.remove();
				render = false;
			}
			if (object) {
				object.removeData("suggester");
				object = false;
			}
			$(document).off("keyup.suggester, keydown.suggester");
		},
		show: function show(input, list) {

			/* Hide previous */
			suggester.hide();

			/* Save */
			lastList = list;
			render = templates.render("suggester", { items: list }).insertAfter(input.closest("label, .label"));
			object = input.data("suggester", render);

			/* Get positions */
			var elementPosition = input.offset(),
			    renderPosition = render.offset();

			/* Show */
			render.css({
				"margin-left": elementPosition.left - renderPosition.left,
				"margin-top": elementPosition.top - renderPosition.top + input.outerHeight()
			});

			/* Add handlers */
			var children = render.children().on("click", function () {
				input.val($(this).html());
				suggester.hide();
				if (lastList[$(this).attr("data-index")].callback) lastList[$(this).attr("data-index")].callback();
			});

			$(document).on("keyup.suggester", function (event) {

				if (event.keyCode === 38 || event.keyCode === 40) {

					var selected = children.filter(".selected");
					children.removeClass("selected");

					// Up
					if (event.keyCode === 38) {
						if (!selected.length || !selected.prev().length) children.last().addClass("selected");else selected.prev().addClass("selected");
					}
					// Down
					if (event.keyCode === 40) {
						children.removeClass("selected");
						if (!selected.length || !selected.next().length) {
							children.first().addClass("selected");
						} else {
							selected.next().addClass("selected");
						}
					}
				}
				// Esc
				if (event.keyCode === 27) suggester.hide();
			}).on("keydown.suggester", function (event) {

				// Enter
				if (event.keyCode !== 13) return;

				var selected = children.filter(".selected");
				if (selected.length) {
					selected.trigger("click");
					event.preventDefault();
				} else {
					suggester.hide();
				}
			});
		}
	};
});
"use strict";

/**
 * Module to work with user services
 */
sky.service("supported", function () {
	try {
		this.service.fullScreen = typeof document["webkitIsFullScreen"] !== "undefined";
		this.service.formData = window.FormData && true;
		// this.service.XHRIsSupported = XHRIsSupported;
		this.service.XHRUpload = typeof new XMLHttpRequest().upload !== "undefined";
		this.service.localStorage = !!window.localStorage;
	} catch (e) {}
});
"use strict";

sky.service("templates", ["localStorage", "supported", "directives", "exceptions", "utils"], function (_ref) {
	var localStorage = _ref.localStorage,
	    supported = _ref.supported,
	    directives = _ref.directives,
	    exceptions = _ref.exceptions,
	    utils = _ref.utils;


	var templatesList = {},
	    templatesCompiled = {},
	    Templates = this.service = {

		/** Globals list */
		globals: {},

		/** Local storage support */
		storage: supported.localStorage ? new localStorage({ name: "jsTemplates" }) : false,

		/**
   * Adds new template to list
   * @param options
   */
		add: function add(options) {
			templatesList[options.name] = options.template;
			if (this.storage) {
				this.storage.save(options.name, options.template);
				$.cookie("storedTemplates-" + options.name, options.date);
			}
		},

		renderByNameWithHolder: function renderByNameWithHolder(name, data, noDirectives) {

			/* Compile template */
			var template = this.compile(name);

			/* Add globals */
			data = utils.extend(true, {}, data, { globals: this.globals });

			/* return */
			return this.coverWithHolder(template.render(data), noDirectives);
		},

		renderByTextWithHolder: function renderByTextWithHolder(text, data, noDirectives) {

			/* Add globals */
			data = utils.extend(true, {}, data, { globals: this.globals });

			/* return */
			return this.coverWithHolder(Twig.twig({ data: text }).render(data), noDirectives);
		},

		coverWithHolder: function coverWithHolder(text, noDirectives) {

			/* Render */
			var temp = document.createElement('div');
			temp.innerHTML = text.trim();

			/* Parse directives */
			if (!noDirectives) directives.parse(temp);

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
		render: function render(name, data, noDirectives) {

			/* Compile template */
			return $(this.renderByNameWithHolder(name, data, noDirectives).childNodes);
		},

		/**
   * Renders specified template and returns text
   * @param {String} name Template name
   * @param {Object} data Inner data
   * @param {bool} [noDirectives]
   * @returns {*}
   */
		renderToText: function renderToText(name, data, noDirectives) {

			/* Compile template */
			return this.renderByNameWithHolder(name, data, noDirectives).innerHTML;
		},

		/**
   * Renders template by its text as parameter
   * @param {string} text Template text
   * @param {Object} data Inner data
   * @param {bool} [noDirectives]
   * @returns {XMLList|*}
   */
		renderByText: function renderByText(text, data, noDirectives) {
			return $(this.renderByTextWithHolder(text, data, noDirectives).childNodes);
		},

		/**
   * Renders template by its text as parameter
   * @param {string} text Template text
   * @param {Object} data Inner data
   * @param noDirectives
   * @returns {XMLList|*}
   */
		renderByTextToText: function renderByTextToText(text, data, noDirectives) {
			return this.renderByTextWithHolder(text, data, noDirectives).innerHTML;
		},

		/**
   * Compiles specified template
   * @param {string} name Template name
   */
		compile: function compile(name) {

			/* If already compiled */
			if (!templatesCompiled[name]) {

				/* Load */
				var template = this.load(name);

				/* Compile */
				var compiled = Twig.twig({ id: name, data: template });

				/* Check */
				if (!compiled) throw new exceptions.system.Error('Error during compiling template "' + name + '"');

				/* Save */
				templatesCompiled[name] = compiled;
			}

			/* Save */
			return templatesCompiled[name];
		},

		/**
   * Loads specified template
   * @param {string} name Template name
   */
		load: function load(name) {

			/* Loaded */
			var fromLS = void 0;

			/* Try to load from storage */
			if (!templatesList[name] && this.storage && (fromLS = this.storage.load(name))) return templatesList[name] = fromLS;

			/* If already compiled */
			if (templatesList[name]) return templatesList[name];

			/* Load template */
			if (!(templatesList[name] = $('script[type="text/template"][id=' + name + ']').html())) throw new exceptions.system.Error("Can't find template – " + name);

			/* Save to LS */
			if (this.storage) this.storage.save(name, { template: templatesList[name] });

			/* Return */
			return templatesList[name];
		}

	};

	sky.directive('script[type="text/template"], template', function (template, attrs) {
		Templates.add({
			name: attrs.id,
			template: template.html()
		});
	});

	/* Save templates files data */
	sky.onReady(function () {
		if (window.page.data.templates && supported.localStorage) {
			utils.each(window.page.data.templates, function (_, template) {
				$.cookie("storedTemplates-" + template.path, template.date);
			});
		}
	});
});
"use strict";

sky.service("tips", ["stackList", "callbacks"], function (_ref) {
    var stackList = _ref.stackList,
        callbacks = _ref.callbacks;


    /** Class to work with tips */
    var list = stackList(),
        tips = this.service = {

        /**
         * Hides all visible tips
         * @param withoutAutoHide
         * @param caller
         */
        hideAll: function hideAll(withoutAutoHide, caller) {

            /* Hide all tips */
            list.each(function (tip) {
                if (withoutAutoHide) tip.hide();else if (tip.autoHide && (!caller || !caller.closest(tip.tip).length && !caller.closest(tip.object).length)) {
                    tip.hide();
                }
            });
        },

        /**
         * Returns last open window if any
         * @returns {tips.Tip|boolean}
         */
        getLast: function getLast() {
            list.last();
        },

        /**
         * Add show/hide functions
         * @param {string}            selector            Object to bind tips for
         * @param {string}            align                Align of tip
         * @param options
         * @see tips.tip
         */
        bind: function bind(selector, align, options) {

            /* Create binds */
            $(selector).on({
                "mouseenter": function mouseenter() {
                    var tip = $(this).data("tip") || tips.Tip(this, options).show(align);
                },
                "mouseleave": function mouseleave() {
                    var tip = $(this).data("tip");
                    if (tip) tip.hide(align);
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
         * @param className
         * @constructor
         */
        Tip: function Tip(object) {
            var _this = this;

            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$autoHide = _ref2.autoHide,
                autoHide = _ref2$autoHide === undefined ? true : _ref2$autoHide,
                _ref2$create = _ref2.create,
                create = _ref2$create === undefined ? false : _ref2$create,
                _ref2$close = _ref2.close,
                close = _ref2$close === undefined ? false : _ref2$close,
                _ref2$ajax = _ref2.ajax,
                ajax = _ref2$ajax === undefined ? false : _ref2$ajax,
                _ref2$highlight = _ref2.highlight,
                highlight = _ref2$highlight === undefined ? false : _ref2$highlight,
                _ref2$className = _ref2.className,
                className = _ref2$className === undefined ? false : _ref2$className;

            /* Auto construct */
            if (!(this instanceof tips.Tip)) return new tips.Tip(object, { autoHide: autoHide, create: create, close: close, ajax: ajax, highlight: highlight, className: className });

            /* Old tip exists */
            if ($(object).data("tip")) return $(object).data("tip");

            /* Add to list */
            list.add(this);

            /* Manual create tip by create function */
            if (typeof create === "function") {

                /* Create tip */
                this.tip = create(object);

                /* If no tip */
                if (!this.tip) return this;
            }

            /* Object set */
            this.object = $(object).data("tip", this);

            /* Save callbacks */
            this.callbacks = callbacks();

            /* Auto hide */
            this.autoHide = autoHide;

            /* Manual create tip by create function */
            if (typeof create !== "function") {

                /* Create tip */
                this.tip = $("<div/>").addClass("tip").append('<div class="tipContent"></div>').insertBefore(object);

                /* Title using */
                if (!create && this.object.attr('title')) create = this.object.attr('title');else if (!create) create = "Пожалуйста подождите";

                this.tip.find(".tipContent").append(create);
            }

            if (highlight) this.shadow = $('<div/>').css({ opacity: 0, position: "absolute", width: "100%", height: "100%", left: 0, top: 0, background: "rgba(0,0,0,0.5)" }).appendTo("body");

            /* If count down */
            if (typeof close === "number") this.closeTimeout = setTimeout(function () {
                return _this.hide();
            }, close);

            /* If close button */
            else if (close) $('<div/>').addClass('close').appendTo(this.tip).on("click", function () {
                    return _this.hide();
                });

            /* If stop possible */
            if (ajax) ajax.on("always", function () {
                return _this.hide();
            });

            /* Add to list */
            if (className) this.tip.addClass(className);

            /* Add to list */
            this.tip.css("display", "none");

            return this;
        }

    };

    /**
     * Extends tip
     */
    $.extend(tips.Tip.prototype, /** @lends tips.tip */{

        /**
         * Shows tip according to type
         * @param {string} [align] Way it would be shown
         */
        show: function show(align) {

            /* Back link */
            var self = this;
            var offset = this.tip.css({ left: "", top: "", marginLeft: "", marginTop: "", display: "" }).addClass(align).offset();

            /* Stop animation and shows */
            this.tip.stop();

            /* Save way to show */
            if (align) this.align = align;

            /* If shadow */
            if (this.shadow) this.shadow.stop().show().animate({ opacity: 1 }, 100);

            /* Different actions according to tip position */
            switch (this.align) {

                /* If show righter than input */
                case "right":
                    {
                        this.tip.css({
                            marginLeft: this.object.offset().left + this.object.outerWidth() - offset.left,
                            marginTop: this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                            opacity: 0
                        });
                        this.tip.animate({ opacity: 1, marginLeft: "+=10" }, 100);
                        break;
                    }
                /* If show righter than input */
                case "left":
                    {
                        this.tip.css({
                            marginLeft: this.object.offset().left - offset.left - this.tip.outerWidth(),
                            marginTop: this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                            opacity: 0
                        });
                        this.tip.animate({ opacity: 1, marginLeft: "-=10" }, 300);
                        break;
                    }
                /* If show topper */
                case "top":
                    {

                        // Count left offset
                        var left = this.object.offset().left - offset.left;

                        /* Reposition */
                        if (offset.left + left + this.tip.outerWidth() > $(window).outerWidth()) left = left - this.tip.outerWidth() + this.object.outerWidth();

                        /* Position */
                        this.tip.css({
                            marginLeft: left,
                            marginTop: this.object.offset().top - this.tip.outerHeight() - offset.top,
                            opacity: 0
                        });

                        this.tip.animate({ opacity: 1, marginTop: "-=10" }, 300);
                        break;
                    }
                /* If show topper */
                case "bottom":
                    {

                        var _left = this.object.offset().left - offset.left;

                        /* Reposition */
                        if (offset.left + _left + this.tip.outerWidth() > $(window).outerWidth()) _left = _left - this.tip.outerWidth() + this.object.outerWidth();

                        /* Position */
                        this.tip.css({
                            marginLeft: _left,
                            marginTop: this.object.offset().top + this.object.outerHeight() - offset.top,
                            opacity: 0
                        });

                        this.tip.animate({ opacity: 1, marginTop: "+=10" }, 300);
                        break;
                    }
                /* If we replace input with tip */
                case "instead":
                    {
                        this.tip.css({
                            width: this.object.outerWidth(),
                            height: this.object.outerHeight(),
                            display: "none"
                        });
                        this.object.fadeOut(100, function () {
                            self.tip.fadeIn(100);
                        }).get(0).blur();
                        break;
                    }
                case "inside":
                    {
                        this.tip.css({
                            width: this.object.outerWidth(),
                            height: this.object.outerHeight(),
                            display: "none"
                        });
                        this.tip.css("opacity", 0).animate({ opacity: 1 }, 100);
                        break;
                    }
                default:
                    break;
            }

            this.tip.css({ left: "", top: "" });

            /* Self return */
            return this;
        },

        /**
         * Hides current tip
         */
        hide: function hide() {
            var _this2 = this;

            /* Remove count down if needed */
            if (this.closeTimeout) clearTimeout(this.closeTimeout);

            /* Stop animation */
            this.tip.stop();

            /* Get know how tip was shown */
            var align = this.align;

            /* Create end animation callback */
            var callback = function callback() {

                /* Delete record from global list */
                list.remove(_this2);

                /* Remove data */
                _this2.object.removeData("tip");

                /* Remove tip */
                _this2.tip.remove();

                /* Callback */
                _this2.callbacks.fire("hide", _this2);
            };

            /* If just shown */
            if (!align) callback();

            /* If shadow */
            if (this.shadow) this.shadow.animate({ opacity: 0 }, 100, function () {
                _this2.shadow.remove();
            });

            /* Right way hide */
            if (align === "right") this.tip.animate({ opacity: 0, marginLeft: "+=10" }, 100, callback);

            /* Left way hide */
            if (align === "left") this.tip.animate({ opacity: 0, marginLeft: "-=10" }, 100, callback);

            /* Instead way hide */
            if (align === "instead") this.tip.fadeOut({ opacity: 0 }, 200, callback);

            /* Top way hide */
            if (align === "top") this.tip.animate({ opacity: 0, marginTop: "-=5" }, 200, callback);

            /* Bottom way hide */
            if (align === "bottom") this.tip.animate({ opacity: 0, marginTop: "+=5" }, 200, callback);

            /* Inside way hide */
            if (align === "inside") this.tip.animate({ opacity: 0 }, 200, callback);

            /* Self return */
            return this;
        },

        /**
         * Gets tips dom
         * @returns {*}
         */
        get: function get() {
            return this.tip;
        },

        /**
         * Sets tip text
         * @param {string|jQuery} text What to insert to tip body
         */
        set: function set(text) {
            this.tip.children(".tipContent").html(text);
            return this;
        },

        /**
         * Adds something to tip
         * @param {string|jQuery} what What to append to tip body
         */
        add: function add(what) {
            this.tip.children(".tipContent").append(what);
            return this;
        }

    });
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

sky.service("utils", function () {
	this.service = {

		extend: function extend() {
			return $.extend.apply($, arguments);
		},

		each: function each() {
			return $.each.apply($, arguments);
		},

		/**
   * Checks if object has same data
   * @param first
   * @param second
   */
		isObjectsEqual: function isObjectsEqual(first, second) {

			/* Different types */
			if ((typeof first === "undefined" ? "undefined" : _typeof(first)) !== (typeof second === "undefined" ? "undefined" : _typeof(second))) return false;

			/* If object or array we will compare each element */
			if (first instanceof Array || first instanceof Object) {
				var key = void 0;
				/* Check first */
				for (key in first) {
					if (!first.hasOwnProperty(key)) continue;
					if (typeof second[key] === "undefined") return false;else if (!this.isObjectsEqual(first[key], second[key])) return false;
				}

				/* Check second */
				for (key in second) {
					if (!second.hasOwnProperty(key)) continue;
					if (typeof first[key] === "undefined") return false;
				}
			} else if (first !== second) return false; // For simple types

			/* All tests success */
			return true;
		},

		/**
   * Adds zero
   * @param value
   * @returns {Number}
   */
		addLeadingZero: function addLeadingZero(value) {

			/* Parse */
			value = parseInt(value);

			/* Ad zero */
			if (value < 10) value = "0" + value;

			/* Val */
			return value;
		},

		encode: function encode(rawStr) {
			return rawStr.replace(/[\u00A0-\u9999<>&]/gim, function (i) {
				return '&#' + i.charCodeAt(0) + ';';
			});
		},

		/**
   * Makes data to JSON past
   * @param data
   * @param [inputName]
   * @returns {string}
   */
		jsonData: function jsonData(data, inputName) {
			return '<script type="application/json"' + (inputName ? ' input-name="' + inputName + '"' : "") + '>' + sky.encode(JSON.stringify(data)) + '</script>';
		},

		prepareSelectData: function prepareSelectData(items, func, _ref) {
			var _ref$columnSplitOn = _ref.columnSplitOn,
			    columnSplitOn = _ref$columnSplitOn === undefined ? 6 : _ref$columnSplitOn,
			    _ref$maxColumns = _ref.maxColumns,
			    maxColumns = _ref$maxColumns === undefined ? 4 : _ref$maxColumns;


			var index = 0,
			    columns = [],
			    columnsCount = items.length / columnSplitOn,
			    groupHolder = void 0,
			    compiled = void 0;

			if (columnsCount < 1) columnsCount = 1;
			if (columnsCount > maxColumns) columnsCount = maxColumns;

			var perColumn = Math.ceil(items.length / columnsCount);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (compiled = func({ item: item, index: index, column: columns.length })) {

						if (index % perColumn === 0) {
							groupHolder = [];
							columns.push(groupHolder);
						}

						groupHolder.push(compiled);
						index++;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return index === 0 ? [] : { groups: columns };
		}
	};
});
"use strict";

sky.onReady(function (_ref) {
	var validator = _ref.validator;

	jQuery.fn.validForm = function () {
		return validator.validateForm(this);
	}.safe();
	jQuery.fn.validationRule = function (name, options) {
		return validator.addRule(this, name, options);
	}.safe();
	$(document).on("change keyup", "[data-validate]", function () {
		validator.validateElement($(this));
	});
});

sky.service("validator", function () {

	/**
  * Main validation object
  */
	var validator = this.service = {

		/**
   * Validates specified form, or dom element
   * @param form
   */
		validateForm: function validateForm(form) {

			var pass = true,
			    self = this;

			/* Go through all elements that need to be validate */
			form.find("input, select, textarea, .selectReplace, [data-validate]").filter(":visible").each(function () {

				/* Get element */
				var element = $(this);

				/* validate if needed to */
				if (self.shouldBeValidated(element) && !self.validateElement(element, form)) pass = false;
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
		addRule: function addRule(element, name, options) {

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
		validateElement: function validateElement(element, form) {

			var self = this,
			    options = this.Options(element),
			    totalPass = true,
			    value = element.val(),
			    lastError = false,
			    firstError = false,
			    lastSuccess = false,
			    firstSuccess = false;

			/* Select replace */
			if (element.is(".selectReplace")) {
				var inputs = element.next().find("input:checked");
				if (!inputs.length) value = "";else if (element.is(".single")) value = element.next().find("input:checked").val();else value = element.next().find("input:checked").length ? "true" : "";
			}

			/* Go through rules */
			$.each(options.rules, function (name, ruleOverload) {

				/* Make compiled rule */
				var compiledRule = jQuery.extend(true, {}, self.rules[name] || self.Rule({}), ruleOverload || {});

				/* Execute message is needed */
				if (typeof compiledRule.message === "function") compiledRule.message = compiledRule.message.call(this);

				/* Check if element pass validation */
				var pass = self.validate(value, compiledRule, element, form);

				/* Perform action according to result */
				if (pass) {
					compiledRule.onSuccess(element, compiledRule);
					lastSuccess = compiledRule;
					if (!firstSuccess) firstSuccess = compiledRule;
				} else {
					compiledRule.onError(element, compiledRule);
					lastError = compiledRule;
					if (!firstError) firstError = compiledRule;
					totalPass = false;
				}
			});

			/* Total callbacks */
			if (totalPass) options.onSuccess(element, lastSuccess);else options.onError(element, firstError);

			/* Return true of element passed all validations */
			return totalPass;
		},

		/**
   * Return true if element should be validated
   * @param {*} element Element to validate
   * @returns {boolean}
   */
		shouldBeValidated: function shouldBeValidated(element) {
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
		validate: function validate(value, compiledRule, element, form) {
			return compiledRule.rule.call(compiledRule, value, element, form);
		}

	};

	/**
  * Defaults
  */
	validator.ruleDefaults = {};

	/**
  * Defaults
  * @type {{onSuccess: onSuccess, onError: onError}}
  */
	validator.optionsDefaults = {

		/* Fires on success */
		onSuccess: function onSuccess(element) {

			/* Remove error */
			element.removeClass(this.errorClass);

			/* Add success */
			if (this.successClass) element.addClass(this.successClass);
		},

		/* Fires on error */
		onError: function onError(element) {

			/* Add error */
			element.addClass(this.errorClass);

			/* Remove success */
			if (this.successClass) element.removeClass(this.successClass);
		}
	};

	/**
  * Base rule object
  * @param overload
  * @returns {validator.Rule}
  * @constructor
  */
	validator.Rule = function (overload) {

		/* Self creation if needed */
		if (!(this instanceof validator.Rule)) return new validator.Rule(overload);

		/* Dump rule to check validation */
		this.rule = function () {
			return true;
		};

		/* Dump message */
		this.message = "Это поле заполнено не верно";

		/* List of options to make validation according to */
		this.options = [];

		/* Fires on success */
		this.onSuccess = function (element) {};

		/* Fires on error */
		this.onError = function (element) {};

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
			rule: function rule(value) {
				return !!value.length;
			},
			message: "Это поле необходимо заполнить"
		}),
		requiredIfFilled: validator.Rule({
			rule: function rule(value) {
				var item = $(this.options[0]);
				return item.is(":radio, :checkbox") ? !item.is(":checked") || value : item.val() === "" || value;
			},
			message: "Это поле необходимо заполнить"
		}),
		date: validator.Rule({
			rule: function rule(value) {
				return !value || value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/) || value.match(/^\d{2}.\d{2}.\d{4}( \d{2}:\d{2}(:\d{2})?)?$/);
			},
			message: "Дата указана неверно"
		}),
		period: validator.Rule({
			rule: function rule(value) {
				return !value || value.match(/^\d{4}-\d{2}-\d{2}$/) || value.match(/^\d{2}.\d{2}.\d{4}$/) || value.match(/^\d{2}.\d{2}.\d{4}\s*-\s*\d{2}.\d{2}.\d{4}$/) || value.match(/^\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}$/);
			},
			message: "Период указан неверно"
		}),
		email: validator.Rule({
			rule: function rule(value) {
				return value && value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
			},
			message: "Почтовый адрес указан неверно"
		}),
		same: validator.Rule({
			rule: function rule(value) {
				return value === $('[name="' + this.options[0] + '"]').val();
			},
			message: "Поля не совпадают"
		}),
		url: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(/^(https?:\/\/.+)$/);
			},
			message: "Не корректный адрес URI"
		}),
		regexp: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(new RegExp(this.options[0]));
			},
			message: "Введите корректное значение"
		}),
		numeric: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(/^-?[0-9]+(\.[0-9]+)?$/);
			},
			message: "Введите число"
		}),
		positive: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) > 0;
			},
			message: "Введите положительное число"
		}),
		max: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) <= parseFloat(this.options[0] || 0);
			},
			message: function message() {
				return "Введите число, не обльше чем " + (this.options[0] || 0);
			}
		}),
		min: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) >= parseFloat(this.options[0] || 0);
			},
			message: function message() {
				return "Введите число, не меньше чем " + (this.options[0] || 0);
			}
		}),
		minLength: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.length >= (this.options[0] || 0);
			},
			message: "В этом поле нехватает символов"
		}),
		maxLength: validator.Rule({
			rule: function rule(value) {
				return value === "" || value.length <= (this.options[0] || 0);
			},
			message: "В этом поле слишком много символов"
		})
	};

	/**
  * Holds element validation options
  * @param element
  * @constructor
  */
	validator.Options = function (element) {

		/* Create or return */
		if (!(this instanceof validator.Options)) return element.data("validationOptions") || new validator.Options(element);

		/* Callbacks after all checks */
		this.onSuccess = function () {};
		this.onError = function () {};

		/* Adds to element on success */
		this.successClass = false;

		/* Adds to element on error */
		this.errorClass = "error";

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
		getDeclaredRules: function getDeclaredRules() {

			/* Get attribute value */
			var attr = this.element.attr("data-validate"),
			    self = this;

			/* If none */
			if (!attr) return;

			/* Get list */
			$.each(attr.split(";"), function (_, name) {

				/* Get parameters */
				var params = name.match(/(\w+)\((.*)\)/);

				/* Parse */
				if (params) {

					/* Get function */
					name = params[1];

					/* Parse params */
					params = params[2].match(/(('[^']+')|([\d\w]+))/g);
					$.each(params, function (i, val) {
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
		addRule: function addRule(name, options) {

			/* Create and save new rule */
			this.rules[name] = jQuery.extend({}, validator.ruleDefaults, options);

			/* Mark for auto validation */
			if (!this.element.attr("data-validate")) this.element.attr("data-validate", "true");

			/* Self returning */
			return this;
		}

	};
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

sky.service("visibleCalculator", function () {

	var Calculator = function () {
		function Calculator(holder, minHeight, scrollable) {
			_classCallCheck(this, Calculator);

			/* Check if class */
			if (!(this instanceof Calculator)) return new Calculator(holder, minHeight, scrollable);

			/* Re get holder */
			this.holder = $(holder);
			this.scrollable = scrollable || $('body');
			this.minHeight = minHeight || 0;

			/* Init */
			this.init();
		}

		/* Init func */


		_createClass(Calculator, [{
			key: "init",
			value: function init() {

				/* Count offset */
				var offset = this.holder.offset();

				/* Get holder rect */
				this.holderRect = {
					left: offset.left,
					top: offset.top,
					width: this.holder.outerWidth(),
					height: this.holder.outerHeight()
				};
			}

			/* Calculating function */

		}, {
			key: "calculate",
			value: function calculate() {

				/* How much is scrolled */
				var scrollTop = $(this.scrollable).scrollTop(),
				    windowHeight = $(window).height(),
				    windowWidth = $(window).width(),
				    sizes = {
					left: this.holderRect.left,
					right: this.holderRect.left + this.holderRect.width,
					top: this.holderRect.top - scrollTop,
					width: this.holderRect.width,
					height: this.holderRect.height,
					realHeight: this.holderRect.height,
					bottom: 0,
					scrollTop: scrollTop,
					scrollLeft: 0,
					windowHeight: windowHeight,
					windowWidth: windowWidth
				};

				/* Min height */
				if (sizes.height < this.minHeight) sizes.height = this.minHeight;

				/* Count bottom */
				sizes.bottom = sizes.top + sizes.height;

				/* If top border near than holder */
				if (sizes.top < 0) {
					// If visible less than min
					if (sizes.bottom < this.minHeight) {
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
				if (windowHeight < sizes.bottom) {
					// If visible less than min
					if (windowHeight - sizes.top < this.minHeight) {
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
		}, {
			key: "getDropOffset",
			value: function getDropOffset(replace, popup) {

				/* Get drop */
				if (!popup.is(":visible")) return;

				/* Set position to zeros to get max width and height */
				popup.removeClass('hidden').css({ left: 0, top: 0 });

				/* Init */
				var popupInnerWidth = popup.innerWidth(),
				    popupWidth = popup.outerWidth(),
				    popupHeight = popup.outerHeight();

				/* Reset position */
				popup.css({ marginLeft: "", marginTop: "", width: "", left: "", top: "" });

				/* Init */
				var win = $(window),
				    replaceOffset = replace.offset(),
				    popupOffset = popup.offset(),
				    leftDifference = popupOffset.left - replaceOffset.left,
				    topDifference = popupOffset.top - replaceOffset.top,
				    middle = false,
				    visible = this.calculate(),
				    top = 0,
				    left = 0;

				// Drop down
				if (visible.bottom + popupHeight <= visible.windowHeight) top = -topDifference + visible.realHeight + 1;
				// Drop up
				else if (visible.top > popupHeight) top = -topDifference - 1 - popupHeight;
					// Drop left
					else {
							top = -topDifference - (popupHeight - visible.realHeight) / 2;
							middle = true;
						}

				/* Set position */
				if (!middle) {
					if (visible.windowWidth > visible.left + popupWidth) left = -leftDifference;else left = -leftDifference - popupWidth + visible.width;
				} else {
					if (win.width() > replaceOffset.left + popupWidth + visible.width) left = replaceOffset.left - popupOffset.left + visible.width;else left = replaceOffset.left - popupOffset.left - popupWidth;
				}

				return { top: top, left: left, width: popupInnerWidth };
			}
		}]);

		return Calculator;
	}();
	this.service = Calculator;
});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Holds classes to work with modal/new windows
 */
sky.service('windows', ["templates", "callbacks", "stackList"], function (_ref) {
	var templates = _ref.templates,
	    callbacks = _ref.callbacks,
	    stackList = _ref.stackList;


	var tips = false,
	    list = stackList(),
	    windows = this.service = {
		/**
   * Returns last open window if any
   * @returns {Modal|undefined}
   */
		getLast: function getLast() {
			return list.last();
		},
		/**
   * Returns new modal window
   * @returns {Modal}
   */
		modal: function modal(name, data) {
			return new Modal(name, data);
		}
	};

	/**
  * Creates new modal window
  * @param {*} name Window name
  * @param {*} [data] Data to send with request
  */

	var Modal = function () {
		function Modal(name, data) {
			_classCallCheck(this, Modal);

			/* Create window */
			this.locked = false;
			this.background = templates.render("windows-modal", {}).appendTo("#pageContentHolder").data("modalWindow", this);
			this.dataContainer = this.background.children();
			this.holder = this.dataContainer.children(".windowData");
			this.closeButton = this.dataContainer.children(".close");

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

		/**
   * Renders window content
   * @param {*} name Window name
   * @param {*} [data] Data to send with request
   */


		_createClass(Modal, [{
			key: "reRender",
			value: function reRender(name, data) {

				/* Close all tips */
				if (tips) tips.hideAll(true);

				/* Clear */
				this.holder.html('');

				/* Render content */
				if (name instanceof jQuery) this.template = name.appendTo(this.holder);else if (typeof name === "string") this.template = templates.render(name, data).appendTo(this.holder);

				/* Self return */
				return this;
			}

			/**
    * Removes all except that was rendered
    */

		}, {
			key: "clearExceptTemplate",
			value: function clearExceptTemplate() {
				this.holder.children().detach();
				this.holder.append(this.template);
			}

			/**
    * Removes all except that was rendered
    */

		}, {
			key: "removeNotifications",
			value: function removeNotifications() {
				try {
					sky.service("notifications").findInElement(this.holder).remove();
				} catch (e) {}
			}

			/**
    * Locks window so it can't be closed
    * @var {*} ajax Ajax object
    * @returns {Modal}
    */

		}, {
			key: "lock",
			value: function lock() {
				var ajax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				this.locked = true;
				this.closeButton.hide();
				if (ajax) ajax.on("preSuccess", function () {
					this.dataContainer.css("height", this.dataContainer.innerHeight());
				}, this).on("notAbort", function () {
					var self = this;
					this.unlock();
					this.dataContainer.css("height", this.holder.outerHeight());
					setTimeout(function () {
						self.dataContainer.css("height", "");
					}, 500);
				}, this).on("abort", function () {
					this.unlock().close();
				}, this);
				return this;
			}

			/**
    * Unlocks window so it can be closed
    * @returns {Modal}
    */

		}, {
			key: "unlock",
			value: function unlock() {
				this.locked = false;
				this.closeButton.show();
				return this;
			}

			/**
    * Closes current window
    * @param {boolean} [byUser] Indicates that window was closed not by user
    */

		}, {
			key: "close",
			value: function close() {
				var byUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


				/* If windows is locked */
				if (this.locked) return;

				/* Remove elements */
				this.background.fadeOut("fast", function () {
					$(this).remove();
				});

				/* Delete from list */
				list.remove(this);

				/* Call close callback */
				this.callbacks.fire("close", { byUser: byUser });

				/* Close all tips */
				try {
					tips = sky.service("tips").hideAll(true);
				} catch (e) {}

				/* Make body scrollable */
				if (list.total() < 1) $(document.body).css("overflow", "");

				return this;
			}
		}]);

		return Modal;
	}();

	try {
		tips = sky.service("tips");
	} catch (e) {}

	/* Add handler to black area click */
	$(document).on("keyup", sky.func(function (event) {
		var last = void 0;

		/* If slide show was disabled */
		if (document["webkitIsFullScreen"] || document["mozIsFullScreen"] || document["isFullScreen"]) return;

		/* Close current window */
		if (event.keyCode === 27 && (last = windows.getLast())) last.close(true);
	}));
});
"use strict";

sky.action("pagination", {

	setPage: function setPage(button, _, page) {

		/* Get pagination */
		var pagination = button.parents(".pagination").data("pagination");

		/* Correct page */
		if (page === "next") page = pagination.current + 1;

		/* Correct  */
		if (page === "previous") page = pagination.current - 1;

		/* Go to page */
		pagination.goToPage(page);
	},

	scrollTo: function scrollTo(element, event) {

		/* Get pagination */
		var pagination = element.parents(".pagination").data("pagination");

		/* Move */
		pagination.scroll(event);
	},

	grab: function grab(runner) {

		/* Get pagination */
		var pagination = runner.parents(".pagination").data("pagination");

		/* Binds */
		$(window).on("mouseup.pagination", function () {
			$(window).off("mouseup.pagination mousemove.pagination");
		}).on("mousemove.pagination", function (event) {
			pagination.scroll(event);
		});
	},

	next: function next(button, _) {
		this.setPage(button, _, "next");
	},

	previous: function previous(button, _) {
		this.setPage(button, _, "previous");
	}

});
"use strict";

sky.action("selectReplace", function (_ref) {
    var visibleCalculator = _ref.visibleCalculator;


    var filter = function filter(self, event) {

        /* Get drop */
        var popup = self.closest(".selectReplaceChoose"),
            inputs = popup.find("input[name]");

        /* On enter */
        if (event.which === 13) {
            var visible = popup.find("label:visible");
            if (visible.length > 0) {
                inputs.prop("checked", false);
                visible.children("input").prop("checked", true).trigger("change");
            }
            event.stopPropagation();
        }

        /* Get value */
        var value = self.val(),
            rus = "йцукенгшщзхъфывапролджэёячсмитьбю",
            eng = "qwertyuiop[]asdfghjkl;'\\zxcvbnm,.",
            expression = new RegExp(value.toLowerCase()),
            expressionInvert = new RegExp(value.toLowerCase().replace(/[a-zа-яё]/g, function (character) {
            if (rus.indexOf(character) > -1) return eng[rus.indexOf(character)];
            if (eng.indexOf(character) > -1) return rus[eng.indexOf(character)];
            return character;
        }));

        /* Hide */
        inputs.each(function (_, input) {

            input = $(input);

            if (input.parent().hasClass('hidden')) return;

            var inputHtml = input.next().html().toLowerCase();

            try {
                if (!inputHtml.match(expression) && !inputHtml.match(expressionInvert)) input.parent().hide();else input.parent().show();
            } catch (e) {}
        });
    };

    return {

        filter: filter,

        selectAll: function selectAll(button) {

            /* Get drop */
            var popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", true).first().trigger("change");
        },

        unSelectAll: function unSelectAll(button) {

            /* Get drop */
            var popup = button.closest(".selectReplaceChoose");
            popup.find(":checkbox:visible").prop("checked", false).first().trigger("change");
        },

        close: function close(element, event) {
            if (element.get(0) === event.target) $(".selectReplaceChoose").addClass('hidden');
        },

        showTip: function showTip(label) {

            var originalTip = label.find(".checkItemTip");

            /* If no tip element or tip already shown */
            if (!originalTip.length || label.data("tip")) return;

            var popup = label.closest(".selectReplaceChoose");
            var tip = originalTip.clone().removeClass("hidden").appendTo("body");
            tip.css({
                left: popup.offset().left,
                top: popup.offset().top + popup.outerHeight() + 5
            });
            label.data("tip", tip);
        },

        hideTip: function hideTip(label) {
            if (!label.data("tip")) return;
            label.data("tip").remove();
            label.removeData("tip");
        },

        /**
         * Shows drop down
         * @param replace Input
         */
        drop: function drop(replace) {

            /* Hide all */
            $(".selectReplaceChoose").addClass('hidden');

            /* Get drop */
            var popup = replace.next(),
                dropOffset = new visibleCalculator(replace).getDropOffset(replace, popup.removeClass('hidden'));

            /* If cant calculate offset */
            if (!dropOffset) return;

            popup.css({ marginLeft: dropOffset.left, marginTop: dropOffset.top });

            if (replace.outerWidth() > popup.outerWidth()) popup.css("width", replace.outerWidth());

            /* Search focus */
            if (popup.find(".search").length) popup.find(".search input").val('').focus();
        },

        change: function change(element, event) {

            /* Get inputs */
            var popup = element.closest(".selectReplaceChoose"),
                inputs = popup.find("input:radio, input:checkbox"),
                current = void 0,
                change = void 0,
                children = false,
                replace = popup.prev(),
                val = "";

            var _replace$data = replace.data("defaults"),
                defaultValue = _replace$data.defaultValue,
                defaultAllValue = _replace$data.defaultAllValue;

            /* Un select all */


            popup.find("label").removeClass("selected");

            /* Get checked */
            var filtered = inputs.filter(":checked").each(function () {
                current = $(this);
                current.closest("label").addClass("selected");
                children = current.next();
                val = (val && val + ", ") + children.text();
            });

            /* Make text shorter */
            if (val.length > 26) val = val.substr(0, 26).trim() + "...";

            /* If all checked */
            if (filtered.length === inputs.length && !popup.hasClass("single")) val = defaultAllValue;

            /* Set input html */
            if (popup.hasClass("single") && children) replace.html('').prepend(children.clone().removeClass("name"));else if (!children) replace.html(defaultValue);else replace.text(val);

            /* If not fake event */
            if (event && current) replace.trigger("change", { value: current.val(), item: element });

            /* Hide on single-select */
            if (popup.hasClass("single")) popup.addClass('hidden');
        }

    };
});
"use strict";

sky.directive("select", function (select, attrs) {
	var options = attrs || {};
	options.items = [];
	options.selected = null;
	select.find("option").each(function (_, option) {
		options.items.push({ html: option.innerHTML, value: option.value, checked: !!option.selected });
	});
	var replace = sky.service("templates").renderByText("{% import forms as forms %}{{ forms.selectReplace(options, items) }}", { options: options, items: options.items });
	replace.replaceElement(select);
});
sky.directive(".selectReplaceChoose", function (popup, attrs) {
	var replace = popup.prev();
	replace.data("defaults", {
		defaultValue: replace.html() || '-',
		defaultAllValue: replace.text() || "Все"
	});

	/* Trigger */
	setTimeout(function () {
		popup.find("input:radio, input:checkbox").first().trigger("change");
	}, 1);
});

sky.onReady(function () {
	$(document).on("click touchstart", function (event) {

		/* Get element */
		var element = $(event.target || event.srcElement);

		/* If click in replace we should not hide it */
		if (element.closest(".selectReplaceChoose").length || element.closest(".selectReplace").length) return;

		/* Hide all */
		$(".selectReplaceChoose").addClass('hidden');
	});
});
"use strict";

sky.action("suggest", function (suggester) {
    return {
        adverts: function adverts(input, event) {

            // Events
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27) return;

            // Stop if any other
            if (this.suggestAjax) this.suggestAjax.stop();

            // Nothing
            if (input.val() == "" || input.val().length < 2) {
                suggester.hideAll();
                return;
            }

            this.suggestAjax = sky.ajax("/ajax/members/search", { name: input.val() }).on("success", function (response) {

                // No filtered
                if (!response.adverts || !response.adverts.length) suggester.hideAll();

                var filtered = [];

                $.each(response.adverts, function (_, advert) {
                    filtered.push(advert.username);
                });

                // Show
                suggester.show(input, filtered);
            }).on("error", function () {
                suggester.hideAll();
            });
        },

        campaigns: function campaigns(input, event) {

            // Events
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27) return;

            // Stop if any other
            if (this.suggestAjax) this.suggestAjax.stop();

            // Nothing
            if (input.val() == "" || input.val().length < 2) {
                suggester.hideAll();
                return;
            }

            this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() }).on("success", function (response) {

                // No filtered
                if (!response.campaigns || !response.campaigns.length) suggester.hideAll();

                var filtered = [];

                $.each(response.campaigns, function (_, campaign) {

                    filtered.push({ html: campaign.name });
                });

                // Show
                suggester.show(input, filtered);
            }).on("error", function () {
                suggester.hideAll();
            });
        },

        campaignsSpecial: function campaignsSpecial(input, event) {
            // Events
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 27) return;

            // Nothing
            if (input.val() == "" || input.val().length < 2) {
                suggester.hideAll();
                return;
            }

            if (this.suggestAjax) this.suggestAjax.stop();

            this.suggestAjax = sky.ajax("/ajax/campaigns/search", { name: input.val() }).on("success", function (response) {

                // No filtered
                if (!response.campaigns || !response.campaigns.length) suggester.hideAll();

                var filtered = [];

                $.each(response.campaigns, function (_, campaign) {

                    filtered.push({ html: campaign.name + " (" + campaign.advert.username + ")", callback: function callback() {
                            sky.actions.perform(null, null, "page.selectCampaign", [campaign.id]);
                        } });
                });

                // Show
                suggester.show(input, filtered);
            }).on("error", function () {
                suggester.hideAll();
            });
        }
    };
});
"use strict";

sky.directive("[data-suggests]", function (element, attributes) {
	element.attr("data-event", "keyup: suggest." + attributes["data-suggests"]).attr("autocomplete", "off");
});
"use strict";

sky.action("tips", function (_ref) {
	var tips = _ref.tips;


	// Get
	var body = $('body'),
	    events = body.attr("data-event") || "",
	    event = "click: tips.hideTips";

	// Add
	body.attr("data-event", events ? events + "; " + event : event);

	var self = {

		showTip: function showTip(button, _, name) {

			if (button.data("tip")) {
				button.data("tip").hide();
				return;
			}

			// Hide others
			self.hideTips(button, false);

			// Create
			var tip = tips.Tip(button, {
				create: $('<div/>').css("overflow", "hidden").append($("#" + name + "TipText").html())
			});

			// Show
			tip.show("top");
		},

		showTipWithText: function showTipWithText(button, _, text) {

			if (button.data("tip")) {
				button.data("tip").hide();
				return;
			}

			// Hide others
			self.hideTips(button, false);

			// Create
			var tip = tips.Tip(button, {
				create: $('<div/>').css("overflow", "hidden").append(text)
			});

			// Show
			tip.show("top");
		},

		hideTips: function hideTips(element, event) {
			tips.hideAll(false, $(event.target));
		},

		/**
   *
   */
		forceHideTips: function forceHideTips() {
			tips.hideAll(true);
		}
	};
	return self;
});
"use strict";

sky.directive("[data-tip]", function (button, attributes) {

	// Get
	var events = attributes["data-event"] || "",
	    tipName = attributes["data-tip"],
	    event = "click: tips.showTip('" + tipName + "')";

	// Set new
	events = events ? events + "; " + event : event;

	// Add
	button.attr("data-event", events).addClass("dashed");
});
sky.directive("[data-tip-text]", function (button, attributes) {

	// Get
	var events = attributes["data-event"] || "",
	    tipText = attributes["data-tip-hover"] || attributes["data-tip-text"],
	    event = "click: tips.showTipWithText('" + tipText + "')";

	// Set new
	events = events ? events + "; " + event : event;

	// Add
	button.attr("data-event", events).addClass("dashed");
});
sky.directive("[data-tip-hover]", function (button, attributes) {

	// Get
	var tipText = attributes["data-tip-hover"];

	sky.service("tips").bind(button, "top", { create: tipText });

	// Set new
	var events = attributes["data-event"] || "",
	    event = "click: tips.showTipWithText('" + tipText + "')";
	events = events ? events + "; " + event : event;

	// Add
	button.attr("data-event", events).addClass("dashed");
});
"use strict";

/**
 * Fire services init done
 */
sky.exec(function () {
  sky.servicesDeferred.resolve();
});
"use strict";

//noinspection JSUnusedGlobalSymbols
sky.action("shared", {

	/**
  * Close parent window
  * @param self
  * @param event
  */
	closeWindow: function closeWindow(self, event) {

		/* Close */
		if (event.target && event.target === self.get(0)) self.closest(".windowShadow").data("modalWindow").close();
	},

	/**
  * Stops form form submit if not valid
  * @param form
  */
	validForm: function validForm(form) {
		if (form.validForm()) form.get(0).submit();
	},

	/**
  * Stops form form submit if not valid
  * @param button
  * @param event
  */
	clearForm: function clearForm(button, event) {
		var form = button.closest("form");
		form.get(0).reset();
		form.find("input").trigger("change");
	},

	/**
  * Reorders current result rows without request
  * @param button
  * @param _
  * @param orderField
  * @param type
  */
	changeOrder: function changeOrder(button, _, orderField, type) {

		var order = button.hasClass("desc") ? "asc" : "desc",
		    table = button.closest("table"),
		    first = table.find("th:last").parent(),
		    trs = table.find("tr:not(.orderSkip):not(.footer):not(.header)"),
		    cell1 = void 0,
		    cell2 = void 0,
		    convert = type !== 'datetime' && type !== "text";

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
				var buttonTr = button.closest("tr");
				var index = buttonTr.find("td, th").index(button.closest("td, th"));
				cell1 = $(firstTr).find("td:eq(" + index + ")");
				cell2 = $(secondTr).find("td:eq(" + index + ")");
			}

			// Get TDs values
			var val1 = cell1.attr("data-value") || cell1.html();
			var val2 = cell2.attr("data-value") || cell2.html();

			// Convert
			if (convert) {
				val1 = parseFloat(val1);
				val2 = parseFloat(val2);
			}

			// Compare
			if (val1 === val2 || convert && isNaN(val1) && isNaN(val2)) return 0;else if (val1 > val2 || convert && isNaN(val2)) return order === "desc" ? 1 : -1;else return order === "desc" ? -1 : 1;
		}).insertAfter(first);
	},

	changeOrderReload: function changeOrderReload(button, _, orderField) {

		// Get order
		var order = button.hasClass("desc") ? "asc" : "desc";

		// Remove order classes from all buttons
		button.closest("tr").find("a").removeClass("asc desc");

		// Add order class to button
		button.addClass(order);

		// Set hash and reload
		page.history.set({ order: order, orderField: orderField });
		page.currentLoader.reload();
	}

});
"use strict";

sky.directive("input.autoHttp", function (input) {
	input.on("focus", function () {
		if (input.val() === "") input.val("http://").get(0).selectionStart = 7;
	});
});
"use strict";

/**
 * Fire project init done
 */
sky.exec(function () {
  document.body.classList.remove("hidden");
  sky.projectDeffered.resolve();
});
//# sourceMappingURL=project.js.map
