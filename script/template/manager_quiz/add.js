_methods_ = {
	load: function () {
		this.loadCourseList();
		this.initQuiz();
	},
	checkQuizEmpty: function () {
		if (this.model.quiz.title != "") {
			return false;
		}
		for (var i in this.model.quiz.options) {
			if (this.model.quiz.options[i] != "") {
				return false;
			}
		}
		if (this.model.quiz.desc != "") {
			return false;
		}
		return true;
	},
	loadCourseList: function () {
		var obj = this;
		obj.quiz_empty = obj.checkQuizEmpty();
		obj.model.course = -1;
		obj.course_list = null;
		obj.loading = true;
		obj.course_list_empty = false;
		FUNC.ajax(CONFIG.api.quiz_teacher.course_list, "get", {status: this.model.status}, function (result) {
			if (result.status) {
				obj.course_list = result.data;
				obj.course_list_empty = FUNC.isEmpty(obj.course_list);
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		});
	},
	initQuiz: function () {
		var A_code = 'A'.charCodeAt(0);
		for (var i = 0; i < 4; i++) {
			this.model.quiz_name.push({key: String.fromCharCode(A_code + i), correct: false});
			this.model.quiz.options.push("");
		}
	},
	onCourseChange: function (event) {
		this.loadCourseList();
	},
	onCourseClick: function (index) {
		this.model.course = index;
	},
	onQuizAdd: function () {
		var len = this.model.quiz_name.length;
		if (len == 26) {
			this.error = "最大允许26个选项";
			return;
		}
		var A_code = 'A'.charCodeAt(0);
		if (len > 0) {
			A_code = this.model.quiz_name[len - 1].key.charCodeAt(0);
		}
		this.model.quiz_name.push({key: String.fromCharCode(A_code + 1), correct: false});
		this.model.quiz.options.push("");
	},
	onQuizRemove: function () {
		this.model.quiz_name.pop();
		this.model.quiz.options.pop();
	},
	onSetCorrect: function (index) {
		this.model.quiz_name[index].correct = !this.model.quiz_name[index].correct;
	},
	onSubmit: function (event) {
		var obj = this;
		obj.error = "";
		if (obj.model.quiz.title == "") {
			obj.error = "测试标题不能为空";
			return;
		}
		obj.model.quiz.correct = [];
		for (var i in obj.model.quiz_name) {
			if (obj.model.quiz.options[i] == "") {
				obj.error = "任何测试答案不允许为空，如:" + String.fromCharCode(+i + 'A'.charCodeAt(0));
				return;
			}
			if (obj.model.quiz_name[i].correct) {
				obj.model.quiz.correct.push(i);
			}
		}
		var l2 = obj.model.quiz.correct.length;
		if (l2 == 0) {
			obj.error = "必须选择一个以上的正确答案";
			return;
		}
		if (l2 > 1) {
			//检测多选答案位子，多个不做处理
			var list = obj.model.quiz.title.match(/__([A-Z]?)__/g);
			if (list == null) {
				obj.error = "标题中没有匹配的多选答案列表";
				return;
			}
			var matches = [];
			for (var i in list) {
				var code = +list[i].charCodeAt(2) - 'A'.charCodeAt(0);
				var flag = false;
				for (var j in matches) {
					if (code == matches[j]) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					matches.push(code);
				}
			}
			matches.sort();
			obj.model.quiz.correct.sort();
			var l1 = matches.length;
			if (l1 != l2) {
				obj.error = "答案提示与对应的答案长度列表不一致";
				return;
			}
			for (i = 0; i < l1; i++) {
				if (matches[i] != obj.model.quiz.correct[i]) {
					obj.error = "答案中的选项列表与标题中存在不一致的情况，请检查对应的选项是否设置为正确选项。";
					return;
				}
			}
		}
		console.log(obj.model.quiz);
		//noting
	}
};//_methods_