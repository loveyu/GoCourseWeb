_methods_ = {
	/**
	 * 设置当前的课程信息
	 */
	set_course_info: function () {
		var obj = this;
		obj.form.name = obj.course_data.courseName +
		"(" + obj.course_data.teacherName + ")"
		+ "，第" + obj.week.week + "周上课签到，" +
		"星期" + CONST_MAP.weekMap[(new Date()).getDay()];
	},
	onSubmit: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = null;
		if (obj.form.name == "") {
			obj.error = "签到名称不能为空";
			return false;
		}
		var t = +obj.form.time;
		if (isNaN(t) || t < 1 || t > 1000) {
			obj.error = "有效时间为1~1000之间";
			return false;
		}
		obj.form.time = t;
		FUNC.ajax(CONFIG.api.sign.create, "post", obj.form, function (result) {
			if (result.status) {
				obj.result = result.data;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
};//_methods_