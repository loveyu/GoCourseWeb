jQuery(function ($) {
	/**
	 * 设置ID标记信息
	 */
	var set_id_mark = function () {
		var map = [];
		var node = $("h1");
		if (node.length != 1) {
			return map;
		}
		node = node[0];
		var last_h2 = -1;
		var index = 1;
		var h1_node = {'title': node.textContent, link: "H1_INDEX", child: []};
		$(node).attr("id", h1_node.link);
		while (1) {
			node = $(node).next();
			if (node.length != 1) {
				break;
			}
			node = node[0];
			switch (node.tagName.toLowerCase()) {
				case "h2":
					var obj = {
						'title': node.textContent.replace(/^\/[a-zA-Z_0-9]+\//, ""),
						link: "H2_" + index,
						child: []
					};
					if (/^[a-zA-Z0-9_-]+$/.test(node.textContent)) {
						obj.link = node.textContent;
					}
					$(node).attr("id", obj.link);
					map.push(obj);
					++last_h2;
					break;
				case "h3":
					if (last_h2 == -1) {
						//如果不存在H2标签就出现H3标签。则将H1作为标题
						map.push(h1_node);
						++last_h2;
						break;
					}
					var h3_obj = {"title": node.textContent, link: map[last_h2].link + "_H3_" + index};
					$(node).attr("id", h3_obj.link);
					map[last_h2].child.push(h3_obj);
					break;
				default :
					break;
			}
			++index;
		}
		return map;
	};
	var create_body_content = function (id, c, content_call) {
		var node = document.createElement("div");
		node.id = id;
		node.className = c;
		node.innerHTML = "<a href=\"#\" class='button'><span></span></a>";
		if (typeof content_call == "function") {
			$(node).append(content_call());
		}
		$("body").append(node)
	};
	var map = set_id_mark();
	create_body_content("TOP_MENU", "fix_menu top_menu", function () {
		var list = [];
		for (var index in map) {
			if (!map.hasOwnProperty(index)) {
				continue;
			}
			var con = "<li><a href='#" + map[index].link + "'>" + map[index].title + "</a>";
			if (map[index].child.length > 0) {
				con += "<ul class='child'>";
				for (var child in map[index].child) {
					if (!map[index].child.hasOwnProperty(child)) {
						continue;
					}
					con += "<li><a href='#" + map[index].child[child].link + "'>" + map[index].child[child].title + "</a></li>";
				}
				con += "</ul>"
			}
			con += "</li>";
			list.push(con);
		}
		return list.length > 0 ? ("<ul style='display: none'>" + list.join("") + "</ul>") : "";
	});
	$("#TOP_MENU a.button").mouseover(function () {
		$("#TOP_MENU >ul").css("display", "block");
	});
	$("#TOP_MENU").mouseleave(function () {
		$("#TOP_MENU >ul").css("display", "none")
	});

	create_body_content("BOTTOM_MENU", "fix_menu bottom_menu", function () {
		var list = [];
		for (var index in api_list_map) {
			if (!api_list_map.hasOwnProperty(index)) {
				continue;
			}
			var con = "<li><a href='" + index + "'>" + api_list_map[index] + "</a></li>";
			list.push(con);
		}
		return list.length > 0 ? ("<ul class='bottom_box' style='visibility:hidden'>" + list.join("") + "</ul>") : "";
	});
	var bottom_ul = $("#BOTTOM_MENU >ul");
	bottom_ul.css("top", ((0 - bottom_ul.height()) - 10) + "px");
	var timer = null;
	var timer_clear = function () {
		if (timer !== null) {
			clearTimeout(timer);
			timer = null;
		}
	};
	$("#BOTTOM_MENU a.button").mouseover(function () {
		timer_clear();
		if (bottom_ul.css("visibility") == "hidden") {
			bottom_ul.css("visibility", "visible");
		}
	});
	var hidden_bottom = function () {
		if (bottom_ul.css("visibility") == "visible") {
			bottom_ul.css("visibility", "hidden");
		}
	};
	$("#BOTTOM_MENU").mouseleave(function () {
		timer = setTimeout(function () {
			hidden_bottom();
			timer = null;
		}, 1000);
	});
	$("#BOTTOM_MENU > ul").mouseover(timer_clear);
	$("#BOTTOM_MENU > ul").mouseleave(function () {
		timer_clear();
		hidden_bottom();
	});

})
;
