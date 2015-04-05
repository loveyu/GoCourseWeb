<?php
/**
 * User: loveyu
 * Date: 2015/3/24
 * Time: 23:53
 */
require_once("common.php");
$api = new api();
$type = isset($_SERVER['PATH_INFO']) ? substr($_SERVER['PATH_INFO'], 1) : "";
switch ($type) {
    case "forget":
        $api->_set_status(false, 0);
        break;
    case "member":
        $api->_set_data(['name' => 'NO', 'avatar' => '/image/avatar.jpg', 'id' => 1000, "user_type" => "student"]);
        $api->_set_status(true, 0);
        break;
    case "login":
        $api->_set_data($_GET);
        $api->_set_status(true, 0);
        break;
    case "student_info":
        $api->_set_data(['user_id' => 11, 'name' => 'NO', "school" => '长江大学', 'college' => "计算机科学", "zy" => "专业",]);
        $api->_set_status(true, 0);
        break;
    case "teacher_info":
        $api->_set_data(['user_id' => 11, 'name' => 'NO', "school" => '长江大学', 'college' => "计算机科学", "zy" => "专业",]);
        $api->_set_status(true, 0);
        break;
    case 'update_avatar':
        $api->_set_data($_FILES);
        $api->_set_status(true, 0);
        break;
    case 'update_password':
        $api->_set_data($_FILES);
        $api->_set_status(true, 0);
        break;
    case 'quiz/list':
        $api->_set_status(true,0);
        $api->_set_data(new TbQuizes());
        break;
    default:
        $api->_set_status(false, 0, "未知错误:".$type);
        break;
}
