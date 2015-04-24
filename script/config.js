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
            change_password: "user/change_password",
            upload_avatar: 'user/upload_avatar',
            email_status: 'user/email/status',//当前邮箱状态
            email_bind: 'user/email/bind',//绑定邮箱，当前邮箱未验证的状态下的情况下
            email_unbind: 'user/email/unbind',//解绑邮箱
            email_new: 'user/email/new',//设置一个新邮箱，必须在未绑定情形下
            email_send: 'user/email/send'//向邮箱发送邮件
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
        forget: 'forget',
        reset_password: 'reset_password',
        teacher_info: 'teacher_info',
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