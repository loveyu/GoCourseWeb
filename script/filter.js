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

/**
 * 转换序号索引为A...B....C....
 */
Vue.filter('quiz_option_translate_index', function (value) {
	value = +value;
	return String.fromCharCode(+'A'.charCodeAt(0) + value);
});

/**
 * 转换测试类型
 */
Vue.filter('quiz_translate_type', function (value) {
	value = +value;
	switch (value) {
		case 0:
			return "单选";
		case 1:
			return "多选";
		case 2:
			return "判断";
	}
	return "未知";
});

Vue.filter('timestamp_to_date', function (value) {
	var date = new Date((+value) * 1000);
	return "" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " "
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
});