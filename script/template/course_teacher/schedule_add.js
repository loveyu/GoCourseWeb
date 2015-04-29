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

		return false;
	}
};//_methods_