sky.directive("input.autoHttp", function(input) {
	input.on("focus", function() {
		if(input.val() === "") input.val("http://").get(0).selectionStart = 7;
	});
});