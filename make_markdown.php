<?php
/**
 * User: loveyu
 * Date: 2015/4/21
 * Time: 23:44
 */
system("php gen_status_code.php > doc/status_code.md");
system("php gen_api_index.php > doc/index.md");
foreach (glob("G:\\J2EE\\GoCourseServer\\doc\\api\\*.md") as $v) {
    file_put_contents("doc/" . basename($v), file_get_contents($v));
}
foreach (glob("doc/*.md") as $v) {
    $content = get_line($v);
    if (preg_match("/[#]*[\\s]+([\\s\\S]*?)\r\n/", $content, $match) != 1) {
        continue;
    }
    $title = mb_convert_encoding(trim($match[1]), "GB2312", "UTF-8");
    echo "T:{$title}.\n";
    $name = preg_replace("/\\.md$/", ".html", basename($v));
    system("ghmd --title \"{$title}\" --dest doc/{$name} {$v}");
    echo "finish $name\n";
}

function get_line($path)
{
    $f = fopen($path, "r");
    $rt = fgets($f);
    fclose($f);
    return $rt;
}