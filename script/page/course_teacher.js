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
            my: {__require: 'course_teacher/my.html'},
            add: {__require: 'course_teacher/add.html'}
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