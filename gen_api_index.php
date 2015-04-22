<?php
/**
 * User: loveyu
 * Date: 2015/4/21
 * Time: 23:46
 */
$file = isset($argv[1]) ? $argv[1] : "G:\\J2EE\\GoCourseServer\\doc\\api.md";
$path = isset($argv[2]) ? $argv[2] : "G:\\J2EE\\GoCourseServer\\doc\\api\\";
echo file_get_contents($file);
echo "\r\n## API错误状态代码\r\n[链接: status_code.html](status_code.html)\r\n";
echo "\r\n## API列表导航\r\n";
$i = 1;
foreach (glob($path . "*.md") as $v) {
    $content = get_line($v);
    if (preg_match("/[#]*[\\s]+([\\s\\S]*?)\r\n/", $content, $match) != 1) {
        continue;
    }
    $name = preg_replace("/\\.md$/", ".html", basename($v));
    $name2 = preg_replace("/\\.md$/", "", basename($v));
    $match[1] = trim($match[1]);
    echo "{$i}. [{$match[1]}, `/{$name2}`]({$name})\r\n";
    ++$i;
}

function get_line($path)
{
    $f = fopen($path, "r");
    $rt = fgets($f);
    fclose($f);
    return $rt;
}