_methods_ = {
	onAdd: function (id) {
		var obj = this;
		obj.data.error = "";
		FUNC.ajax(CONFIG.api.course_table.student_select_add, "post", {id: id}, function (result) {
			if (result.status) {
				for (var i in obj.data.list) {
					if (obj.data.list.hasOwnProperty(i) && obj.data.list[i].course.courseTableID == id) {
						obj.data.list[i].selected = 1;
					}
				}
			} else {
				obj.data.error = result.msg;
			}
		});
	}
};//_methods_

_props_ = {
	data: Object
};//_props_