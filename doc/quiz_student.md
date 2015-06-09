# 学生的测验与管理
基本访问路径: `/quiz_student`

## /quiz_student/get_test_list
Desc: 获取测验列表
Method: Default
Param:
* course_table_id(require) 课程表ID

#### 错误状态，错误标记`160`
* `16000` 课程表ID不正确
* `16001` 只允许学生用户查询




**数据对象引用: ** [*DataTestList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataTestList.html)

```js
//包含多个选项，type描述了选项的类型
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 25,
		  "courseId": 1,
		  "title": "人工智能是什么",
		  "teacherID": 1,
		  "index": "1.1",
		  "type": 1
		},
		"options": [
		  {
			"optionID": 65,
			"quizID": 25,
			"index": 0,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 66,
			"quizID": 25,
			"index": 1,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 67,
			"quizID": 25,
			"index": 2,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 68,
			"quizID": 25,
			"index": 3,
			"description": "简单的答案而已"
		  }
		]
	  },
	  {
		"quiz": {
		  "quizID": 26,
		  "courseId": 1,
		  "title": "人工智能的概念(___)，(___),(___)",		//此类数据，需要提交3个答案
		  "teacherID": 1,
		  "index": "1.2",
		  "type": 1
		},
		"options": [
		  {
			"optionID": 69,
			"quizID": 26,
			"index": 0,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 70,
			"quizID": 26,
			"index": 1,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 71,
			"quizID": 26,
			"index": 2,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 72,
			"quizID": 26,
			"index": 3,
			"description": "简单的答案而已"
		  }
		]
	  },
	  {
		"quiz": {
		  "quizID": 28,
		  "courseId": 1,
		  "title": "新的单选测验",
		  "teacherID": 1,
		  "index": "1.1",
		  "type": 0
		},
		"options": [
		  {
			"optionID": 77,
			"quizID": 28,
			"index": 0,
			"description": "答案啊啊啊啊啊啊"
		  },
		  {
			"optionID": 78,
			"quizID": 28,
			"index": 1,
			"description": "不知道顶顶顶顶"
		  },
		  {
			"optionID": 79,
			"quizID": 28,
			"index": 2,
			"description": "法第三方和第三方和第三方看来都说了"
		  },
		  {
			"optionID": 80,
			"quizID": 28,
			"index": 3,
			"description": "你说谁水水水水谁谁谁水水水水"
		  }
		]
	  }
	]
  }
}
```

## /quiz_student/get_share_test_list
Desc: 获取某一课程共享的测验，即测验被设置为共享，然后所以学生即可参与此类题目
Method: Default
Param: 
* course_id(require) 课程ID

#### 错误状态，错误标记`163`
* `16300` 学生才能获取测验列表
* `16301` 课程ID有误




**数据对象引用: ** [*DataTestList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataTestList.html)

```js
//包含多个选项，type描述了选项的类型，返回的数据格式与get_test_list是一致的
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 25,
		  "courseId": 1,
		  "title": "人工智能是什么",
		  "teacherID": 1,
		  "index": "1.1",
		  "type": 1
		},
		"options": [
		  {
			"optionID": 65,
			"quizID": 25,
			"index": 0,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 66,
			"quizID": 25,
			"index": 1,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 67,
			"quizID": 25,
			"index": 2,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 68,
			"quizID": 25,
			"index": 3,
			"description": "简单的答案而已"
		  }
		]
	  },
	  {
		"quiz": {
		  "quizID": 26,
		  "courseId": 1,
		  "title": "人工智能的概念(___)，(___),(___)",		//此类数据，需要提交3个答案
		  "teacherID": 1,
		  "index": "1.2",
		  "type": 1
		},
		"options": [
		  {
			"optionID": 69,
			"quizID": 26,
			"index": 0,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 70,
			"quizID": 26,
			"index": 1,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 71,
			"quizID": 26,
			"index": 2,
			"description": "简单的答案而已"
		  },
		  {
			"optionID": 72,
			"quizID": 26,
			"index": 3,
			"description": "简单的答案而已"
		  }
		]
	  },
	  {
		"quiz": {
		  "quizID": 28,
		  "courseId": 1,
		  "title": "新的单选测验",
		  "teacherID": 1,
		  "index": "1.1",
		  "type": 0
		},
		"options": [
		  {
			"optionID": 77,
			"quizID": 28,
			"index": 0,
			"description": "答案啊啊啊啊啊啊"
		  },
		  {
			"optionID": 78,
			"quizID": 28,
			"index": 1,
			"description": "不知道顶顶顶顶"
		  },
		  {
			"optionID": 79,
			"quizID": 28,
			"index": 2,
			"description": "法第三方和第三方和第三方看来都说了"
		  },
		  {
			"optionID": 80,
			"quizID": 28,
			"index": 3,
			"description": "你说谁水水水水谁谁谁水水水水"
		  }
		]
	  }
	]
  }
}
```

