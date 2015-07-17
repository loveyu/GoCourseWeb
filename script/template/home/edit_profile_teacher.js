_methods_ = {
	onSubmit: function (event) {
		event.preventDefault();
		this.data.status.success = false;
		this.data.status.error = null;
		var obj = {
			user_description: this.data.user.description
		};
		var em_obj = this;
		FUNC.ajax(CONFIG.api.teacher.update_info, "post", obj, function (data) {
			if (data.status) {
				em_obj.data.status.success = true;
			} else {
				em_obj.data.status.error = data.msg;
			}
		});
		return false;
	}
};//_methods_

_props_ = {
	data: Object
};//_props_