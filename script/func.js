/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
        nav: function (name, link, title, active) {
            return {
                active: active, name: name, link: link, title: title
            };
        }, ajax: function (url, method, data, success_callback, error) {
            //var token = FUNC.getToken();
            var option = {
                url: url,
                dataType: "json",
                data: data,
                method: method,
                xhrFields: {
                    withCredentials: true
                }, success: success_callback,
                error: error
            };
            //if (token != null) {
            //    //添加Token
            //    option.data.__token = token.token;
            //}
            jQuery.ajax(option);
        },
        redirect: function (url) {
            window.location.href = url;
        },
        fileUpload: function (url, formData, callback) {
            var xhr = new XMLHttpRequest(); //创建请求对象
            xhr.open("POST", url, true);
            xhr.addEventListener("load", callback, false);
            xhr.send(formData);
        },
        parseJSON: function (data) {
            return jQuery.parseJSON(data);
        },
        objMerge: function (des, src, override) {
            //合并多个对象
            var i;
            var len;
            if (src instanceof Array) {
                for (i = 0, len = src.length; i < len; i++)
                    FUNC.objMerge(des, src[i], override);
            }
            for (i in src) {
                if (override || !(i in des)) {
                    des[i] = src[i];
                }
            }
            return des;
        },
        alertOnElem: function (elem, msg) {
            $(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
        },
        /**
         * 保存Token在浏览器中
         * @param data object
         */
        saveToken: function (data) {
            localStorage.setItem("token.token", data.token);
            localStorage.setItem("token.expire", data.expire);
        },
        /**
         * 获取当前Token
         */
        getToken: function () {
            var token = localStorage.getItem("token.token");
            var expire = localStorage.getItem("token.expire");
            if (token === null || token.length != 64 || expire === null || expire === "") {
                return null;
            }
            return {token: token, expire: +expire};
        },
        delToken: function () {
            localStorage.removeItem("token.token");
            localStorage.removeItem("token.expire");
            FUNC.ajax(CONFIG.api.user.logout, "GET", {});
        },
        verify: {
            email: function (email) {
                return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
            }
        }
    }
    ;