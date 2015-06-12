/**
 * Created by loveyu on 2015/3/24.
 */
Page.index = function () {
	var in_vm = new Vue({
		el: "#Index",
		data: {
			login_form: false,
			is_login: false,
			is_teacher: false,
			is_student: false,
			result: {
				error_msg: '', username: '', password: '', type: '', show_title: false
			}
		}
	});
	var login_call = function (arg) {
		in_vm.is_login = Member.login_status;
		if (!Member.login_status) {
			setTimeout(function () {
				in_vm.login_form = true;
				$('#LoginModal').modal('show');
			}, 8000);
		} else {
			switch (Member.user_type) {
				case "student":
					in_vm.is_student = true;
					break;
				case "teacher":
					in_vm.is_teacher = true;
					break;
			}
		}
		return arg;
	};
	if (!Member.login_status) {
		Hook.add('login.status', login_call);
	} else {
		login_call();
	}
	return in_vm;
};