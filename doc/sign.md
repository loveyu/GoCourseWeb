# 签到管理
基本地址: `sign`

## /sign/prepare
Desc: 获取一个签到准备数据
Method: Default
Param:
* course_table_id(require) 课程表ID

#### 错误状态，错误标记`170`
* `17000` 准备的课程ID有误
* `17001` 不是教师用户，不能创建课程签到
* `17002` 错误的课程参数
* `17003` 你无法在此课程上创建签到




**数据对象引用: ** [*DataSignPrepare*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignPrepare.html)

```js
//返回对象为DataSignPrepare
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"course": {						//课程信息
	  "scheduleID": 14,
	  "courseTableID": 6,
	  "teacherID": 1,
	  "teacherName": "管理员",
	  "deptID": 1,
	  "deptName": "计算机科学与技术系",
	  "deptNickName": "计科",
	  "enrolYear": 2012,
	  "courseID": 513,
	  "courseName": "科学教育",
	  "openYear": 2015,
	  "openTerm": 0,
	  "fromWeek": 1,
	  "endWeek": 22,
	  "status": 0
	},
	"week": {					//当前周次信息
	  "year": 2015,
	  "term": 0,
	  "week": 12,
	  "begin_date": "2015-03-09"
	},
	"classInfo": [				//选课的班级信息
	  {
		"classID": 3,
		"className": "计科11201",
		"courseTableID": 6
	  }
	]
  }
}
```


## /sign/create
Desc: 创建一个签到任务
Method: POST
Param:
* course_table_id (require) 对应的课程表ID
* name (require) 签到名称
* detail (require) 签到详情
* time (require) 签到的有效时间，分钟

#### 错误状态，错误标记`171`
* `17100` 不是老师，不能创建签到
* `17101` 无效的课程ID
* `17102` 过期时间必须在1~1000之间，单位为分钟
* `17103` 无效的签到名称，请使用友好的名称
* `17104` 错误的课程参数
* `17105` 你无法在此课程上创建签到
* `17106` 处理签到操作发生异常
* `17107` 存在重复的任务，请修改任务名称
* `17108` 无法创建签到任务
* `17109` 无法创建签到关联事件




**数据对象引用: ** [*DataSignCreate*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignCreate.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"taskID": 4,
	"signID": 1,
	"beginTime": 1432984013,
	"endTime": 1432986713
  }
}
```