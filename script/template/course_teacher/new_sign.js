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

		return false;
	}
};//_methods_