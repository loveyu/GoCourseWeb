if (!('localStorage' in window)) {

    window.localStorage = (function() {
        var documentElement, isIE = !!document.all;

        if (isIE) {
            documentElement = document.documentElement;
            documentElement.addBehavior('#default#userdata');
        }

        return {
            setItem: function(key, value) {
                if (isIE) {
                    documentElement.setAttribute('value', value);
                    documentElement.save(key);
                }
                else {
                    window.globalStorage[location.hostname][key] = value;
                }
            },
            getItem: function(key) {
                if (isIE) {
                    documentElement.load(key);
                    return documentElement.getAttribute('value');
                }

                return window.globalStorage[location.hostname][key];
            },
            removeItem: function(key) {
                if (isIE) {
                    documentElement.removeAttribute('value');
                    documentElement.save(key);
                }
                else {
                    window.globalStorage[location.hostname].removeItem(key);
                }
            }
        };
    })();
}



/**
 * Created by loveyu on 2015/4/1.
 */
Vue.component('base-login-form',{template:"<form method=\"get\" v-on=\"submit: onLoginFormSubmit\"> <fieldset> <legend>用户登录<\/legend> <div class=\"alert alert-danger\" role=\"alert\" v-if=\"error_msg\"> <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"><\/span> <span class=\"sr-only\">Error:<\/span> {{error_msg}} <\/div> <div class=\"form-group\"> <div class=\"input-group\"> <span class=\"input-group-addon\">用户名<\/span> <input type=\"text\" v-model=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\"> <\/div> <\/div> <div class=\"form-group\"> <div class=\"input-group\"> <span class=\"input-group-addon\">密　码<\/span> <input type=\"password\" v-model=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\"> <\/div> <\/div> <div class=\"form-group\"> <button class=\"btn btn-primary form-control\" type=\"submit\">登录<\/button> <\/div> <\/fieldset> <p><a class=\"text-info\" href=\"forget.html\">忘记密码？<\/a><\/p><\/form>",methods:{
    onLoginFormSubmit: function (event) {
        event.preventDefault();
        var flag = true;
        if (this.username == '' || this.password == ''
        //|| this.type == ''
        ) {
            this.error_msg = "表单不允许有空值";
            flag = false;
        }
        if (flag) {
            this.error_msg = "";
            FUNC.ajax(CONFIG.api.user.login, 'post', {
                username: this.username, password: this.password
                //, type: this.type
            }, this.onLoginResult);
        }
        return false;
    }, onLoginResult: function (data) {
        if (!data.status) {
            this.error_msg = data.msg ? data.msg : '未知错误';
        } else {
            FUNC.saveToken(data.data);
            FUNC.redirect('home.html');
        }
    }
}});
Vue.component('base-loading',{template:"<div class=\"jumbotron\"><p class=\"text-center\">加载中.......<\/p><\/div>"});
Vue.component('quiz-list',{template:"<div class=\"page-header\"> <h2>选择你要测试的题目<\/h2><\/div><div class=\"list-group\"> <a v-repeat=\"data\" class=\"list-group-item\" href=\"#\/quiz\/{{quizId}}\"> <span class=\"badge\">{{numResponses}}<\/span> {{title}} <\/a><\/div>"});
Vue.component('quiz-quiz-by-id',{template:"<h3>TEST<\/h3><p>ID:{{id}}<\/p>"});


/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = true;
var DOMAIN = (function () {
    switch (document.location.host) {
        case "go.course.org":
            return "http://127.0.0.1:8080/";
        case "10.109.0.10":
            return "http://10.109.0.10:8080/";
    }
    return "http://" + document.location.host + "/";
})();
var CONFIG = {
    site_title: 'GO Course',
    site_description: '让课程变得更简单',
    site_url: DOMAIN,
    api_url: DOMAIN + 'gocourse/',
    captcha_url: DOMAIN + "gocourse/tools/captcha",
    api: {
        user: {
            login: "user_action/login",
            register: "user_action/register",
            logout: "user_action/logout",
            info: "user/info",
            change_password: "user/change_password",
            upload_avatar: 'user/upload_avatar',
            email_status: 'user/email/status',//当前邮箱状态
            email_bind: 'user/email/bind',//绑定邮箱，当前邮箱未验证的状态下的情况下
            email_unbind: 'user/email/unbind',//解绑邮箱
            email_unbind_confirm: 'user/email/unbind_confirm',//解绑邮箱后，向服务器发送请求，确认新邮箱
            email_new: 'user/email/new',//设置一个新邮箱，必须在未绑定情形下
            email_send: 'user/email/send',//向邮箱发送邮件
            forget_send_mail:'user_action/forget_password/send_mail',
            forget_check_code:'user_action/forget_password/check_code',
            forget_reset:'user_action/forget_password/reset'
        },
        student: {
            info: "student/info",
            bind_info: "student/bind_info",
            update_info: "student/update_info"
        },
        college: {
            get_universities: "college/get_universities",
            get_colleges: "college/get_colleges",
            get_departments: "college/get_departments",
            get_classes: "college/get_classes"
        },
        teacher_info: 'teacher_info',
        update_teacher_info: "update_teacher_info",
        quiz: {
            list: "quiz/list"
        }
    }
};
//初始化API完整地址
for (var name in CONFIG.api) {
    if (CONFIG.api.hasOwnProperty(name)) {
        switch (typeof CONFIG.api[name]) {
            case "string":
                CONFIG.api[name] = CONFIG.api_url + CONFIG.api[name];
                break;
            case "object":
                for (var name2 in CONFIG.api[name]) {
                    if (CONFIG.api[name].hasOwnProperty(name2)) {
                        CONFIG.api[name][name2] = CONFIG.api_url + CONFIG.api[name][name2];
                    }
                }
                break;
        }
    }
}
//用户基本信息
var Member = {
    login_request: false,//是否进行了登录请求，用于登录先前检测
    login_status: false,
    id: 0,
    user_type: 'student',
    data: null
};
var Page = {};//用于保存完整的页面调用类


