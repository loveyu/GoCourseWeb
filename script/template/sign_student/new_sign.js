_methods_ = {
	load: function () {
		var obj = this;
		obj.error = null;
		obj.loading = true;
		obj.list = null;
		FUNC.ajax(CONFIG.api.sign.student_new_sign, "get", {}, function (result) {
			obj.loading = false;
			if (result.status) {
				obj.list = result.data.list;
			} else {
				obj.error = result.msg;
			}
		});
	},
	e_sign_now: function (index) {
		var obj = this;
		var sign = obj.list[index];
		obj.error = null;
		obj.success_obj = null;
		var time = Math.floor((new Date()).getTime() / 1000);
		FUNC.ajax(CONFIG.api.sign.student_sign_begin, "post", {
			sign_id: sign.signID,
			key: time + "\t" + "uuid\tweb",
			hash: time + "uuidweb",
			algorithm: "table"
		}, function (result) {
			if (result.status) {
				obj.success_obj = result.data;
				obj.load();
			} else {
				obj.error = result.msg;
			}
		});
	}
};//_methods_