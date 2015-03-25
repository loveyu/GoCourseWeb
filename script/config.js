/**
 * Created by loveyu on 2015/3/24.
 */
Vue.config.debug = false;
var CONFIG = {
	site_title: 'GO Course',
	site_description: '让课程变得更简单',
	site_url: 'http://go.course.org/',
	api:{
		login:'http://go.course.org/api/login.php',
		forget:'http://go.course.org/api/forget.php',
		reset_password:'http://go.course.org/api/reset_password.php'
	},
	captcha_url:"http://go.course.org/image/captcha.jpg"
};
var Page = {};