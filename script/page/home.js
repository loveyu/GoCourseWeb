/**
 * Created by loveyu on 2015/3/25.
 */
Page.home = function(){
	var home_vm = new Vue({
		el: "#Home",
		data: {
			is_student: false,
			is_teacher: false
		}
	});
	Hook.add('login.finish', function(arg){
		home_vm.is_student = Member.user_type == "student";
		home_vm.is_teacher = !home_vm.is_student;
		return arg;
	});
	return home_vm;
};