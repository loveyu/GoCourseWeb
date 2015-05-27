_methods_ = {
	load_all: function () {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_student.history, "get", {
			is_correct: obj.is_correct
		}, function (result) {
			if (result.status) {
				obj.quiz_obj = result.data.quiz;//必须依照该顺序，否则会导致警告
				obj.execs = result.data.execs;
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_