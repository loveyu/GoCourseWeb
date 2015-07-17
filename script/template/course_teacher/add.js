_methods_ = {
	setDept: function (college_id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: college_id}, function (result) {
			if (result.status) {
				obj.data.college.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
			} else {
				obj.data.college.departments = [];
			}
		});
	},
	departmentChange: function (event) {
		var obj = this;
		obj.data.college.years = [];
		obj.data.college.classes = [];
		obj.data.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_class_year, "get", {dept_id: obj.data.form.department}, function (result) {
			if (result.status) {
				obj.data.college.years = FUNC.arrToObjArr(result.data.class_year, "year");
			} else {
				obj.data.college.years = [];
			}
		});
	},
	yearChange: function (event) {
		var obj = this;
		obj.data.college.classes = [];
		obj.data.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_classes, "get", {
			dept_id: obj.data.form.department,
			year: obj.data.form.year
		}, function (result) {
			if (result.status) {
				obj.data.college.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
			} else {
				obj.data.college.classes = [];
			}
		});
	},
	classChange: function (event) {
		var obj = jQuery(event.target);
		var val = obj.val();
		if ((obj.is(":checked"))) {
			this.data.form.classes.push(val);
		} else {
			var new_c = [];
			for (var i in this.data.form.classes) {
				if (this.data.form.classes[i] != val) {
					new_c.push(this.data.form.classes[i]);
				}
			}
			this.data.form.classes = new_c;
		}
	},
	onSearchName: function (event) {
		event.preventDefault();
		var obj = this;
		obj.data.error = "";
		if (obj.data.form.department == "") {
			obj.data.error = "必须选择专业后进行查询课程";
			return false;
		}
		if (obj.data.search.name == "") {
			obj.data.error = "必须指定一个课程名称进行搜索";
			return false;
		}
		FUNC.ajax(CONFIG.api.schedule.search, "get", {
			department: obj.data.form.department,
			course_name: obj.data.search.name,
			year: new Date().getFullYear(),
			status: 0,
			detail: 2
		}, function (result) {
			if (result.status) {
				obj.data.data.course_name = result.data.result;
			} else {
				obj.data.error = result.msg;
			}
		});
		return false;
	},
	addLocation: function (event) {
		var obj = this;
		obj.data.location.push({
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
		for (var i in obj.data.location) {
			if (i == index)continue;
			new_l.push(obj.data.location[i])
		}
		obj.data.location = new_l;
	},
	onSubmit: function (event) {
		event.preventDefault();
		var obj = this;
		obj.data.form.location = "";
		obj.data.error = "";
		if (obj.data.form.department == "") {
			obj.data.error = "请选择一个专业";
			return false;
		}
		if (obj.data.form.year == "") {
			obj.data.error = "必须选择合适的入学年份";
			return false;
		}
		if (obj.data.form.classes.length == 0) {
			obj.data.error = "没有选择一个合适的班级";
			return false;
		}
		if (obj.data.form.scheduleID == "") {
			obj.data.error = "必须查询一个课程添加到当前课程表";
			return false;
		}
		if (obj.data.location.length < 1) {
			obj.data.error = "至少有一个上课地点";
			return false;
		}
		for (var i in obj.data.location) {
			var x = obj.data.location[i];
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
		obj.data.form.location = JSON.stringify(obj.data.location);
		//var tmp = FUNC.clone(obj.form);
		//tmp.classes = tmp.classes.join(",");
		FUNC.ajax(CONFIG.api.course_table.add, "post", obj.data.form, function (result) {
			if (result.status) {
				obj.data.error = "";
				obj.data.success = "成功添加该课程";
				obj.data.form = {
					department: "",
					year: "",
					notice: "",
					scheduleID: "",
					classes: [],
					location: ""
				};
				obj.data.location = [];
				setTimeout(function (obj) {
					if (obj != null && obj.hasOwnProperty("success")) {
						obj.data.success = "";
					}
				}, 5000)
			} else {
				obj.data.error = result.msg;
			}
		});
	}
};//_methods_

_props_ = {
	data: Object
};//_props_

_created_ = function () {
	this.data.call(this);
};//_created_