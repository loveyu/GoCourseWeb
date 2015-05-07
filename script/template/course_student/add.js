_methods_ = {
	onAdd: function (id) {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course_table.student_select_add, "post", {id: obj.list[id].course.courseTableID}, function (result) {
			if (result.status) {
				obj.list[id].selected = 1;
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_