_methods_ = {
	init: function () {
		var obj = this;
		obj.error1 = "";
		FUNC.ajax(CONFIG.api.course_table.get + "/" + this.course_table_id, "get", {}, function (reslut) {
			if (reslut.status) {
				obj.ct_info = reslut.data;
				obj.loading = false;
			} else {
				obj.error1 = reslut.msg;
			}
		});
	},
	set_correct: function (is_correct) {
		if (is_correct === this.is_correct) {
			return;
		}
		this.is_correct = is_correct;

		//开始查询
		var obj = this;
		obj.error2 = "";
		FUNC.ajax(CONFIG.api.quiz_student.history, "get", {
			is_correct: obj.is_correct,
			course_table_id: obj.course_table_id
		}, function (result) {
			if (result.status) {
				obj.quiz_obj = result.data.quiz;//必须依照该顺序，否则会导致警告
				obj.execs = result.data.execs;
			} else {
				obj.error2 = result.msg;
				obj.execs = [];
				obj.quiz_obj = {};
			}
		});
	}
};//_methods_
_props_ = ['data'];//_props_

_data_ = function () {
	return {
		correct_map: CONST_MAP.history_answer_correct,
		loading: true,
		course_info: null,
		is_correct: null,
		course_table_id: undefined,//courseTableId,unload
		execs: null,
		quiz_obj: {},
		ct_info: null,
		error1: "",
		error2: ""
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_