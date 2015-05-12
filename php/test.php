<?php
require_once("common/common.php");
get_header("临时HTML测试");
echo "<div class=\"container\">";
$base_path = dirname(__DIR__) . "/html_test/";
$list = glob($base_path . "*.html");
$page = isset($_GET['page']) ? $_GET['page'] : "";
if (empty($list)):?>
	<div class="alert alert-danger">未找到任何测试的HTML页面，请检查html_test目录。</div>
<?php else: ?>
	<ul class="nav nav-pills">
		<?php foreach ($list as $v):
			$base_name = preg_replace("/\\.html$/", "", basename($v));
			?>
			<li<?php
			if ($base_name == $page) {
				echo " class=\"active\"";
			}
			?>><a href="?page=<?php echo $base_name?>"><?php echo $base_name?></a></li>
		<?php endforeach; ?>
	</ul>
<?php
endif;

if (empty($page)) {
	echo "<p class='alert alert-warning'>请选择一个文件要查看的文件</p>";
} else if (!is_file($base_path . $page . ".html")) {
	echo "<p class='alert alert-danger'>请选择正确的名称</p>";
} else {
	echo "<div id=\"TEST-CONTENT\">";
	echo file_get_contents($base_path . $page . ".html");
	echo "</div>";
	if (is_file($base_path . $page . ".js")) {
		$content = "<script src=\"html_test/{$page}.js\"></script>";
	}
}
echo "</div>";
get_footer('', isset($content) ? $content : '') ?>