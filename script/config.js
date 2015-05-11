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
	site_url: DOMAIN,
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
			del: "course/del"
		},
		schedule: {
			add: "schedule/add",
			search: "schedule/search"
		},
		course_table: {
			add: "course_table/add",
			search: "course_table/search",
			student_selected: "course_table/student_selected",
			student_select_add: "course_table/student_select_add"
		},
		quiz_teacher: {
			course_list: "quiz_teacher/course_list",
			quiz_add: "quiz_teacher/quiz_add"
		}
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
	data: null
};
var Page = {};//用于保存完整的页面调用类