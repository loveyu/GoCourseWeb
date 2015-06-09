# 教师的测验管理
基本访问路径: `/quiz_teacher`

## /quiz_teacher/course_list
Desc: 获取教师的课程名称列表

Method: Default

Param: 
* status(require) 课程的状态 -1全部（默认），0开课中，1未开课，2已结束

#### 错误状态，错误标记`140`
* `14000` 不是教师用户
* `14001` 状态取值不正确



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"1": "人工智能",
	"414": "广告学",
	"513": "科学教育",
	"355": "信用管理",
	"386": "国际政治",
	"391": "地球化学"
  }
}
```

## /quiz_teacher/quiz_add
Desc: 添加一个课程测验

Method: POST

Param:
* course_id (require) 课程ID
* quiz_json (require) 测验数据对象,JSON对象
* add_my_course (可选) 是否添加测验到 全部课程当中，默认不添加，为`1`时添加
* course_table_id (可选) 是否添加到指定的课程表中，默认不添加，当ID合法时有效。如果该参数有效则`add_my_course`无效

**提示：** quiz_json 对象格式如下
```js
{
  "title": "国际形势",
  "options": [
	"答案A",
	"答案B",
	"答案C",
	"答案D"
  ],
  "correct": [			//允许多个选项
	"1",
	"2"
  ],
  "desc": "答案解析",
  "index": "1.5"		//索引
}
```

#### 错误状态，错误标记`141`
* `14100` 只允许教师添加课程操作
* `14101` 课程ID不正确
* `14102` 上传的JSON数据解析失败
* `14103` 课程设置标题不正确
* `14104` 标题过长，不应超过1023个字符
* `14105` 答案解析过长，不应超过1023个字符
* `14106` 无法正确检查课程选项，查看是否有空选项
* `14107` 最大选项为26个
* `14108` 没有任何正确选项，请选择至少一个正确选项
* `14109` 无法正确检查你的单选值或多选对应值
* `14110` 当前索引格式不正确，必须使用如：5.2.1或5.2
* `14111` 选项长度最大为300字
* `14112` 你存在相同的测试标题，请不要重复添加
* `14113` 无课程，无法添加到当前课程中，课程已不在开启状态，请取消该勾选项
* `14114` 没开启过该课程，无法添加
* `14115` 创建新的题目失败
* `14116` 无法添加对应的课程选项
* `14117` 添加到当前课表失败，请检查该课程是否有在开课
* `14118` 添加到当前课表失败，请检查当前是否有开该名称课程
* `14119` 事务数据处理发生异常



Return:
```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_teacher/quiz_list
Desc: 查询教师的测验列表

Method: Default

Param:
* course_id (require) 课程ID

#### 错误状态，错误标记`142`
* `14200` 非教师用户
* `14201` 非法的课程ID号
* `14202` 教师没有该课程




**数据对象引用：** [*DataQuizList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataQuizList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 12,
		  "courseId": 1,
		  "title": "测试测试测试测试测试测试__A__还，你知道__C__。",
		  "desc": "范德萨发多少个发达",
		  "status": 1,
		  "time": 1431345078,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "5.2"
		},
		"options": [
		  {
			"optionID": 13,
			"quizID": 12,
			"index": 0,
			"description": "阿凡达广东省",
			"feedback": "反反馈反馈反馈馈",
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 14,
			"quizID": 12,
			"index": 1,
			"description": "各个地方",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  },
		  {
			"optionID": 15,
			"quizID": 12,
			"index": 2,
			"description": "greghtgrthtr",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 16,
			"quizID": 12,
			"index": 3,
			"description": "发多少个发大水",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  }
		],
		"comments": null
	  }
	  //............更多数据
	]
  }
}
```

## /quiz_teacher/quiz_share_list
Desc: 查询教师的共享的测验列表，包括查询教师自己的

Method: Default

Param:
* course_id (require) 课程ID

#### 错误状态，错误标记`149`
* `14900` 非教师用户
* `14901` 非法的课程ID号



*返回数据格式与`quiz_list`一致*


**数据对象引用：** [*DataQuizList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataQuizList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 12,
		  "courseId": 1,
		  "title": "测试测试测试测试测试测试__A__还，你知道__C__。",
		  "desc": "范德萨发多少个发达",
		  "status": 1,
		  "time": 1431345078,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "5.2"
		},
		"options": [
		  {
			"optionID": 13,
			"quizID": 12,
			"index": 0,
			"description": "阿凡达广东省",
			"feedback": "反反馈反馈反馈馈",
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 14,
			"quizID": 12,
			"index": 1,
			"description": "各个地方",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  },
		  {
			"optionID": 15,
			"quizID": 12,
			"index": 2,
			"description": "greghtgrthtr",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 16,
			"quizID": 12,
			"index": 3,
			"description": "发多少个发大水",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  }
		],
		"comments": null
	  }
	  //............更多数据
	]
  }
}
```

## /quiz_teacher/quiz_share
Desc: 分享某一课程测验

Method: POST

Param: 
* quiz_id (require) 测验ID

#### 错误状态，错误标记`143`
* `14300` 非教师用户
* `14301` 非法测验ID
* `14302` 未知用户操作
* `14303` 无法找到该测验
* `14304` 该测验已被共享
* `14305` 该测验共享已被取消
* `14306` 无法成功设置分享信息



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_teacher/quiz_share_cancel
Desc: 取消分享某一课程测验

