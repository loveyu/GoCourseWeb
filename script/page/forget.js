/**
 * Created by loveyu on 2015/3/25.
 */
Page.forget = function () {
	return new Vue({
		el:"#ForgetPassword",
		data:{
			error_msg:'',
			email:'',
			captcha:'',
			type:''
		},methods:{
			onClickCaptcha: function(event){
				event.target.src = CONFIG.captcha_url + "?rand=" + Math.random();
			},
			onFormSubmit: function(event){
				var flag = true;
				if (this.email == '' || this.captcha == '' || this.type == '') {
					this.error_msg = "表单不允许有空值";
					flag = false;
				}
				if (flag) {
					FUNC.ajax(CONFIG.api.forget, 'post', {
						email: this.email, captcha: this.captcha, type: this.type
					}, this.FormResult);
				}
				event.preventDefault();
				return false;
			},
			FormResult: function(data){
				if(!data.status){
					this.error_msg = data.msg ? data.msg : '未知错误';
				}else{
					alert("OK");
				}
			}
		}
	});
};