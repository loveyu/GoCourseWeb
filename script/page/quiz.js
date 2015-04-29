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