/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
        nav: function (name, link, title, active) {
            return {
                active: active, name: name, link: link, title: title
            };
        }, ajax: function (url, method, data, success_callback, error) {
            //var token = FUNC.getToken();
            var option = {
                url: url,
                dataType: "json",
                data: data,
                method: method,
                xhrFields: {
                    withCredentials: true
                }, success: success_callback,
                error: error
            };
            //if (token != null) {
            //    //添加Token
            //    option.data.__token = token.token;
            //}
            jQuery.ajax(option);
        },
        redirect: function (url) {
            window.location.href = url;
        },
        fileUpload: function (url, formData, callback) {
            var xhr = new XMLHttpRequest(); //创建请求对象
            xhr.open("POST", url, true);
            xhr.withCredentials = true;
            xhr.addEventListener("load", callback, false);
            xhr.send(formData);
        },
        parseJSON: function (data) {
            return jQuery.parseJSON(data);
        },
        objMerge: function (des, src, override) {
            //合并多个对象
            var i;
            var len;
            if (src instanceof Array) {
                for (i = 0, len = src.length; i < len; i++)
                    FUNC.objMerge(des, src[i], override);
            }
            for (i in src) {
                if (override || !(i in des)) {
                    des[i] = src[i];
                }
            }
            return des;
        },
        alertOnElem: function (elem, msg) {
            $(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
        },
        /**
         * 保存Token在浏览器中
         * @param data object
         */
        saveToken: function (data) {
            localStorage.setItem("token.token", data.token);
            localStorage.setItem("token.expire", data.expire);
        },
        /**
         * 获取当前Token
         */
        getToken: function () {
            var token = localStorage.getItem("token.token");
            var expire = localStorage.getItem("token.expire");
            if (token === null || token.length != 64 || expire === null || expire === "") {
                return null;
            }
            return {token: token, expire: +expire};
        },
        delToken: function () {
            localStorage.removeItem("token.token");
            localStorage.removeItem("token.expire");
        },
        mapToObjArr: function (data, keyName, valueName) {
            var rt = [], obj;
            for (var i in data) {
                obj = {};
                obj[keyName] = i;
                obj[valueName] = data[i];
                rt.push(obj);
            }
            return rt;
        },
        targetSet: function (target, value) {
            jQuery(target).html(value);
        },
        eventBind: function (obj, on, call) {
            jQuery(obj).bind(on, call);
        },
        eventTrigger: function (obj, action, data, elem, onlyHandlers) {
            jQuery(obj).trigger(action, data, elem, onlyHandlers);
        },
        verify: {
            email: function (email) {
                return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
            }
        }
    }
    ;



var Hook = (function(){

	var _queue = {};

	var addAction = function(name, action, priority){
		if(!_queue.hasOwnProperty(name)){
			_queue[name] = [];
		}
		_queue[name].push({
			action : action,
			priority : priority || 10
		});
		_queue[name].sort(_compare);
	};

	var doActions = function(name, arg){
		if(typeof arg=="undefined"){
			arg = null;
		}
		if (!_queue.hasOwnProperty(name)){
			return arg;
		}
		var actions = _queue[name];
		var args  = Array.prototype.slice.call(arguments, 0);
		if(args.length>2){
            args.shift();
		}
		for (var i in actions) {
            args.shift();
            args.unshift(arg);
			arg = actions[i].action.apply(this, args);
		}
		return arg;
	};

	var hasAction = function(name){
		return _queue.hasOwnProperty(name);
	};

	var removeAction = function(name){
		if (_queue.hasOwnProperty(name))
			_queue[name] = [];
	};


	var _compare = function(hook1, hook2){
		return hook1.priority < hook2.priority;
	};

	return {
		add : addAction,
		apply : doActions,
		has : hasAction,
		remove : removeAction
	};
})();


/**
 * Created by loveyu on 2015/4/20.
 */

