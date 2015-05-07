_methods_ = {
	onAdd: function (id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.course_table.student_select_add, "post", {id: obj.list[id].course.courseTableID}, function (result) {
			console.log(result);
		});
	}
};//_methods_