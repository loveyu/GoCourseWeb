_methods_ = {
	load: function (id) {
		var obj = this;
		obj.data.loading = true;
		obj.data.error = null;
		FUNC.ajax(CONFIG.api.course_table.get + "/" + id, "get", {
			set_class_info: 1,
			set_location: 1
		}, function (result) {
			obj.data.loading = false;
			if (result.status) {
				obj.data.table = result.data;
				obj.load_review(id);
			} else {
				obj.data.table = null;
				obj.data.error = result.msg;
			}
		});
	},
	load_review: function (id) {
		this.data.review = function (_obj) {
			_obj.load(id);
		};
	}
};//_methods_

_props_ = {
	data: Object
};//_props_

_created_ = function () {
	this.data.call(this);
};//_created_