Page.bind_student_info = (function () {
    var obj = document.getElementById("BindStudentInfo");
    var status = obj != null;
    if (!status) {
        Hook.add('login.finish', function (data) {
            if (data.name === null && data.user_type == "student") {
                FUNC.redirect("bind_student_info.html");
            }
        });
    }
    return function () {
        return new Vue({
            el: "#BindStudentInfo",
            data: {
                universities: [],
                colleges: [],
                departments: [],
                classes: [],
                form_init: {
                    university: "",
                    college: "",
                    department: "",
                    class: ""
                },
                form: {
                    name: "",
                    sid: "",
                    sex: "",
                    university: "",
                    college: "",
                    department: "",
                    class: ""
                },
                error_msg: ""
            },
            methods: {
                onSubmit: function (event) {
                    var filed_map = {
                        name: "姓名",
                        sid: "学号",
                        sex: "性别",
                        university: "学校",
                        college: "学院",
                        department: "专业",
                        class: "班级"
                    };
                    this.error_msg = "";
                    event.preventDefault();
                    for (var i in this.form) {
                        if (this.form[i] === "") {
                            this.error_msg = filed_map[i] + ": 存在空值，请检查";
                            return false;
                        }
                        switch (i) {
                            case "name":
                                if (!/^[\u4e00-\u9fa5]{2,5}$/.test(this.form[i])) {
                                    this.error_msg = "姓名只允许2-5字的中文名";
                                    return false;
                                }
                                break;
                            case "sid":
                                if (!/^[1-9][0-9]{5,15}$/.test(this.form[i])) {
                                    this.error_msg = "请填写正确的学号";
                                    return false;
                                }
                                break;
                            case "sex":
                                if (this.form[i] != "0" && this.form[i] != "1") {
                                    this.error_msg = "请选择你的性别";
                                    return false;
                                }
                                break;
                        }
                    }
                    this.error_msg = "";
                    FUNC.ajax(CONFIG.api.student.bind_info, "POST", this.form, this.submitCall);
                    return false;
                },
                submitCall: function (result) {
                    if (result.status) {
                        FUNC.redirect("home.html#/");
                    } else {
                        this.error_msg = result.msg;
                    }
                },
                getUniversitiesCall: function (result) {
                    if (result.status) {
                        this.universities = FUNC.mapToObjArr(result.data, "id", "name");
                    }
                    if (this.form_init.university != null) {
                        this.form.university = this.form_init.university;
                        this.form_init.university = null;
                        this.universityChange(null);
                    }
                },
                universityChange: function (event) {
                    //清除下级内容
                    this.classes = [];
                    this.departments = [];
                    this.colleges = [];
                    //调用getCollegesCall
                    if (this.form.university != "") {
                        FUNC.ajax(CONFIG.api.college.get_colleges, "get", {uni_id: this.form.university}, this.getCollegesCall);
                    }
                },
                getCollegesCall: function (result) {
                    if (result.status) {
                        this.colleges = FUNC.mapToObjArr(result.data.colleges, "id", "name");
                    }
                    if (this.form_init.college != null) {
                        this.form.college = this.form_init.college;
                        this.form_init.college = null;
                        this.collegeChange(null);
                    }
                },
                collegeChange: function (event) {
                    //清除下级
                    this.classes = [];
                    this.departments = [];
                    if (this.form.college != "") {
                        FUNC.ajax(CONFIG.api.college.get_departments, "get", {college_id: this.form.college}, this.getDepartmentsCall);
                    }
                },
                getDepartmentsCall: function (result) {
                    if (result.status) {
                        this.departments = FUNC.mapToObjArr(result.data.departments, "id", "name");
                    }
                    if (this.form_init.department != null) {
                        this.form.department = this.form_init.department;
                        this.form_init.department = null;
                        this.departmentChange(null);
                    }
                },
                departmentChange: function (event) {
                    //清除下级
                    this.classes = [];
                    if (this.form.department != "") {
                        FUNC.ajax(CONFIG.api.college.get_classes, "get", {dept_id: this.form.department}, this.getClassesCall);
                    }
                },
                getClassesCall: function (result) {
                    if (result.status) {
                        this.classes = FUNC.mapToObjArr(result.data.classes, "id", "name");
                    }
                    if (this.form_init.class != null) {
                        this.form.class = this.form_init.class;
                        this.form_init.class = null;
                        this.classChange(null);
                    }
                },
                classChange: function (event) {
                    //TODO noting
                }
            },
            created: function () {
                FUNC.ajax(CONFIG.api.college.get_universities, "get", {}, this.getUniversitiesCall);
            }
        });
    };
})();


