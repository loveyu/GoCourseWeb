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
				my: {url: '#/', name: '我的课表', active: false},
				add: {url: '#/add', name: '添加课表', active: false},
				schedule_add: {url: '#/schedule_add', name: '添加课程', active: false},
				schedule_search: {url: '#/schedule_search', name: '课程搜索', active: false},
				course_list: {url: '#/course_list', name: '课程名列表', active: false},
				new_sign: {url: '', name: '新的签到', active: false},
				course_table: {url: '', name: '课程详情', active: false}
			}
		},
		methods: {
			m_my: function () {
				var obj = this;
				obj.result = {list: []};
				FUNC.ajax(CONFIG.api.course_table.search, "get", {
					search_type: "teacher",
					set_class_info: 1,
					set_location: 1
				}, function (result) {
					if (result.status) {
						obj.result.list = result.data.list;
						CONFIG.current_week = result.data.week;
						obj.currentView = "my";
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_course_list: function () {
				var obj = this;
				obj.result = {course_list: {}};
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
							data: FUNC.objMerge(result.data.college, {
								departments: [],
								openYear: year_out(),
								openTerm: [{id: 0, term: "春季"}, {id: 1, term: "秋季"}]
							}),
							call: function (_ob) {
								_ob.form.openYear = new Date().getFullYear();
								_ob.form.openTerm = 0;
								_ob.setDept(result.data.college.collegeID);
							}
						};
						obj.currentView = "schedule_add";
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
							college: FUNC.objMerge(result.data.college, {departments: [], classes: [], years: []}),
							call: function (_ob) {
								_ob.setDept(result.data.college.collegeID);
							}
						};
						obj.currentView = "add";
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
							data: FUNC.objMerge(result.data.college, {
								departments: [],
								year: year_out(),
								term: CONST_MAP.course_term,
								status: CONST_MAP.course_status
							}),
							call: null
						};
						FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: result.data.college.collegeID}, function (result) {
							obj.result.data.departments = result.status ? FUNC.mapToObjArr(result.data.departments, "id", "name") : [];
							obj.result.call = function (_ob) {
								_ob.form.year = new Date().getFullYear();
								_ob.form.term = -1;
								_ob.form.status = -1;
							};
							obj.currentView = "schedule_search";
						});
					} else {
						obj.m_load_error(result.msg);
					}
				});
			},
			m_new_sign: function (courseTableId) {
				var obj = this;
				FUNC.ajax(CONFIG.api.sign.prepare, "post", {course_table_id: courseTableId}, function (result) {
					if (result.status) {
						obj.result = {
							call: function (_ob) {
								_ob.class_info = result.data.classInfo;
								_ob.course_data = result.data.course;
								_ob.week = result.data.week;
								_ob.form.course_table_id = courseTableId;
								_ob.set_course_info();
							}
						};
						obj.currentView = "new_sign";
					} else {
						obj.m_load_error(result);
					}
				}, this.m_load_error);
			},
			m_load_error: function (msg, global) {
				if (typeof global != "undefined" && global === true) {
					FUNC.alertOnElem(this.$el, msg ? msg : "非法访问");
				} else {
					if (typeof msg == "string") {
						this.result = {error: msg};
					} else if (msg.hasOwnProperty('msg') && msg.hasOwnProperty('code')) {
						this.result = {error: msg.msg, code: msg.code};
					} else if (msg.hasOwnProperty('msg')) {
						this.result = {error: msg.msg};
					} else {
						this.result = {error: "未知错误"};
					}
					this.currentView = "base-error";
				}
			},
			m_course_table: function (id) {
				this.result = {
					error: null, loading: true, table: null, review: null, call: function (_ob) {
						_ob.load(id);
					}
				};
				//强制更新
				this.currentView = "";
				Vue.nextTick(function () {
					this.currentView = 'course_table'
				}.bind(this));
			}
		},
		components: {
			my: {__require: 'course_teacher/my.html'},
			add: {__require: 'course_teacher/add.html'},
			course_list: {__require: 'course_teacher/course_list.html'},
			schedule_search: {__require: 'course_teacher/schedule_search.html'},
			schedule_add: {__require: 'course_teacher/schedule_add.html'},
			new_sign: {__require: 'course_teacher/new_sign.html'},
			course_table: {__require: 'course_teacher/course_table.html'}
		}
	});
	var change_menus_active = FUNC.createMenuChangeFunc(ct_vm);
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
		},
		'/new_sign/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("new_sign");
			ct_vm.m_new_sign(id);
		},
		'/course_table/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("course_table");
			ct_vm.m_course_table(id);
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