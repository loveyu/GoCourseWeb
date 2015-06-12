/**
 * Created by loveyu on 2015/3/23.
 */
var APP = {
	page: {
		//页面的PAGE实例
	},
	runPage: function (page) {
		if (typeof Page[page] == "function") {
			if (!APP.page.hasOwnProperty(page)) {
				APP.page[page] = Page[page]();
			}
			return APP.page[page];
		} else {
			console.error("Page:" + page + ", not found.");
		}
		return null;
	},
	fixedFooterLocation: function () {
		var resize_func = function () {
			var footer = jQuery("#Footer");
			var header = jQuery("#Header");
			var height = jQuery(window).height() - header.height() - footer.height();
			height -= footer.css("padding-top").substr(0, footer.css("padding-top").length - 2);
			height -= footer.css("padding-bottom").substr(0, footer.css("padding-bottom").length - 2);

			height -= footer.css("margin-top").substr(0, footer.css("margin-top").length - 2);
			height -= footer.css("margin-bottom").substr(0, footer.css("margin-bottom").length - 2);

			height -= header.css("padding-top").substr(0, header.css("padding-top").length - 2);
			height -= header.css("padding-bottom").substr(0, header.css("padding-bottom").length - 2);

			height -= header.css("margin-top").substr(0, header.css("margin-top").length - 2);
			height -= header.css("margin-bottom").substr(0, header.css("margin-bottom").length - 2);
			jQuery(".main-container").css("min-height", (Math.ceil(height) - 2) + "px");
		};
		resize_func();
		jQuery(window).bind("resize", resize_func);
	}
};

APP.runPage('header');
APP.fixedFooterLocation();