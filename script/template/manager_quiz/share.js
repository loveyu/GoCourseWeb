_methods_ = {
	onSearch: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course.search, "get", {query: this.search}, function (result) {
			obj.is_init = false;
			if (result.status) {
				obj.course_list = result.data;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
};//_methods_