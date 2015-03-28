<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:32
 */
header( "Content-Type: text/css; charset=utf-8" );
foreach ( ['main','home-student-info'] as $v ) {
	if ( ! is_file( "asset/style/css/{$v}.css" ) ) {
		continue;
	}
	echo file_get_contents( "asset/style/css/{$v}.css" );
	echo "\n\n\n";
}