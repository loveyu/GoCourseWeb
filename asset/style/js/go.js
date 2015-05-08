if (!('localStorage' in window)) {

	window.localStorage = (function () {
		var documentElement, isIE = !!document.all;

		if (isIE) {
			documentElement = document.documentElement;
			documentElement.addBehavior('#default#userdata');
		}

		return {
			setItem: function (key, value) {
				if (isIE) {
					documentElement.setAttribute('value', value);
					documentElement.save(key);
				}
				else {
					window.globalStorage[location.hostname][key] = value;
				}
			},
			getItem: function (key) {
				if (isIE) {
					documentElement.load(key);
					return documentElement.getAttribute('value');
				}

				return window.globalStorage[location.hostname][key];
			},
			removeItem: function (key) {
				if (isIE) {
					documentElement.removeAttribute('value');
					documentElement.save(key);
				}
				else {
					window.globalStorage[location.hostname].removeItem(key);
				}
			}
		};
	})();
}



/**
 * Created by loveyu on 2015/4/1.
 */
Vue.component('base-login-form', {template:"<form method=\"get\" v-on=\"submit: onLoginFormSubmit\"><fieldset><legend>用户登录<\/legend><div class=\"alert alert-danger\" role=\"alert\" v-if=\"error_msg\"><span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"><\/span><span class=\"sr-only\">Error:<\/span>{{error_msg}}<\/div><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">用户名<\/span><input type=\"text\" v-model=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\"><\/div><\/div><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">密　码<\/span><input type=\"password\" v-model=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\"><\/div><\/div><div class=\"form-group\"><button class=\"btn btn-primary form-control\" type=\"submit\">登录<\/button><\/div><\/fieldset><p><a class=\"text-info\" href=\"forget.html\">忘记密码？<\/a><\/p><\/form>",methods:{
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
}});
Vue.component('base-loading', {template:"<div class=\"jumbotron\"><p class=\"text-center\">加载中.......<\/p><\/div>"});
Vue.component('quiz-list', {template:"<div class=\"page-header\"><h2>选择你要测试的题目<\/h2><\/div><div class=\"list-group\"><a v-repeat=\"data\" class=\"list-group-item\" href=\"#\/quiz\/{{quizId}}\"><span class=\"badge\">{{numResponses}}<\/span>{{title}}<\/a><\/div>"});
Vue.component('quiz-quiz-by-id', {template:"<h3>TEST<\/h3><p>ID:{{id}}<\/p>"});


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
		quiz: {
			list: "quiz/list"
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


/**
 * 自定义过滤器
 */
Vue.filter('course_table_status', function (value) {
	switch (value) {
		case 0:
			return "开课中";
		case 1:
			return "未开课";
		case 2:
			return "已结束";
	}
	return 未知;
});


/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
		nav: function (name, link, title, active) {
			return {
				active: active, name: name, link: link, title: title
			};
		}, ajax: function (url, method, data, success_callback, error) {
			//var token = FUNC.getToken();
			var option = {
				url: url,
				dataType: "json",
				data: data,
				method: method,
				xhrFields: {
					withCredentials: true
				}, success: success_callback,
				error: error
			};
			//if (token != null) {
			//    //添加Token
			//    option.data.__token = token.token;
			//}
			jQuery.ajax(option);
		},
		redirect: function (url) {
			window.location.href = url;
		},
		fileUpload: function (url, formData, callback) {
			var xhr = new XMLHttpRequest(); //创建请求对象
			xhr.open("POST", url, true);
			xhr.withCredentials = true;
			xhr.addEventListener("load", callback, false);
			xhr.send(formData);
		},
		parseJSON: function (data) {
			return jQuery.parseJSON(data);
		},
		objMerge: function (des, src, override) {
			//合并多个对象
			var i;
			var len;
			if (src instanceof Array) {
				for (i = 0, len = src.length; i < len; i++)
					FUNC.objMerge(des, src[i], override);
			}
			for (i in src) {
				if (override || !(i in des)) {
					des[i] = src[i];
				}
			}
			return des;
		},
		alertOnElem: function (elem, msg) {
			$(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
		},
		/**
		 * 保存Token在浏览器中
		 * @param data object
		 */
		saveToken: function (data) {
			localStorage.setItem("token.token", data.token);
			localStorage.setItem("token.expire", data.expire);
		},
		/**
		 * 获取当前Token
		 */
		getToken: function () {
			var token = localStorage.getItem("token.token");
			var expire = localStorage.getItem("token.expire");
			if (token === null || token.length != 64 || expire === null || expire === "") {
				return null;
			}
			return {token: token, expire: +expire};
		},
		delToken: function () {
			localStorage.removeItem("token.token");
			localStorage.removeItem("token.expire");
		},
		mapToObjArr: function (data, keyName, valueName) {
			var rt = [];
			var obj;
			for (var i in data) {
				obj = {};
				obj[keyName] = i;
				obj[valueName] = data[i];
				rt.push(obj);
			}
			return rt;
		},
		arrToObjArr: function (data, keyName) {
			var rt = [];
			var obj;
			for (var i in data) {
				obj = {};
				obj[keyName] = data[i];
				rt.push(obj);
			}
			return rt;
		},
		targetSet: function (target, value) {
			jQuery(target).html(value);
		},
		eventBind: function (obj, on, call) {
			jQuery(obj).bind(on, call);
		},
		eventTrigger: function (obj, action, data, elem, onlyHandlers) {
			jQuery(obj).trigger(action, data, elem, onlyHandlers);
		},
		clone: function (obj) {
			if (obj === null || typeof(obj) !== 'object')
				return obj;
			var temp = obj.constructor(); // changed
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					temp[key] = FUNC.clone(obj[key]);
				}
			}
			return temp;
		},
		verify: {
			email: function (email) {
				return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
			}
		}
	}
	;


var Hook = (function () {

	var _queue = {};

	var addAction = function (name, action, priority) {
		if (!_queue.hasOwnProperty(name)) {
			_queue[name] = [];
		}
		_queue[name].push({
			action: action,
			priority: priority || 10
		});
		_queue[name].sort(_compare);
	};

	var doActions = function (name, arg) {
		if (typeof arg == "undefined") {
			arg = null;
		}
		if (!_queue.hasOwnProperty(name)) {
			return arg;
		}
		var actions = _queue[name];
		var args = Array.prototype.slice.call(arguments, 0);
		if (args.length > 2) {
			args.shift();
		}
		for (var i in actions) {
			args.shift();
			args.unshift(arg);
			arg = actions[i].action.apply(this, args);
		}
		return arg;
	};

	var hasAction = function (name) {
		return _queue.hasOwnProperty(name);
	};

	var removeAction = function (name) {
		if (_queue.hasOwnProperty(name))
			_queue[name] = [];
	};


	var _compare = function (hook1, hook2) {
		return hook1.priority < hook2.priority;
	};

	return {
		add: addAction,
		apply: doActions,
		has: hasAction,
		remove: removeAction
	};
})();


