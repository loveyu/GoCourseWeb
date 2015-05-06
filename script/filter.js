/**
 * 自定义过滤器
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
	return 未知;
});