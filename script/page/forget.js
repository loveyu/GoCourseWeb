/**
 * Created by loveyu on 2015/3/25.
 */
Page.forget = function () {
	var vm = new Vue({
		el: "#ForgetPassword",
		data: {
			error_msg: '',
			email: '',
			captcha: '',
			type: '',
			pwd_1: '',
			pwd_2: '',
			code: "",
			setup: 'send_mail',//默认步骤
			captcha_url: CONFIG.captcha_url,
			lock: false
		}, methods: {
			onClickCaptcha: function (event) {
				event.target.src = CONFIG.captcha_url + "?rand=" + Math.random();
			},
			onSendMail: function (event) {
				event.preventDefault();
				var obj = this;
				if (obj.lock) {
					obj.error_msg = "请等待操作结束";
					return false;
				}
				obj.error_msg = "";
				var flag = true;
				if (obj.email == '' || obj.captcha == '') {
					obj.error_msg = "表单不允许有空值";
					return false;
				}
				if (!FUNC.verify.email(obj.email)) {
					obj.error_msg = "邮箱格式不正确";
					return false;
				}
				FUNC.targetSet("#SendMailButton", "邮件发送中，请稍等");
				obj.lock = true;
				FUNC.ajax(CONFIG.api.user.forget_send_mail, 'post', {
					email: obj.email,
					captcha: obj.captcha
				}, function (result) {
					obj.lock = false;
					FUNC.targetSet("#SendMailButton", "再次发送邮件");
					if (!result.status) {
						FUNC.eventTrigger("#CaptchaImg", "click");
						obj.error_msg = result.msg ? result.msg : '未知错误';
					} else {
						obj.setup = "code";
						obj.code = "";
					}
				});
				return false;
			},
			onCheckCode: function (event) {
				event.preventDefault();
				var obj = this;
				obj.error_msg = "";
				if (!/[a-zA-Z0-9]{32}/.test(obj.code)) {
					obj.error_msg = "验证码格式有误";
					return false;
				}
				FUNC.ajax(CONFIG.api.user.forget_check_code, "post", {code: obj.code}, function (result) {
					obj.error_msg = "";
					if (result.status) {
						obj.setup = "reset";
					} else {
						obj.error_msg = result.msg;
					}
				});
				return false;
			},
			onReset: function (event) {
				event.preventDefault();
				var obj = this;
				obj.error_msg = "";
				if (obj.pwd_1 == "" || obj.pwd_2 == "") {
					obj.error_msg = "密码不允许为空";
					return false;
				}
				if (obj.pwd_1 != obj.pwd_2) {
					obj.error_msg = "两次密码不一致";
					return false;
				}
				FUNC.ajax(CONFIG.api.user.forget_reset, "post", {password: obj.pwd_1}, function (result) {
					obj.error_msg = "";
					if (result.status) {
						obj.setup = "finish";
					} else {
						obj.error_msg = result.msg;
					}
				});
				return false;
			}
		}
	});
	var hash_c = function () {
		if (location.hash == "#code") {
			vm.setup = "input_code";
		} else if (/#code\/([a-zA-Z0-9]{32})/.test(location.hash)) {
			vm.setup = "input_code";
			var x = location.hash.match(/#code\/([a-zA-Z0-9]{32})/);
			if (x != null && x.hasOwnProperty(1)) {
				vm.code = x[1];
			}
		} else if ("#reset" == location.hash) {
			vm.setup = "reset";
		} else {
			vm.setup = "send_mail";
		}
	};
	hash_c();
	FUNC.eventBind(window, "hashchange", hash_c);

	return vm;
};