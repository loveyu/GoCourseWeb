_methods_ = {
	load_course_table: function () {
		var obj = this;
		FUNC.ajax(CONFIG.api.quiz_student.get_test_list, "get",
			{course_table_id: this.id},
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
		id: undefined,//unload
		index: 0,
		error: '',
		warning: '',
		test_obj: null
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_