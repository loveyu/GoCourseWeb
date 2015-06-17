_methods_ = {
	setDept: function (college_id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: college_id}, function (result) {
			if (result.status) {
				obj.data.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
			} else {
				obj.data.departments = [];
			}
		});
	},
	submitScheduleAdd: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.schedule.add, "post", obj.form, function (result) {
			if (result.status) {
				obj.form = {
					department: "",
					name: "",
					openYear: new Date().getFullYear(),
					openTerm: "",
					fromWeek: "",
					endWeek: "",
					requirement: "",
					content: ""
				};
				obj.success = "成功添加了课程";
				setTimeout(function () {
					if (obj != null && obj.hasOwnProperty("success")) {
						obj.success = "";
					}
				}, 3000);
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	onSelectCourseName: function (name) {
		var obj = this;
		obj.form.name = name;
	},
	onSearchName: function () {
		var obj = this;
		obj.courseName.error = false;
		obj.courseName.list = null;
		obj.error = null;
		FUNC.ajax(CONFIG.api.course.search, "get", {query: obj.form.name}, function (result) {
			if (result.status) {
				var i = 0;
				var list = [];
				for (var id in result.data) {
					++i;
					list.push(id);
				}
				if (i === 0) {
					obj.error = "没有查询到课程";
					obj.courseName.error = true;
					return;
				}
				if (i === 1) {
					obj.form.name = result.data[list[0]];
				} else {
					obj.courseName.list = result.data;
				}
			} else {
				obj.error = result.msg;
				obj.courseName.error = true;
			}
		});
	}
};//_methods_