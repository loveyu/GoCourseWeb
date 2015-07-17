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
				course_table_list: {url: '#/', name: '课程测验', active: false},
				do_test: {url: '', name: '答题模式', active: false},
				quiz_history: {url: '#/quiz_history', name: '测验记录', active: false},
				ct_history: {url: '', name: '课程测验记录', active: false},
				history: {url: '#/history', name: '做题记录', active: false},
				open_test: {url: '#/open_test', name: '开放性测验', active: false}
			},
			history_obj: null,//测验历史记录组件的实例
			open_test_obj: null,//开放测验组件的实例
			course_table_history_obj: null//某一课测验程组件实例
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
					call: function (ob) {
						ob.id = id;
						var parse_id = parseInt(id);
						if (isNaN(parse_id) || parse_id < 1 || ("" + parse_id) != id) {
							ob.error = "ID参数解析错误";
						} else {
							ob.load_course_table();
						}
					}
				};
				this.currentView = "do_test";
			},
			history: function (is_correct) {
				var obj = this;
				if (this.currentView != "history") {
					//如果视图修改
					this.result = {
						call: function (ob) {
							ob.is_correct = is_correct;
							obj.history_obj = ob;
							ob.load_all();
						}
					};
					this.currentView = "history";
				} else {
					if (obj.history_obj !== null && obj.history_obj.hasOwnProperty('is_correct')) {
						obj.history_obj.is_correct = is_correct;
						obj.history_obj.load_all();
					}
				}
			},
			course_table_history: function (is_correct, courseTableId) {
				var obj = this;
				var flag = this.currentView == "ct_history"
					&& (typeof obj.course_table_history_obj.course_table_id != "undefined")
					&& courseTableId == obj.course_table_history_obj.course_table_id;
				if (!flag) {
					this.result = {
						call: function (ob) {
							obj.course_table_history_obj = ob;
							ob.course_table_id = courseTableId;
							ob.init();
							ob.set_correct(+is_correct);
						}
					};
					this.currentView = "ct_history";
				} else {
					obj.course_table_history_obj.set_correct(+is_correct);
				}
			},
			open_test: function (id) {
				var obj = this;
				if (this.currentView != "open_test") {
					this.result = {
						call: function (ob) {
							obj.open_test_obj = ob;
							ob.course_search.init_call = (function (open_test) {
								return function (search_obj) {
									open_test.course_search_obj = search_obj;
									if (id != "") {
										open_test.init_search(id);
									}
								};
							})(ob);
							ob.search(id);
						}
					};
					this.currentView = "open_test";
				} else {
					if (id > 0 && id != obj.open_test_obj.course_search.course) {
						obj.open_test_obj.init_search(id);
					}
					obj.open_test_obj.search(id);
				}
			},
			quiz_history: function (is_correct) {
				this.currentView = "quiz_history";
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
	var change_menus_active = FUNC.createMenuChangeFunc(quiz_vm);
	var routes = {
		'/': function () {
			change_menus_active("course_table_list");
			quiz_vm.my();
		},
		'/do/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
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
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("ct_history");
			quiz_vm.course_table_history(1, id);
		},
		'ct_history/wrong/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("ct_history");
			quiz_vm.course_table_history(0, id);
		},
		'ct_history/all/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("ct_history");
			quiz_vm.course_table_history(-1, id);
		},
		'open_test': function () {
			change_menus_active("open_test");
			quiz_vm.open_test(0);
		},
		'open_test/:id': function (id) {
			id = parseInt(id);
			if (isNaN(id) || id < 1) {
				return;
			}
			change_menus_active("open_test");
			quiz_vm.open_test(id);
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