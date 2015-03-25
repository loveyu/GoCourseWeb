<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:32
 */
header( "Content-Type: application/javascript; charset=utf-8" );
$page = [];
foreach(glob("script/page/*.js") as $v){
	$page[] = "page/".basename($v);
}
foreach ( array_merge( [ 'config.js', 'func.js' ], $page, [ 'home.js' ] ) as $v ) {
	if ( ! is_file( "script/{$v}" ) ) {
		continue;
	}
	echo file_get_contents( "script/{$v}" );
	echo "\n\n\n";
}