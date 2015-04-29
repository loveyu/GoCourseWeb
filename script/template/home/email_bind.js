_methods_ = {
	send_email_again: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.ajax_lock) {
			obj.error = "请等待当前操作结束";
			return false;
		}
		if (obj.timer > 0) {
			obj.error = "必须等待“" + obj.timer + "”后才能重新发送邮件";
			return false;
		}
		obj.error = "";
		obj.email_send_notice = "邮件发送中，请稍等....";
		obj.email_send_status = "danger";
		obj.ajax_lock = true;
		FUNC.ajax(CONFIG.api.user.email_send, "POST", {type: "old_send_again"}, function (result) {
			obj.error = "";
			obj.ajax_lock = false;
			obj.email_send_notice = "";
			if (result.status) {
				obj.timer_on_send_again();
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	timer_on_send_again: function () {
		var obj = this;
		obj.timer = 59;
		var timer_hand;
		var timer_call = function () {
			if (obj == null || obj.$data == null) {
				//处理异常，当对象不存在时直接结束掉
				if (timer_hand !== null) {
					clearTimeout(timer_hand);
				}
				return;
			}
			if (obj != null && --obj.timer > 0) {
				obj.email_send_status = "success";
				obj.email_send_notice = obj.timer + " 秒后可重试";
				timer_hand = setTimeout(timer_call, 1000);
			} else {
				obj.email_send_status = "";
				obj.email_send_notice = "";
			}
		};
		timer_hand = setTimeout(timer_call, 0);
	},
	edit_email: function (event) {
		event.preventDefault();
		this.set_new_email = true;
		return false;
	},
	check_the_email: function () {
		var obj = this;
		if (obj.new_email == "") {
			obj.error = "新邮箱不允许为空";
			return false;
		}
		if (!FUNC.verify.email(obj.new_email)) {
			obj.error = "请输入正确的邮箱";
			return false;
		}
		if (obj.new_email == obj.email) {
			obj.error = "新旧邮箱不允许相同";
			return false;
		}
		return true;
	},
	no_bind_change: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.ajax_lock) {
			obj.error = "请等待当前操作结束";
			return false;
		}
		if (!this.check_the_email()) {
			return false;
		}
		FUNC.targetSet(event.target, "修改中....");
		obj.ajax_lock = true;
		FUNC.ajax(CONFIG.api.user.email_new, "post", {email: obj.new_email}, function (result) {
			obj.ajax_lock = false;
			obj.error = "";
			if (result.status) {
				FUNC.targetSet(event.target, "修改成功");
				obj.success = "更新成功，邮件已发送，注意查收";
				obj.email = obj.new_email;
				obj.set_new_email = false;
				obj.new_email = "";
				obj.email_status = false;
				setTimeout(function () {
					obj.success = "";
				}, 2000);
				obj.timer_on_send_again();
			} else {
				FUNC.targetSet(event.target, "重试");
				obj.error = result.msg;
			}
		});
		return false;
	},
	bind_change_btn: function () {
		this.set_new_email = true;
		this.input_new_bind_captcha = false;
	},
	bind_change_with_email: function (event) {
		var obj = this;
		obj.error = "";
		if (obj.ajax_lock) {
			obj.error = "请等待当前操作结束";
			return false;
		}
		if (!this.check_the_email()) {
			return false;
		}
		FUNC.targetSet(event.target, "请求提交中,请稍等....");
		obj.ajax_lock = true;
		FUNC.ajax(CONFIG.api.user.email_unbind, "post", {new_email: obj.new_email}, function (result) {
			obj.error = "";
			obj.ajax_lock = false;
			if (result.status) {
				FUNC.targetSet(event.target, "提交请求成功");
				obj.success = "更新成功，两封邮件已发送，注意查收";
				obj.new_email_set_on_no_bind = obj.new_email;//设置需要显示的新邮箱
				obj.new_email = "";
				obj.set_new_email = false;
				setTimeout(function () {
					obj.success = "";
				}, 4000);
				obj.input_new_bind_captcha = true;
			} else {
				FUNC.targetSet(event.target, "重试");
				obj.error = result.msg;
			}
		});
		return false;
	},
	bind_captcha: function (event) {
		var obj = this;
		obj.error = "";
		if (obj.captcha == "" || obj.captcha_new == "") {
			obj.error = "验证码均不能为空";
			return;
		}
		FUNC.ajax(CONFIG.api.user.email_unbind_confirm, "post", {
			new_captcha: obj.captcha_new,
			old_captcha: obj.captcha
		}, function (result) {
			if (result.status) {
				obj.error = "";
				obj.input_new_bind_captcha = false;
				obj.success = "邮箱更换成功，页面即将刷新";
				setTimeout(function () {
					window.location.reload();
				}, 1500);
			} else {
				obj.error = result.msg;
			}
		});
	},
	/**
	 * 提交未绑定的账号的绑定信息
	 */
	submit_unbind: function () {
		var obj = this;
		obj.error = "";
		if (obj.captcha == "") {
			obj.error = "当前验证码不能为空";
			return;
		}
		FUNC.ajax(CONFIG.api.user.email_bind, "post", {captcha: obj.captcha}, function (result) {
			obj.error = "";
			if (result.status) {
				obj.captcha = "";
				obj.email_status = 1;
			} else {
				obj.error = result.msg;
			}
		});
	},
	bind_change_btn_have_code: function () {
		this.input_new_bind_captcha = true;
	}
};//_methods_