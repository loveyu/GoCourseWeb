<?php
require_once("common/common.php");
get_header("找回密码");
?>
<div id="ForgetPassword">
	<div class="container">
		<div class="row">
			<div class="col-sm-offset-2 col-sm-8">
				<div class="page-header">
					<h2>找回密码</h2>
				</div>
				<form method="get" v-on="submit: onFormSubmit">
					<fieldset>
						<div class="alert alert-danger" role="alert" v-if="error_msg">
							<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span>
							{{error_msg}}
						</div>
						<div class="form-group">
							<div class="input-group">
								<span class="input-group-addon">用户邮箱</span>
								<input type="text" v-model="email" name="email" class="form-control" placeholder="你绑定的邮箱账号">
							</div>
						</div>
						<div class="form-group form-inline">
							<div class="input-group">
								<span class="input-group-addon">验证字符</span>
								<input type="text" v-model="captcha" name="captcha" class="form-control" placeholder="不区分大小写">
							</div>
							<span class="captcha"><img src="http://go.course.org/image/captcha.jpg" v-on="click: onClickCaptcha"></span>
						</div>
						<div class="form-group">
							<div class="input-group">
								<span class="input-group-addon">账户类型</span>

								<div class="form-control">
									<label class="radio-inline">
										<input type="radio" name="type" v-model="type" checked="checked" id="TypeStudent" value="student">
										学生
									</label>
									<label class="radio-inline">
										<input type="radio" name="type" v-model="type" id="TypeTeacher" value="teacher">
										教师
									</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<button class="btn btn-primary form-control" type="submit">重置</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>

<?php get_footer("forget")?>
