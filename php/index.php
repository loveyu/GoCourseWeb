<?php
require_once("common/common.php");
get_header("首页", "CustomStyle", 'page-home');
?>
<div id="Index">
	<div id="Content">
		<div class="container">

			<div v-if="!is_login" class="text-center">
				<h2 class="desc">加入我们，一起玩做题游戏吧！</h2>
				<a class="btn btn-info" href="register.html">马上注册</a>
			</div>
			<div v-if="is_student" class="text-center">
				<h2 class="desc">赶!紧!去上课别给我墨迹!</h2>
				<a class="btn btn-info" href="quiz.html">开始测验吧</a>
			</div>
			<div v-if="is_teacher" class="text-center">
				<h2 class="desc">可以在测验管理中分析学生的测验信息哦！</h2>
				<a class="btn btn-success" href="manager_quiz.html">管理测验</a>
			</div>

		</div>
	</div>
	<div id="Login" v-if="login_form">
		<div class="modal fade" id="LoginModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
								aria-hidden="true">&times;</span></button>
						<h4 class="modal-title text-center">用户登录</h4>
					</div>
					<div class="modal-body" v-with="result" v-component="base-login-form">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php get_footer('index') ?>
