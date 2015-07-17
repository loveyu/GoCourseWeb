_methods_ = {
	/**
	 * 解析课表
	 */
	paresTable: function () {
		var tmp = {};
		var table = [];
		for (var i in this.data.list) {
			for (var j in this.data.list[i].location) {
				var arr = this.data.list[i].location[j].week.split(",");
				for (var k in arr) {
					arr[k] = +arr[k];
					if (!tmp.hasOwnProperty(arr[k])) {
						tmp[arr[k]] = arr[k];
						table.push(arr[k]);
					}
				}
				this.data.list[i].location[j].week = arr;
			}
		}
		this.data.week_list = table.sort(function (a, b) {
			return a - b;
		});
		this.setWeek(CONFIG.current_week.week, null);
	},
	/**
	 * 切换到某一周的数据
	 * @param week
	 * @param event 事件
	 */
	setWeek: function (week, event) {
		if (event != null && typeof event == "object") {
			event.preventDefault();
		}
		if (this.data.week_current == week) {
			return;
		}
		this.data.has_course = false;
		var table = [], arr = [];
		var i, j;
		for (i = 0; i < 6; i++) {
			arr = [];
			for (j = 0; j < 7; j++) {
				arr.push([]);
			}
			table.push(arr);
		}
		var flag = false;
		for (i in this.data.list) {
			for (j in this.data.list[i].location) {
				if (FUNC.inArray(week, this.data.list[i].location[j].week)) {
					var week_day = this.data.list[i].location[j].day;
					var slot = this.data.list[i].location[j].slot;
					var data = FUNC.clone(this.data.list[i]);
					data.location = this.data.list[i].location[j].location;
					table[slot - 1][week_day - 1].push(data);
					flag = true;
				}
			}
		}
		this.data.week_current = week;//始终设置当前周次
		if (flag) {
			this.data.week_table = table;
			this.data.has_course = true;
		}
		return false;
	}
};//_methods_

_props_ = {
	data: Object
};//_props_

_created_ = function () {
	this.data.call(this);
};//_created_