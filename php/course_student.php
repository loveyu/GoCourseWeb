<?php
require_once("common/common.php");
get_header("学生课表");
?>

<div id="CourseStudent">
	<div class="container">
		<div v-with="menus:menus" v-component="base-page-menu"></div>
		<div class="content" v-with="result" v-component="{{currentView}}"></div>
	</div>
</div>

<?php get_footer("course_student") ?>
