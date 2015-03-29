/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = true;
var CONFIG = {
	site_title: 'GO Course',
	site_description: '让课程变得更简单',
	site_url: 'http://go.course.org/',
	api_url:'http://go.course.org/api/',
	api:{
		member_info:'member',
		login:'login',
		forget:'forget',
		reset_password:'reset_password',
		student_info:'student_info',
		update_avatar:'update_avatar',
		update_password:"update_password",
	},
	captcha_url:"http://go.course.org/image/captcha.jpg"
};
//初始化API完整地址
for (var name in CONFIG.api) {
	if (CONFIG.api.hasOwnProperty(name)) {
		CONFIG.api[name] = CONFIG.api_url + CONFIG.api[name];
	}
}
//用户基本信息
var Member = {
	login_request: false,//是否进行了登录请求，用于登录先前检测
	login_status: false,
	id: 0,
	user_type: 'student',
	data: null
};
var Page = {};//用于保存完整的页面调用类