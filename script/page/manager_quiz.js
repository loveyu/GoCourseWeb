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
				my: {url: '/', name: '我的测验', active: false},
				add: {url: '/add', name: '添加测验', active: false},
				share: {url: '/share', name: '共享的测验', active: false}
			}
		},
		methods: {
			m_my: function () {
				this.currentView = "my";
			},
			m_add: function () {
				this.result = {
					course_list: null,
					course_list_empty: false,
					quiz_empty: true,
					error: "",
					success: "",
					loading: true,
					model: {
						status: -1,
						course: -1,
						add_my_course: "1",
						quiz: {
							title: "",
							options: [],
							correct: [],
							desc: "",
							index: ''
						},
						quiz_name: []
					},
					map: {status: CONST_MAP.course_status}
				};
				this.currentView = "add";
				this.result.model.status = -1;
				this.result.model.add_my_course = "1";
				this._children[this._children.length - 1].load();
			},
			m_share: function () {
				this.currentView = "share";
			}
		},
		components: {
			my: {__require: 'manager_quiz/my.html'},
			add: {__require: 'manager_quiz/add.html'},
			share: {__require: 'manager_quiz/share.html'}
		}
	});
	var change_menus_active = function (view) {
		if (mq_vm.menus.hasOwnProperty(mq_vm.currentName)) {
			mq_vm.menus[mq_vm.currentName].active = false;
		}
		mq_vm.currentView = "base-loading";
		mq_vm.currentName = view;
		mq_vm.menus[view].active = true;
	};
	var routes = {
		'/': function () {
			change_menus_active("my");
			mq_vm.m_my();
		},
		'/add': function () {
			change_menus_active("add");
			mq_vm.m_add();
		},
		'/share': function () {
			change_menus_active("share");
			mq_vm.m_share();
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
}
;