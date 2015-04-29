_methods_ = {
	submitCourseAdd: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.name == "") {
			obj.error = "名称不允许为空";
			return false;
		}
		FUNC.ajax(CONFIG.api.course.add, "post", {name: obj.form.name}, function (result) {
			obj.error = "";
			if (result.status) {
				obj.course_list.push(result.data);
				obj.form.name = "";
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	courseClick: function (event) {
		var elem = jQuery(event.target);
		var id = elem.data("value");
		var name = elem.text();
		var obj = this;
		if (confirm("你确认删除该课程么？[" + id + "]" + name)) {
			obj.error = "";
			FUNC.ajax(CONFIG.api.course.del, "POST", {id: id}, function (result) {
				if (result.status) {
					obj.error = "";
					var n_data = [];
					for (var i in obj.course_list) {
						if (obj.course_list[i].id != id) {
							n_data.push(obj.course_list[i]);
						}
					}
					obj.course_list = n_data;
				} else {
					obj.error = result.msg;
				}
			});
		}
	}
};//_methods_