_methods_ = {
	onSubmitAvatar: function (event) {
		event.preventDefault();
		this.error = null;
		this.success = false;
		if (this.file) {
			var fd = new FormData(); //创建表单
			fd.append("avatar", this.file);
			var obj = this;
			FUNC.fileUpload(CONFIG.api.user.upload_avatar, fd, function () {
				var data = FUNC.parseJSON(this.response);
				if (data.status) {
					obj.error = "";
					obj.success = true;
					var rand = Math.random();
					obj.now_avatar = data.data.avatar_more.lager + "?_=" + rand;//更新当前头像
					Member.data = data.data;//更新数据
					if (APP.page.hasOwnProperty("header")) {
						APP.page.header.avatar = data.data.avatar + "?_=" + rand;
					}
				} else {
					obj.error = data.msg;
				}
			});
		} else {
			this.error = "未选择正确的图片";
		}
		return false;
	}, fileChange: function (event) {
		this.file = event.target.files[0];
		this.error = null;
		if (this.file.size > 1024 * 2 * 1024) {
			this.error = "当前文件大于2MB";
			this.file = null;
		} else if (this.file.type.indexOf("image/") != 0) {
			this.error = "当前文件非图片文件";
			this.file = null;
		} else if (this.file == null) {
			this.error = "文件为空，不存在";
		}
		if (this.error !== null) {
			$("#InputFile").val("");
		}
	}
};//_methods_