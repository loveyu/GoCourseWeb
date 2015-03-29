_methods_ = {
	onSubmitAvatar: function (event) {
		this.error = null;
		if(this.file) {
			var fd = new FormData(); //创建表单
			fd.append("file", this.file);
			var obj = this;
			FUNC.fileUpload(CONFIG.api.update_avatar, fd, function () {
				var data = FUNC.parseJSON(this.response);
				if(data.status){
					obj.error = "";
					obj.success = true;
				}else{
					obj.error = data.msg;
				}
			});
		}else{
			this.error = "未选择正确的图片";
		}
		event.preventDefault();
		return false;
	}, fileChange: function (event) {
		this.file = event.target.files[0];
		this.error = null;
	}
};//_methods_