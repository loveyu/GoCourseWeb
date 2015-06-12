/**
 * Created by loveyu on 2015/3/24.
 */
Page.login = function () {
	var vm = new Vue({
		el: "#Login",
		data: {
			result: {
				error_msg: '',
				username: '',
				password: '',
				show_title: true
			}
		}
	});
	var login_call = function () {
		if (Member.login_status) {
			FUNC.redirect("home.html");
		}
	};
	if (!Member.login_status) {
		Hook.add('login.finish', login_call);
	} else {
		login_call();
	}
	return vm;
};