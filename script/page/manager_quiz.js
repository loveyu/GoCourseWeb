/**
 * Created by loveyu on 2015/3/30.
 */
Page.manager_quiz = function () {
	var mq_vm = new Vue({
		el: "#ManagerQuiz",
		data: {
			currentView: "base-loading",
			currentName: "base-loading",
			result: null,
			menus: {
				my: {url: '#/', name: '当前课程测验', active: false},
				all: {url: '#/all', name: '全部测验', active: false},
				add: {url: '#/add', name: '添加测验', active: false},
				share: {url: '#/share', name: '共享的测验', active: false}
			}
		},
		methods: {
			m_my: function () {
				var obj = this;
				FUNC.ajax(CONFIG.api.course_table.search, "get", {
					search_type: 'teacher',
					set_class_info: 1,
					status: 0
				}, function (result) {
					obj.result = {
						error: result.status ? '' : result.msg,
						list: []
					};
					if (result.status) {
						obj.result.list = result.data.list;
					}
					obj.currentView = "my";
				});
			},
			m_all: function () {
				this.result = {
					call: function (_ob) {
						_ob.load();
					}
				};
				this.currentView = "all";
			},
			m_add: function (course, table) {
				if (typeof table == "undefined" || table < 1) {
					table = -1;
				}
				this.result = {
					call: function (_ob) {
						_ob.courseTableId = table;
						_ob.model.course = (typeof course == "undefined" ? -1 : course);
						_ob.model.status = -1;
						_ob.model.add_my_course = "1";
						if (typeof course != "undefined" && course > 0 && table > 0) {
							_ob.forceLoad();
						} else {
							_ob.load();
						}
					}
				};
				this.currentView = "add";
			},
			m_share: function () {
				this.result = {
					call: function (ob) {
						ob.init();
					}
				};
				this.currentView = "share";
			},
			m_bind: function (table) {
				this.result = {
					call: function (ob) {
						ob.course_table = table;
						ob.load(table);
					}
				};
				this.currentView = "bind";
			}
		},
		components: {
			my: {__require: 'manager_quiz/my.html'},
			bind: {__require: 'manager_quiz/bind.html'},
			all: {__require: 'manager_quiz/all.html'},
			add: {__require: 'manager_quiz/add.html'},
			share: {__require: 'manager_quiz/share.html'}
		}
	});
	var change_menus_active = FUNC.createMenuChangeFunc(mq_vm);
	var routes = {
		'/': function () {
			change_menus_active("my");
			mq_vm.m_my();
		},
		'/add': function () {
			change_menus_active("add");
			mq_vm.m_add();
		},
		'/all': function () {
			change_menus_active("all");
			mq_vm.m_all();
		},
		'/share': function () {
			change_menus_active("share");
			mq_vm.m_share();
		},
		'/add/:id/table/:id': function (course, table) {
			change_menus_active("add");
			mq_vm.m_add(course, table);
		},
		'/bind/:id': function (table) {
			change_menus_active("my");
			mq_vm.m_bind(table);
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "teacher") {
			FUNC.alertOnElem(mq_vm.$el, "非法访问");
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
	return mq_vm;
};