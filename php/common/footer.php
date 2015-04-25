

<footer id="Footer">
	<div class="container">
		<p class="text-center">&copy;Go Course 2015</p>
	</div>
</footer>
</body>
<script src="asset/vue/vue.js"></script>
<script src="asset/director/director.js"></script>
<script src="asset/jquery/jquery.js"></script>
<script src="asset/bootstrap/js/bootstrap.js"></script>
<script src="asset/style/js/go.js"></script>
<?php
if(isset($name) && !empty($name)):
?>
<script>
	APP.runPage('<?php echo $name?>');
</script>
<?php endif;?>
</html>
