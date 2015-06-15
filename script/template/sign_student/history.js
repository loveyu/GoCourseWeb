_methods_ = {
	load: function () {
		var obj = this;
		obj.error = null;
		obj.loading = true;
		obj.list = null;
		FUNC.ajax(CONFIG.api.sign.student_history, "get", {}, function (result) {
			obj.loading = false;
			if (result.status) {
				obj.list = result.data.list;
			} else {
				obj.error = result.msg;
			}
		});
	},
	e_finish_now: function (index) {
		var obj = this;
		var sign = obj.list[index];
		obj.error = null;
		var time = Math.floor((new Date()).getTime() / 1000);
		FUNC.ajax(CONFIG.api.sign.student_sign_finish, "post", {
			sign_id: sign.signID,
			key: 1 + "\t" + "uuid\t0\t0",
			algorithm: "table"
		}, function (result) {
			if (result.status) {
				obj.load();//重新加载数据
			} else {
				obj.error = result.msg;
			}
		});

	}
};//_methods_