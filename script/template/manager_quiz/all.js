_methods_ = {
	load: function () {
		this.loadCourseList();
	},
	loadCourseList: function () {
		var obj = this;
		obj.model.course = -1;
		obj.course_list = null;
		obj.loading = true;
		obj.course_list_empty = false;
		obj.error1 = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.course_list, "get", {status: this.model.status}, function (result) {
			if (result.status) {
				obj.course_list = result.data;
				obj.course_list_empty = FUNC.isEmpty(obj.course_list);
			} else {
				obj.error1 = result.msg;
			}
			obj.loading = false;
		});
	},
	onCourseChange: function (event) {
		this.loadCourseList();
	},
	onCourseClick: function (index) {
		this.model.course = parseInt(index);
		this.loadQuiz();
	},
	loadQuiz: function () {
		var obj = this;
		obj.quiz_list = null;
		obj.error2 = "";
		obj.quiz_list_empty = false;
		FUNC.ajax(CONFIG.api.quiz_teacher.quiz_list, "get", {course_id: this.model.course}, function (result) {
			if (result.status) {
				obj.quiz_list = result.data.list;
				obj.quiz_list_empty = FUNC.isEmpty(obj.quiz_list);
			} else {
				obj.error2 = result.msg;
			}
		});
	}
};//_methods_