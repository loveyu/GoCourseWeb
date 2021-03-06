/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = true;
var DOMAIN = (function () {
	switch (document.location.host) {
		//此处修改为使用本地反向代理的形式，避免COOKIE的问题
		case "go.course.org":
			return "http://127.0.0.1:8080/";
		//case "10.109.0.10":
		//	return "http://10.109.0.10:8080/";
	}
	//return "http://192.168.88.128:8080/";
	return "http://" + document.location.host + "/";
})();
var CONFIG = {
	site_title: 'GO Course',
	site_description: '让课程变得更简单',
	site_url: "http://" + document.location.host + "/",
	api_url: DOMAIN + 'gocourse/',
	captcha_url: DOMAIN + "gocourse/tools/captcha",
	api: {
		user: {
			login: "user_action/login",
			register: "user_action/register",
			logout: "user_action/logout",
			info: "user/info",
			change_password: "user/change_password",
			upload_avatar: 'user/upload_avatar',
			set_token_cookie: 'user/set_token_cookie',
			email_status: 'user/email/status',//当前邮箱状态
			email_bind: 'user/email/bind',//绑定邮箱，当前邮箱未验证的状态下的情况下
			email_unbind: 'user/email/unbind',//解绑邮箱
			email_unbind_confirm: 'user/email/unbind_confirm',//解绑邮箱后，向服务器发送请求，确认新邮箱
			email_new: 'user/email/new',//设置一个新邮箱，必须在未绑定情形下
			email_send: 'user/email/send',//向邮箱发送邮件
			forget_send_mail: 'user_action/forget_password/send_mail',
			forget_check_code: 'user_action/forget_password/check_code',
			forget_reset: 'user_action/forget_password/reset'
		},
		student: {
			info: "student/info",
			bind_info: "student/bind_info",
			update_info: "student/update_info",
			my_course: "student/my_course"
		},
		college: {
			get_universities: "college/get_universities",
			get_colleges: "college/get_colleges",
			get_departments: "college/get_departments",
			get_classes: "college/get_classes",
			get_class_year: "college/get_class_year"
		},
		teacher: {
			info: "teacher/info",
			update_info: "teacher/update_info"
		},
		course: {
			add: "course/add",
			list: "course/list",
			search: "course/search",
			del: "course/del"
		},
		schedule: {
			add: "schedule/add",
			search: "schedule/search"
		},
		course_table: {
			add: "course_table/add",
			get: "course_table/get",
			search: "course_table/search",
			student_selected: "course_table/student_selected",
			student_select_add: "course_table/student_select_add"
		},
		quiz_teacher: {
			course_list: "quiz_teacher/course_list",
			quiz_add: "quiz_teacher/quiz_add",
			quiz_list: "quiz_teacher/quiz_list",
			quiz_share_list: "quiz_teacher/quiz_share_list",
			quiz_share: "quiz_teacher/quiz_share",
			quiz_share_cancel: "quiz_teacher/quiz_share_cancel",
			bind_list: "quiz_teacher/bind_list",
			unbind_list: "quiz_teacher/unbind_list",
			unbind_share_list: "quiz_teacher/unbind_share_list",
			bind_quiz: "quiz_teacher/bind_quiz",
			bind_quiz_cancel: "quiz_teacher/bind_quiz_cancel"
		},
		quiz_student: {
			get_test_list: "quiz_student/get_test_list",
			get_share_test_list: "quiz_student/get_share_test_list",
			do_test: "quiz_student/do_test",
			history: "quiz_student/exec_history"
		},
		sign: {
			prepare: "sign/prepare",
			create: "sign/create",
			teacher_list: 'sign/teacher_list',
			student_new_sign: 'sign/student_new_sign',
			student_history: 'sign/student_history',
			student_sign_finish: 'sign/student_sign_finish',
			student_sign_begin: 'sign/student_sign_begin',
			teacher_get: 'sign/teacher_get',
			teacher_append_info: 'sign/teacher_append_info',
			student_get: 'sign/student_get'
		},
		task: {
			task_set_detail: "task/task_set_detail"
		},
		review: {
			list: 'review/list'
		}
	},
	current_week: {	//当前的周次，该数据会依据服务器状态而更新
		"year": 2015,					//当前年份
		"term": 0,						//季度
		"week": 10,						//周次
		"begin_date": "2015-03-09"	//第一周周一开始时间
	}
};
//初始化API完整地址
for (var name in CONFIG.api) {
	if (CONFIG.api.hasOwnProperty(name)) {
		switch (typeof CONFIG.api[name]) {
			case "string":
				CONFIG.api[name] = CONFIG.api_url + CONFIG.api[name];
				break;
			case "object":
				for (var name2 in CONFIG.api[name]) {
					if (CONFIG.api[name].hasOwnProperty(name2)) {
						CONFIG.api[name][name2] = CONFIG.api_url + CONFIG.api[name][name2];
					}
				}
				break;
		}
	}
}
//用户基本信息
var Member = {
	login_request: false,//是否进行了登录请求，用于登录先前检测
	login_status: false,
	id: 0,
	user_type: 'student',
	data: null,
	is_student: function () {
		return this.user_type == 'student';
	},
	is_teacher: function () {
		return this.user_type == 'teacher';
	}
};
var Page = {};//用于保存完整的页面调用类