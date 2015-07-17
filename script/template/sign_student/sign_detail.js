_methods_ = {
	load: function (id) {
		var obj = this;
		obj.error = null;
		obj.loading = true;
		FUNC.ajax(CONFIG.api.sign.student_get + "/" + id, "get", {}, function (result) {
			if (result.status) {
				obj.sign = result.data;
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		})
	}
};//_methods_

_data_ = function () {
	return {
		loading: true,
		error: null,
		sign: null,
		now_time: Math.floor((new Date()).getTime() / 1000)
	};
};//_data_

_props_ = ['data'];//_props_

_created_ = function () {
	this.data.call(this);
};//_created_