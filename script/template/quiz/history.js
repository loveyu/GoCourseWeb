_methods_ = {
	load_all: function () {
		this.course_search.callback = this.change_course;
		this.search();
	},
	search: function () {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_student.history, "get", {
			is_correct: obj.is_correct,
			course_id: obj.course_search.course
		}, function (result) {
			if (result.status) {
				obj.quiz_obj = result.data.quiz;//必须依照该顺序，否则会导致警告
				obj.execs = result.data.execs;
			} else {
				obj.error = result.msg;
				obj.execs = [];
				obj.quiz_obj = {};
			}
		});
	},
	change_course: function (courseId) {
		this.search();
	}
};//_methods_

_props_ = {
	data: Object
};//_props_