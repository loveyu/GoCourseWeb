<?php
require_once("common/common.php");
get_header("签到管理");
?>

<div id="SignTeacher">
	<div class="container">
		<component menus="{{menus}}" is="base-page-menu"></component>
		<component class="content" data="{{result}}" is="{{currentView}}"></component>
	</div>
</div>

<?php get_footer("sign_teacher") ?>
