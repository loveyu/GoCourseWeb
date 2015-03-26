<?php
require_once( "common/common.php" );
get_header( "个人中心" );
?>

<div id="Home">
	<div class="container">
		<div style="margin-bottom: 15px">
		<ul class="nav nav-pills" v-if="is_student">
			<li role="presentation" class="active"><a href="#">个人信息</a></li>
			<li role="presentation"><a href="#">头像修改</a></li>
			<li role="presentation"><a href="#">密码修改</a></li>
		</ul>
		</div>
		<div class="content">
		<div class="jumbotron">
			<p class="text-center">加载中.......</p>
		</div>
		</div>
	</div>
</div>

<?php get_footer( "home" ) ?>
