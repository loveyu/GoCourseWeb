<?php
/**
 * User: loveyu
 * Date: 2015/4/21
 * Time: 10:27
 */
$source_path = isset($argv[1]) ? $argv[1] : "G:\\J2EE\\GoCourseServer\\doc\\status_code.md";
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
    $data[$m2[1]] = ["title" => trim($m[1]), "list" => []];
    if (preg_match_all("/set\\(([0-9]{1,2}), \"([\\s\\S]+?)\"\\);/", $content, $m3, PREG_SET_ORDER) < 1) {
        continue;
    }
    foreach ($m3 as $v2) {
        $data[$m2[1]]["list"][$v2[1] + $m2[1] * 100] = trim($v2[2]);
    }
    ksort($data[$m2[1]]["list"]);
}
ksort($data);
$tmp = file_get_contents($source_path);
$index = strpos($tmp, "------------");
echo substr($tmp, 0, $index);
$i = 0;
foreach($data as $code => $v){
    echo ++$i,". {$v['title']} `{$code}`\r\n";
    foreach($v["list"] as $code2 => $v2){
        echo "\t* `{$code2}` $v2\r\n";
    }
    echo "\r\n";
}