/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_student = function () {
    var cs_vm = new Vue({
        el: "#CourseStudent",
        data: {
            currentView: "base-loading",
            currentName: "base-loading",
            result: null,
            menus: {
                my: {url: '/', name: '我的课表', active: false},
                add: {url: '/add', name: '添加课程', active: false}
            }
        },
        methods: {
            m_my: function () {
                this.currentView = "my";
            },
            m_add: function () {
                this.currentView = "add";
            }
        },
        components: {
            my: {template:"<h3>学生课表<\/h3>"},
            add: {template:"<h3>添加课表<\/h3>"}
        }
    });
    var change_menus_active = function (view) {
        if (cs_vm.menus.hasOwnProperty(cs_vm.currentName)) {
            cs_vm.menus[cs_vm.currentName].active = false;
        }
        cs_vm.currentView = "base-loading";
        cs_vm.currentName = view;
        cs_vm.menus[view].active = true;
    };
    var routes = {
        '/': function () {
            change_menus_active("my");
            cs_vm.m_my();
        },
        '/add': function () {
            change_menus_active("add");
            cs_vm.m_add();
        }
    };
    var router = Router(routes);//初始化一个路由器
    var login_call = function (arg) {
        if (Member.user_type != "student") {
            FUNC.alertOnElem(cs_vm.$el, "非法访问");
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
    return cs_vm;
};


/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_teacher = function () {
    var ct_vm = new Vue({
        el: "#CourseTeacher",
        data: {
            currentView: "base-loading",
            currentName: "base-loading",
            result: null,
            menus: {
                my: {url: '/', name: '我的课表', active: false},
                add: {url: '/add', name: '添加课表', active: false}
            }
        },
        methods: {
            m_my: function () {
                this.currentView = "my";
            },
            m_add: function () {
                this.currentView = "add";
            }
        },
        components: {
            my: {template:"<h3>教师课表<\/h3>"},
            add: {template:"<h3>添加课表<\/h3>"}
        }
    });
    var change_menus_active = function (view) {
        if (ct_vm.menus.hasOwnProperty(ct_vm.currentName)) {
            ct_vm.menus[ct_vm.currentName].active = false;
        }
        ct_vm.currentView = "base-loading";
        ct_vm.currentName = view;
        ct_vm.menus[view].active = true;
    };
    var routes = {
        '/': function () {
            change_menus_active("my");
            ct_vm.m_my();
        },
        '/add': function () {
            change_menus_active("add");
            ct_vm.m_add();
        }
    };
    var router = Router(routes);//初始化一个路由器
    var login_call = function (arg) {
        if (Member.user_type != "teacher") {
            FUNC.alertOnElem(ct_vm.$el, "非法访问");
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
    return ct_vm;
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.forget = function () {
    var vm = new Vue({
        el: "#ForgetPassword",
        data: {
            error_msg: '',
            email: '',
            captcha: '',
            type: '',
            pwd_1: '',
            pwd_2: '',
            code: "",
            setup: 'send_mail',//默认步骤
            captcha_url: CONFIG.captcha_url,
            lock: false
        }, methods: {
            onClickCaptcha: function (event) {
                event.target.src = CONFIG.captcha_url + "?rand=" + Math.random();
            },
            onSendMail: function (event) {
                event.preventDefault();
                var obj = this;
                if (obj.lock) {
                    obj.error_msg = "请等待操作结束";
                    return false;
                }
                obj.error_msg = "";
                var flag = true;
                if (obj.email == '' || obj.captcha == '') {
                    obj.error_msg = "表单不允许有空值";
                    return false;
                }
                if (!FUNC.verify.email(obj.email)) {
                    obj.error_msg = "邮箱格式不正确";
                    return false;
                }
                FUNC.targetSet("#SendMailButton", "邮件发送中，请稍等");
                obj.lock = true;
                FUNC.ajax(CONFIG.api.user.forget_send_mail, 'post', {
                    email: obj.email,
                    captcha: obj.captcha
                }, function (result) {
                    obj.lock = false;
                    FUNC.targetSet("#SendMailButton", "再次发送邮件");
                    if (!result.status) {
                        FUNC.eventTrigger("#CaptchaImg", "click");
                        obj.error_msg = result.msg ? result.msg : '未知错误';
                    } else {
                        obj.setup = "code";
                        obj.code = "";
                    }
                });
                return false;
            },
            onCheckCode: function (event) {
                event.preventDefault();
                var obj = this;
                obj.error_msg = "";
                if (!/[a-zA-Z0-9]{32}/.test(obj.code)) {
                    obj.error_msg = "验证码格式有误";
                    return false;
                }
                FUNC.ajax(CONFIG.api.user.forget_check_code, "post", {code: obj.code}, function (result) {
                    obj.error_msg = "";
                    if (result.status) {
                        obj.setup = "reset";
                    } else {
                        obj.error_msg = result.msg;
                    }
                });
                return false;
            },
            onReset: function (event) {
                event.preventDefault();
                var obj = this;
                obj.error_msg = "";
                if (obj.pwd_1 == "" || obj.pwd_2 == "") {
                    obj.error_msg = "密码不允许为空";
                    return false;
                }
                if (obj.pwd_1 != obj.pwd_2) {
                    obj.error_msg = "两次密码不一致";
                    return false;
                }
                FUNC.ajax(CONFIG.api.user.forget_reset, "post", {password: obj.pwd_1}, function (result) {
                    obj.error_msg = "";
                    if (result.status) {
                        obj.setup = "finish";
                    } else {
                        obj.error_msg = result.msg;
                    }
                });
                return false;
            }
        }
    });
    var hash_c = function () {
        if (location.hash == "#code") {
            vm.setup = "input_code";
        } else if (/#code\/([a-zA-Z0-9]{32})/.test(location.hash)) {
            vm.setup = "input_code";
            var x = location.hash.match(/#code\/([a-zA-Z0-9]{32})/);
            if (x != null && x.hasOwnProperty(1)) {
                vm.code = x[1];
            }
        } else if ("#reset" == location.hash) {
            vm.setup = "reset";
        } else {
            vm.setup = "send_mail";
        }
    };
    hash_c();
    FUNC.eventBind(window, "hashchange", hash_c);

    return vm;
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.header = function () {
    return new Vue({
        el: "#Header",
        data: {
            site_title: CONFIG.site_title,
            site_description: CONFIG.site_description,
            site_url: CONFIG.site_url,
            login_status: false,
            nav_main: [
                FUNC.nav('项目介绍', 'about', '关于项目的部分介绍'),
                FUNC.nav('APP下载', 'download', '下载APP到移动端')
            ],
            nav_right: [
                FUNC.nav('登录', 'login.html', '登录用户中心'),
                FUNC.nav('注册', 'register.html', '注册新用户')
            ],
            data: null,
            avatar: null,
            name: null,
            user_type: "student",
            home_url: CONFIG.site_url + "home.html"
        },
        methods: {
            loginRequest: function (data) {
                Member.login_request = true;
                Member.login_status = data.status;
                this.login_status = data.status;
                if (data.status) {
                    Member.id = data.data.id;
                    Member.data = data.data;
                    this.user_type = Member.user_type = data.data.user_type;
                    this.data = data.data;
                    this.name = data.data.name;
                    this.avatar = data.data.avatar;
                    if (this.user_type == "student") {
                        this.nav_main = [
                            FUNC.nav('课程测验', 'quiz.html#/', '开始进行课程测验')
                        ];
                    } else if (this.user_type == "teacher") {
                        this.nav_main = [];
                    }
                    Hook.apply('login.finish', data.data);
                }
                Hook.apply('login.status');
            },
            logout: function (event) {
                //退出登录
                event.preventDefault();
                FUNC.delToken();
                FUNC.ajax(CONFIG.api.user.logout, "GET", {}, function (result) {
                    if (result.status) {
                        location.href = "login.html";
                    } else {
                        alert("退出登录失败:" + result.msg);
                    }
                });
                return false;
            }
        },
        created: function () {
            //查询登录状态
            Member.login_request = false;
            FUNC.ajax(CONFIG.api.user.info, 'get', {}, this.loginRequest)
        }
    });
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.home = function () {
    var menus = {
        student: {
            student_info: {url: '/', name: '个人信息', active: false},
            edit_profile_student: {url: '/edit_profile_student', name: '编辑资料', active: false},
            edit_avatar: {url: '/edit_avatar', name: '更改头像', active: false},
            email_bind: {url: '/email_bind', name: '邮箱绑定', active: false},
            edit_password: {url: '/edit_password', name: '修改密码', active: false}
        },
        teacher: {
            teacher_info: {url: '/', name: '个人信息', active: true},
            edit_profile_student: {url: '/edit_profile_student', name: '编辑资料', active: false},
            edit_avatar: {url: '/edit_avatar', name: '更改头像', active: false},
            email_bind: {url: '/email_bind', name: '邮箱绑定', active: false},
            edit_password: {url: '/edit_password', name: '修改密码', active: false}
        }
    };
    var home_vm = new Vue({
        el: "#Home",
        data: {
            is_student: false,
            is_teacher: false,
            currentView: "base-loading",
            currentName: "base-loading",
            result: null,
            menus: []
        },
        methods: {
            m_student_info: function (result) {
                home_vm.result = result.data;
                home_vm.currentView = "student_info";
            },
            m_teacher_info: function (result) {
                home_vm.result = result.data;
                home_vm.currentView = "teacher_info";
            },
            m_edit_avatar: function () {
                home_vm.result = {
                    now_avatar: Member.data.avatar_more.lager,
                    file: null,
                    error: null,
                    success: false
                };
                home_vm.currentView = "edit_avatar";
            },
            m_edit_password: function () {
                home_vm.result = {
                    old: "",
                    new_pwd: "",
                    error: null,
                    success: false
                };
                home_vm.currentView = "edit_password";
            },
            m_edit_profile_student: function (result) {
                home_vm.result = FUNC.objMerge(result.data, {status: {error: null, success: false}});
                home_vm.currentView = "edit_profile_student";
            },
            m_email_bind: function (result) {
                if (result.status) {
                    home_vm.result = {
                        email: result.data.email,
                        email_status: result.data.status,
                        ajax_lock: false,//防止多次提交
                        error: null,
                        email_send_notice: "",//初始化邮件重发值
                        email_send_status: "",
                        success: false,
                        set_new_email: false,
                        input_new_bind_captcha: false,
                        new_email: "",
                        new_email_set_on_no_bind: "",
                        captcha: "",
                        captcha_new: "",
                        timer: 0
                    };
                } else {
                    home_vm.result = {
                        email: null,//逻辑判断空值，进行显示判断
                        email_status: null,
                        error: result.msg,
                        success: false
                    };
                }
                home_vm.currentView = "email_bind";
            }
        },
        components: {
            student_info: {template:"<div class=\"home-student-info\"><h3>我的个人信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user.uid}}<\/dd><dt>姓名<\/dt><dd>{{user.name}}<\/dd><dt>性别<\/dt><dd>{{user.sex}}<\/dd><dt>学校<\/dt><dd>{{college.uniName}}<\/dd><dt>学院<\/dt><dd>{{college.collegeName}}<\/dd><dt>专业<\/dt><dd>{{college.deptName}}<\/dd><dt>班级<\/dt><dd>{{college.className}}<\/dd><dt>个人简介<\/dt><dd>{{user.description}}<\/dd><\/dl><\/div>"},
            teacher_info: {template:"<div class=\"home-student-info\"><h3>教师信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user_id}}<\/dd><dt>姓名<\/dt><dd>{{name}}<\/dd><dt>学校<\/dt><dd>{{school}}<\/dd><dt>学院<\/dt><dd>{{college}}<\/dd><dt>专业<\/dt><dd>{{zy}}<\/dd><\/dl><\/div>"},
            edit_avatar: {template:"<div><h4>当前头像:<\/h4><img class=\"img-circle img-responsive\" v-attr=\"src: now_avatar\"><h4>上传新头像:<\/h4><div class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/div><div class=\"alert-success alert\" v-if=\"success\">头像更换成功<\/div><form method=\"post\" v-on=\"submit: onSubmitAvatar\"><div class=\"form-group\"><label for=\"InputFile\">选择图片<\/label><input type=\"file\" id=\"InputFile\" v-on=\"change: fileChange\"><p class=\"help-block\">从这里选择你要上传的图片，最大2MB，将会默认居中裁剪为200x200的方形。<\/p><\/div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-primary\">上传新的头像<\/button><\/div><\/form><\/div>",methods:{
    onSubmitAvatar: function (event) {
        event.preventDefault();
        this.error = null;
        this.success = false;
        if (this.file) {
            var fd = new FormData(); //创建表单
            fd.append("avatar", this.file);
            var obj = this;
            FUNC.fileUpload(CONFIG.api.user.upload_avatar, fd, function () {
                var data = FUNC.parseJSON(this.response);
                if (data.status) {
                    obj.error = "";
                    obj.success = true;
                    var rand = Math.random();
                    obj.now_avatar = data.data.avatar_more.lager + "?_=" + rand;//更新当前头像
                    Member.data = data.data;//更新数据
                    if (APP.page.hasOwnProperty("header")) {
                        APP.page.header.avatar = data.data.avatar + "?_=" + rand;
                    }
                } else {
                    obj.error = data.msg;
                }
            });
        } else {
            this.error = "未选择正确的图片";
        }
        return false;
    }, fileChange: function (event) {
        this.file = event.target.files[0];
        this.error = null;
        if (this.file.size > 1024 * 2 * 1024) {
            this.error = "当前文件大于2MB";
            this.file = null;
        } else if (this.file.type.indexOf("image/") != 0) {
            this.error = "当前文件非图片文件";
            this.file = null;
        } else if (this.file == null) {
            this.error = "文件为空，不存在";
        }
        if (this.error !== null) {
            $("#InputFile").val("");
        }
    }
}},
            edit_password: {template:"<div><form v-on=\"submit: onSubmit\" style=\"max-width: 500px;margin: 15px auto\" action=\"\" method=\"post\"><h3>修改我的密码<\/h3><p class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/p><p class=\"alert-success alert\" v-if=\"success\">成功修改密码<\/p><div class=\"form-group\"><label class=\"sr-only\" for=\"InputOld\">旧密码<\/label><div class=\"input-group\"><div class=\"input-group-addon\">旧密码<\/div><input type=\"password\" name=\"old\" v-model=\"old\" class=\"form-control\" id=\"InputOld\" placeholder=\"输入旧密码\"><\/div><\/div><div class=\"form-group\"><label class=\"sr-only\" for=\"InputNew\">新密码<\/label><div class=\"input-group\"><div class=\"input-group-addon\">新密码<\/div><input type=\"password\" name=\"new\" v-model=\"new_pwd\" class=\"form-control\" id=\"InputNew\" placeholder=\"输入新密码\"><\/div><\/div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-warning\">确认修改<\/button><\/div><\/form><\/div>",methods:{
    onSubmit: function (event) {
        this.error = null;
        if (this.old == "") {
            this.error = "原密码不能为空";
        } else {
            if (this.new_pwd.length < 6) {
                this.error = "密码长度不能小于6位";
            } else {
                if (this.old == this.new_pwd) {
                    this.error = "新旧密码不能相同";
                }
            }
        }
        var obj = this;
        FUNC.ajax(CONFIG.api.user.change_password, "post",
            {
                old_pwd: this.old, new_pwd: this.new_pwd
            }, function (data) {
                if (data.status) {
                    obj.old = "";
                    obj.new_pwd = "";
                    obj.success = true;
                    FUNC.saveToken(data.data)
                } else {
                    obj.success = false;
                    obj.error = data.msg;
                }
            });
        event.preventDefault();
        return false;
    }
}},
            edit_profile_student: {template:"<h3>编辑个人信息<\/h3><form style=\"max-width: 600px;margin: 0 auto\" method=\"post\" v-on=\"submit:onSubmit\"> <p class=\"alert-danger alert\" v-if=\"status.error\">{{status.error}}<\/p> <p class=\"alert-success alert\" v-if=\"status.success\">成功更新个人信息<\/p> <div class=\"form-group\"> <label class=\"control-label\" for=\"inputDesc\">个人描述<\/label> <div> <p class=\"help-block\">你的个人简单介绍<\/p> <textarea id=\"inputDesc\" class=\"form-control\" v-model=\"user.description\"><\/textarea> <\/div> <\/div> <div class=\"form-group\"> <div> <button type=\"submit\" class=\"btn btn-primary\">更新个人信息<\/button> <\/div> <\/div><\/form>",methods:{
    onSubmit: function (event) {
        event.preventDefault();
        this.status.success = false;
        this.status.error = null;
        var obj = {
            user_description:this.user.description
        };
        var em_obj = this;
        FUNC.ajax(CONFIG.api.student.update_info, "post", obj, function (data) {
            if (data.status) {
                em_obj.status.success = true;
            } else {
                em_obj.status.error = data.msg;
            }
        });
        return false;
    }
}},
            email_bind: {template:"<div> <h3>绑定邮箱账号<\/h3> <div class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/div> <div class=\"alert-success alert\" v-if=\"success\">{{success}}<\/div> <div v-if=\"email!=null\"> <blockquote> <p>当前邮箱: <code>{{email}}<\/code><\/p> <p v-if=\"new_email_set_on_no_bind\" class=\"text-warning\">新的邮箱: <code>{{new_email_set_on_no_bind}}<\/code><\/p> <p>状态: <span class=\"label label-success\" v-if=\"email_status==1\">已验证<\/span> <span class=\"label label-warning\" v-if=\"email_status==0\">未验证<\/span> <\/p> <div v-if=\"email_status==1\" class=\"form-inline\"> <button class=\"btn btn-danger btn-sm\" v-on=\"click: bind_change_btn\">更换新邮箱<\/button> <button class=\"btn btn-warning btn-sm\" v-on=\"click: bind_change_btn_have_code\">已有验证码<\/button> <\/div> <div v-if=\"email_status==0\" class=\"form-inline\"> <div class=\"form-group\"> <label for=\"InputCaptcha\">验证码:<\/label> <input type=\"text\" v-model=\"captcha\" class=\"form-control\" id=\"InputCaptcha\"\/> <button class=\"btn btn-primary\" v-on=\"click: submit_unbind\">验证<\/button> <\/div> <\/div> <\/blockquote> <div v-if=\"email_status==1\"> <div v-if=\"set_new_email\" class=\"form-inline\"> <p> <label for=\"InputNewBindEmail\">输入新的邮箱:<\/label> 该操作会发送两封邮件分别到你的邮箱，<span class=\"text-danger\">如果旧邮箱无法验证，请联系老师。<\/span> <\/p> <div class=\"form-group\"> <input type=\"email\" v-model=\"new_email\" class=\"form-control\" id=\"InputNewBindEmail\"\/> <button class=\"btn btn-primary\" v-on=\"click: bind_change_with_email\">确认<\/button> <\/div> <\/div> <\/div> <div v-if=\"email_status==1 && input_new_bind_captcha\" class=\"form-inline\"> <div class=\"form-group\"> <p><label for=\"InputOldEmailCaptcha\">输入原邮箱验证码：<\/label> <input type=\"email\" v-model=\"captcha\" class=\"form-control\" id=\"InputOldEmailCaptcha\"\/> <\/p> <p> <label for=\"InputNewEmailCaptcha\">输入新邮箱验证码：<\/label> <input type=\"email\" v-model=\"captcha_new\" class=\"form-control\" id=\"InputNewEmailCaptcha\"\/> <\/p> <button class=\"btn btn-primary\" v-on=\"click: bind_captcha\">确认<\/button> <\/div> <\/div> <div v-if=\"email_status==0\"> <div v-if=\"set_new_email\" class=\"form-inline\"> <div class=\"form-group\"> <label for=\"InputNewEmail\">新邮箱:<\/label> <input type=\"email\" v-model=\"new_email\" class=\"form-control\" id=\"InputNewEmail\"\/> <button class=\"btn btn-primary\" v-on=\"click: no_bind_change\">确认<\/button> <\/div> <\/div> <div v-if=\"!set_new_email\"> <h5>无法发送接收到邮件么？ <a href=\"#\" v-on=\"click: send_email_again\" class=\"btn btn-sm btn-{{email_send_status?email_send_status:'warning'}}\"> {{email_send_notice?email_send_notice:\"再次发送邮件\"}} <\/a> <\/h5> <h5>还是邮箱地址不正确？<a href=\"#\" v-on=\"click: edit_email\" class=\"btn btn-sm btn-danger\">修改邮件地址<\/a> <\/h5> <\/div> <p class=\"help-block\"><strong class=\"text-danger\">提示：<\/strong>验证码有效期仅为当前浏览器有效期内，请尽快通过验证<\/p> <\/div> <\/div><\/div>",methods:{
    send_email_again: function (event) {
        event.preventDefault();
        var obj = this;
        obj.error = "";
        if (obj.ajax_lock) {
            obj.error = "请等待当前操作结束";
            return false;
        }
        if (obj.timer > 0) {
            obj.error = "必须等待“" + obj.timer + "”后才能重新发送邮件";
            return false;
        }
        obj.error = "";
        obj.email_send_notice = "邮件发送中，请稍等....";
        obj.email_send_status = "danger";
        obj.ajax_lock = true;
        FUNC.ajax(CONFIG.api.user.email_send, "POST", {type: "old_send_again"}, function (result) {
            obj.error = "";
            obj.ajax_lock = false;
            obj.email_send_notice = "";
            if (result.status) {
                obj.timer_on_send_again();
            } else {
                obj.error = result.msg;
            }
        });
        return false;
    },
    timer_on_send_again: function () {
        var obj = this;
        obj.timer = 59;
        var timer_hand;
        var timer_call = function () {
            if (obj == null || obj.$data == null) {
                //处理异常，当对象不存在时直接结束掉
                if (timer_hand !== null) {
                    clearTimeout(timer_hand);
                }
                return;
            }
            if (obj != null && --obj.timer > 0) {
                obj.email_send_status = "success";
                obj.email_send_notice = obj.timer + " 秒后可重试";
                timer_hand = setTimeout(timer_call, 1000);
            } else {
                obj.email_send_status = "";
                obj.email_send_notice = "";
            }
        };
        timer_hand = setTimeout(timer_call, 0);
    },
    edit_email: function (event) {
        event.preventDefault();
        this.set_new_email = true;
        return false;
    },
    check_the_email: function () {
        var obj = this;
        if (obj.new_email == "") {
            obj.error = "新邮箱不允许为空";
            return false;
        }
        if (!FUNC.verify.email(obj.new_email)) {
            obj.error = "请输入正确的邮箱";
            return false;
        }
        if (obj.new_email == obj.email) {
            obj.error = "新旧邮箱不允许相同";
            return false;
        }
        return true;
    },
    no_bind_change: function (event) {
        event.preventDefault();
        var obj = this;
        obj.error = "";
        if (obj.ajax_lock) {
            obj.error = "请等待当前操作结束";
            return false;
        }
        if (!this.check_the_email()) {
            return false;
        }
        FUNC.targetSet(event.target, "修改中....");
        obj.ajax_lock = true;
        FUNC.ajax(CONFIG.api.user.email_new, "post", {email: obj.new_email}, function (result) {
            obj.ajax_lock = false;
            obj.error = "";
            if (result.status) {
                FUNC.targetSet(event.target, "修改成功");
                obj.success = "更新成功，邮件已发送，注意查收";
                obj.email = obj.new_email;
                obj.set_new_email = false;
                obj.new_email = "";
                obj.email_status = false;
                setTimeout(function () {
                    obj.success = "";
                }, 2000);
                obj.timer_on_send_again();
            } else {
                FUNC.targetSet(event.target, "重试");
                obj.error = result.msg;
            }
        });
        return false;
    },
    bind_change_btn: function () {
        this.set_new_email = true;
        this.input_new_bind_captcha = false;
    },
    bind_change_with_email: function (event) {
        var obj = this;
        obj.error = "";
        if (obj.ajax_lock) {
            obj.error = "请等待当前操作结束";
            return false;
        }
        if (!this.check_the_email()) {
            return false;
        }
        FUNC.targetSet(event.target, "请求提交中,请稍等....");
        obj.ajax_lock = true;
        FUNC.ajax(CONFIG.api.user.email_unbind, "post", {new_email: obj.new_email}, function (result) {
            obj.error = "";
            obj.ajax_lock = false;
            if (result.status) {
                FUNC.targetSet(event.target, "提交请求成功");
                obj.success = "更新成功，两封邮件已发送，注意查收";
                obj.new_email_set_on_no_bind = obj.new_email;//设置需要显示的新邮箱
                obj.new_email = "";
                obj.set_new_email = false;
                setTimeout(function () {
                    obj.success = "";
                }, 4000);
                obj.input_new_bind_captcha = true;
            } else {
                FUNC.targetSet(event.target, "重试");
                obj.error = result.msg;
            }
        });
        return false;
    },
    bind_captcha: function (event) {
        var obj = this;
        obj.error = "";
        if (obj.captcha == "" || obj.captcha_new == "") {
            obj.error = "验证码均不能为空";
            return;
        }
        FUNC.ajax(CONFIG.api.user.email_unbind_confirm, "post", {
            new_captcha: obj.captcha_new,
            old_captcha: obj.captcha
        }, function (result) {
            if (result.status) {
                obj.error = "";
                obj.input_new_bind_captcha = false;
                obj.success = "邮箱更换成功，页面即将刷新";
                setTimeout(function () {
                    window.location.reload();
                }, 1500);
            } else {
                obj.error = result.msg;
            }
        });
    },
    /**
     * 提交未绑定的账号的绑定信息
     */
    submit_unbind: function () {
        var obj = this;
        obj.error = "";
        if (obj.captcha == "") {
            obj.error = "当前验证码不能为空";
            return;
        }
        FUNC.ajax(CONFIG.api.user.email_bind, "post", {captcha: obj.captcha}, function (result) {
            obj.error = "";
            if (result.status) {
                obj.captcha = "";
                obj.email_status = 1;
            } else {
                obj.error = result.msg;
            }
        });
    },
    bind_change_btn_have_code: function () {
        this.input_new_bind_captcha = true;
    }
}}
        }
    });
    var change_menus_active = function (view) {
        if (home_vm.menus.hasOwnProperty(home_vm.currentName)) {
            home_vm.menus[home_vm.currentName].active = false;
        }
        home_vm.currentView = "base-loading";
        home_vm.currentName = view;
        home_vm.menus[view].active = true;
    };
    var routes = {
        '/': function () {
            if (home_vm.is_student) {
                change_menus_active("student_info");
                FUNC.ajax(CONFIG.api.student.info, "get", {}, home_vm.m_student_info);
            } else if (home_vm.is_teacher) {
                change_menus_active("teacher_info");
                FUNC.ajax(CONFIG.api.teacher_info, "get", {}, home_vm.m_teacher_info);
            }
        },
        '/edit_avatar': function () {
            change_menus_active("edit_avatar");
            home_vm.m_edit_avatar();
        },
        '/edit_password': function () {
            change_menus_active("edit_password");
            home_vm.m_edit_password();
        },
        '/email_bind': function () {
            change_menus_active("email_bind");
            FUNC.ajax(CONFIG.api.user.email_status, "get", {}, home_vm.m_email_bind);
        },
        '/edit_profile_student': function () {
            change_menus_active("edit_profile_student");
            FUNC.ajax(CONFIG.api.student.info, "get", {}, home_vm.m_edit_profile_student);
        }
    };
    var router = Router(routes);//初始化一个路由器
    var login_call = function (arg) {
        home_vm.is_student = Member.user_type == "student";
        home_vm.is_teacher = !home_vm.is_student;
        home_vm.menus = home_vm.is_student ? menus.student : menus.teacher;
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
    return home_vm;
};


/**
 * Created by loveyu on 2015/3/24.
 */
Page.index = function () {
    var in_vm = new Vue({
        el: "#Index",
        data: {
            login_form: false,
            result: {
                error_msg: '', username: '', password: '', type: ''
            }
        }
    });
    var login_call = function (arg) {
        if(!Member.login_status){
            in_vm.login_form = true;
            $('#LoginModal').modal('show');
        }
        return arg;
    };
    if (!Member.login_status) {
        Hook.add('login.status', login_call);
    } else {
        login_call();
    }
    return in_vm;
};


/**
 * Created by loveyu on 2015/3/24.
 */
Page.login = function () {
    return new Vue({
        el: "#Login",
        data: {
            result: {
                error_msg: '', username: '', password: ''
                //, type: ''
            }
        }
    });
};


/**
 * Created by loveyu on 2015/4/6.
 */

Page.quiz = function () {
    var quiz_vm = new Vue({
        el: "#Quiz",
        data: {
            result:null,
            currentView:'base-loading'
        },
        methods: {
            load: function (data) {
                if(data.status){
                    this.currentView = "quiz-list";
                    this.result = {data:data.data};
                }else{
                    FUNC.alertOnElem(quiz_vm.$el, "无法加载数据");
                }
            },
            quiz_by_id:function(id){
                this.result = {id:id};
                this.currentView = "quiz-quiz-by-id";
            },
            loading:function(){
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


/**
 * Created by loveyu on 2015/4/12.
 */
Page.register = function () {
    return new Vue({
        el: "#Register",
        data: {
            error_msg: '',
            form: {
                email: '', password: ''
            }
        },
        methods: {
            onFormSubmit: function (event) {
                event.preventDefault();
                if (this.form.email == "" || this.form.password == "") {
                    this.error_msg = "表单不允许为空";
                    return false;
                }
                if (!FUNC.verify.email(this.form.email)) {
                    this.error_msg = "邮箱格式不正确";
                    return false;
                }
                if (this.form.password.length > 32 || this.form.password.length < 6) {
                    this.error_msg = "密码长度为6-32个字符";
                    return false;
                }
                this.error_msg = "";
                FUNC.ajax(CONFIG.api.user.register, 'post', this.form, this.regCallback);
                return false;
            },
            regCallback: function (data) {
                if (data.status) {
                    location.href = "home.html#/CreateInfo";
                } else {
                    this.error_msg = data.msg ? data.msg : '未知错误';
                }
            }
        }
    });
};


/**
 * Created by loveyu on 2015/3/23.
 */
var APP = {
    page: {
        //页面的PAGE实例
    },
    runPage: function (page) {
        if (typeof Page[page] == "function") {
            if (!APP.page.hasOwnProperty(page)) {
                APP.page[page] = Page[page]();
            }
            return APP.page[page];
        } else {
            console.error("Page:" + page + ", not found.");
        }
        return null;
    }
};

APP.runPage('header');


