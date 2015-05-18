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
	},
	onShare: function (index) {
		var obj_vue = this;
		obj_vue.error = "";
		var obj = this.quiz_list[index];
		if (obj.quiz.status) {
			//取消共享
			FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share_cancel, "post", {quiz_id: obj.quiz.quizID}, function (result) {
				if (result.status) {
					obj.quiz.status = 0;
				} else {
					obj_vue.error = result.msg;
				}
			});
		} else {
			//共享
			FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share, "post", {quiz_id: obj.quiz.quizID}, function (result) {
				if (result.status) {
					obj.quiz.status = 1;
				} else {
					obj_vue.error = result.msg;
				}
			});
		}
	}
};//_methods_