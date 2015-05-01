<?php
require_once("common/common.php");
get_header("学生课表");
?>

<div id="CourseStudent">
	<div class="container">
		<div style="margin-bottom: 15px">
			<ul class="nav nav-pills">
				<li v-repeat="menus" role="presentation" v-class="active?'active':''">
					<a href="#{{url}}">{{name}}</a>
				</li>
			</ul>
		</div>
		<div class="content" v-with="result" v-component="{{currentView}}">
		</div>
	</div>
</div>

<?php get_footer("course_student") ?>
