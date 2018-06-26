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