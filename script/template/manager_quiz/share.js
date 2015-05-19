_methods_ = {
	onSearch: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course.search, "get", {query: this.search}, function (result) {
			obj.is_init = false;
			if (result.status) {
				obj.course_list = result.data;
				obj.course_list_empty = FUNC.isEmpty(result.data);
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	onCourseClick: function (index) {
		this.course = parseInt(index);
		this.courseName = this.course_list[this.course];
		this.load_course(this.course)
	},
	load_course: function (courseId) {
		var obj = this;
		obj.error2 = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share_list, "get", {course_id: obj.course}, function (result) {
			if (result.status) {
				obj.quiz_list = result.data.list;
			} else {
				obj.quiz_list = [];
				obj.error2 = result.msg;
			}
		});
	},
	onShare:function(index){
		var obj_vue = this;
		obj_vue.error2 = "";
		var obj = this.quiz_list[index];
		if (obj.quiz.status) {
			//取消共享
			FUNC.ajax(CONFIG.api.quiz_teacher.quiz_share_cancel, "post", {quiz_id: obj.quiz.quizID}, function (result) {
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