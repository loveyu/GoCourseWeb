Page.sign_teacher = function () {
	var vm = new Vue({
		el: "#SignTeacher",
		data: {
			result: null,
			currentView: 'base-loading',
			currentName: "base-loading",
			menus: {
				history: {url: '#/', name: '历史签到任务', active: false},
				new_sign: {url: 'course_teacher.html#/', name: '新签到', active: false},
				sign_detail: {url: '', name: '签到详情', active: false},
				report: {url: '', name: '签到汇总', active: false}
			}
		},
		methods: {
			history: function () {
				this.result = {
					call: function (_ob) {
						_ob.load_history();
					}
				};
				this.currentView = "history";
			},
			/**
			 * 查看一个签到的详情
			 * @param id
			 */
			sign_detail: function (id) {
				this.result = {
					call: function (_ob) {
						_ob.load(id);
					}
				};
				this.currentView = "sign_detail";
				var obj = FUNC.findVueChild(vm, "sign_detail");
			},
			report: function (id) {
				this.currentView = "report";
			}
		},
		components: {
			history: {__require: 'sign_teacher/history.html'},
			sign_detail: {__require: 'sign_teacher/sign_detail.html'},
			report: {__require: 'sign_teacher/report.html'}
		}
	});
	var change_menus_active = FUNC.createMenuChangeFunc(vm);
	var routes = {
		'/': function () {
			change_menus_active("history");
			vm.history();
		},
		'/sign_detail/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("sign_detail");
			vm.sign_detail(id);
		},
		'/report/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("report");
			vm.report(id);
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "teacher") {
			FUNC.alertOnElem(vm.$el, "非法访问");
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
	return vm;
};