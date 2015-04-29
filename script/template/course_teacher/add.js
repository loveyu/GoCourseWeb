_methods_ = {
	setDept: function (college_id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: college_id}, function (result) {
			if (result.status) {
				obj.college.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
			} else {
				obj.college.departments = [];
			}
		});
	},
	departmentChange: function (event) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_classes, "get", {dept_id: obj.form.department}, function (result) {
			if (result.status) {
				obj.college.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
			} else {
				obj.college.classes = [];
			}
		});
	},
	classChange: function (event) {
		var obj = jQuery(event.target);
		var val = obj.val();
		if ((obj.is(":checked"))) {
			this.form.classes[val] = val;
		} else {
			if (this.form.classes.hasOwnProperty(val)) {
				delete this.form.classes[val];
			}
		}
		console.log(this.form.classes)
	}
};//_methods_