/**
 * Created by loveyu on 2015/4/20.
 */

Page.bind_student_info = (function () {
	var obj = document.getElementById("BindStudentInfo");
	var status = obj != null;
	if (!status) {
		Hook.add('login.finish', function (data) {
			if (data.name === null && data.user_type == "student") {
				FUNC.redirect("bind_student_info.html");
			}
		});
	}
	return function () {
		return new Vue({
			el: "#BindStudentInfo",
			data: {
				universities: [],
				colleges: [],
				departments: [],
				classes: [],
				form_init: {
					university: "",
					college: "",
					department: "",
					class: ""
				},
				form: {
					name: "",
					sid: "",
					sex: "",
					university: "",
					college: "",
					department: "",
					class: ""
				},
				error_msg: ""
			},
			methods: {
				onSubmit: function (event) {
					var filed_map = {
						name: "姓名",
						sid: "学号",
						sex: "性别",
						university: "学校",
						college: "学院",
						department: "专业",
						class: "班级"
					};
					this.error_msg = "";
					event.preventDefault();
					for (var i in this.form) {
						if (this.form[i] === "") {
							this.error_msg = filed_map[i] + ": 存在空值，请检查";
							return false;
						}
						switch (i) {
							case "name":
								if (!/^[\u4e00-\u9fa5]{2,5}$/.test(this.form[i])) {
									this.error_msg = "姓名只允许2-5字的中文名";
									return false;
								}
								break;
							case "sid":
								if (!/^[1-9][0-9]{5,15}$/.test(this.form[i])) {
									this.error_msg = "请填写正确的学号";
									return false;
								}
								break;
							case "sex":
								if (this.form[i] != "0" && this.form[i] != "1") {
									this.error_msg = "请选择你的性别";
									return false;
								}
								break;
						}
					}
					this.error_msg = "";
					FUNC.ajax(CONFIG.api.student.bind_info, "POST", this.form, this.submitCall);
					return false;
				},
				submitCall: function (result) {
					if (result.status) {
						FUNC.redirect("home.html#/");
					} else {
						this.error_msg = result.msg;
					}
				},
				getUniversitiesCall: function (result) {
					if (result.status) {
						this.universities = FUNC.mapToObjArr(result.data, "id", "name");
					}
					if (this.form_init.university != null) {
						this.form.university = this.form_init.university;
						this.form_init.university = null;
						this.universityChange(null);
					}
				},
				universityChange: function (event) {
					//清除下级内容
					this.classes = [];
					this.departments = [];
					this.colleges = [];
					//调用getCollegesCall
					if (this.form.university != "") {
						FUNC.ajax(CONFIG.api.college.get_colleges, "get", {uni_id: this.form.university}, this.getCollegesCall);
					}
				},
				getCollegesCall: function (result) {
					if (result.status) {
						this.colleges = FUNC.mapToObjArr(result.data.colleges, "id", "name");
					}
					if (this.form_init.college != null) {
						this.form.college = this.form_init.college;
						this.form_init.college = null;
						this.collegeChange(null);
					}
				},
				collegeChange: function (event) {
					//清除下级
					this.classes = [];
					this.departments = [];
					if (this.form.college != "") {
						FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: this.form.college}, this.getDepartmentsCall);
					}
				},
				getDepartmentsCall: function (result) {
					if (result.status) {
						this.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
					}
					if (this.form_init.department != null) {
						this.form.department = this.form_init.department;
						this.form_init.department = null;
						this.departmentChange(null);
					}
				},
				departmentChange: function (event) {
					//清除下级
					this.classes = [];
					if (this.form.department != "") {
						FUNC.ajax(CONFIG.api.college.get_classes, "get", {dept_id: this.form.department}, this.getClassesCall);
					}
				},
				getClassesCall: function (result) {
					if (result.status) {
						this.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
					}
					if (this.form_init.class != null) {
						this.form.class = this.form_init.class;
						this.form_init.class = null;
						this.classChange(null);
					}
				},
				classChange: function (event) {
					//TODO noting
				}
			},
			created: function () {
				FUNC.ajax(CONFIG.api.college.get_universities, "get", {}, this.getUniversitiesCall);
			}
		});
	};
})();


/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_student = function () {
	var cs_vm = new Vue({
			el: "#CourseStudent",
			data: {
				currentView: "base-loading",
				currentName: "base-loading",
				result: null,
				menus: {
					my: {url: '/', name: '我的课表', active: false},
					add: {url: '/add', name: '添加课程', active: false}
				}
			},
			methods: {
				m_my: function () {
					var obj = this;
					FUNC.ajax(CONFIG.api.student.my_course, "get", {}, function (result) {
						if (result.status) {
							obj.result = {
								error: "",
								list: result.data
							};
							obj.currentView = "my";
						}
						else {
							obj.set_error(result.msg);
						}
					});
				},
				m_add: function () {
					var obj = this;
					FUNC.ajax(CONFIG.api.course_table.search, "get", {
						search_type: "student",
						set_location: 1,
						status: 0
					}, function (result) {
						obj.result = {
							error: "",
							warning: "",
							list: null
						};
						if (result.status) {
							var ids = [];
							for (var i in result.data) {
								result.data[i]["selected"] = -1;
								ids.push(result.data[i].course.courseTableID);
							}
							obj.result.list = result.data;
							if (ids.length > 0) {
								FUNC.ajax(CONFIG.api.course_table.student_selected, "get", {ids: ids.join(",")}, function (result) {
									if (result.status) {
										for (var i in obj.result.list) {
											if (result.data.hasOwnProperty(obj.result.list[i].course.courseTableID)) {
												obj.result.list[i].selected = result.data[obj.result.list[i].course.courseTableID];
											}
										}
									} else {
										obj.result.error = result.msg;
									}
								});
							} else {
								obj.result.warning = "没有任何可选课程";
							}
							obj.currentView = "add";
						} else {
							obj.set_error(result.msg);
						}
					});
				}
				,
				set_error: function (msg) {
					FUNC.alertOnElem(this.$el, msg);
				}
			},
			components: {
				my: {template:"<h3>学生课表<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><pre>{{list|json}}<\/pre>"}
				,
				add: {template:"<h3>添加课表<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-warning alert\" v-if=\"warning\">{{warning}}<\/p><div class=\"list-group\"><div class=\"list-group-item\" v-repeat=\"list\"><p><button v-if=\"selected>-1\" v-on=\"click:onAdd($index)\" class=\"btn btn-{{selected==0?'primary':'success'}}\">{{selected==0?'添加':'已选'}}<\/button>{{course.courseName}}, 专业:{{course.deptName}}, 状态:{{course.status|course_table_status}},年级:{{course.enrolYear}}<\/p><p>老师：{{course.teacherName}}，地点：<span v-repeat=\"locations\">第{{slot}}节，{{location}}, {{week}}周&nbsp;&nbsp;&nbsp;<\/span><\/p><\/div><\/div><pre>{{list|json}}<\/pre>",methods:{
	onAdd: function (id) {
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.course_table.student_select_add, "post", {id: obj.list[id].course.courseTableID}, function (result) {
			if (result.status) {
				obj.list[id].selected = 1;
			} else {
				obj.error = result.msg;
			}
		});
	}
}}
			}
		})
		;
	var change_menus_active = function (view) {
		if (cs_vm.menus.hasOwnProperty(cs_vm.currentName)) {
			cs_vm.menus[cs_vm.currentName].active = false;
		}
		cs_vm.currentView = "base-loading";
		cs_vm.currentName = view;
		cs_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			change_menus_active("my");
			cs_vm.m_my();
		},
		'/add': function () {
			change_menus_active("add");
			cs_vm.m_add();
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "student") {
			FUNC.alertOnElem(cs_vm.$el, "非法访问");
			return arg;
		}
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
	return cs_vm;
}
;


