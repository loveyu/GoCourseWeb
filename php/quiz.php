<?php
require_once("common/common.php");
get_header("课程测验");
?>

<div id="Quiz">
	<div class="container">
		<component menus="{{menus}}" is="base-page-menu"></component>
		<component class="content" data="{{result}}" is="{{currentView}}"></component>
	</div>
</div>

<?php get_footer("quiz") ?>
