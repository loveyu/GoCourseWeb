_methods_ = {
	init: function () {
		this.course_search.callback = this.load_course;
	},
	load_course: function (courseId) {
		var obj = this;
		obj.error2 = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share_list, "get", {
			course_id: obj.course_search.course
		}, function (result) {
			if (result.status) {
				obj.quiz_list = result.data.list;
			} else {
				obj.quiz_list = [];
				obj.error2 = result.msg;
			}
		});
	},
	onShare: function (index) {
		var obj_vue = this;
		obj_vue.error2 = "";
		var obj = this.quiz_list[index];
		if (obj.quiz.status) {
			//取消共享
			FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share_cancel, "post", {
				quiz_id: obj.quiz.quizID
			}, function (result) {
				if (result.status) {
					obj.quiz.status = 0;
				} else {
					obj_vue.error2 = result.msg;
				}
			});
		} else {
			//共享
			FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share, "post", {quiz_id: obj.quiz.quizID}, function (result) {
				if (result.status) {
					obj.quiz.status = 1;
				} else {
					obj_vue.error2 = result.msg;
				}
			});
		}
	}
};//_methods_

_props_ = {
	data: Object
};//_props_