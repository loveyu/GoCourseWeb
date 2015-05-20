/**
 * Created by loveyu on 2015/4/6.
 */

Page.quiz = function () {
	var quiz_vm = new Vue({
		el: "#Quiz",
		data: {
			result: null,
			currentView: 'base-loading',
			currentName: "base-loading",
			menus: {
				all: {url: '/', name: '课程测验', active: false},
				test: {url: '/test', name: '测验记录', active: false},
				history: {url: '/history', name: '答题记录', active: false},
				open: {url: '/open', name: '开放性测验', active: false}
			}
		},
		methods: {
			load: function (data) {
				if (data.status) {
					this.currentView = "quiz_list";
					this.result = {data: data.data};
				} else {
					FUNC.alertOnElem(quiz_vm.$el, "无法加载数据");
				}
			},
			quiz_by_id: function (id) {
				this.result = {id: id};
				this.currentView = "quiz_item";
			},
			loading: function () {
				this.currentView = "base-loading";
			}
		},
		components: {
			quiz_list: {__require: 'quiz/quiz_list.html'},
			quiz_item: {__require: 'quiz/quiz_item.html'}
		}
	});
	var change_menus_active = function (view) {
		if (quiz_vm.menus.hasOwnProperty(quiz_vm.currentName)) {
			quiz_vm.menus[mq_vm.currentName].active = false;
		}
		quiz_vm.currentView = "base-loading";
		quiz_vm.currentName = view;
		quiz_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			change_menus_active("all");
			quiz_vm.load({status: true});
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