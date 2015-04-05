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
            my: {__require: 'course_student/my.html'},
            add: {__require: 'course_student/add.html'},
            loading: {__require: 'home/loading.html'}
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