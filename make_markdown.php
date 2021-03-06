<?php
/**
 * User: loveyu
 * Date: 2015/4/21
 * Time: 23:44
 */
$param = isset($argv[1]) ? $argv[1] : null;
date_default_timezone_set("PRC");
system("php gen_status_index.php > test/status_index.md");
system("php gen_status_code.php > doc/status_code.md");
system("php gen_mysql_table.php > doc/mysql_table.md");
system("php gen_api_index.php > doc/index.md");
$status_code = unserialize(file_get_contents("test/status_code.serialize"));
foreach (glob("G:\\J2EE\\GoCourseServer\\doc\\api\\*.md") as $v) {
	file_put_contents("doc/" . basename($v), set_error_code(file_get_contents($v)));
}
foreach (glob("doc/*.md") as $v) {
	if ($param !== null) {
		if ($param . ".md" != basename($v)) {
			continue;
		}
	}
	$content = get_line($v);
	if (preg_match("/[#]*[\\s]+([\\s\\S]*?)\r\n/", $content, $match) != 1) {
		continue;
	}
	$title = mb_convert_encoding(trim($match[1]), "GB2312", "UTF-8");
	echo "T:{$title}.\n";
	$base_n = basename($v);
	$name = preg_replace("/\\.md$/", ".html", $base_n);
	file_put_contents("test/{$base_n}", "_文档生成时间: " .
		date("Y-m-d H:i:s") . "_\r\n\r\n" . file_get_contents($v));
	system("ghmd --template " . __DIR__ . "/doc/template/my.jade --title \"{$title}\" --dest " . __DIR__ . "/doc/{$name} " . __DIR__ . "/test/{$base_n}");
	unlink("test/{$base_n}");
	echo "finish $name\n";
}

function get_line($path)
{
	$f = fopen($path, "r");
	$rt = fgets($f);
	fclose($f);
	return $rt;
}

function set_error_code($content)
{
	global $status_code;
	$set = [];
	if (preg_match_all("/@ERROR\\(([\\d]+)\\)@/", $content, $matcher, PREG_SET_ORDER) > 0) {
		foreach ($matcher as $v) {
			if (isset($set[$v[1]])) {
				$content = preg_replace("/" . preg_quote($v[0]) . "/", "#### 错误状态，参考前文标记`{$v[1]}`", $content, 1);
			} else {
				if (isset($status_code[$v[1]])) {
					$content = preg_replace("/" . preg_quote($v[0]) . "/", get_code_error_data($v[1]), $content, 1);
				}
				$set[$v[1]] = $v[1];
			}
		}
	}
	if (preg_match_all("/@DATA_REF\\(([a-zA-Z0-9._-]+)\\/([a-zA-Z0-9._-]+)\\)@/", $content, $matcher, PREG_SET_ORDER) > 0) {
		foreach ($matcher as $v) {
			$package = implode("/", array_filter(array_map("trim", explode(".", $v[1]))));
			$content = str_replace($v[0], "\r\n**数据对象引用：** [*{$v[2]}*](../javadoc/index.html?{$package}/{$v[2]}.html)", $content);
		}
	}
	return preg_replace("/[\\r\\n]{3,}/", "\r\n\r\n", $content);
}

function get_code_error_data($code)
{
	global $status_code;
	if (!isset($status_code[$code])) {
		return "";
	}
	$rt = "#### 错误状态，错误标记`{$code}`\r\n";
	foreach ($status_code[$code]['list'] as $code2 => $v2) {
		$rt .= "* `{$code2}` $v2\r\n";
	}
	return $rt . "\r\n";
}