<?php
$page = isset($_GET['p']) ? $_GET['p'] : 'index';
if (!is_file("../doc/{$page}.html")) {
	die("file not found");
} else {
	$content = file_get_contents("../doc/{$page}.html");
	$content = str_replace('<link rel="stylesheet" type="text/css" href="asset/all.min.css">',
		'<link rel="stylesheet" type="text/css" href="doc/template/style.css">'
		. '<link rel="stylesheet" type="text/css" href="doc/asset/style.css">',
		$content);
	$content = str_replace(
		'<script type="text/javascript" src="asset/all.min.js"></script>',
		'<script type="text/javascript" src="asset/jquery/jquery.min.js"></script>'
		. '<script type="text/javascript" src="doc/asset/js/name_map.js"></script>'
		. '<script type="text/javascript" src="doc/asset/js/doc.js"></script>',
		$content);
	echo $content;
}