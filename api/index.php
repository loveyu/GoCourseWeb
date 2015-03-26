<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:53
 */
require_once( "common.php" );
$api = new api();
$type = isset( $_SERVER['PATH_INFO'] ) ? substr( $_SERVER['PATH_INFO'], 1 ) : "";
switch ( $type ) {
	case "forget":
		$api->_set_status( false, 0 );
		break;
	case "member":
		$api->_set_data( [ 'name' => 'NO', 'avatar' => '/image/avatar.jpg', 'id' => 1000 ] );
		$api->_set_status( true, 0 );
		break;
	case "login":
		$api->_set_data( $_GET );
		$api->_set_status( true, 0 );
		break;
	default:
		$api->_set_status( false, 0 );
		break;
}
