_methods_ = {
	createMultiOptionObj: function (size, option_size) {
		var rt = [];
		for (var i = 0; i < size; i++) {
			var option = [];
			for (var j = 0; j < option_size; j++) {
				option.push(j);
			}
			rt.push({now_index: i, now_option: option});
		}
		return rt;
	},
	checkChoiceStatus: function (quiz) {
		if (typeof quiz.answer == "object") {
			if (quiz.size == 0) {
				for (var i in quiz.answer) {
					if (quiz.answer[i] > -1) {
						return true;
					}
				}
			} else {
				for (var i in quiz.answer) {
					//复杂性的，必须全有效
					if (quiz.answer[i] == -1) {
						return false;
					}
				}
				return true;
			}
		} else if (typeof quiz.answer == "number") {
			return quiz.answer > -1;
		}
	},
	/**
	 * 单选点击事件
	 */
	onSingleClick: function (quiz, optionIndex) {
		quiz.answer = optionIndex;
	},
	/**
	 * 简单多选点击事件
	 */
	onSimpleMultiClick: function (quiz, optionIndex) {
		quiz.answer[optionIndex] = quiz.answer[optionIndex] == optionIndex ? -1 : optionIndex;
	},
	onMultiClick: function (quiz, index, optionIndex) {
		quiz.answer[index] = optionIndex;
	},
	onSubmitSingle: function (index, quiz) {
		if (quiz['submit_lock']) {
			alert("提交中，勿重复");
			return false;
		}
		quiz['error'] = '';
		quiz['submit_lock'] = true;
		FUNC.ajax(CONFIG.api.quiz_student.do_test, "post", {
			quiz_id: quiz.quizID,
			answer: this.compOptionWithIndex(index, quiz.answer)
		}, function (result) {
			quiz['submit_lock'] = false;
			if (result.status) {
				quiz['success'] = true;
			} else {
				quiz['error'] = result.msg;
			}
		});
		return true;
	},
	compOptionWithIndex: function (quiz_index, list_arr) {
		if (typeof list_arr == "number") {
			return this.list[quiz_index].options[list_arr].optionID;
		} else {
			var arr = [];
			for (var i in list_arr) {
				if (list_arr[i] > -1) {
					arr.push(this.list[quiz_index].options[list_arr[i]].optionID);
				}
			}
			return arr.join(",");
		}
	}
};//_methods_

_props_ = {
	data: Object
};//_props_