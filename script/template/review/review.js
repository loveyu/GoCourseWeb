_methods_ = {
	load: function (id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.review.list, "get", {course_table_id: id, show_reply: 1, show_user: 1}, function (result) {
			if (result.status) {
				obj.list = result.data.list;
				obj.users = result.data.users;
				obj.allowComment = result.data.allowComment && Member.is_student();
				obj.allowReply = result.data.allowReply && Member.is_teacher();
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		});
	}
};//_methods_

_data_ = function(){
	return {
		error: "",
		loading: true,
		list: null,
		users: null,
		allowComment: false,
		allowReply: false
	};
};//_data_

_props_ = {
	call: Function
};//_props_

_created_ = function () {
	this.call(this);
};//_created_