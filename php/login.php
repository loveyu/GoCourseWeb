<?php
require_once("common/common.php");
get_header("用户登录");
?>
	<div id="Login">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<div class="page-header">
						<h3>登录登录登录登录登录</h3>
					</div>
					<p>登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录</p>
				</div>
				<div class="col-sm-4 col-sm-offset-2">
					<form method="get" v-on="submit: onLoginFormSubmit">
						<fieldset>
							<legend>用户登录</legend>
							<div class="alert alert-danger" role="alert" v-if="error_msg">
								<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
								<span class="sr-only">Error:</span>
								{{error_msg}}
							</div>
							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon">用户名</span>
									<input type="text" v-model="username" name="username" class="form-control"
									       placeholder="Username">
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon">密　码</span>
									<input type="password" v-model="password" name="password" class="form-control"
									       placeholder="Password">
								</div>
							</div>
							<div class="form-group">
								<div class="input-group">
									<span class="input-group-addon">类　型</span>

									<div class="form-control">
										<label class="radio-inline">
											<input type="radio" name="type" v-model="type" checked="checked"
											       id="TypeStudent" value="student">
											学生
										</label>
										<label class="radio-inline">
											<input type="radio" name="type" v-model="type" id="TypeTeacher"
											       value="teacher">
											教师
										</label>
									</div>
								</div>
							</div>
							<div class="form-group">
								<button class="btn btn-primary form-control" type="submit">登录</button>
							</div>
						</fieldset>
						<p><a class="text-info" href="forget.html">忘记密码？</a></p>
					</form>
				</div>
			</div>
		</div>
	</div>

<?php get_footer("login")?>