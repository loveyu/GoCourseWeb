_methods_ = {
	load: function (id) {
		this.data = {
			error: "",
			list: null,
			loading: true,
			allowComment: false,
			allowReply: false
		};
		var obj = this;
		FUNC.ajax(CONFIG.api.review.list, "get", {course_table_id: id, show_reply: 1}, function (result) {
			if (result.status) {
				obj.data.list = result.data.list;
				obj.data.allowComment = result.data.allowComment && Member.is_student();
				obj.data.allowReply = result.data.allowReply && Member.is_teacher();
			} else {
				obj.data.error = result.msg;
			}
			obj.data.loading = false;
		});
	}
};//_methods_

_props_ = {
	data: Object,
	call: Function
};//_props_

_created_ = function () {
	this.call(this);
};//_created_