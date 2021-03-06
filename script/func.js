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
		fileUpload: function (url, formData, callback, progress) {
			var xhr = new XMLHttpRequest(); //创建请求对象
			xhr.open("POST", url, true);
			xhr.withCredentials = true;
			xhr.addEventListener("load", callback, false);
			xhr.addEventListener("error", callback, false);
			if (progress && typeof progress == "function") {
				xhr.upload.addEventListener("progress", progress, false);
			}
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
		fileSize: function (size) {
			var a = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
			var pos = 0;
			if (size < 0)return '出错';
			while (size > 1024) {
				size /= 1024;
				pos++;
			}
			return (Math.round(size * 100) / 100) + a[pos];
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
		/**
		 * 将数字格式化为指定的长度
		 * @param num number
		 * @param length number
		 */
		numFormatLen: function (num, length) {
			num = "" + num;
			while (length > num.length) {
				num = "0" + num;
			}
			return num;
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
		/**
		 * 创建动态菜单修改函数，必须含有下列对象中的函数
		 * @param vue_vm 当前的Vue对象
		 * @returns {Function}
		 */
		createMenuChangeFunc: function (vue_vm) {
			return function (view) {
				if (vue_vm.currentView == view) {
					//如果视图无改变
					return;
				}
				if (!vue_vm.menus.hasOwnProperty(view)) {
					//如果无视图
					return;
				}
				if (vue_vm.menus.hasOwnProperty(vue_vm.currentName)) {
					vue_vm.menus[vue_vm.currentName].active = false;
				}
				vue_vm.currentView = "base-loading";
				vue_vm.currentName = view;
				vue_vm.menus[view].active = true;
			}
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
		createArray: function (size, init) {
			var rt = [];
			if (typeof init == "undefined") {
				init = 0;
			}
			for (var i = 0; i < size; i++) {
				rt.push(init);
			}
			return rt;
		},
		createArrayObj: function (size, init) {
			var rt = {};
			if (typeof init == "undefined") {
				init = 0;
			}
			for (var i = 0; i < size; i++) {
				rt[i] = init;
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
			},
			/**
			 * 解析返回的测验信息列表
			 */
			parse_test_property: function (quiz_list) {
				var answer = {};
				for (var k in quiz_list) {
					if (!quiz_list.hasOwnProperty(k)) {
						continue;
					}
					if (quiz_list[k].quiz.type == CONST_MAP.quiz_type.multiple) {
						var title_obj = FUNC.quiz.parse_title(quiz_list[k].quiz.title);
						quiz_list[k].quiz.title = title_obj.title;
						quiz_list[k].quiz['size'] = title_obj.size;
						//必须使用一个对象，否则无效
						quiz_list[k].quiz['answer'] = FUNC.createArrayObj(title_obj.size == 0 ? quiz_list[k].options.length : title_obj.size, -1);
					} else {
						quiz_list[k].quiz['size'] = 1;
						quiz_list[k].quiz['answer'] = -1;
					}
					quiz_list[k].quiz['submit_lock'] = false;
					quiz_list[k].quiz['error'] = '';
					quiz_list[k].quiz['success'] = '';
				}
				return {list: quiz_list, answer: answer};
			}
		},
		verify: {
			email: function (email) {
				return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{1,8}$/.test(email);
			}
		}
	}
	;