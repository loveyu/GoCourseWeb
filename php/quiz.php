<?php
require_once("common/common.php");
get_header("课程测验");
?>

<div id="Quiz">
	<div class="container">
		<div v-with="menus:menus" v-component="base-page-menu"></div>
		<div class="content" v-with="result" v-component="{{currentView}}"></div>
	</div>
</div>

<?php get_footer("quiz") ?>
