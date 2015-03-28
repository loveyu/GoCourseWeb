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
			url: url, dataType: "json", data: data, method: method, xhrFields: {
				withCredentials: true
			}, success: success_callback
		});
	}, redirect: function (url) {
		window.location.href = url;
	}, fileUpload: function (url, formData, callback) {
		var xhr = new XMLHttpRequest(); //创建请求对象
		xhr.open("POST", url, true);
		xhr.addEventListener("load", callback, false);
		xhr.send(formData);
	},parseJSON:function(data){
		return jQuery.parseJSON(data);
	}
};