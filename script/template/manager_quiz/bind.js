_methods_ = {
	load: function (curseTable) {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course_table.get + "/" + curseTable, "get", {}, function (reslut) {
			if (reslut.status) {
				obj.courseTableInfo = reslut.data;
			} else {
				obj.error = reslut.msg;
			}
		});
		this.t_bind();
	},
	t_bind: function () {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.bind_list, "get", {course_table: obj.course_table}, function (result) {
			if (result.status) {
				obj.bindQuiz = result.data.list;
			} else {
				obj.error = result.msg;
			}
		});
	},
	t_unbind: function () {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.unbind_list, "get", {course_table: obj.course_table}, function (result) {
			if (result.status) {
				obj.unbindQuiz = result.data.list;
			} else {
				obj.error = result.msg;
			}
		});
	},
	t_share: function () {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.unbind_share_list, "get", {course_table: obj.course_table}, function (result) {
			if (result.status) {
				obj.shareQuiz = result.data.list;
			} else {
				obj.error = result.msg;
			}
		});
	},
	onBind: function (index) {
		var obj = this;
		var quiz_id = obj.unbindQuiz[index].quiz.quizID;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.bind_quiz, "post", {
			quiz_id: quiz_id,
			course_table: obj.course_table
		}, function (result) {
			if (result.status) {
				obj.unbindQuiz = FUNC.cloneArrExclude(obj.unbindQuiz, index);
			} else {
				obj.error = result.msg;
			}
		});
	},
	onShareBind: function (index) {
		var obj = this;
		var quiz_id = obj.shareQuiz[index].quiz.quizID;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.bind_quiz, "post", {
			quiz_id: quiz_id,
			course_table: obj.course_table
		}, function (result) {
			if (result.status) {
				obj.shareQuiz = FUNC.cloneArrExclude(obj.shareQuiz, index);
			} else {
				obj.error = result.msg;
			}
		});
	},
	onCancelBind: function (index) {
		var obj = this;
		var quiz_id = obj.bindQuiz[index].quiz.quizID;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_teacher.bind_quiz_cancel, "post", {
			quiz_id: quiz_id,
			course_table: obj.course_table
		}, function (result) {
			if (result.status) {
				obj.bindQuiz = FUNC.cloneArrExclude(obj.bindQuiz, index);
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_