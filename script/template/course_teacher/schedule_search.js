_methods_ = {
	onSearch: function (event) {
		event.preventDefault();
		var obj = this;
		obj.error = "";
		if (obj.form.department == "") {
			obj.error = "必须选择一个专业进行查询";
			return false;
		}
		if ((2 + parseInt(obj.form.year)) > (new Date().getFullYear()) + 4) {
			obj.error = "开课年份选择不正确";
			return false;
		}
		if (obj.form.term < -1 || obj.form.term > 1) {
			obj.error = "请选择合适的开学季度";
			return false;
		}
		var s = parseInt(obj.form.status);
		if (s < -1 || s > 2) {
			obj.error = "请选择合适的状态";
			return false;
		}
		FUNC.ajax(CONFIG.api.schedule.search, "get", obj.form, function (result) {
			if (result.status) {
				obj.result = result.data.result;
			} else {
				obj.error = result.msg;
			}
		});
		return false;
	}
};//_methods_