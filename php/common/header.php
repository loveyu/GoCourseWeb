<!DOCTYPE html>
<html>
<head lang="zh-CN">
	<meta charset="UTF-8">
	<title><?php
		if (isset($title) && !empty($title)) {
			echo $title, " - Go Course";
		} else {
			echo "Go Course";
		}
		?></title>
	<LINK href="" type="" rel=icon>
	<link type="text/css" rel="stylesheet" href="<?php echo get_asset("asset/bootstrap/css/bootstrap.css") ?>"/>
	<link type="text/css" rel="stylesheet" href="<?php echo get_asset("asset/style/css/style.css", false) ?>"/>
	<link rel="icon" href="<?php echo get_asset("favicon.ico") ?>"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body<?php echo (isset($body_id) && !empty($body_id)) ? " id=\"{$body_id}\"" : "" ?><?php echo (isset($body_class) && !empty($body_class)) ? " class=\"{$body_class}\"" : "" ?>>
<header id="Header" class="main-navbar navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
			        data-target=".bs-navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a href="/" class="navbar-brand">Go Course</a>
		</div>
		<nav class="collapse navbar-collapse bs-navbar-collapse">
			<div class="container">
				<ul class="nav navbar-nav">
					<?php if (!is_cli()): ?>
					<li<?php echo $_SERVER['SCRIPT_NAME'] == '/php/test.php' ? " class=\"active\"" : "" ?>>
						<a href="test.html">
							临时测试文件
						</a><?php endif; ?>
					<li v-repeat="nav_main" v-class="active?'active':''"><a v-attr="title:title" href="{{link}}">{{name}}</a>
					</li>
				</ul>
				<ul v-if="!login_status" class="nav navbar-nav navbar-right">
					<li v-repeat="nav_right" v-class="active?'active':''"><a v-attr="title:title" href="{{link}}">{{name}}</a></li>
				</ul>
				<ul v-if="login_status" class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="{{home_url}}" class="dropdown-toggle profile-info" data-toggle="dropdown" role="button" aria-expanded="false">
							<img class="user-avatar" v-attr="src: avatar" alt="avatar">{{name}} <span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li v-repeat="nav_private" v-class="active?'active':''"><a v-attr="title:title" href="{{link}}">{{name}}</a>
							<li class="divider"></li>
							<li><a href="#" v-on="click: logout">退出登录</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</header>
<div class="main-container">
