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
					my: {url: '#/', name: '我的课表', active: false},
					add: {url: '#/add', name: '添加课程', active: false},
					course_table: {url: '', name: '课程详情', active: false}
				}
			},
			methods: {
				m_my: function () {
					var obj = this;
					obj.result = {
						error: "",
						list: null,
						has_course: false,
						week_current: 0,
						week_table: [],
						week_list: []
					};
					FUNC.ajax(CONFIG.api.student.my_course, "get", {}, function (result) {
						if (result.status) {
							obj.result.list = result.data.list;
							CONFIG.current_week = result.data.week;
						} else {
							obj.result.error = result.msg;
						}
						obj.currentView = "my";
						var my_obj = FUNC.findVueChild(obj, "my");
						if (my_obj != null) {
							my_obj.paresTable();
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
							var data = result.data.list;
							for (var i in data) {
								data[i]["selected"] = -1;
								ids.push(data[i].course.courseTableID);
							}
							obj.result.list = data;
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
				},
				m_course_table: function (id) {
					this.result = {error: null, loading: true, table: null};
					this.currentView = "course_table";
					FUNC.findVueChild(this, "course_table").load(id);
				},
				set_error: function (msg) {
					FUNC.alertOnElem(this.$el, msg);
				}
			},
			components: {
				my: {__require: 'course_student/my.html'},
				add: {__require: 'course_student/add.html'},
				course_table: {__require: 'course_teacher/course_table.html'}
			}
		})
		;
	var change_menus_active = FUNC.createMenuChangeFunc(cs_vm);
	var routes = {
		'/': function () {
			change_menus_active("my");
			cs_vm.m_my();
		},
		'/add': function () {
			change_menus_active("add");
			cs_vm.m_add();
		},
		'/course_table/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("course_table");
			cs_vm.m_course_table(id);
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