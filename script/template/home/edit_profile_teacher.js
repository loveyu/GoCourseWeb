_methods_ = {
	onSubmit: function (event) {
		event.preventDefault();
		this.status.success = false;
		this.status.error = null;
		var obj = {
			user_description: this.user.description
		};
		var em_obj = this;
		FUNC.ajax(CONFIG.api.teacher.update_info, "post", obj, function (data) {
			if (data.status) {
				em_obj.status.success = true;
			} else {
				em_obj.status.error = data.msg;
			}
		});
		return false;
	}
};//_methods_