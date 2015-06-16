_methods_ = {
	load: function (id) {
		var obj = this;
		obj.error = null;
		obj.loading = true;
		FUNC.ajax(CONFIG.api.sign.student_get + "/" + id, "get", {}, function (result) {
			if (result.status) {
				obj.sign = result.data;
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		})
	}
};//_methods_