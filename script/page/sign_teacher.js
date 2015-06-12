Page.sign_teacher = function () {
	var vm = new Vue({
		el: "#SignTeacher",
		data: {
			result: null,
			currentView: 'base-loading',
			currentName: "base-loading",
			menus: {
				history: {url: '#/', name: '历史签到任务', active: false},
				new_sign: {url: 'course_teacher.html#/', name: '新签到', active: false}
			}
		},
		methods: {
			history: function () {
				this.result = {loading: true, list: null, error: null};
				this.currentView = "history";
				var obj = FUNC.findVueChild(vm, "history");
				obj.load_history();
			}
		},
		components: {
			history: {__require: 'sign_teacher/history.html'}
		}
	});
	var change_menus_active = FUNC.createMenuChangeFunc(vm);
	var routes = {
		'/': function () {
			change_menus_active("history");
			vm.history();
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