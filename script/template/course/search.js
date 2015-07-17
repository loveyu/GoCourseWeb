_methods_ = {
	/**
	 * @param event 可以手动调用搜索参数，如果event值为null,同时手动设置search对象
	 * @param call 成功后的回调函数，对象参数this
	 * @returns {boolean}
	 */
	onSearch: function (event, call) {
		if (event != null) {
			event.preventDefault();
		}
		var obj = this;
		obj.data.error = "";
		FUNC.ajax(CONFIG.api.course.search, "get", {query: this.data.search}, function (result) {
			obj.data.is_init = false;
			if (result.status) {
				obj.data.course_list = result.data;
				obj.data.course_list_empty = FUNC.isEmpty(result.data);
				if (typeof call == "function") {
					call(obj);
				}
			} else {
				obj.data.error = result.msg;
			}
		});
		return false;
	},
	onCourseClick: function (index) {
		index = parseInt(index);
		var call = this.data.course != index;
		this.data.course = index;
		this.data.courseName = this.data.course_list[this.data.course];
		if (call) {
			if (typeof this.data.callback == "function") {
				this.data.callback(index);
			} else {
				console.warn("未定义搜索回调函数")
			}
		}
	}
};//_methods_

_props_ = ['data'];//_props_

_created_ = function () {
	if (typeof this.data.init_call === "function") {
		this.data.init_call(this);
	}
};//_created_