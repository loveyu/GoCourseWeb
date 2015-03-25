/**
 * Created by loveyu on 2015/3/24.
 */
Page.login = function () {
	return new Vue({
		el: "#Login",
		methods: {
			onLoginFormSubmit:  function (event) {
				event.preventDefault();
				return false;
			}
		}
	});
};