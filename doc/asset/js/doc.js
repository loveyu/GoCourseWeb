jQuery(function ($) {
	$("h2").each(function (index, elem) {
		var text = $(elem).text();
		if (/^[a-zA-Z0-9_-]+$/.test(text)) {
			$(elem).attr("id", text);
		}
	});
});
