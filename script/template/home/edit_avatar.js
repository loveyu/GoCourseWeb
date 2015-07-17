_methods_ = {
	onSubmitAvatar: function (event) {
		event.preventDefault();
		this.data.error = null;
		this.data.success = false;
		if (this.data.file) {
			var fd = new FormData(); //创建表单
			fd.append("avatar", this.data.file);
			var obj = this;
			obj.data.percentComplete = -1;//-1表示未开始
			FUNC.fileUpload(CONFIG.api.user.upload_avatar, fd, function () {
				obj.data.percentComplete = -1;
				if (this.status !== 200) {
					obj.data.error = "请求错误：" + this.status + " - " + this.statusText;
					return;
				}
				var data = FUNC.parseJSON(this.response);
				if (data.status) {
					obj.data.error = "";
					obj.data.success = true;
					var rand = Math.random();
					obj.data.now_avatar = data.data.avatar_more.lager + "?_=" + rand;//更新当前头像
					Member.data = data.data;//更新数据
					if (APP.page.hasOwnProperty("header")) {
						APP.page.header.avatar = data.data.avatar + "?_=" + rand;
					}
				} else {
					obj.data.error = data.msg;
				}
			}, this.progress);
		} else {
			this.data.error = "未选择正确的图片";
		}
		return false;
	},
	progress: function (event) {
		if (event.lengthComputable) {
			this.data.percentComplete = Math.round(event.loaded * 100 / event.total);
		}
	},
	fileChange: function (event) {
		this.data.file = event.target.files[0];
		this.data.error = null;
		if (this.data.file.size > 1024 * 2 * 1024) {
			this.data.error = "当前文件大于2MB，大小：" + FUNC.fileSize(this.data.file.size);
			this.file = null;
		} else if (this.data.file.type.indexOf("image/") != 0) {
			this.data.error = "当前文件非图片文件";
			this.data.file = null;
		} else if (this.data.file == null) {
			this.data.error = "文件为空，不存在";
		}
		if (this.data.error !== null) {
			$("#InputFile").val("");
		}
		this.data.success = false;
		this.data.percentComplete = -1;
	}
};//_methods_

_props_ = {
	data: Object
};//_props_