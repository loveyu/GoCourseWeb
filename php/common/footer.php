</div>
<footer id="Footer" class="main-footer">
	<div class="container">
		<p class="text-center">&copy;Go Course 2015</p>
	</div>
</footer>
</body>
<script src="<?php echo get_asset("asset/vue/vue.js"); ?>"></script>
<script src="<?php echo get_asset("asset/director/director.js"); ?>"></script>
<script src="<?php echo get_asset("asset/jquery/jquery.js"); ?>"></script>
<script src="<?php echo get_asset("asset/bootstrap/js/bootstrap.js"); ?>"></script>
<script src="<?php echo get_asset("asset/style/js/go.js", false); ?>"></script>
<?php
if (isset($name) && !empty($name)):
	?>
	<script>
		APP.runPage('<?php echo $name?>');
	</script>
<?php endif;
if (isset($footer_content) && !empty($footer_content)):
	echo $footer_content;
endif; ?>
</html>
