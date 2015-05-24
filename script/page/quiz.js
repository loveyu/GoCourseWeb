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
				course_table_list: {url: '/', name: '课程测验', active: false},
				test: {url: '/test', name: '测验记录', active: false},
				history: {url: '/history', name: '答题记录', active: false},
				open: {url: '/open', name: '开放性测验', active: false}
			}
		},
		methods: {
			my: function (data) {
				var obj = this;
				FUNC.ajax(CONFIG.api.course_table.search, "get", {
					search_type: 'student',
					status: 0
				}, function (result) {
					var rt = {
						error: "",
						course_table: []
					};
					if (result.status) {
						rt.course_table = result.data.list;
					} else {
						rt.error = result.msg;
					}
					obj.result = rt;
					obj.currentView = "course_table_list";
				});
			},
			do_test: function (id) {
				this.result = {
					id: id,
					index: 0,
					error: '',
					warning: '',
					quiz_list: []
				};
				var parse_id = parseInt(id);
				if (parse_id < 1 || ("" + parse_id) != id) {
					this.result.error = "ID参数解析错误";
				}
				this.currentView = "do_test";
				if (!this.result.error) {
					FUNC.findVueChild(this, "do_test").load_course_table();
				}
			},
			loading: function () {
				this.currentView = "base-loading";
			}
		},
		components: {
			course_table_list: {__require: 'quiz/course_table_list.html'},
			do_test: {__require: 'quiz/do_test.html'}
		}
	});
	var change_menus_active = function (view) {
		if (quiz_vm.menus.hasOwnProperty(quiz_vm.currentName)) {
			quiz_vm.menus[quiz_vm.currentName].active = false;
		}
		quiz_vm.currentView = "base-loading";
		quiz_vm.currentName = view;
		quiz_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			change_menus_active("course_table_list");
			quiz_vm.my();
		},
		'/do/:id': function (id) {
			quiz_vm.do_test(id);
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