/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_teacher = function () {
	var year_out = function () {
		var year = new Date().getFullYear();
		var rt = [];
		for (var i = year + 1; i > year - 5; i--) {
			rt.push({"year": i});
		}
		return rt;
	};
	var ct_vm = new Vue({
		el: "#CourseTeacher",
		data: {
			currentView: "base-loading",
			currentName: "base-loading",
			result: null,
			menus: {
				my: {url: '/', name: '我的课表', active: false},
				add: {url: '/add', name: '添加课表', active: false},
				schedule_add: {url: '/schedule_add', name: '添加课程', active: false},
				schedule_search: {url: '/schedule_search', name: '课程搜索', active: false},
				course_list: {url: '/course_list', name: '课程名列表', active: false}
			}
		},
		methods: {
			m_my: function () {
				var obj = this;
				obj.result = {
					error: "",
					list: {}
				};
				FUNC.ajax(CONFIG.api.course_table.search, "get", {
					search_type: "teacher",
					set_class_info: 1,
					set_location: 1
				}, function (result) {
					if (result.status) {
						obj.result.list = result.data;
						obj.currentView = "my";
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_course_list: function () {
				var obj = this;
				obj.result = {
					error: "",
					form: {
						name: ""
					},
					course_list: {}
				};
				FUNC.ajax(CONFIG.api.course.list, "get", {}, function (result) {
					if (result.status) {
						obj.result.course_list = FUNC.mapToObjArr(result.data, "id", "name");
						obj.currentView = "course_list";
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_schedule_add: function () {
				var obj = this;
				FUNC.ajax(CONFIG.api.teacher.info, "get", {}, function (result) {
					if (result.status) {
						obj.result = {
							error: "",
							success: "",
							form: {
								department: "",
								name: "",
								openYear: "",
								openTerm: "",
								fromWeek: "",
								endWeek: "",
								requirement: "",
								content: ""
							},
							data: FUNC.objMerge(result.data.college, {
								departments: [],
								openYear: year_out(),
								openTerm: [{id: 0, term: "春季"}, {id: 1, term: "秋季"}]
							})
						};
						obj.currentView = "schedule_add";
						obj.result.form.openYear = new Date().getFullYear();
						obj.result.form.openTerm = 0;
						obj._children[obj._children.length - 1].setDept(result.data.college.collegeID);
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			/**
			 * 添加课程在老师的进度当中
			 */
			m_add: function () {
				var obj = this;
				FUNC.ajax(CONFIG.api.teacher.info, "get", {}, function (result) {
					if (result.status) {
						obj.result = {
							success: "",
							error: "",
							search: {
								name: ""
							},
							data: {
								course_name: null
							},
							form: {
								department: "",
								year: "",
								notice: "",
								scheduleID: "",
								classes: [],
								location: ""
							},
							location: [],
							college: FUNC.objMerge(result.data.college, {departments: [], classes: [], years: []})
						};
						obj.currentView = "add";
						obj._children[obj._children.length - 1].setDept(result.data.college.collegeID);
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_schedule_search: function () {
				var obj = this;
				FUNC.ajax(CONFIG.api.teacher.info, "get", {}, function (result) {
					if (result.status) {
						obj.result = {
							error: "",
							success: "",
							form: {
								department: "",
								course_name: "",
								course_id: "",
								year: "",
								status: "",
								term: 0
							},
							data: FUNC.objMerge(result.data.college, {
								departments: [],
								year: year_out(),
								term: [{id: 0, term: "春季"}, {id: 1, term: "秋季"}],
								status: [
									{id: -1, status: "全部"},
									{id: 0, status: "已开课"},
									{id: 1, status: "未开课"},
									{id: 2, status: "已结束"}
								]
							}),
							result: null
						};
						FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: result.data.college.collegeID}, function (result) {
							obj.result.data.departments = result.status ? FUNC.mapToObjArr(result.data.departments, "id", "name") : [];
							obj.currentView = "schedule_search";
							obj.result.form.year = new Date().getFullYear();
							obj.result.form.term = 0;
							obj.result.form.status = -1;
						});
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_load_error: function (msg) {
				FUNC.alertOnElem(this.$el, msg ? msg : "非法访问");
			}
		},
		components: {
			my: {template:"<h3>教师课表<\/h3><div class=\"list-group\"><div class=\"list-group-item\" v-repeat=\"list\"><p>{{course.courseName}}, 专业:{{course.deptName}}, 状态:{{course.status|course_table_status}}, 年级:{{course.enrolYear}}<\/p><p>班级：<span v-repeat=\"classes_info\" class=\"label label-info\">{{className}}<\/span>&nbsp;&nbsp;&nbsp;地点：<span v-repeat=\"locations\">第{{slot}}节，{{location}}, {{week}}周&nbsp;&nbsp;&nbsp;<\/span><\/p><\/div><\/div><pre>{{list|json}}<\/pre>"},
			add: {template:"<h3>添加课表<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-success alert\" v-if=\"success\">{{success}}<\/p><div class=\"form-inline form-group\"><select class=\"form-control\" disabled><option>{{college.uniNickname}}<\/option><\/select><select class=\"form-control\" disabled><option>{{college.collegeName}}<\/option><\/select><select class=\"form-control\" name=\"dept\" v-model=\"form.department\" v-on=\"change:departmentChange\"><option value=\"\">--请选择--<\/option><option v-repeat=\"college.departments\" value=\"{{id}}\">{{name}}<\/option><\/select><div class=\"input-group\"><span class=\"input-group-addon\">年级<\/span><select class=\"form-control\" name=\"year\" v-model=\"form.year\" v-on=\"change:yearChange\"><option value=\"\">--请选择--<\/option><option v-repeat=\"college.years\" value=\"{{year}}\">{{year}}<\/option><\/select><\/div><\/div><div class=\"form-inline form-group\" v-if=\"college.classes\"><strong>班级 : <\/strong><span v-if=\"college.classes.length==0\">无数据<\/span><label v-repeat=\"college.classes\"><input class=\"checkbox\" type=\"checkbox\" v-on=\"change:classChange\" value=\"{{id}}\"> {{name}}&nbsp;&nbsp;&nbsp;<\/label><\/div><div class=\"form-inline form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">课程搜索<\/span><input type=\"text\" name=\"course\" v-model=\"search.name\" class=\"form-control\"><\/div><button class=\"btn btn-primary\" type=\"button\" v-on=\"click: onSearchName\">查询当前可添加课程<\/button><\/div><p v-if=\"data.course_name!=null && data.course_name.length==0\" class=\"alert alert-warning\">当前查询结果为空<\/p><div class=\"form-group form-inline\" v-if=\"data.course_name!=null && data.course_name.length>0\"><strong>选择课程 : &nbsp;&nbsp;<\/strong><label v-repeat=\"data.course_name\"><input type=\"radio\" name=\"my_schedule\" value=\"{{scheduleID}}\" v-model=\"form.scheduleID\"\/>{{courseName}},{{openTerm?\"秋季\":\"春季\"}}{{fromWeek}}-{{endWeek}}周&nbsp;&nbsp;<\/label><\/div><div class=\"form-group\"><label>该课程表的附加介绍信息:<\/label><textarea class=\"form-control\" v-model=\"form.notice\"><\/textarea><\/div><div class=\"form-group\"><strong>上课地点：<\/strong><button class=\"btn btn-success\" v-on=\"click:addLocation\">添加<\/button><\/div><div v-repeat=\"location\"><div class=\"form-group form-inline\"><button class=\"btn btn-danger\" v-on=\"click:removeLocation($index)\">移除<\/button><div class=\"input-group\"><span class=\"input-group-addon\">上课地点<\/span><input type=\"text\" name=\"location\" placeholder=\"如果：13-A-303\" v-model=\"location\" class=\"form-control\"><\/div><div class=\"input-group\"><span class=\"input-group-addon\">节次<\/span><select name=\"slot\" v-model=\"slot\" class=\"form-control\"><option>1<\/option><option>2<\/option><option>3<\/option><option>4<\/option><option>5<\/option><option>6<\/option><\/select><\/div><div class=\"input-group\"><span class=\"input-group-addon\">星期<\/span><select name=\"slot\" v-model=\"day\" class=\"form-control\"><option value=\"1\">一<\/option><option value=\"2\">二<\/option><option value=\"3\">三<\/option><option value=\"4\">四<\/option><option value=\"5\">五<\/option><option value=\"6\">六<\/option><option value=\"7\">日<\/option><\/select><\/div><\/div><div class=\"form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">周次规则<\/span><input type=\"text\" class=\"form-control\" placeholder=\"如:1,2,3或者1-4,5-9,这两种形式\" v-model=\"week\"\/><\/div><\/div><div class=\"form-group\"><textarea placeholder=\"备注提示\" name=\"notice\" rows=\"2\" v-model=\"notice\" class=\"form-control\"><\/textarea><\/div><hr><\/div><div class=\"form-group form-inline\"><button class=\"btn btn-primary\" v-on=\"click:onSubmit\">创建课程表<\/button><\/div>",methods:{
	setDept: function (college_id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: college_id}, function (result) {
			if (result.status) {
				obj.college.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
			} else {
				obj.college.departments = [];
			}
		});
	},
	departmentChange: function (event) {
		var obj = this;
		obj.college.years = [];
		obj.college.classes = [];
		obj.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_class_year, "get", {dept_id: obj.form.department}, function (result) {
			if (result.status) {
				obj.college.years = FUNC.arrToObjArr(result.data.class_year, "year");
			} else {
				obj.college.years = [];
			}
		});
	},
	yearChange: function (event) {
		var obj = this;
		obj.college.classes = [];
		obj.form.classes = [];
		FUNC.ajax(CONFIG.api.college.get_classes, "get", {
			dept_id: obj.form.department,
			year: obj.form.year
		}, function (result) {
			if (result.status) {
				obj.college.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
			} else {
				obj.college.classes = [];
			}
		});
	},
	classChange: function (event) {
		var obj = jQuery(event.target);
		var val = obj.val();
		if ((obj.is(":checked"))) {
			this.form.classes.push(val);
		} else {
			var new_c = [];
			for (var i in this.form.classes) {
				if (this.form.classes[i] != val) {
					new_c.push(this.form.classes[i]);
				}
			}
			this.form.classes = new_c;
		}
	},
	onSearchName: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "必须选择专业后进行查询课程";
			return false;
		}
		if (obj.search.name == "") {
			obj.error = "必须指定一个课程名称进行搜索";
			return false;
		}
		FUNC.ajax(CONFIG.api.schedule.search, "get", {
			department: obj.form.department,
			course_name: obj.search.name,
			year: new Date().getFullYear(),
			status: 0,
			detail: 2
		}, function (result) {
			if (result.status) {
				obj.data.course_name = result.data.result;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	addLocation: function (event) {
		var obj = this;
		obj.location.push({
			location: '',
			slot: 1,
			day: 1,
			week: '',
			notice: ''
		});
	},
	/**
	 * 移除某一个上课地点
	 */
	removeLocation: function (index) {
		var obj = this;
		var new_l = [];
		for (var i in obj.location) {
			if (i == index)continue;
			new_l.push(obj.location[i])
		}
		obj.location = new_l;
	},
	onSubmit: function (event) {
		event.preventDefault();
		var obj = this;
		obj.form.location = "";
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "请选择一个专业";
			return false;
		}
		if (obj.form.year == "") {
			obj.error = "必须选择合适的入学年份";
			return false;
		}
		if (obj.form.classes.length == 0) {
			obj.error = "没有选择一个合适的班级";
			return false;
		}
		if (obj.form.scheduleID == "") {
			obj.error = "必须查询一个课程添加到当前课程表";
			return false;
		}
		if (obj.location.length < 1) {
			obj.error = "至少有一个上课地点";
			return false;
		}
		for (var i in obj.location) {
			var x = obj.location[i];
			var x_n = "第" + (parseInt(i) + 1) + "个";
			if (x.location == "") {
				obj.error = x_n + "上课地点不能为空";
				return false;
			}
			if (x.slot < 1 || x.slot > 6) {
				obj.error = x_n + "上课节次不正确";
				return false;
			}
			if (x.day < 1 || x.day > 7) {
				obj.error = x_n + "上课星期不正确";
				return false;
			}
			if (x.week == "") {
				obj.error = x_n + "上课周次不能为空";
				return false;
			}
		}
		obj.form.location = JSON.stringify(obj.location);
		//var tmp = FUNC.clone(obj.form);
		//tmp.classes = tmp.classes.join(",");
		FUNC.ajax(CONFIG.api.course_table.add, "post", obj.form, function (result) {
			if (result.status) {
				obj.error = "";
				obj.success = "成功添加该课程";
				obj.form = {
					department: "",
					year: "",
					notice: "",
					scheduleID: "",
					classes: [],
					location: ""
				};
				obj.location = [];
				setTimeout(function (obj) {
					if (obj != null && obj.hasOwnProperty("success")) {
						obj.success = "";
					}
				}, 5000)
			} else {
				obj.error = result.msg;
			}
		});
	}
}},
			course_list: {template:"<h3>课程列表<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><form v-on=\"submit: submitCourseAdd\" class=\"form-group\"><div class=\"form-inline\"><div class=\"input-group\"><span class=\"input-group-addon\">课程名<\/span><input type=\"text\" v-model=\"form.name\" name=\"name\" class=\"form-control\" placeholder=\"如：计算机网络, 组成原理等课程名称\"><\/div><button type=\"submit\" class=\"btn btn-primary\">添加<\/button><\/div><\/form><div v-if=\"course_list.length>0\"><button class=\"btn btn-info\" v-repeat=\"course_list\" v-on=\"click: courseClick\" data-value=\"{{id}}\">{{name}}<\/button><\/div>",methods:{
	submitCourseAdd: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.name == "") {
			obj.error = "名称不允许为空";
			return false;
		}
		FUNC.ajax(CONFIG.api.course.add, "post", {name: obj.form.name}, function (result) {
			obj.error = "";
			if (result.status) {
				obj.course_list.push(result.data);
				obj.form.name = "";
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	},
	courseClick: function (event) {
		var elem = jQuery(event.target);
		var id = elem.data("value");
		var name = elem.text();
		var obj = this;
		if (confirm("你确认删除该课程么？[" + id + "]" + name)) {
			obj.error = "";
			FUNC.ajax(CONFIG.api.course.del, "POST", {id: id}, function (result) {
				if (result.status) {
					obj.error = "";
					var n_data = [];
					for (var i in obj.course_list) {
						if (obj.course_list[i].id != id) {
							n_data.push(obj.course_list[i]);
						}
					}
					obj.course_list = n_data;
				} else {
					obj.error = result.msg;
				}
			});
		}
	}
}},
			schedule_search: {template:"<h3>课程表搜索<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-success alert\" v-if=\"success\">{{success}}<\/p><form v-on=\"submit: onSearch\"><div class=\"form-inline form-group\"><select class=\"form-control\" disabled><option>{{data.uniNickname}}<\/option><\/select><select class=\"form-control\" disabled><option>{{data.collegeName}}<\/option><\/select><select class=\"form-control\" name=\"dept\" v-model=\"form.department\"><option value=\"\">--请选择--<\/option><option v-repeat=\"data.departments\" value=\"{{id}}\">{{name}}<\/option><\/select><div class=\"input-group\"><span class=\"input-group-addon\">年份<\/span><select class=\"form-control\" name=\"year\" v-model=\"form.year\"><option v-repeat=\"data.year\">{{year}}<\/option><\/select><\/div><div class=\"input-group\"><span class=\"input-group-addon\">学期<\/span><select class=\"form-control\" name=\"term\" v-model=\"form.term\"><option v-repeat=\"data.term\" value=\"{{id}}\">{{term}}<\/option><\/select><\/div><div class=\"input-group\"><span class=\"input-group-addon\">状态<\/span><select class=\"form-control\" name=\"openTerm\" v-model=\"form.status\"><option v-repeat=\"data.status\" value=\"{{id}}\">{{status}}<\/option><\/select><\/div><\/div><div class=\"form-inline form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">课程名<\/span><input type=\"text\" class=\"form-control\" v-model=\"form.course_name\"><\/div><div class=\"input-group\"><span class=\"input-group-addon\">课程名ID(唯一搜索)<\/span><input type=\"number\" class=\"form-control\" v-model=\"form.course_id\"><\/div><button class=\"btn btn-primary\" type=\"submit\">搜索<\/button><\/div><\/form><p v-if=\"result!=null && result.length==0\" class=\"alert alert-warning\">当前查询结果为空<\/p><table v-if=\"result!=null && result.length>0\" class=\"table table-responsive table-striped table-hover\"><thead><tr><th>课程ID<\/th><th>课程名<\/th><th>年份<\/th><th>周次<\/th><th>状态<\/th><\/tr><\/thead><tbody><tr v-repeat=\"result\"><td>{{scheduleID}}<\/td><td>{{courseName}}({{courseID}})<\/td><td>{{openYear}}年{{openTerm?\"秋季\":\"春季\"}}<\/td><td>{{fromWeek}}-{{endWeek}} 周<\/td><td><span class=\"label label-primary\" v-if=\"status==0\">开课中<\/span><span class=\"label label-warning\" v-if=\"status==1\">未开课<\/span><span class=\"label label-danger\" v-if=\"status==2\">已结束<\/span><\/td><\/tr><\/tbody><\/table>",methods:{
	onSearch: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "必须选择一个专业进行查询";
			return false;
		}
		if ((2 + parseInt(obj.form.year)) > (new Date().getFullYear()) + 4) {
			obj.error = "开课年份选择不正确";
			return false;
		}
		if (obj.form.term != "0" && obj.form.term != 1) {
			obj.error = "请选择合适的开学季度";
			return false;
		}
		var s = parseInt(obj.form.status);
		if (s < -1 || s > 2) {
			obj.error = "请选择合适的状态";
			return false;
		}
		FUNC.ajax(CONFIG.api.schedule.search, "get", obj.form, function (result) {
			if (result.status) {
				obj.result = result.data.result;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
}},
			schedule_add: {template:"<h3>添加课程<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-success alert\" v-if=\"success\">{{success}}<\/p><form v-on=\"submit:submitScheduleAdd\"><div class=\"form-inline form-group\"><select class=\"form-control\" disabled><option>{{data.uniNickname}}<\/option><\/select><select class=\"form-control\" disabled><option>{{data.collegeName}}<\/option><\/select><select class=\"form-control\" name=\"dept\" v-model=\"form.department\"><option value=\"\">--请选择--<\/option><option v-repeat=\"data.departments\" value=\"{{id}}\">{{name}}<\/option><\/select><\/div><div class=\"form-inline form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">课程名<\/span><input type=\"text\" v-model=\"form.name\" name=\"name\" class=\"form-control\" placeholder=\"一个存在课程名称\"><\/div><div class=\"input-group\"><span class=\"input-group-addon\">开学年份<\/span><select class=\"form-control\" name=\"openYear\" v-model=\"form.openYear\"><option v-repeat=\"data.openYear\">{{year}}<\/option><\/select><\/div><div class=\"input-group\"><span class=\"input-group-addon\">学期<\/span><select class=\"form-control\" name=\"openTerm\" v-model=\"form.openTerm\"><option v-repeat=\"data.openTerm\" value=\"{{id}}\">{{term}}<\/option><\/select><\/div><\/div><div class=\"form-inline form-group\"><div class=\"input-group\"><span class=\"input-group-addon\">开始周<\/span><input type=\"number\" v-model=\"form.fromWeek\" name=\"fromWeek\" class=\"form-control\" placeholder=\"开课周，1-28\"><\/div><div class=\"input-group\"><span class=\"input-group-addon\">结束周<\/span><input type=\"number\" v-model=\"form.endWeek\" name=\"endWeek\" class=\"form-control\" placeholder=\"结束周，1-28\"><\/div><\/div><div class=\"form-group\"><label for=\"TextareaRequirement\">课程需求<\/label><textarea class=\"form-control\" v-model=\"form.requirement\" id=\"TextareaRequirement\"><\/textarea><\/div><div class=\"form-group\"><label for=\"TextareaContent\">主要内容<\/label><textarea rows=\"3\" class=\"form-control\" v-model=\"form.content\" id=\"TextareaContent\"><\/textarea><\/div><div class=\"form-group\"><button class=\"btn btn-primary\">创建课程<\/button><\/div><\/form>",methods:{
	setDept: function (college_id) {
		var obj = this;
		FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: college_id}, function (result) {
			if (result.status) {
				obj.data.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
			} else {
				obj.data.departments = [];
			}
		});
	},
	submitScheduleAdd: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		FUNC.ajax(CONFIG.api.schedule.add, "post", obj.form, function (result) {
			if (result.status) {
				obj.form = {
					department: "",
					name: "",
					openYear: new Date().getFullYear(),
					openTerm: "",
					fromWeek: "",
					endWeek: "",
					requirement: "",
					content: ""
				};
				obj.success = "成功添加了课程";
				setTimeout(function () {
					if (obj != null && obj.hasOwnProperty("success")) {
						obj.success = "";
					}
				}, 3000);
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
}}
		}
	});
	var change_menus_active = function (view) {
		if (ct_vm.menus.hasOwnProperty(ct_vm.currentName)) {
			ct_vm.menus[ct_vm.currentName].active = false;
		}
		ct_vm.currentView = "base-loading";
		ct_vm.currentName = view;
		ct_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			change_menus_active("my");
			ct_vm.m_my();
		},
		'/add': function () {
			change_menus_active("add");
			ct_vm.m_add();
		},
		'/schedule_add': function () {
			change_menus_active("schedule_add");
			ct_vm.m_schedule_add();
		},
		'/schedule_search': function () {
			change_menus_active("schedule_search");
			ct_vm.m_schedule_search();
		},
		'/course_list': function () {
			change_menus_active("course_list");
			ct_vm.m_course_list();
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "teacher") {
			FUNC.alertOnElem(ct_vm.$el, "非法访问");
			return arg;
		}
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
	return ct_vm;
};


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


/**
 * Created by loveyu on 2015/3/25.
 */
Page.header = function () {
	return new Vue({
		el: "#Header",
		data: {
			site_title: CONFIG.site_title,
			site_description: CONFIG.site_description,
			site_url: CONFIG.site_url,
			login_status: false,
			nav_main: [
				FUNC.nav('项目介绍', 'about', '关于项目的部分介绍'),
				FUNC.nav('APP下载', 'download', '下载APP到移动端')
			],
			nav_right: [
				FUNC.nav('登录', 'login.html', '登录用户中心'),
				FUNC.nav('注册', 'register.html', '注册新用户')
			],
			data: null,
			avatar: null,
			name: null,
			user_type: "student",
			home_url: CONFIG.site_url + "home.html"
		},
		methods: {
			loginRequest: function (data) {
				Member.login_request = true;
				Member.login_status = data.status;
				this.login_status = data.status;
				if (data.status) {
					Member.id = data.data.id;
					Member.data = data.data;
					this.user_type = Member.user_type = data.data.user_type;
					this.data = data.data;
					this.name = data.data.name;
					this.avatar = data.data.avatar;
					if (this.user_type == "student") {
						this.nav_main = [
							FUNC.nav('课程测验', 'quiz.html#/', '开始进行课程测验')
						];
					} else if (this.user_type == "teacher") {
						this.nav_main = [];
					}
					Hook.apply('login.finish', data.data);
				}
				Hook.apply('login.status');
			},
			logout: function (event) {
				//退出登录
				event.preventDefault();
				FUNC.delToken();
				FUNC.ajax(CONFIG.api.user.logout, "GET", {}, function (result) {
					if (result.status) {
						location.href = "login.html";
					} else {
						alert("退出登录失败:" + result.msg);
					}
				});
				return false;
			}
		},
		created: function () {
			//查询登录状态
			Member.login_request = false;
			FUNC.ajax(CONFIG.api.user.info, 'get', {}, this.loginRequest)
		}
	});
};


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
			student_info: {template:"<div class=\"home-student-info\"><h3>我的个人信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user.uid}}<\/dd><dt>姓名<\/dt><dd>{{user.name}}<\/dd><dt>性别<\/dt><dd>{{user.sex}}<\/dd><dt>学校<\/dt><dd>{{college.uniName}}<\/dd><dt>学院<\/dt><dd>{{college.collegeName}}<\/dd><dt>专业<\/dt><dd>{{college.deptName}}<\/dd><dt>班级<\/dt><dd>{{college.className}}<\/dd><dt>个人简介<\/dt><dd>{{user.description}}<\/dd><\/dl><\/div>"},
			teacher_info: {template:"<div class=\"home-student-info\"><h3>教师信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user.uid}}<\/dd><dt>姓名<\/dt><dd>{{user.name}}<\/dd><dt>性别<\/dt><dd>{{user.sex}}<\/dd><dt>学校<\/dt><dd>{{college.uniName}}<\/dd><dt>学院<\/dt><dd>{{college.collegeName}}<\/dd><dt>个人简介<\/dt><dd>{{user.description}}<\/dd><\/dl><\/div>"},
			edit_avatar: {template:"<div><h4>当前头像:<\/h4><img class=\"img-circle img-responsive\" v-attr=\"src: now_avatar\"><h4>上传新头像:<\/h4><div class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/div><div class=\"alert-success alert\" v-if=\"success\">头像更换成功<\/div><form method=\"post\" v-on=\"submit: onSubmitAvatar\"><div class=\"form-group\"><label for=\"InputFile\">选择图片<\/label><input type=\"file\" id=\"InputFile\" v-on=\"change: fileChange\"><p class=\"help-block\">从这里选择你要上传的图片，最大2MB，将会默认居中裁剪为200x200的方形。<\/p><\/div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-primary\">上传新的头像<\/button><\/div><\/form><\/div>",methods:{
	onSubmitAvatar: function (event) {
		event.preventDefault();
		this.error = null;
		this.success = false;
		if (this.file) {
			var fd = new FormData(); //创建表单
			fd.append("avatar", this.file);
			var obj = this;
			FUNC.fileUpload(CONFIG.api.user.upload_avatar, fd, function () {
				var data = FUNC.parseJSON(this.response);
				if (data.status) {
					obj.error = "";
					obj.success = true;
					var rand = Math.random();
					obj.now_avatar = data.data.avatar_more.lager + "?_=" + rand;//更新当前头像
					Member.data = data.data;//更新数据
					if (APP.page.hasOwnProperty("header")) {
						APP.page.header.avatar = data.data.avatar + "?_=" + rand;
					}
				} else {
					obj.error = data.msg;
				}
			});
		} else {
			this.error = "未选择正确的图片";
		}
		return false;
	}, fileChange: function (event) {
		this.file = event.target.files[0];
		this.error = null;
		if (this.file.size > 1024 * 2 * 1024) {
			this.error = "当前文件大于2MB";
			this.file = null;
		} else if (this.file.type.indexOf("image/") != 0) {
			this.error = "当前文件非图片文件";
			this.file = null;
		} else if (this.file == null) {
			this.error = "文件为空，不存在";
		}
		if (this.error !== null) {
			$("#InputFile").val("");
		}
	}
}},
			edit_password: {template:"<div><form v-on=\"submit: onSubmit\" style=\"max-width: 500px;margin: 15px auto\" action=\"\" method=\"post\"><h3>修改我的密码<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-success alert\" v-if=\"success\">成功修改密码<\/p><div class=\"form-group\"><label class=\"sr-only\" for=\"InputOld\">旧密码<\/label><div class=\"input-group\"><div class=\"input-group-addon\">旧密码<\/div><input type=\"password\" name=\"old\" v-model=\"old\" class=\"form-control\" id=\"InputOld\" placeholder=\"输入旧密码\"><\/div><\/div><div class=\"form-group\"><label class=\"sr-only\" for=\"InputNew\">新密码<\/label><div class=\"input-group\"><div class=\"input-group-addon\">新密码<\/div><input type=\"password\" name=\"new\" v-model=\"new_pwd\" class=\"form-control\" id=\"InputNew\" placeholder=\"输入新密码\"><\/div><\/div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-warning\">确认修改<\/button><\/div><\/form><\/div>",methods:{
	onSubmit: function (event) {
		this.error = null;
		if (this.old == "") {
			this.error = "原密码不能为空";
		} else {
			if (this.new_pwd.length < 6) {
				this.error = "密码长度不能小于6位";
			} else {
				if (this.old == this.new_pwd) {
					this.error = "新旧密码不能相同";
				}
			}
		}
		var obj = this;
		FUNC.ajax(CONFIG.api.user.change_password, "post",
			{
				old_pwd: this.old, new_pwd: this.new_pwd
			}, function (data) {
				obj.success = false;
				obj.error = "";
				if (data.status) {
					obj.old = "";
					obj.new_pwd = "";
					FUNC.saveToken(data.data);
					obj.success = true;
				} else {
					obj.success = false;
					obj.error = data.msg;
				}
			});
		event.preventDefault();
		return false;
	}
}},
			edit_profile_student: {template:"<h3>编辑个人信息<\/h3><form style=\"max-width: 600px;margin: 0 auto\" method=\"post\" v-on=\"submit:onSubmit\"><p class=\"alert-danger alert\" v-if=\"status.error\">{{status.error}}<\/p><p class=\"alert-success alert\" v-if=\"status.success\">成功更新个人信息<\/p><div class=\"form-group\"><label class=\"control-label\" for=\"inputDesc\">个人描述<\/label><div><p class=\"help-block\">你的个人简单介绍<\/p><textarea id=\"inputDesc\" class=\"form-control\" v-model=\"user.description\"><\/textarea><\/div><\/div><div class=\"form-group\"><div><button type=\"submit\" class=\"btn btn-primary\">更新个人信息<\/button><\/div><\/div><\/form>",methods:{
	onSubmit: function (event) {
		event.preventDefault();
		this.status.success = false;
		this.status.error = null;
		var obj = {
			user_description: this.user.description
		};
		var em_obj = this;
		FUNC.ajax(CONFIG.api.student.update_info, "post", obj, function (data) {
			if (data.status) {
				em_obj.status.success = true;
			} else {
				em_obj.status.error = data.msg;
			}
		});
		return false;
	}
}},
			edit_profile_teacher: {template:"<h3>编辑个人信息<\/h3><form style=\"max-width: 600px;margin: 0 auto\" method=\"post\" v-on=\"submit:onSubmit\"><p class=\"alert-danger alert\" v-if=\"status.error\">{{status.error}}<\/p><p class=\"alert-success alert\" v-if=\"status.success\">成功更新个人信息<\/p><div class=\"form-group\"><label class=\"control-label\" for=\"inputDesc\">个人描述<\/label><div><p class=\"help-block\">你的个人简单介绍<\/p><textarea id=\"inputDesc\" class=\"form-control\" v-model=\"user.description\"><\/textarea><\/div><\/div><div class=\"form-group\"><div><button type=\"submit\" class=\"btn btn-primary\">更新个人信息<\/button><\/div><\/div><\/form>",methods:{
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
}},
			email_bind: {template:"<div><h3>绑定邮箱账号<\/h3><div class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/div><div class=\"alert-success alert\" v-if=\"success\">{{success}}<\/div><div v-if=\"email!=null\"><blockquote><p>当前邮箱: <code>{{email}}<\/code><\/p><p v-if=\"new_email_set_on_no_bind\" class=\"text-warning\">新的邮箱: <code>{{new_email_set_on_no_bind}}<\/code><\/p><p>状态:<span class=\"label label-success\" v-if=\"email_status==1\">已验证<\/span><span class=\"label label-warning\" v-if=\"email_status==0\">未验证<\/span><\/p><div v-if=\"email_status==1\" class=\"form-inline\"><button class=\"btn btn-danger btn-sm\" v-on=\"click: bind_change_btn\">更换新邮箱<\/button><button class=\"btn btn-warning btn-sm\" v-on=\"click: bind_change_btn_have_code\">已有验证码<\/button><\/div><div v-if=\"email_status==0\" class=\"form-inline\"><div class=\"form-group\"><label for=\"InputCaptcha\">验证码:<\/label><input type=\"text\" v-model=\"captcha\" class=\"form-control\" id=\"InputCaptcha\"\/><button class=\"btn btn-primary\" v-on=\"click: submit_unbind\">验证<\/button><\/div><\/div><\/blockquote><div v-if=\"email_status==1\"><div v-if=\"set_new_email\" class=\"form-inline\"><p><label for=\"InputNewBindEmail\">输入新的邮箱:<\/label>该操作会发送两封邮件分别到你的邮箱，<span class=\"text-danger\">如果旧邮箱无法验证，请联系老师。<\/span><\/p><div class=\"form-group\"><input type=\"email\" v-model=\"new_email\" class=\"form-control\" id=\"InputNewBindEmail\"\/><button class=\"btn btn-primary\" v-on=\"click: bind_change_with_email\">确认<\/button><\/div><\/div><\/div><div v-if=\"email_status==1 && input_new_bind_captcha\" class=\"form-inline\"><div class=\"form-group\"><p><label for=\"InputOldEmailCaptcha\">输入原邮箱验证码：<\/label><input type=\"email\" v-model=\"captcha\" class=\"form-control\" id=\"InputOldEmailCaptcha\"\/><\/p><p><label for=\"InputNewEmailCaptcha\">输入新邮箱验证码：<\/label><input type=\"email\" v-model=\"captcha_new\" class=\"form-control\" id=\"InputNewEmailCaptcha\"\/><\/p><button class=\"btn btn-primary\" v-on=\"click: bind_captcha\">确认<\/button><\/div><\/div><div v-if=\"email_status==0\"><div v-if=\"set_new_email\" class=\"form-inline\"><div class=\"form-group\"><label for=\"InputNewEmail\">新邮箱:<\/label><input type=\"email\" v-model=\"new_email\" class=\"form-control\" id=\"InputNewEmail\"\/><button class=\"btn btn-primary\" v-on=\"click: no_bind_change\">确认<\/button><\/div><\/div><div v-if=\"!set_new_email\"><h5>无法发送接收到邮件么？<a href=\"#\" v-on=\"click: send_email_again\" class=\"btn btn-sm btn-{{email_send_status?email_send_status:'warning'}}\">{{email_send_notice?email_send_notice:\"再次发送邮件\"}}<\/a><\/h5><h5>还是邮箱地址不正确？<a href=\"#\" v-on=\"click: edit_email\" class=\"btn btn-sm btn-danger\">修改邮件地址<\/a><\/h5><\/div><p class=\"help-block\"><strong class=\"text-danger\">提示：<\/strong>验证码有效期仅为当前浏览器有效期内，请尽快通过验证<\/p><\/div><\/div><\/div>",methods:{
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
}}
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


/**
 * Created by loveyu on 2015/3/24.
 */
Page.index = function () {
	var in_vm = new Vue({
		el: "#Index",
		data: {
			login_form: false,
			result: {
				error_msg: '', username: '', password: '', type: ''
			}
		}
	});
	var login_call = function (arg) {
		if (!Member.login_status) {
			in_vm.login_form = true;
			$('#LoginModal').modal('show');
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


/**
 * Created by loveyu on 2015/3/24.
 */
Page.login = function () {
	return new Vue({
		el: "#Login",
		data: {
			result: {
				error_msg: '', username: '', password: ''
				//, type: ''
			}
		}
	});
};


/**
 * Created by loveyu on 2015/4/6.
 */

Page.quiz = function () {
	var quiz_vm = new Vue({
		el: "#Quiz",
		data: {
			result: null,
			currentView: 'base-loading'
		},
		methods: {
			load: function (data) {
				if (data.status) {
					this.currentView = "quiz-list";
					this.result = {data: data.data};
				} else {
					FUNC.alertOnElem(quiz_vm.$el, "无法加载数据");
				}
			},
			quiz_by_id: function (id) {
				this.result = {id: id};
				this.currentView = "quiz-quiz-by-id";
			},
			loading: function () {
				this.currentView = "base-loading";
			}
		}
	});
	var routes = {
		'/': function () {
			FUNC.ajax(CONFIG.api.quiz.list, "get", {}, quiz_vm.load);
		},
		'/quiz/:id': function (id) {
			quiz_vm.quiz_by_id(id);
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "student") {
			FUNC.alertOnElem(quiz_vm.$el, "非法访问");
		} else {
			router.init();//加载路由配置
			if (document.location.hash == "") {
				//初始化空路由
				routes['/']();
			}
		}
		return arg;
	};
	if (!Member.login_status) {
		Hook.add('login.finish', login_call);
	} else {
		login_call();
	}
	return quiz_vm;
};


/**
 * Created by loveyu on 2015/4/12.
 */
Page.register = function () {
	return new Vue({
		el: "#Register",
		data: {
			error_msg: '',
			form: {
				email: '', password: ''
			}
		},
		methods: {
			onFormSubmit: function (event) {
				event.preventDefault();
				if (this.form.email == "" || this.form.password == "") {
					this.error_msg = "表单不允许为空";
					return false;
				}
				if (!FUNC.verify.email(this.form.email)) {
					this.error_msg = "邮箱格式不正确";
					return false;
				}
				if (this.form.password.length > 32 || this.form.password.length < 6) {
					this.error_msg = "密码长度为6-32个字符";
					return false;
				}
				this.error_msg = "";
				FUNC.ajax(CONFIG.api.user.register, 'post', this.form, this.regCallback);
				return false;
			},
			regCallback: function (data) {
				if (data.status) {
					location.href = "login.html";
				} else {
					this.error_msg = data.msg ? data.msg : '未知错误';
				}
			}
		}
	});
};


/**
 * Created by loveyu on 2015/3/23.
 */
var APP = {
	page: {
		//页面的PAGE实例
	},
	runPage: function (page) {
		if (typeof Page[page] == "function") {
			if (!APP.page.hasOwnProperty(page)) {
				APP.page[page] = Page[page]();
			}
			return APP.page[page];
		} else {
			console.error("Page:" + page + ", not found.");
		}
		return null;
	}
};

APP.runPage('header');


