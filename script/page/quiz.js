/**
 * Created by loveyu on 2015/4/6.
 */

Page.quiz = function () {
    var quiz_vm = new Vue({
        el: "#Quiz",
        data: {

        },
        methods: {
            load: function (data) {
                console.log(data);
            }
        }
    });
    var login_call = function (arg) {
        if (Member.user_type != "student") {
            FUNC.alertOnElem(quiz_vm.$el, "非法访问");
        } else {
            FUNC.ajax(CONFIG.api.quiz.list, "get", {}, quiz_vm.load);
        }
        return arg;
    };
    if (!Member.login_status) {
        Hook.add('login.finish', login_call);
    } else {
        login_call();
    }
    return quiz_vm;
};