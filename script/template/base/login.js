_methods_ = {
	onLoginFormSubmit: function (event) {
		event.preventDefault();
		var flag = true;
		if (this.username == '' || this.password == ''
		//|| this.type == ''
		) {
			this.error_msg = "表单不允许有空值";
			flag = false;
		}
		if (flag) {
			this.error_msg = "";
			FUNC.ajax(CONFIG.api.user.login, 'post', {
				username: this.username,
				password: this.password,
				client: "web"
			}, this.onLoginResult);
		}
		return false;
	}, onLoginResult: function (data) {
		if (!data.status) {
			this.error_msg = data.msg ? data.msg : '未知错误';
		} else {
			FUNC.saveToken(data.data);
			FUNC.redirect('home.html');
		}
	}
};//_methods_
