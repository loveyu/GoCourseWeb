_methods_ = {
	load_course_table: function () {
		var obj = this;
		FUNC.ajax(CONFIG.api.quiz_student.get_test_list, "get",
			{course_table_id: this.id},
			function (result) {
				if (result.status) {
					if (FUNC.isEmpty(result.data.list)) {
						obj.warning = "测试列表为空";
					} else {
						var list = obj.parse_property(result.data.list);
						console.log(list);
						obj.answer = list.answer;
						obj.quiz_list = list.list;
					}
				} else {
					obj.error = result.msg;
				}
			}
		);
	},
	/**
	 * 解析返回的测验信息列表
	 */
	parse_property: function (quiz_list) {
		var answer = {};
		for (var k in quiz_list) {
			if (!quiz_list.hasOwnProperty(k)) {
				continue;
			}
			if (quiz_list[k].quiz.type == CONST_MAP.quiz_type.multiple) {
				var title_obj = FUNC.quiz.parse_title(quiz_list[k].quiz.title);
				quiz_list[k].quiz.title = title_obj.title;
				quiz_list[k].quiz['size'] = title_obj.size;
				answer[quiz_list[k].quiz.quizID] = FUNC.createArray(title_obj.size == 0 ? quiz_list[k].options.length : title_obj.size, -1);
				quiz_list[k]['answer'] = answer[quiz_list[k].quiz.quizID];
			} else {
				quiz_list[k].quiz['size'] = 1;
				answer[quiz_list[k].quiz.quizID] = "-1";
			}
		}
		return {list: quiz_list, answer: answer};
	},
	/**
	 * 单选点击事件
	 */
	onSingleClick: function (quizId, optionIndex) {
		this.answer[quizId] = optionIndex;
	},
	/**
	 * 简单多选点击事件
	 */
	onSimpleMultiClick: function (answer, optionIndex) {
		if (answer[optionIndex] == optionIndex) {
			answer[optionIndex] = -1;
		} else {
			answer[optionIndex] = optionIndex;
		}
	}
};//_methods_