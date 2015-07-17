<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:32
 */
header("Content-Type: application/javascript; charset=utf-8");
$page = [];
foreach (glob("script/utils/*.js") as $v) {
	$page[] = "utils/" . basename($v);
}
foreach (glob("script/*.js") as $v) {
	$v = basename($v);
	if ($v == "home.js") {
		continue;
	} else {
		$page[] = $v;
	}
}
foreach (glob("script/page/*.js") as $v) {
	$page[] = "page/" . basename($v);
}
foreach (array_merge($page, ['home.js']) as $v) {
	if (!is_file("script/{$v}")) {
		continue;
	}
	$content = file_get_contents("script/{$v}");
	echo parse($content);
	echo "\n\n\n";
}

function parse($content)
{
	preg_match_all("/{[\\s]*__require:[\\s]*['|\"]([a-zA-Z0-9_-]+)\\/([a-zA-Z0-9_-]+)\\.html['|\"][\\s]*}/", $content, $matches, PREG_SET_ORDER);
	foreach ($matches as $v) {
		if (!isset($v[2])) {
			continue;
		}
		$content = str_replace($v[0], get_template($v[1] . "/" . $v[2]), $content);
	}

	return $content;
}

function get_template($path)
{
	$object = ['template' => ''];
	$path = "script/template/" . $path;
	if (is_file($path . ".min.html")) {
		$content = file_get_contents($path . ".min.html");
		$object['template'] = json_encode($content, JSON_UNESCAPED_UNICODE);
	} elseif (is_file($path . ".html")) {
		$content = file_get_contents($path . ".html");
		$object['template'] = json_encode(compress_html($content), JSON_UNESCAPED_UNICODE);
	} else {
		$object['template'] = json_encode("<h3 class='alert alert-danger'>模板未找到！！！</h3>", JSON_UNESCAPED_UNICODE);
	}
	if (is_file($path . ".js")) {
		$content = file_get_contents($path . ".js");
		foreach (['methods', 'paramAttributes', 'data', 'props', 'created', 'data'] as $v) {
			$match = [];
			if (preg_match("/_{$v}_[ ]*=[ ]*([\\s\\S]+?)[;]*\\/\\/_{$v}_/", $content, $match)) {
				if (isset($match[1])) {
					$object[$v] = $match[1];
				}
			}
		}
	}
	$map = [];
	foreach ($object as $name => $v) {
		$map[] = $name . ":" . $v;
	}
	return "{" . implode($map, ",") . "}";
}

function compress_html($string)
{
	return preg_replace("/[ ]{2,}/", " ",
		preg_replace("/[\\n\\r\\t]+/", " ", $string));
}