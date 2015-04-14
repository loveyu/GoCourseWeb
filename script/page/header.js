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
                    Hook.apply('login.finish');
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