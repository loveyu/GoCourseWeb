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