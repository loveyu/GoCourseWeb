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
						obj.answer = list.answer;
						obj.quiz_list = list.list;
					}
				} else {
					obj.error = result.msg;
				}
			}
		);
	},
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
				//必须使用一个对象，否则无效
				quiz_list[k].quiz['answer'] = FUNC.createArrayObj(title_obj.size == 0 ? quiz_list[k].options.length : title_obj.size, -1);
			} else {
				quiz_list[k].quiz['size'] = 1;
				quiz_list[k].quiz['answer'] = -1;
			}
		}
		return {list: quiz_list, answer: answer};
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
	}
};//_methods_