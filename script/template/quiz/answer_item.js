_methods_ = {
	find_option_index: function (optionId) {
		for (var i in this.quiz.options) {
			if (this.quiz.options[i].optionID == optionId) {
				return this.quiz.options[i].index;
			}
		}
		return -1;
	},
	parse_answer_map: function (answer) {
		var list = answer.optionMap.split(',');
		var rt = [];
		for (var i in list) {
			rt.push(this.find_option_index(list[i]));
		}
		return rt;
	}
};//_methods_

_props_ = {
	data: Object
};//_props_