/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_teacher = function () {
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
				course_list: {url: '/course_list', name: '课程列表', active: false}
			}
		},
		methods: {
			m_my: function () {
				this.currentView = "my";
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
								openYear: (function () {
									var year = new Date().getFullYear();
									var rt = [];
									for (var i = year + 1; i > year - 5; i--) {
										rt.push({"year": i});
									}
									return rt;
								})(),
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
			m_add: function () {
				var obj = this;
				FUNC.ajax(CONFIG.api.teacher.info, "get", {}, function (result) {
					if (result.status) {
						obj.result = {
							form: {
								department: "",
								year: "",
								classes: []
							},
							college: FUNC.objMerge(result.data.college, {departments: [], classes: [], years: []})
						};
						obj.currentView = "add";
						obj._children[obj._children.length - 1].setDept(result.data.college.collegeID);
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
			my: {__require: 'course_teacher/my.html'},
			add: {__require: 'course_teacher/add.html'},
			course_list: {__require: 'course_teacher/course_list.html'},
			schedule_add: {__require: 'course_teacher/schedule_add.html'}
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