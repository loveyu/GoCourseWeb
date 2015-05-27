_methods_ = {
	init: function () {
		var obj = this;
		FUNC.ajax(CONFIG.api.course_table.get + "/" + this.course_table_id, "get", {}, function (reslut) {
			if (reslut.status) {
				obj.ct_info = reslut.data;
				obj.loading = false;
			} else {
				obj.error = reslut.msg;
			}
		});
	},
	set_correct: function (is_correct) {
		if (is_correct === this.is_correct) {
			return;
		}
		this.is_correct = is_correct;
	}
};//_methods_