<?php
/**
 * User: loveyu
 * Date: 2015/3/25
 * Time: 23:12
 */

function get_header($title)
{
	include(__DIR__ . "/header.php");
}

function get_footer($name = '', $footer_content = '')
{
	include(__DIR__ . "/footer.php");
}

function get_asset($path, $auto_cnd = true)
{
	if ($auto_cnd && set_cdn()) {
		$path_info = pathinfo($path, PATHINFO_EXTENSION);
		$new_path = preg_replace("/\\." . $path_info . "$/", ".min." . $path_info, $path);
		if (is_file($new_path)) {
			$path = $new_path;
		}
		return "http://7xizmm.com1.z0.glb.clouddn.com/" . $path;
	}
	return $path;
}

function set_cdn()
{
	global $argv;
	if (isset($argv[1]) && $argv[1] == "cdn") {
		return true;
	} else {
		return false;
	}
}

function is_cli()
{
	return substr(php_sapi_name(), 0, 3) === "cli";
}