Method: POST

Param: 
* quiz_id (require) 测验ID

#### 错误状态，参考前文标记`143`

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_teacher/bind_list
Desc: 获取某一课程表绑定的测验列表，包括共享的测验

Method: Default

Param:
* course_table (require) 课程表ID

#### 错误状态，错误标记`145`
* `14500` 非教师用户
* `14501` 非法课程ID



*返回数据格式与`quiz_list`一致*


**数据对象引用：** [*DataQuizList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataQuizList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 12,
		  "courseId": 1,
		  "title": "测试测试测试测试测试测试__A__还，你知道__C__。",
		  "desc": "范德萨发多少个发达",
		  "status": 1,
		  "time": 1431345078,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "5.2"
		},
		"options": [
		  {
			"optionID": 13,
			"quizID": 12,
			"index": 0,
			"description": "阿凡达广东省",
			"feedback": "反反馈反馈反馈馈",
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 14,
			"quizID": 12,
			"index": 1,
			"description": "各个地方",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  },
		  {
			"optionID": 15,
			"quizID": 12,
			"index": 2,
			"description": "greghtgrthtr",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 16,
			"quizID": 12,
			"index": 3,
			"description": "发多少个发大水",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  }
		],
		"comments": null
	  }
	  //............更多数据
	]
  }
}
```

## /quiz_teacher/unbind_list
Desc: 获取某一课程表未绑定的测验列表，仅仅包含教师自己的测验

Method: Default

Param:
* course_table (require) 课程表ID

#### 错误状态，错误标记`146`
* `14600` 非教师用户
* `14601` 非法课程ID



*返回数据格式与`quiz_list`一致*


**数据对象引用：** [*DataQuizList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataQuizList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 12,
		  "courseId": 1,
		  "title": "测试测试测试测试测试测试__A__还，你知道__C__。",
		  "desc": "范德萨发多少个发达",
		  "status": 1,
		  "time": 1431345078,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "5.2"
		},
		"options": [
		  {
			"optionID": 13,
			"quizID": 12,
			"index": 0,
			"description": "阿凡达广东省",
			"feedback": "反反馈反馈反馈馈",
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 14,
			"quizID": 12,
			"index": 1,
			"description": "各个地方",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  },
		  {
			"optionID": 15,
			"quizID": 12,
			"index": 2,
			"description": "greghtgrthtr",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 16,
			"quizID": 12,
			"index": 3,
			"description": "发多少个发大水",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  }
		],
		"comments": null
	  }
	  //............更多数据
	]
  }
}
```


## /quiz_teacher/unbind_share_list
Desc: 获取某一课程表未绑定的**共享**测验列表

Method: Default

Param:
* course_table (require) 课程表ID

#### 错误状态，参考前文标记`146`

*返回数据格式与`quiz_list`一致*


**数据对象引用：** [*DataQuizList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataQuizList.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"quiz": {
		  "quizID": 12,
		  "courseId": 1,
		  "title": "测试测试测试测试测试测试__A__还，你知道__C__。",
		  "desc": "范德萨发多少个发达",
		  "status": 1,
		  "time": 1431345078,
		  "reply": 0,
		  "teacherID": 1,
		  "type": 1,
		  "index": "5.2"
		},
		"options": [
		  {
			"optionID": 13,
			"quizID": 12,
			"index": 0,
			"description": "阿凡达广东省",
			"feedback": "反反馈反馈反馈馈",
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 14,
			"quizID": 12,
			"index": 1,
			"description": "各个地方",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  },
		  {
			"optionID": 15,
			"quizID": 12,
			"index": 2,
			"description": "greghtgrthtr",
			"feedback": null,
			"isCorrect": 1,
			"reply": 0
		  },
		  {
			"optionID": 16,
			"quizID": 12,
			"index": 3,
			"description": "发多少个发大水",
			"feedback": null,
			"isCorrect": 0,
			"reply": 0
		  }
		],
		"comments": null
	  }
	  //............更多数据
	]
  }
}
```

## /quiz_teacher/bind_quiz
Desc: 绑定课程表与测验之间的关系

Method: POST

Param:
* course_table (require) 课程表ID
* quiz_id (require) 测验ID，非自己的测验，会检测共享状态

#### 错误状态，错误标记`148`
* `14800` 非教师用户
* `14801` 测验ID不合法
* `14802` 课程表ID不合法
* `14803` 未知操作类型
* `14804` 已经绑定无需重复操作
* `14805` 未找到该测验
* `14806` 该测验未共享，无法添加
* `14807` 未找到该课程表
* `14808` 当前教师无此权限
* `14809` 无法成功绑定测验
* `14810` 课程本身未绑定，无需操作
* `14811` 未找到该测验
* `14812` 未找到该课程表
* `14813` 当前教师无此权限
* `14814` 无法将测验解除绑定



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /quiz_teacher/bind_quiz_cancel
Desc: 取消课程表与测验之间的绑定关系

Method: POST

Param:
* course_table (require) 课程表ID
* quiz_id (require) 测验ID，不检查测验的共享状态

#### 错误状态，参考前文标记`148`

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```
