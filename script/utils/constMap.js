/*
 * 定义一些常用的对象数组
 */
var CONST_MAP = {
	course_status: [
		{id: -1, status: "全部"},
		{id: 0, status: "已开课"},
		{id: 1, status: "未开课"},
		{id: 2, status: "已结束"}
	],
	course_term: [{id: 0, term: "春季"}, {id: 1, term: "秋季"}],
	quiz_type: {
		single: 0,//单选
		multiple: 1,//多选
		judge: 2//判断
	},
	history_answer_correct: [
		{id: -1, url: "all", name: "查看全部"},
		{id: 0, url: "wrong", name: "只看错题"},
		{id: 1, url: "right", name: "只看答对"}
	]
};