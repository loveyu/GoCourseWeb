_methods_ = {
	load: function (id) {
		var obj = this;
		obj.error = null;
		obj.loading = true;
		obj.sign = null;
		FUNC.ajax(CONFIG.api.sign.teacher_get + "/" + id, "get", {}, function (result) {
			if (result.status) {
				obj.sign = result.data;
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		});
	},
	up_detail: function () {
		var obj = this;
		obj.error = null;
		if (obj.form.detail == "") {
			obj.error = "数据为空，不能更新";
			return;
		}
		FUNC.ajax(CONFIG.api.task.task_set_detail, "post", {
			task_id: obj.sign.taskID,
			detail: obj.form.detail
		}, function (result) {
			if (result.status) {
				obj.sign.detail = obj.form.detail;
				obj.form.detail = null;
			} else {
				obj.error = result.msg;
			}
		});
	},
	add_append: function () {
		var obj = this;
		obj.error = null;
		if (obj.form.append == "") {
			obj.error = "数据为空，不能添加";
			return;
		}
		FUNC.ajax(CONFIG.api.sign.teacher_append_info, "post", {
			sign_id: obj.sign.signID,
			info: obj.form.append
		}, function (result) {
			if (result.status) {
				var append = {time: Math.floor((new Date()).getTime() / 1000), content: obj.form.append};
				if (obj.sign.append == null) {
					obj.sign.append = [];
				}
				obj.sign.append.push(append);
				obj.form.append = null;
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_


_props_ = ['data'];//_props_

_data_ = function () {
	return {
		loading: true, sign: null, error: null, form: {detail: null, append: null}
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_