## /quiz_student/do_test
Desc: 开始做测试题目
Method: POST
Param:
* quiz_id(require) 测验的ID
* answer(require)  回答的列表，用`,`逗号分隔，传入的数据为选项ID(optionID)，不是ABCD也不是0123序号，如果多选题，有严格的传入顺序，如多选`125,127,128`，单选`125`

#### 错误状态，错误标记`161`
* `16100` 非学生无法做测试
* `16101` 非法的测试
* `16102` 必须设置回答的答案
* `16103` 存在非法的答案选项值
* `16104` 你无法做此题目，未开放或未选课
* `16105` 多选长度不一致
* `16106` 答案错误
* `16107` 答案错误
* `16108` 答案错误
* `16109` 未知问题类型
* `16110` 答案错误，且提交答案失败
* `16111` 答案正确，但提交答案失败
* `16112` 答案错误，且提交答案失败



```js
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```

## /quiz_student/exec_history
Desc: 做题历史记录
Method: Default
Param: **所以参数可均不提交，即查询全部**
* course_table_id (可选) 依据某一课程表查询，优先该参数
* course_id (可选) 依据某一课程的ID查询，需要course_table_id参数为空
* type (可选) 答题类型,0为自我测试,默认为-1不判断
* is_correct (可选) 答题类型,-1全部，默认-1，0错误，1正确

#### 错误状态，错误标记`162`
* `16200` 非法用户
* `16201` 当前测验类型不支持
* `16202` 有误的测验正确性类型
* `16203` 非法参数





**数据对象引用: ** [*DataTestExecList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataTestExecList.html)

```js
//返回的对象为`DataTestExecList`,对象有为List<TbQuizExec> execs,Map<Integer, DataQuizEntity> quiz;
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"execs": [
	  {
		"execID": 23,
		"quizID": 25,
		"userID": 32,
		"optionID": 0,
		"time": 1432826986,
		"isCorrect": 1,
		"type": 0,
		"flag": 1,
		"optionMap": "65,67",
		"taskID": 0
	  },
	  {
		"execID": 19,
		"quizID": 29,
		"userID": 32,
		"optionID": 0,
		"time": 1432730421,
		"isCorrect": 1,
		"type": 0,
		"flag": 1,
		"optionMap": "81,82",
		"taskID": 0
	  },
	  {
		"execID": 17,
		"quizID": 26,
		"userID": 32,
		"optionID": 0,
		"time": 1432695779,
		"isCorrect": 1,
		"type": 0,
		"flag": 1,
		"optionMap": "69,70,69",
		"taskID": 0
	  }
	],
	"quiz": {
	  "25": {
		"quiz": {
		  "quizID": 25,
		  "courseId": 1,
		  "title": "人工智能是什么(___)",
		  "desc": "",
		  "status": 1,
		  "time": 1432221678,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "1.1",
		  "size": 2,
		  "single": false,
		  "multi": true
		},
		"options": [
		  {
			"optionID": 65,
			"quizID": 25,
			"index": 0,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0,
			"correct": true
		  },
		  {
			"optionID": 66,
			"quizID": 25,
			"index": 1,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0,
			"correct": false
		  },
		  {
			"optionID": 67,
			"quizID": 25,
			"index": 2,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0,
			"correct": true
		  },
		  {
			"optionID": 68,
			"quizID": 25,
			"index": 3,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0,
			"correct": false
		  }
		],
		"comments": null
	  },
	  "26": {
		"quiz": {
		  "quizID": 26,
		  "courseId": 1,
		  "title": "人工智能的概念__A__，__B__,__A__(___)(___)(___)",
		  "desc": "",
		  "status": 1,
		  "time": 1432221716,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "1.2",
		  "size": 3,
		  "single": false,
		  "multi": true
		},
		"options": [
		  {
			"optionID": 69,
			"quizID": 26,
			"index": 0,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0,
			"correct": true
		  },
		  {
			"optionID": 70,
			"quizID": 26,
			"index": 1,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0,
			"correct": true
		  },
		  {
			"optionID": 71,
			"quizID": 26,
			"index": 2,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0,
			"correct": false
		  },
		  {
			"optionID": 72,
			"quizID": 26,
			"index": 3,
			"description": "简单的答案而已",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0,
			"correct": false
		  }
		],
		"comments": null
	  }
	}
  }
}
```