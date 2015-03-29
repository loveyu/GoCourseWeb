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
};

APP.runPage('header');