_methods_ = {
	load_course_table: function () {
		var obj = this;
		FUNC.ajax(CONFIG.api.quiz_student.get_test_list, "get",
			{course_table_id: this.id},
			function (result) {
				if (result.status) {
					if (FUNC.isEmpty(result.data)) {
						obj.warning = "测试列表为空";
					} else {
						obj.quiz_list = obj.parse_property(result.data.list);
					}
				} else {
					obj.error = result.msg;
				}
			}
		);
	},
	parse_property: function (quiz_list) {
		for (var k in quiz_list) {
			if (!quiz_list.hasOwnProperty(k)) {
				continue;
			}
			if (quiz_list[k].quiz.type == CONST_MAP.quiz_type.multiple) {
				var title_obj = FUNC.quiz.parse_title(quiz_list[k].quiz.title);
				quiz_list[k].quiz.title = title_obj.title;
				quiz_list[k].quiz['size'] = title_obj.size;
			} else {
				quiz_list[k].quiz['size'] = 1;
			}
		}
		return quiz_list;
	}
};//_methods_