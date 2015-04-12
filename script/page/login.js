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