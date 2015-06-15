Page.sign_student = function () {
	var vm = new Vue({
		el: "#SignStudent",
		data: {
			result: null,
			currentView: 'base-loading',
			currentName: "base-loading",
			menus: {
				history: {url: '#/', name: '签到历史', active: false},
				new_sign: {url: '#/new_sign', name: '新签到', active: false}
			}
		},
		methods: {
			history: function () {
				this.result = {
					loading: true,
					error: null,
					list: null,
					now_time: Math.floor((new Date()).getTime() / 1000)
				};
				this.currentView = "history";
				FUNC.findVueChild(this, "history").load();
			},
			new_sign: function () {
				this.result = {
					loading: true,
					error: null,
					list: null,
					success_obj: null
				};
				this.currentView = "new_sign";
				FUNC.findVueChild(this, "new_sign").load();
			}
		},
		components: {
			history: {__require: 'sign_student/history.html'},
			new_sign: {__require: 'sign_student/new_sign.html'}
		}
	});
	var change_menus_active = FUNC.createMenuChangeFunc(vm);
	var routes = {
		'/': function () {
			change_menus_active("history");
			vm.history();
		},
		'/new_sign': function () {
			change_menus_active("new_sign");
			vm.new_sign();
		}
	};
	var router = Router(routes);//初始化一个路由器
	var login_call = function (arg) {
		if (Member.user_type != "student") {
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