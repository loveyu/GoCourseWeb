<?php
require_once("common/common.php");
get_header("首页");
?>
<div id="Index">
	<div id="Content">
		<div class="container">
			<div class="page-header">
				<h1>课程课程课程课程课程课程课程</h1>

				<h3>课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程课程</h3>
			</div>
		</div>
	</div>
	<div id="App-Detail">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<div class="jumbotron">
						<h2>Hello, world!</h2>

						<p>...</p>

						<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="jumbotron">
						<h2>Hello, world!</h2>

						<p>...</p>

						<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
					</div>
				</div>
				<div class="col-sm-4">

					<div class="jumbotron">
						<h2>Hello, world!</h2>

						<p>...</p>

						<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
					</div>
				</div>
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
						<h4 class="modal-title text-center">Login</h4>
					</div>
					<div class="modal-body" v-with="result" v-component="base-login-form">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php get_footer('index') ?>
