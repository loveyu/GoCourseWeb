<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:32
 */
header( "Content-Type: application/javascript; charset=utf-8" );
$page = [ 'page/login','page/forget' ];
foreach ( array_merge( [ 'config', 'func' ], $page, [ 'home' ] ) as $v ) {
	if ( ! is_file( "script/{$v}.js" ) ) {
		continue;
	}
	echo file_get_contents( "script/{$v}.js" );
	echo "\n\n\n";
}