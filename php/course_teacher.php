<?php
require_once("common/common.php");
get_header("教师课表");
?>

<div id="CourseTeacher">
	<div class="container">
		<component menus="{{menus}}" is="base-page-menu"></component>
		<component class="content" data="{{result}}" is="{{currentView}}"></component>
	</div>
</div>

<?php get_footer("course_teacher") ?>
