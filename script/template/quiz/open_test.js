_methods_ = {
	init_search: function (id) {
		var child = this.course_search_obj;
		if (child.data.course == id) {
			//不动态修改
			return;
		}
		if (child) {
			child.data.search = id;
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

_props_ = ['data'];//_props_

_data_ = function () {
	return {
		error: '',
		warning: '',
		test_obj: null,
		course_search_obj: null,
		course_search: {
			is_init: true,
			search: '',
			title: '搜索课程的名称',
			course: -1,
			courseName: "",
			error: "",
			course_list_empty: false,
			course_list: [],
			callback: null,
			init_call: null
		}
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_