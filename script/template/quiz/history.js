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

_props_ = ['data'];//_props_

_data_ = function () {
	return {
		execs: null,
		quiz_obj: {},
		error: '',
		is_correct: undefined,//unload
		correct_map: CONST_MAP.history_answer_correct,
		course_search: {
			is_init: true,
			search: '',
			title: '指定测验课程',
			course: -1,
			courseName: "",
			error: "",
			course_list_empty: false,
			course_list: [],
			callback: null
		}
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_