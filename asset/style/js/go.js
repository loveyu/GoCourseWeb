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


/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
	nav: function (name, link, title, active) {
		return {
			active: active, name: name, link: link, title: title
		};
	}, ajax: function (url, method, data, success_callback) {
		jQuery.ajax({
			url: url,
			dataType: "json",
			data: data,
			method: method,
			xhrFields: {
				withCredentials: true
			},
			success:success_callback
		});
	}, redirect: function (url) {
		window.location.href = url;
	}
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.forget = function () {
	return new Vue({
		el:"#ForgetPassword",
		data:{
			error_msg:'',
			email:'',
			captcha:'',
			type:''
		},methods:{
			onClickCaptcha: function(event){
				event.target.src = CONFIG.captcha_url + "?rand=" + Math.random();
			},
			onFormSubmit: function(event){
				var flag = true;
				if (this.email == '' || this.captcha == '' || this.type == '') {
					this.error_msg = "表单不允许有空值";
					flag = false;
				}
				if (flag) {
					FUNC.ajax(CONFIG.api.forget, 'post', {
						email: this.email, captcha: this.captcha, type: this.type
					}, this.FormResult);
				}
				event.preventDefault();
				return false;
			},
			FormResult: function(data){
				if(!data.status){
					this.error_msg = data.msg ? data.msg : '未知错误';
				}else{
					alert("OK");
				}
			}
		}
	});
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.header = function(){
	return new Vue({
		el: "#Header",
		data: {
			site_title: CONFIG.site_title,
			site_description: CONFIG.site_description,
			site_url: CONFIG.site_url,
			login_status: false,
			nav_main: [
				FUNC.nav('项目介绍','about','关于项目的部分介绍'),
				FUNC.nav('APP下载','download','下载APP到移动端')
			],
			nav_right: [
				FUNC.nav('登录','login.html','登录用户中心')
			],
			data: null,
			home_url: CONFIG.site_url + "home.html"
		},
		methods: {
			loginRequest:function(data){
				Member.login_request = true;
				Member.login_status = data.status;
				this.login_status = data.status;
				if(data.status){
					Member.id = data.data.id;
					Member.data = data.data;
					this.data = data.data;
				}
			}
		},
		created: function(){
			//查询登录状态
			Member.login_request = false;
			FUNC.ajax(CONFIG.api.member_info,'get',{},this.loginRequest)
		}
	});
};


/**
 * Created by loveyu on 2015/3/25.
 */
Page.home = function(){
	return new Vue({
		el: "#Home"
	});
};


/**
 * Created by loveyu on 2015/3/24.
 */
Page.login = function () {
	return new Vue({
		el: "#Login", data: {
			error_msg: '', username: '', password: '', type: ''
		}, methods: {
			onLoginFormSubmit: function (event) {
				var flag = true;
				if (this.username == '' || this.password == '' || this.type == '') {
					this.error_msg = "表单不允许有空值";
					flag = false;
				}
				if (flag) {
					FUNC.ajax(CONFIG.api.login, 'post', {
						username: this.username, password: this.password, type: this.type
					}, this.onLoginResult);
				}
				event.preventDefault();
				return false;
			}, onLoginResult: function (data) {
				if(!data.status){
					this.error_msg = data.msg ? data.msg : '未知错误';
				}else{
					FUNC.redirect('home.html');
				}
			}
		}
	});
};


/**
 * Created by loveyu on 2015/3/23.
 */
var APP = {
	page: {
		//页面的PAGE实例
	},
	setTitle: function (t) {
		return APP.object_title.page_title = t;
	},
	runPage: function(page){
		if(typeof Page[page] == "function"){
			if(!APP.page.hasOwnProperty(page)){
				APP.page[page] = Page[page]();
			}
			return APP.page[page];
		}else{
			console.error("Page:" + page+", not found.");
		}
		return null;
	}
	//标题更新对象
	//object_title: new Vue({
	//	el: 'title',
	//	data: {
	//		page_title: '',
	//		site_description: CONFIG.site_description,
	//		site_title: CONFIG.site_title
	//	}
	//}),
};

APP.runPage('header');


