/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
    nav: function (name, link, title, active) {
        return {
            active: active, name: name, link: link, title: title
        };
    }, ajax: function (url, method, data, success_callback, error) {
        jQuery.ajax({
            url: url,
            dataType: "json",
            data: data,
            method: method,
            xhrFields: {
                withCredentials: true
            }, success: success_callback,
            error: error
        });
    }, redirect: function (url) {
        window.location.href = url;
    }, fileUpload: function (url, formData, callback) {
        var xhr = new XMLHttpRequest(); //创建请求对象
        xhr.open("POST", url, true);
        xhr.addEventListener("load", callback, false);
        xhr.send(formData);
    }, parseJSON: function (data) {
        return jQuery.parseJSON(data);
    }, objMerge: function (des, src, override) {
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
    }, alertOnElem: function (elem, msg) {
        $(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
    }, verify: {
        email: function (email) {
            return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
        }
    }
};