_methods_ = {
	load: function (id) {
		var obj = this;
		obj.loading = true;
		obj.error = null;
		FUNC.ajax(CONFIG.api.course_table.get + "/" + id, "get", {
			set_class_info: 1,
			set_location: 1
		}, function (result) {
			obj.loading = false;
			if (result.status) {
				obj.table = result.data;
			} else {
				obj.table = null;
				obj.error = result.msg;
			}
		});
	}
};//_methods_