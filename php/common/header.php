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
	<link type="text/css" rel="stylesheet" href="asset/bootstrap/css/bootstrap.css"/>
	<link type="text/css" rel="stylesheet" href="asset/style/css/style.css"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<header id="Header" class="navbar navbar-default">
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
					<li v-repeat="nav_main" v-class="active?'active':''"><a v-attr="title:title" href="{{link}}">{{name}}</a>
					</li>
				</ul>
				<ul v-if="!login_status" class="nav navbar-nav navbar-right">
					<li v-repeat="nav_right" v-class="active?'active':''"><a v-attr="title:title" href="{{link}}">{{name}}</a>
					</li>
				</ul>
				<ul v-if="login_status" class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="{{home_url}}" class="dropdown-toggle" data-toggle="dropdown" role="button"
						   aria-expanded="false">
							<img class="user-avatar" v-attr="src: avatar" alt="avatar">{{name}} <span
								class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li v-if="user_type=='teacher'"><a href="course_teacher.html">教师课表</a></li>
							<li v-if="user_type=='student'"><a href="course_student.html">我的课表</a></li>
							<li><a href="home.html">个人中心</a></li>
							<li class="divider"></li>
							<li><a href="#" v-on="click: logout">退出登录</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</header>

