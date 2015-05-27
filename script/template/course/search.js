_methods_ = {
	onSearch: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course.search, "get", {query: this.search}, function (result) {
			obj.is_init = false;
			if (result.status) {
				obj.course_list = result.data;
				obj.course_list_empty = FUNC.isEmpty(result.data);
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	onCourseClick: function (index) {
		index = parseInt(index);
		var call = this.course != index;
		this.course = index;
		this.courseName = this.course_list[this.course];
		if (call) {
			if (typeof this.callback == "function") {
				this.callback(index);
			} else {
				console.warn("未定义搜索回调函数")
			}
		}
	}
};//_methods_