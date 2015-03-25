<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:53
 */
require_once( "common.php" );
$api = new api();
$api->_set_data( $_POST );
$api->_set_status( false, 0 );