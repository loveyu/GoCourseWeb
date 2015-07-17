<?php
require_once("common/common.php");
get_header("个人中心");
?>

<div id="Home">
	<div class="container">
		<component menus="{{menus}}" is="base-page-menu"></component>
		<component class="content" data="{{result}}" is="{{currentView}}"></component>
	</div>
</div>

<?php get_footer("home") ?>
