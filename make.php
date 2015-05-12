<?php
/**
 * User: loveyu
 * Date: 2015/3/25
 * Time: 23:18
 */
array_shift($argv);
$n = implode(" ", $argv);
system("php script.php {$n} > asset/style/js/go.js");
system("php css.php {$n} > asset/style/css/style.css");
foreach (glob("php/*.php") as $v) {
	if (basename($v) == "test.php") {
		continue;
	}
	$name = preg_replace("/\\.php$/", ".html", basename($v));
	system("php {$v} {$n} > html_out/{$name}");
}