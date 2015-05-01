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
					obj.success = "";
				}, 3000);
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
};//_methods_