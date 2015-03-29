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