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
Vue.component('base-login-form',{template:"<form method=\"get\" v-on=\"submit: onLoginFormSubmit\"> <fieldset> <legend>用户登录<\/legend> <div class=\"alert alert-danger\" role=\"alert\" v-if=\"error_msg\"> <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"><\/span> <span class=\"sr-only\">Error:<\/span> {{error_msg}} <\/div> <div class=\"form-group\"> <div class=\"input-group\"> <span class=\"input-group-addon\">用户名<\/span> <input type=\"text\" v-model=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\"> <\/div> <\/div> <div class=\"form-group\"> <div class=\"input-group\"> <span class=\"input-group-addon\">密　码<\/span> <input type=\"password\" v-model=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\"> <\/div> <\/div> <!--<div class=\"form-group\">--> <!--<div class=\"input-group\">--> <!--<span class=\"input-group-addon\">类　型<\/span>--> <!--<div class=\"form-control\">--> <!--<label class=\"radio-inline\">--> <!--<input type=\"radio\" name=\"type\" v-model=\"type\" checked=\"checked\"--> <!--id=\"TypeStudent\" value=\"student\">--> <!--学生--> <!--<\/label>--> <!--<label class=\"radio-inline\">--> <!--<input type=\"radio\" name=\"type\" v-model=\"type\" id=\"TypeTeacher\"--> <!--value=\"teacher\">--> <!--教师--> <!--<\/label>--> <!--<\/div>--> <!--<\/div>--> <!--<\/div>--> <div class=\"form-group\"> <button class=\"btn btn-primary form-control\" type=\"submit\">登录<\/button> <\/div> <\/fieldset> <p><a class=\"text-info\" href=\"forget.html\">忘记密码？<\/a><\/p><\/form>",methods:{
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
    api: {
        user: {
            login: "user_action/login",
            register: "user_action/register",
            logout: "user_action/logout",
            info: "user/info",
            change_password: "user/change_password"
        },
        student:{
            info:"student/info",
            bind_info:"student/bind_info"
        },
        college:{
            get_universities:"college/get_universities",
            get_colleges:"college/get_colleges",
            get_departments:"college/get_departments",
            get_classes:"college/get_classes"
        },
        forget: 'forget',
        reset_password: 'reset_password',
        teacher_info: 'teacher_info',
        update_avatar: 'update_avatar',
        update_student_info: "update_student_info",
        update_teacher_info: "update_teacher_info",
        quiz: {
            list: "quiz/list"
        }
    }, captcha_url: DOMAIN + "image/captcha.jpg"
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
            FUNC.ajax(CONFIG.api.user.logout, "GET", {});
        },
        mapToObjArr:function(data,keyName,valueName){
            var rt = [],obj;
            for(var i in data){
                obj = {};
                obj[keyName] = i;
                obj[valueName] = data[i];
                rt.push(obj);
            }
            return rt;
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
    return new Vue({
        el: "#ForgetPassword",
        data: {
            error_msg: '',
            email: '',
            captcha: '',
            type: ''
        }, methods: {
            onClickCaptcha: function (event) {
                event.target.src = CONFIG.captcha_url + "?rand=" + Math.random();
            },
            onFormSubmit: function (event) {
                var flag = true;
                if (this.email == '' || this.captcha == '' || this.type == '') {
                    this.error_msg = "表单不允许有空值";
                    flag = false;
                }
                if (flag) {
                    FUNC.ajax(CONFIG.api.forget, 'post', {
                        email: this.email, captcha: this.captcha, type: this.type
                    }, this.FormResult);
                }
                event.preventDefault();
                return false;
            },
            FormResult: function (data) {
                if (!data.status) {
                    this.error_msg = data.msg ? data.msg : '未知错误';
                } else {
                    alert("OK");
                }
            }
        }
    });
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
                location.href="login.html";
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
            edit_password: {url: '/edit_password', name: '修改密码', active: false}
        },
        teacher: {
            teacher_info: {url: '/', name: '个人信息', active: true},
            edit_profile_student: {url: '/edit_profile_student', name: '编辑资料', active: false},
            edit_avatar: {url: '/edit_avatar', name: '更改头像', active: false},
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
                    now_avatar: Member.data.avatar,
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
            }
        },
        components: {
            student_info: {template:"<div class=\"home-student-info\"><h3>我的个人信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user_id}}<\/dd><dt>姓名<\/dt><dd>{{name}}<\/dd><dt>学校<\/dt><dd>{{school}}<\/dd><dt>学院<\/dt><dd>{{college}}<\/dd><dt>专业<\/dt><dd>{{zy}}<\/dd><\/dl><\/div>"},
            teacher_info: {template:"<div class=\"home-student-info\"><h3>教师信息<\/h3><dl class=\"dl-horizontal\"><dt>用户名<\/dt><dd>{{user_id}}<\/dd><dt>姓名<\/dt><dd>{{name}}<\/dd><dt>学校<\/dt><dd>{{school}}<\/dd><dt>学院<\/dt><dd>{{college}}<\/dd><dt>专业<\/dt><dd>{{zy}}<\/dd><\/dl><\/div>"},
            edit_avatar: {template:"<div><h4>当前头像:<\/h4><img class=\"img-circle img-responsive\" v-attr=\"src: now_avatar\"><h4>上传新头像:<\/h4><div class=\"alert-danger alert\" v-if=\"error\">{{error}}<\/div><div class=\"alert-success alert\" v-if=\"success\">头像更换成功<\/div><form method=\"post\" v-on=\"submit: onSubmitAvatar\"><div class=\"form-group\"><label for=\"InputFile\">选择图片<\/label><input type=\"file\" id=\"InputFile\" v-on=\"change: fileChange\"><p class=\"help-block\">从这里选择你要上传的图片，将会默认居中裁剪为200x200的方形。<\/p><\/div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-primary\">上传新的头像<\/button><\/div><\/form><\/div>",methods:{
    onSubmitAvatar: function (event) {
        this.error = null;
        this.success = false;
        if (this.file) {
            var fd = new FormData(); //创建表单
            fd.append("file", this.file);
            var obj = this;
            FUNC.fileUpload(CONFIG.api.update_avatar, fd, function () {
                var data = FUNC.parseJSON(this.response);
                if (data.status) {
                    obj.error = "";
                    obj.success = true;
                } else {
                    obj.error = data.msg;
                }
            });
        } else {
            this.error = "未选择正确的图片";
        }
        event.preventDefault();
        return false;
    }, fileChange: function (event) {
        this.file = event.target.files[0];
        this.error = null;
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
            edit_profile_student: {template:"<h3>编辑个人信息<\/h3><form style=\"max-width: 600px;margin: 0 auto\" method=\"post\" v-on=\"submit:onSubmit\"> <p class=\"alert-danger alert\" v-if=\"status.error\">{{status.error}}<\/p> <p class=\"alert-success alert\" v-if=\"status.success\">成功更新个人信息<\/p> <div class=\"form-group\"> <label class=\"control-label\" for=\"input01\">姓名<\/label> <div> <input type=\"text\" id=\"input01\" v-model=\"name\" placeholder=\"\" class=\"form-control\"> <p class=\"help-block\">输入你的姓名<\/p> <\/div> <\/div> <div class=\"form-group\"> <label class=\"control-label\" for=\"input02\">学校<\/label> <div> <input type=\"text\" id=\"input02\" v-model=\"school\" placeholder=\"\" class=\"form-control\"> <p class=\"help-block\">输入你的姓名<\/p> <\/div> <\/div> <div class=\"form-group\"> <label class=\"control-label\" for=\"input03\">学院<\/label> <div> <input type=\"text\" id=\"input03\" v-model=\"college\" placeholder=\"\" class=\"form-control\"> <p class=\"help-block\">输入你的姓名<\/p> <\/div> <\/div> <div> <label class=\"control-label\" for=\"input04\">专业<\/label> <div> <input type=\"text\" id=\"input04\" v-model=\"zy\" placeholder=\"\" class=\"form-control\"> <p class=\"help-block\">输入你的姓名<\/p> <\/div> <\/div> <div class=\"form-group\"> <div> <button type=\"submit\" class=\"btn btn-primary\">更新个人信息<\/button> <\/div> <\/div><\/form>",methods:{
    onSubmit: function (event) {
        event.preventDefault();
        this.status.success = false;
        this.status.error = null;
        var obj = {
            user_id: this.user_id,
            name: this.name,
            school: this.school,
            college: this.college,
            zy: this.zy
        };
        var em_obj = this;
        FUNC.ajax(CONFIG.api.update_student_info, "post", obj, function (data) {
            if (data.status) {
                em_obj.status.success = true;
            } else {
                em_obj.status.error = data.msg;
            }
        });
        return false;
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


