_methods_ = {
	load_history: function () {
		var obj = this;
		obj.error = null;
		FUNC.ajax(CONFIG.api.sign.teacher_list, "get", {}, function (result) {
			if (result.status) {
				obj.list = result.data.list;
			} else {
				obj.error = result.msg;
			}
			obj.loading = false;
		})
	}
};//_methods_

_props_ = ['data'];//_props_

_data_ = function () {
	return {
		loading: true, list: null, error: null
	};
};//_data_

_created_ = function () {
	this.data.call(this);
};//_created_