<?php
/**
 * User: loveyu
 * Date: 2015/3/25
 * Time: 23:18
 */
system("php script.php > asset/style/js/go.js");
system("php css.php > asset/style/css/style.js");
foreach(glob("php/*.php") as $v){
	$name = preg_replace("/\\.php$/",".html",basename($v));
	system("php {$v} > html_out/{$name}");
}