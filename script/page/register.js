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