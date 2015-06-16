<?php
/**
 * User: loveyu
 * Date: 2015/5/28
 * Time: 22:19
 */
$package = isset($argv[2]) ? $argv[2] : "G:\\J2EE\\GoCourseServer\\src\\com\\katoa\\gocourse\\model\\action";

$list = glob($package . "/*/*.java");
$data = [];
foreach ($list as $v) {
	$content = file_get_contents($v);
	if (preg_match("/\\* #([\\s\\S]+?)\n/", $content, $m) !== 1) {
		continue;
	}
	if (preg_match("/super\\(([1-9]{1}[0-9]{2}?)\\);/", $content, $m2) !== 1) {
		continue;
	}

	if (preg_match("/public class ([a-zA-Z_]+?) extends BaseAction/", $content, $m3) !== 1) {
		continue;
	}
	if (isset($data[$m2[1]])) {
		echo "**警告：**重复对象{$m2[1]}，" . trim($m[1]) . "," . trim($m3[1]) . "，覆盖:",
			json_encode($data[$m2[1]], JSON_UNESCAPED_UNICODE) . "\n";
	}
	$data[$m2[1]] = ["title" => trim($m[1]), "class" => trim($m3[1])];
}
ksort($data);
$i = 1;
foreach ($data as $key => $value) {
	echo $i++, ". ", $value['title'], " `{$value['class']}` `{$key}`\r\n";
}