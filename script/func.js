/**
 * Created by loveyu on 2015/3/24.
 */
var FUNC = {
		nav: function (name, link, title, active) {
			return {
				active: active, name: name, link: link, title: title
			};
		},
		ajax: function (url, method, data, success_callback, error) {
			//var token = FUNC.getToken();
			var option = {
				url: url,
				dataType: "json",
				data: data,
				method: method,
				xhrFields: {
					withCredentials: true
				},
				success: success_callback,
				error: (typeof error == "undefined") ? function (xhr) {
					alert("AJAX请求出错。。");
					console.log(xhr);
				} : error
			};
			//if (token != null) {
			//    //添加Token
			//    option.data.__token = token.token;
			//}
			jQuery.ajax(option);
		},
		urlMatch: function (url) {
			var path = window.location.pathname.substr(1);
			if ("" == path)return false;
			return path.toLocaleLowerCase().indexOf(url.toLocaleLowerCase()) === 0;
		},
		redirect: function (url) {
			window.location.href = url;
		},
		fileUpload: function (url, formData, callback) {
			var xhr = new XMLHttpRequest(); //创建请求对象
			xhr.open("POST", url, true);
			xhr.withCredentials = true;
			xhr.addEventListener("load", callback, false);
			xhr.send(formData);
		},
		parseJSON: function (data) {
			return jQuery.parseJSON(data);
		},
		objMerge: function (des, src, override) {
			//合并多个对象
			var i;
			var len;
			if (src instanceof Array) {
				for (i = 0, len = src.length; i < len; i++)
					FUNC.objMerge(des, src[i], override);
			}
			for (i in src) {
				if (override || !(i in des)) {
					des[i] = src[i];
				}
			}
			return des;
		},
		alertOnElem: function (elem, msg) {
			$(elem).html("<div class='container'><div class='alert-danger alert'>" + msg + "</div></div>");
		},
		/**
		 * 保存Token在浏览器中
		 * @param data object
		 */
		saveToken: function (data) {
			localStorage.setItem("token.token", data.token);
			localStorage.setItem("token.expire", data.expire);
		},
		/**
		 * 获取当前Token
		 */
		getToken: function () {
			var token = localStorage.getItem("token.token");
			var expire = localStorage.getItem("token.expire");
			if (token === null || token.length != 64 || expire === null || expire === "") {
				return null;
			}
			return {token: token, expire: +expire};
		},
		delToken: function () {
			localStorage.removeItem("token.token");
			localStorage.removeItem("token.expire");
		},
		mapToObjArr: function (data, keyName, valueName) {
			var rt = [];
			var obj;
			for (var i in data) {
				obj = {};
				obj[keyName] = i;
				obj[valueName] = data[i];
				rt.push(obj);
			}
			return rt;
		},
		arrToObjArr: function (data, keyName) {
			var rt = [];
			var obj;
			for (var i in data) {
				obj = {};
				obj[keyName] = data[i];
				rt.push(obj);
			}
			return rt;
		},
		targetSet: function (target, value) {
			jQuery(target).html(value);
		},
		eventBind: function (obj, on, call) {
			jQuery(obj).bind(on, call);
		},
		eventTrigger: function (obj, action, data, elem, onlyHandlers) {
			jQuery(obj).trigger(action, data, elem, onlyHandlers);
		},
		clone: function (obj) {
			if (obj === null || typeof(obj) !== 'object')
				return obj;
			var temp = obj.constructor(); // changed
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					temp[key] = FUNC.clone(obj[key]);
				}
			}
			return temp;
		},
		cloneArrExclude: function (obj, index) {
			var rt = [];
			for (var i in obj) {
				if (i != index) {
					rt.push(obj[i]);
				}
			}
			return rt;
		},
		isEmpty: function (obj) {
			switch (typeof obj) {
				case "object":
					for (var i in obj) {
						return false;
					}
					return true;
				default :
					return obj == "";
			}
		},
		inArray: function (item, array) {
			for (var i in array) {
				if (array[i] == item) {
					return true;
				}
			}
			return false;
		},
		findVueChild: function (vue, name) {
			for (var index in vue._children) {
				if (vue._children[index].hasOwnProperty('$options') &&
					vue._children[index].$options.hasOwnProperty('name') &&
					vue._children[index].$options.name === name
				) {
					return vue._children[index];
				}
			}
			return null;
		},
		parseWeek: function (str) {
			var list = str.split(/[,|，]/);
			var rt = [];
			for (var item in list) {
				if (!list.hasOwnProperty(item)) {
					continue;
				}
				if (/^[\d]+$/.test(list[item])) {
					rt.push(parseInt(list[item]));
				} else if (/^[\d]+-[\d]+$/.test(list[item])) {
					var be = list[item].split('-');
					var i = parseInt(be[0]);
					var j = parseInt(be[1]);
					if (i <= j && i > 0) {
						for (; i <= j; ++i) {
							rt.push(i);
						}
					}
				}
			}
			return rt;
		},
		createArray: function (size) {
			var rt = [];
			for (var i = 0; i < size; i++) {
				rt.push(i);
			}
			return rt;
		},
		quiz: {
			parse_title: function (title) {
				var matches = title.match(/\(___\)?/g);
				if (matches != null && matches.length > 0) {
					for (var i = 1; i <= matches.length; i++) {
						title = title.replace("(___)", " ( " + i + " ) ");
					}
				}
				return {title: title, size: matches == null ? 0 : matches.length};
			}
		},
		verify: {
			email: function (email) {
				return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
			}
		}
	}
	;