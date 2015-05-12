/**
 * 自定义过滤器
 */
/**
 * 解析课程状态
 */
Vue.filter('course_table_status', function (value) {
	switch (value) {
		case 0:
			return "开课中";
		case 1:
			return "未开课";
		case 2:
			return "已结束";
	}
	return "未知";
});

/**
 * 解析星期
 */
Vue.filter('course_week_parse', function (value) {
	switch (value) {
		case 1:
			return "星期一";
		case 2:
			return "星期二";
		case 3:
			return "星期三";
		case 4:
			return "星期四";
		case 5:
			return "星期五";
		case 6:
			return "星期六";
		case 7:
			return "星期日";
	}
	return "未知";
});

Vue.filter('course_week_index_to_time', function (value) {
	switch (value) {
		case 0:
			return "08:00";
		case 1:
			return "10:05";
		case 2:
			return "14:00";
		case 3:
			return "16:05";
		case 4:
			return "19:00";
		case 5:
			return "21:05";
	}
	return "未知";
});


/**
 * 检查一个上课地点判断是否为今天，是的就返回第一个值，否则返回第二个
 */
Vue.filter('course_location_check_today', function (location, class1, class2) {
	if (location.hasOwnProperty('week')) {
		var week = FUNC.parseWeek(location.week);
		if (FUNC.inArray(CONFIG.current_week.week, week)) {
			var date = new Date();
			if ((date.getDay() ) == location.day) {
				return class1;
			}
		}
	}
	return class2;
});

