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
		obj.college.years = [];
		obj.college.classes = [];
		obj.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_class_year, "get", {dept_id: obj.form.department}, function (result) {
			if (result.status) {
				obj.college.years = FUNC.arrToObjArr(result.data.class_year, "year");
			} else {
				obj.college.years = [];
			}
		});
	},
	yearChange: function (event) {
		var obj = this;
		obj.college.classes = [];
		obj.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_classes, "get", {
			dept_id: obj.form.department,
			year: obj.form.year
		}, function (result) {
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
			this.form.classes.push(val);
		} else {
			var new_c = [];
			for (var i in this.form.classes) {
				if (this.form.classes[i] != val) {
					new_c.push(this.form.classes[i]);
				}
			}
			this.form.classes = new_c;
		}
	},
	onSearchName: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "必须选择专业后进行查询课程";
			return false;
		}
		if (obj.search.name == "") {
			obj.error = "必须指定一个课程名称进行搜索";
			return false;
		}
		FUNC.ajax(CONFIG.api.schedule.search, "get", {
			department: obj.form.department,
			course_name: obj.search.name,
			year: new Date().getFullYear(),
			status: 0,
			detail: 2
		}, function (result) {
			if (result.status) {
				obj.data.course_name = result.data.result;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	addLocation: function (event) {
		var obj = this;
		obj.location.push({
			location: '',
			slot: 1,
			day: 1,
			week: '',
			notice: ''
		});
	},
	/**
	 * 移除某一个上课地点
	 */
	removeLocation: function (index) {
		var obj = this;
		var new_l = [];
		for (var i in obj.location) {
			if (i == index)continue;
			new_l.push(obj.location[i])
		}
		obj.location = new_l;
	},
	onSubmit: function (event) {
		event.preventDefault();
		var obj = this;
		obj.form.location = "";
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "请选择一个专业";
			return false;
		}
		if (obj.form.year == "") {
			obj.error = "必须选择合适的入学年份";
			return false;
		}
		if (obj.form.classes.length == 0) {
			obj.error = "没有选择一个合适的班级";
			return false;
		}
		if (obj.form.scheduleID == "") {
			obj.error = "必须查询一个课程添加到当前课程表";
			return false;
		}
		if (obj.location.length < 1) {
			obj.error = "至少有一个上课地点";
			return false;
		}
		for (var i in obj.location) {
			var x = obj.location[i];
			var x_n = "第" + (parseInt(i) + 1) + "个";
			if (x.location == "") {
				obj.error = x_n + "上课地点不能为空";
				return false;
			}
			if (x.slot < 1 || x.slot > 6) {
				obj.error = x_n + "上课节次不正确";
				return false;
			}
			if (x.day < 1 || x.day > 7) {
				obj.error = x_n + "上课星期不正确";
				return false;
			}
			if (x.week == "") {
				obj.error = x_n + "上课周次不能为空";
				return false;
			}
		}
		obj.form.location = JSON.stringify(obj.location);
		//var tmp = FUNC.clone(obj.form);
		//tmp.classes = tmp.classes.join(",");
		FUNC.ajax(CONFIG.api.course_table.add, "post", obj.form, function (result) {
			if (result.status) {
				obj.error = "";
				obj.success = "成功添加该课程";
				obj.form = {
					department: "",
					year: "",
					notice: "",
					scheduleID: "",
					classes: [],
					location: ""
				};
				obj.location = [];
				setTimeout(function (obj) {
					if (obj != null && obj.hasOwnProperty("success")) {
						obj.success = "";
					}
				}, 5000)
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_