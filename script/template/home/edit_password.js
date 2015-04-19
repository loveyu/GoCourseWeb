_methods_ = {
    onSubmit: function (event) {
        this.error = null;
        if (this.old == "") {
            this.error = "原密码不能为空";
        } else {
            if (this.new_pwd.length < 6) {
                this.error = "密码长度不能小于6位";
            } else {
                if (this.old == this.new_pwd) {
                    this.error = "新旧密码不能相同";
                }
            }
        }
        var obj = this;
        FUNC.ajax(CONFIG.api.user.change_password, "post",
            {
                old_pwd: this.old, new_pwd: this.new_pwd
            }, function (data) {
                if (data.status) {
                    obj.old = "";
                    obj.new_pwd = "";
                    obj.success = true;
                    FUNC.saveToken(data.data)
                } else {
                    obj.success = false;
                    obj.error = data.msg;
                }
            });
        event.preventDefault();
        return false;
    }
};//_methods_