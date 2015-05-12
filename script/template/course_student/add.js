_methods_ = {
	onAdd: function (id) {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course_table.student_select_add, "post", {id: id}, function (result) {
			if (result.status) {
				for (var i in obj.list) {
					if (obj.list[i].course.courseTableID == id) {
						obj.list[i].selected = 1;
					}
				}
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_