_methods_ = {
	/**
	 * 解析课表
	 */
	paresTable: function () {
		var tmp = {};
		var table = [];
		for (var i in this.list) {
			for (var j in this.list[i].location) {
				var arr = this.list[i].location[j].week.split(",");
				for (var k in arr) {
					arr[k] = +arr[k];
					if (!tmp.hasOwnProperty(arr[k])) {
						tmp[arr[k]] = arr[k];
						table.push(arr[k])
					}
				}
				this.list[i].location[j].week = arr;
			}
		}
		this.week_list = table.sort(function (a, b) {
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
		if (this.week_current == week) {
			return;
		}
		this.has_course = false;
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
		for (i in this.list) {
			for (j in this.list[i].location) {
				if (FUNC.inArray(week, this.list[i].location[j].week)) {
					var week_day = this.list[i].location[j].day;
					var slot = this.list[i].location[j].slot;
					var data = FUNC.clone(this.list[i]);
					data.location = this.list[i].location[j].location;
					table[slot - 1][week_day - 1].push(data);
					flag = true;
				}
			}
		}
		if (flag) {
			this.week_table = table;
			this.week_current = week;
			this.has_course = true;
		}
		return false;
	}
};//_methods_