_methods_ = {
    onSubmit: function (event) {
        event.preventDefault();
        this.status.success = false;
        this.status.error = null;
        var obj = {
            user_id: this.user_id,
            name: this.name,
            school: this.school,
            college: this.college,
            zy: this.zy
        };
        var em_obj = this;
        FUNC.ajax(CONFIG.api.update_teacher_info, "post", obj, function (data) {
            if (data.status) {
                em_obj.status.success = true;
            } else {
                em_obj.status.error = data.msg;
            }
        });
        return false;
    }
};//_methods_