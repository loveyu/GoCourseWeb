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
				do_test: {url: '', name: '答题模式', active: false},
				quiz_history: {url: '/quiz_history', name: '测验记录', active: false},
				ct_history: {url: '', name: '课程测验记录', active: false},
				history: {url: '/history', name: '做题记录', active: false},
				open_test: {url: '/open_test', name: '开放性测验', active: false}
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
					test_obj: null
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
			history: function (is_correct) {
				if (this.currentView != "history") {
					//如果视图修改
					this.result = {
						execs: null,
						quiz_obj: {},
						error: '',
						is_correct: is_correct,
						correct_map: CONST_MAP.history_answer_correct,
						course_search: {
							is_init: true,
							search: '',
							title: '指定测验课程',
							course: -1,
							courseName: "",
							error: "",
							course_list_empty: false,
							course_list: [],
							callback: null
						}
					};
					this.currentView = "history";
				} else {
					this.result.is_correct = is_correct;
				}
				FUNC.findVueChild(this, "history").load_all();
			},
			course_table_history: function (is_correct, courseTableId) {
				var flag = this.currentView == "ct_history"
					&& (typeof this.result.course_table_id != "undefined")
					&& courseTableId == this.result.course_table_id;
				if (!flag) {
					this.result = {
						correct_map: CONST_MAP.history_answer_correct,
						loading: true,
						course_info: null,
						is_correct: null,
						course_table_id: courseTableId,
						execs: null,
						quiz_obj: {},
						ct_info: null,
						error1: "",
						error2: ""
					};
					this.currentView = "ct_history";
				}
				var child = FUNC.findVueChild(this, "ct_history");
				if (!flag) {
					child.init();
				}
				child.set_correct(+is_correct);
			},
			open_test: function (id) {
				if (this.currentView != "open_test") {
					this.result = {
						error: '',
						warning: '',
						test_obj: null,
						course_search: {
							is_init: true,
							search: '',
							title: '搜索课程的名称',
							course: -1,
							courseName: "",
							error: "",
							course_list_empty: false,
							course_list: [],
							callback: null
						}
					};
					this.currentView = "open_test";
				}
				var child = FUNC.findVueChild(this, "open_test");
				if (id > 0 && id != this.result.course_search.course) {
					child.init_search(id);
				}
				child.search(id);
			},
			quiz_history: function (is_correct) {
				this.currentView = "quiz_history";
			},
			now_url: function () {
				return window.location.hash.substr(1);
			},
			loading: function () {
				this.currentView = "base-loading";
			}
		},
		components: {
			course_table_list: {__require: 'quiz/course_table_list.html'},
			ct_history: {__require: 'quiz/course_table_history.html'},
			history: {__require: 'quiz/history.html'},
			quiz_history: {__require: 'quiz/quiz_history.html'},
			do_test: {__require: 'quiz/do_test.html'},
			open_test: {__require: 'quiz/open_test.html'}
		}
	});
	var change_menus_active = function (view) {
		if (quiz_vm.currentView == view) {
			//如果视图无改变
			return;
		}
		if (!quiz_vm.menus.hasOwnProperty(view)) {
			//如果无视图
			return;
		}
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
			change_menus_active("do_test");
			quiz_vm.do_test(id);
		},
		'/history': function () {
			change_menus_active("history");
			quiz_vm.history(-1);
		},
		'history/right': function () {
			change_menus_active("history");
			quiz_vm.history(1);
		},
		'history/wrong': function () {
			change_menus_active("history");
			quiz_vm.history(0);
		},
		'history/all': function () {
			change_menus_active("history");
			quiz_vm.history(-1);
		},
		'ct_history/right/:id': function (id) {
			change_menus_active("ct_history");
			quiz_vm.course_table_history(1, id);
		},
		'ct_history/wrong/:id': function (id) {
			change_menus_active("ct_history");
			quiz_vm.course_table_history(0, id);
		},
		'ct_history/all/:id': function (id) {
			change_menus_active("ct_history");
			quiz_vm.course_table_history(-1, id);
		},
		'open_test': function () {
			change_menus_active("open_test");
			quiz_vm.open_test(0);
		},
		'open_test/:id': function (id) {
			change_menus_active("open_test");
			quiz_vm.open_test(+id);
		},
		'quiz_history': function () {
			change_menus_active("quiz_history");
			quiz_vm.quiz_history(-1);
		},
		'quiz_history/all': function () {
			change_menus_active("quiz_history");
			quiz_vm.quiz_history(-1);
		},
		'quiz_history/right': function () {
			change_menus_active("quiz_history");
			quiz_vm.quiz_history(1);
		},
		'quiz_history/wrong': function () {
			change_menus_active("quiz_history");
			quiz_vm.quiz_history(0);
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