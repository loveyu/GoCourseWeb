/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
	nav: function (name, link, title, active) {
		return {
			active: active, name: name, link: link, title: title
		};
	}, ajax: function (url, method, data, success_callback) {
		jQuery.ajax({
			url: url,
			dataType: "json",
			data: data,
			method: method,
			xhrFields: {
				withCredentials: true
			},
			success:success_callback
		});
	}, redirect: function (url) {
		window.location.href = url;
	}
};