/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = true;
var DOMAIN = (function () {
    return "http://" + document.location.host + "/";
})();
var CONFIG = {
    site_title: 'GO Course',
    site_description: '让课程变得更简单',
    site_url: DOMAIN,
    api_url: DOMAIN + 'api/',
    api: {
        member_info: 'member',
        login: 'login',
        forget: 'forget',
        reset_password: 'reset_password',
        student_info: 'student_info',
        teacher_info: 'teacher_info',
        update_avatar: 'update_avatar',
        update_password: "update_password",
        update_student_info: "update_student_info",
        update_teacher_info: "update_teacher_info"
    }, captcha_url: DOMAIN + "image/captcha.jpg"
};
//初始化API完整地址
for (var name in CONFIG.api) {
    if (CONFIG.api.hasOwnProperty(name)) {
        CONFIG.api[name] = CONFIG.api_url + CONFIG.api[name];
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
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
    nav: function (name, link, title, active) {
        return {
            active: active, name: name, link: link, title: title
        };
    }, ajax: function (url, method, data, success_callback) {
        jQuery.ajax({
            url: url, dataType: "json", data: data, method: method, xhrFields: {
                withCredentials: true
            }, success: success_callback
        });
    }, redirect: function (url) {
        window.location.href = url;
    }, fileUpload: function (url, formData, callback) {
        var xhr = new XMLHttpRequest(); //创建请求对象
        xhr.open("POST", url, true);
        xhr.addEventListener("load", callback, false);
        xhr.send(formData);
    }, parseJSON: function (data) {
        return jQuery.parseJSON(data);
    }, objMerge: function (des, src, override) {
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
    }, alertOnElem: function (elem, msg) {
        $(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
    }
};


/**
 * Created by loveyu on 2015/3/30.
 */
Page.course_student = function () {
    var cs_vm = new Vue({
        el: "#CourseStudent",
        data: {
            currentView: "loading",
            currentName: "loading",
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
            add: {template:"<h3>添加课表<\/h3>"},
            loading: {template:"<div class=\"jumbotron\"><p class=\"text-center\">加载中.......<\/p><\/div>"}
        }
    });
    var change_menus_active = function (view) {
        if (cs_vm.menus.hasOwnProperty(cs_vm.currentName)) {
            cs_vm.menus[cs_vm.currentName].active = false;
        }
        cs_vm.currentView = "loading";
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
            currentView: "loading",
            currentName: "loading",
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
            add: {template:"<h3>添加课表<\/h3>"},
            loading: {template:"<div class=\"jumbotron\"><p class=\"text-center\">加载中.......<\/p><\/div>"}
        }
    });
    var change_menus_active = function (view) {
        if (ct_vm.menus.hasOwnProperty(ct_vm.currentName)) {
            ct_vm.menus[ct_vm.currentName].active = false;
        }
        ct_vm.currentView = "loading";
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
                //FUNC.nav('项目介绍', 'about', '关于项目的部分介绍'),
                //FUNC.nav('APP下载', 'download', '下载APP到移动端')
            ],
            nav_right: [
                FUNC.nav('登录', 'login.html', '登录用户中心')
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
                    Hook.apply('login.finish');
                }
            },
            logout: function (event) {
                //退出登录
                event.preventDefault();
                return false;
            }
        },
        created: function () {
            //查询登录状态
            Member.login_request = false;
            FUNC.ajax(CONFIG.api.member_info, 'get', {}, this.loginRequest)
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
            currentView: "loading",
            currentName: "loading",
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
		FUNC.ajax(CONFIG.api.update_password,"post",{old:this.old,new_pwd:this.new_pwd},function(data){
			if(data.status){
				obj.old = "";
				obj.new_pwd = "";
				obj.success = true;
			}else{
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
}},
            loading: {template:"<div class=\"jumbotron\"><p class=\"text-center\">加载中.......<\/p><\/div>"}
        }
    });
    var change_menus_active = function (view) {
        if (home_vm.menus.hasOwnProperty(home_vm.currentName)) {
            home_vm.menus[home_vm.currentName].active = false;
        }
        home_vm.currentView = "loading";
        home_vm.currentName = view;
        home_vm.menus[view].active = true;
    };
    var routes = {
        '/': function () {
            if (home_vm.is_student) {
                change_menus_active("student_info");
                FUNC.ajax(CONFIG.api.student_info, "get", {}, home_vm.m_student_info);
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
            FUNC.ajax(CONFIG.api.student_info, "get", {}, home_vm.m_edit_profile_student);
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
Page.login = function () {
    return new Vue({
        el: "#Login", data: {
            error_msg: '', username: '', password: '', type: ''
        }, methods: {
            onLoginFormSubmit: function (event) {
                var flag = true;
                if (this.username == '' || this.password == '' || this.type == '') {
                    this.error_msg = "表单不允许有空值";
                    flag = false;
                }
                if (flag) {
                    FUNC.ajax(CONFIG.api.login, 'post', {
                        username: this.username, password: this.password, type: this.type
                    }, this.onLoginResult);
                }
                event.preventDefault();
                return false;
            }, onLoginResult: function (data) {
                if (!data.status) {
                    this.error_msg = data.msg ? data.msg : '未知错误';
                } else {
                    FUNC.redirect('home.html');
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


