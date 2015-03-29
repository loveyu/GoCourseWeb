/**
 * Created by loveyu on 2015/3/25.
 */
Page.home = function () {
    var menus = {
        student: {
            student_info: {
                url: '/',
                name: '个人信息',
                active: false
            },
            edit_profile_student: {
                url: '/edit_profile_student',
                name: '编辑资料',
                active: false
            },
            edit_avatar: {
                url: '/edit_avatar',
                name: '更改头像',
                active: false
            },
            edit_password: {
                url: '/edit_password',
                name: '修改密码',
                active: false
            }
        },
        teacher: {
            teacher_info: {
                url: '/',
                name: '个人信息',
                active: true
            }
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
            student_info: {__require: 'home/student_info.html'},
            edit_avatar: {__require: 'home/edit_avatar.html'},
            edit_password: {__require: 'home/edit_password.html'},
            edit_profile_student: {__require: 'home/edit_profile_student.html'},
            loading: {__require: 'home/loading.html'}
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
            change_menus_active("student_info");
            FUNC.ajax(CONFIG.api.student_info, "get", {}, home_vm.m_student_info);
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