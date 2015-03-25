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
	},
	object_title: new Vue({
		el: 'title',
		data: {
			page_title: '',
			site_description: CONFIG.site_description,
			site_title: CONFIG.site_title
		}
	}),
	object_header: new Vue({
		el: "#Header",
		data: {
			site_title: CONFIG.site_title,
			site_description: CONFIG.site_description,
			site_url: CONFIG.site_url,
			nav_main: [
				FUNC.nav('项目介绍','about','关于项目的部分介绍'),
				FUNC.nav('APP下载','download','下载APP到移动端')
			],
			nav_right: [
				FUNC.nav('登录','login.html','登录用户中心')
			]
		}
	})
};