<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:32
 */
header("Content-Type: text/css; charset=utf-8");
foreach (['main', 'model'] as $v) {
	if (is_file("asset/style/css/{$v}.css")) {
		echo file_get_contents("asset/style/css/{$v}.css");
		echo "\n\n\n";
	} else if (is_dir("asset/style/css/{$v}")) {
		foreach (glob("asset/style/css/{$v}/*.css") as $v2) {
			echo file_get_contents($v2), "\n\n";
		}
	}
}