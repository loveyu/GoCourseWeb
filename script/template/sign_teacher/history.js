_methods_ = {
	load_history: function () {
		var obj = this;
		obj.error = null;
		FUNC.ajax(CONFIG.api.sign.teacher_list, "get", {}, function (result) {
			if (result.status) {
				obj.list = result.data.list;
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		})
	}
};//_methods_