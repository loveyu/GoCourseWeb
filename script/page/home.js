/**
 * Created by loveyu on 2015/3/25.
 */
Page.home = function () {
	var menus = {
		student: {
			student_info: {url: '/', name: '个人信息', active: false},
			edit_profile_student: {url: '/edit_profile_student', name: '编辑资料', active: false},
			edit_avatar: {url: '/edit_avatar', name: '更改头像', active: false},
			email_bind: {url: '/email_bind', name: '邮箱绑定', active: false},
			edit_password: {url: '/edit_password', name: '修改密码', active: false}
		},
		teacher: {
			teacher_info: {url: '/', name: '个人信息', active: true},
			edit_profile_teacher: {url: '/edit_profile_teacher', name: '编辑资料', active: false},
			edit_avatar: {url: '/edit_avatar', name: '更改头像', active: false},
			email_bind: {url: '/email_bind', name: '邮箱绑定', active: false},
			edit_password: {url: '/edit_password', name: '修改密码', active: false}
		}
	};
	var home_vm = new Vue({
		el: "#Home",
		data: {
			is_student: false,
			is_teacher: false,
			currentView: "base-loading",
			currentName: "base-loading",
			result: null,
			menus: []
		},
		methods: {
			m_student_info: function (result) {
				home_vm.result = result.data;
				home_vm.currentView = "student_info";
			},
			m_teacher_info: function (result) {
				home_vm.result = result.data;
				home_vm.currentView = "teacher_info";
			},
			m_edit_avatar: function () {
				home_vm.result = {
					now_avatar: Member.data.avatar_more.lager,
					file: null,
					error: null,
					success: false
				};
				home_vm.currentView = "edit_avatar";
			},
			m_edit_password: function () {
				home_vm.result = {
					old: "",
					new_pwd: "",
					error: null,
					success: false
				};
				home_vm.currentView = "edit_password";
			},
			m_edit_profile_student: function (result) {
				home_vm.result = FUNC.objMerge(result.data, {status: {error: null, success: false}});
				home_vm.currentView = "edit_profile_student";
			},
			m_edit_profile_teacher: function (result) {
				home_vm.result = FUNC.objMerge(result.data, {status: {error: null, success: false}});
				home_vm.currentView = "edit_profile_teacher";
			},
			m_email_bind: function (result) {
				if (result.status) {
					home_vm.result = {
						email: result.data.email,
						email_status: result.data.status,
						ajax_lock: false,//防止多次提交
						error: null,
						email_send_notice: "",//初始化邮件重发值
						email_send_status: "",
						success: false,
						set_new_email: false,
						input_new_bind_captcha: false,
						new_email: "",
						new_email_set_on_no_bind: "",
						captcha: "",
						captcha_new: "",
						timer: 0
					};
				} else {
					home_vm.result = {
						email: null,//逻辑判断空值，进行显示判断
						email_status: null,
						error: result.msg,
						success: false
					};
				}
				home_vm.currentView = "email_bind";
			}
		},
		components: {
			student_info: {__require: 'home/student_info.html'},
			teacher_info: {__require: 'home/teacher_info.html'},
			edit_avatar: {__require: 'home/edit_avatar.html'},
			edit_password: {__require: 'home/edit_password.html'},
			edit_profile_student: {__require: 'home/edit_profile_student.html'},
			edit_profile_teacher: {__require: 'home/edit_profile_teacher.html'},
			email_bind: {__require: 'home/email_bind.html'}
		}
	});
	var change_menus_active = function (view) {
		if (home_vm.menus.hasOwnProperty(home_vm.currentName)) {
			home_vm.menus[home_vm.currentName].active = false;
		}
		home_vm.currentView = "base-loading";
		home_vm.currentName = view;
		home_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			if (home_vm.is_student) {
				change_menus_active("student_info");
				FUNC.ajax(CONFIG.api.student.info, "get", {}, home_vm.m_student_info);
			} else if (home_vm.is_teacher) {
				change_menus_active("teacher_info");
				FUNC.ajax(CONFIG.api.teacher.info, "get", {}, home_vm.m_teacher_info);
			}
		},
		'/edit_avatar': function () {
			change_menus_active("edit_avatar");
			home_vm.m_edit_avatar();
		},
		'/edit_password': function () {
			change_menus_active("edit_password");
			home_vm.m_edit_password();
		},
		'/email_bind': function () {
			change_menus_active("email_bind");
			FUNC.ajax(CONFIG.api.user.email_status, "get", {}, home_vm.m_email_bind);
		},
		'/edit_profile_student': function () {
			change_menus_active("edit_profile_student");
			FUNC.ajax(CONFIG.api.student.info, "get", {}, home_vm.m_edit_profile_student);
		},
		'/edit_profile_teacher': function () {
			change_menus_active("edit_profile_teacher");
			FUNC.ajax(CONFIG.api.teacher.info, "get", {}, home_vm.m_edit_profile_teacher);
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		home_vm.is_student = Member.user_type == "student";
		home_vm.is_teacher = !home_vm.is_student;
		home_vm.menus = home_vm.is_student ? menus.student : menus.teacher;
		router.init();//加载路由配置
		if (document.location.hash == "") {
			//初始化空路由
			routes['/']();
		}
		return arg;
	};
	if (!Member.login_status) {
		Hook.add('login.finish', login_call);
	} else {
		login_call();
	}
	return home_vm;
};