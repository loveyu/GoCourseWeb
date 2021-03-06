<?php
/**
 * User: loveyu
 * Date: 2015/4/21
 * Time: 23:46
 */
$file = isset($argv[1]) ? $argv[1] : "G:\\J2EE\\GoCourseServer\\doc\\api.md";
$path = isset($argv[2]) ? $argv[2] : "G:\\J2EE\\GoCourseServer\\doc\\api\\";
echo file_get_contents($file);
echo "\r\n## 数据库字段及描述\r\n[链接: mysql_table.html](mysql_table.html)\r\n";
echo "\r\n## API错误状态代码\r\n[链接: status_code.html](status_code.html)\r\n";
echo "\r\n## API列表导航\r\n";
$i = 1;

$map = [
	"index.html" => "API首页",
	"mysql_table.html" => "数据库字段及描述",
	"status_code.html" => "API错误状态代码"
];
foreach (glob($path . "*.md") as $v) {
	$content = get_line($v);
	if (preg_match("/[#]*[\\s]+([\\s\\S]*?)\r\n/", $content, $match) != 1) {
		continue;
	}
	$name = preg_replace("/\\.md$/", ".html", basename($v));
	$name2 = preg_replace("/\\.md$/", "", basename($v));
	$match[1] = trim($match[1]);
	echo "{$i}. [{$match[1]}]({$name}), `/{$name2}/`\r\n";
	$map[$name] = $match[1];
	++$i;
}

file_put_contents("doc/asset/js/name_map.js", "var api_list_map=" . json_encode($map, JSON_UNESCAPED_UNICODE) . ";");

function get_line($path)
{
	$f = fopen($path, "r");
	$rt = fgets($f);
	fclose($f);
	return $rt;
}