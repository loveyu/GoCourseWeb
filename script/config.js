/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = false;
var CONFIG = {
	site_title: 'GO Course',
	site_description: '让课程变得更简单',
	site_url: 'http://go.course.org/',
	api:{
		member_info:'http://go.course.org/api/member',
		login:'http://go.course.org/api/login',
		forget:'http://go.course.org/api/forget',
		reset_password:'http://go.course.org/api/reset_password'
	},
	captcha_url:"http://go.course.org/image/captcha.jpg"
};
var Member = {
	login_request: false,//是否进行了登录请求，用于登录先前检测
	login_status: false,
	id: 0,
	data:null
};
var Page = {};