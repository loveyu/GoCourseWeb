_methods_ = {
	onLoginFormSubmit: function (event) {
		event.preventDefault();
		var flag = true;
		if (this.data.username == '' || this.data.password == '') {
			this.data.error_msg = "表单不允许有空值";
			flag = false;
		}
		if (flag) {
			this.data.error_msg = "";
			FUNC.ajax(CONFIG.api.user.login, 'post', {
				username: this.data.username,
				password: this.data.password,
				client: "web"
			}, this.onLoginResult);
		}
		return false;
	}, onLoginResult: function (data) {
		if (!data.status) {
			this.data.error_msg = data.msg ? data.msg : '未知错误';
		} else {
			FUNC.saveToken(data.data);
			FUNC.redirect('home.html');
		}
	}
};//_methods_

_props_ = {
	data: Object
};//_props_