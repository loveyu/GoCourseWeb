_methods_ = {
	init_search: function (id) {
		var child = FUNC.findVueChild(this, "course-search");
		if (child.course == id) {
			//不动态修改
			return;
		}
		if (child) {
			child.search = id;
			child.onSearch(null, function (obj) {
				obj.onCourseClick(id);
			});
		}
	},
	search: function (id) {
		if (this.course_search.callback == null) {
			this.course_search.callback = function (id) {
				FUNC.redirect("#/open_test/" + id);
			};
		}
		if (id == 0) {
			return;
		}
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.quiz_student.get_share_test_list, "get",
			{course_id: id},
			function (result) {
				if (result.status) {
					if (FUNC.isEmpty(result.data.list)) {
						obj.test_obj = null;
						obj.warning = "测试列表为空";
					} else {
						obj.test_obj = FUNC.quiz.parse_test_property(result.data.list);
					}
				} else {
					obj.error = result.msg;
				}
			}
		);
	}
};//_methods_