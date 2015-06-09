# 课程安排的时间
基本路径：`schedule`

## /schedule/add
Desc: 添加一个课程安排
Method: POST
Param: 所以参数均不能为空，课程会进行冲突检测
* department(require) 专业ID
* name(require) 课程名称，需在课程列表中存在
* openYear(require) 开课年份
* openTerm(require) 开课季度，0春季，1秋季
* fromWeek(require) 课程开始周
* endWeek(require) 课程结束周
* requirement(require) 课程需求
* content(require) 课程主要内容介绍

#### 错误状态，错误标记`120`
* `12000` 无访问权限
* `12001` 专业和课程不能为空
* `12002` 课程描述不允许为空
* `12003` 开学季度必须为一个正确值
* `12004` 请选择一个合适的开学年份
* `12005` 课程起始周有误，必须在1-28周之间
* `12006` 结束周必须使用一个合适的值
* `12007` 添加数据无权限，不在此学院组
* `12008` 找不到课程名，请使用正确的课程名称
* `12009` 数据存在冲突，请试着查询当前数据唯一性
* `12010` 插入数据失败




**数据对象引用: ** [*TbSchedule*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbSchedule.html)

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"scheduleID": 13,
		"deptID": 1,
		"courseName": "组成原理",
		"courseID": 13,
		"openYear": 2015,
		"openTerm": 1,
		"fromWeek": 1,
		"endWeek": 22,
		"requirement": "需求",
		"content": "内容",
		"status": 0
	}
}
```

## /schedule/search
Desc: 搜索当前课程时间表
Method: Default
Param: 
* department(require) 专业ID
* course_name(可选) 课程名称
* course_id(可选) 专业ID，如果指定该参数，然后course_name即无效
* year(require) 开课年份
* term(可选) 开学季度,`0`,`1`
* status(可选) 课程状态 `0`,`1`,`2`
* detail(可选) 搜索的模式,默认为`0`，即完整数据，`1`精简信息，`2`超级简要信息（用于名称ID查询）

#### 错误状态，错误标记`121`
* `12100` 登录用户检查失败
* `12101` 开学季度不正确
* `12102` 输入正确的开课年份



```
//完整模式
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"result": [{
			"scheduleID": 1,
			"deptID": 1,
			"courseName": "人工智能",
			"courseID": 1,
			"openYear": 2015,
			"openTerm": 0,
			"fromWeek": 1,
			"endWeek": 13,
			"requirement": "需求",
			"content": "课程",
			"status": 0
		},
			{
				"scheduleID": 12,
				"deptID": 1,
				"courseName": "组成原理",
				"courseID": 13,
				"openYear": 2015,
				"openTerm": 0,
				"fromWeek": 1,
				"endWeek": 22,
				"requirement": "xxx",
				"content": "xxx",
				"status": 0
			}]
	}
}
```

```
//精简模式
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"result": [{
			"courseID": 1,
			"status": 0,
			"openTerm": 0,
			"endWeek": 13,
			"fromWeek": 1,
			"openYear": 2015,
			"deptID": 1,
			"scheduleID": 1,
			"courseName": "人工智能"
		},
			{
				"courseID": 13,
				"status": 0,
				"openTerm": 0,
				"endWeek": 22,
				"fromWeek": 1,
				"openYear": 2015,
				"deptID": 1,
				"scheduleID": 12,
				"courseName": "组成原理"
			}]
	}
}
```

```
//超级精简模式
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"result": [{
			"openTerm": 0,
			"endWeek": 13,
			"fromWeek": 1,
			"scheduleID": 1,
			"courseName": "人工智能"
		},
			{
				"openTerm": 0,
				"endWeek": 22,
				"fromWeek": 1,
				"scheduleID": 12,
				"courseName": "组成原理"
			}]
	}
}
```

