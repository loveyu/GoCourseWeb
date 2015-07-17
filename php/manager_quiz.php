<?php
require_once("common/common.php");
get_header("教师测验管理");
?>

<div id="ManagerQuiz">
	<div class="container">
		<component menus="{{menus}}" is="base-page-menu"></component>
		<component class="content" data="{{result}}" is="{{currentView}}"></component>
	</div>
</div>

<?php get_footer("manager_quiz") ?>
