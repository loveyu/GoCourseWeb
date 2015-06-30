# 课程评价操作
基本访问路径: `/review`

## /review/add
Desc: 添加一个课程评价

Method: POST

Param:
* rating (require) 评价评分，1-5之间0.5的倍数，如`1`,`1.5`,`2.5`,`4.5`,`5`等
* content (require) 评价内容
* course_table_id (require) 要评价的课程ID

#### 错误状态，错误标记`230`
* `23000` 非学生不允许评价
* `23001` 非法课程ID
* `23002` 评分不正确,仅允许[1,5]之间的0.5倍分数
* `23003` 评价内容不能为空
* `23004` 未选课，无法评价
* `23005` 评价被关闭
* `23006` 无法添加评价
* `23007` 无法更新课程表的信息
* `23008` 数据更新异常

**数据对象引用：** [*TbReview*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbReview.html)

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "reviewID": 7,
        "courseTableID": 5,
        "userID": 32,
        "content": "还不错哦",
        "rating": 1.5,
        "time": 1434642762,
        "upNum": 0,
        "downNum": 0
    }
}
```

## /review/like
Desc: 对课程评价进行顶和踩，每个只允许顶或踩一次，对于用户无限制

Method: POST

Param:
* review_id (require) 课程评价的ID
* type (require) 顶或踩 对应标记位 `up` OR `down`

#### 错误状态，错误标记`231`
* `23100` 未知评价ID
* `23101` 类型不明确，up or down
* `23102` 未知的评价
* `23103` 已经提交过一次了
* `23104` 无法添加
* `23105` 无法更新评价附加信息
* `23106` 更新异常，请稍后再试

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

## /review/reply
Desc: 教师对课程评价进行回复，针对单个评价，针对自己的课程评价

Method: POST

Param:
* review_id (require) 对应的评价ID
* content (require) 回复的内容

#### 错误状态，错误标记`232`
* `23200` 非教师用户
* `23201` 回复不允许为空
* `23202` 回复对应的评价ID为空
* `23203` 无权限回复
* `23204` 回复异常，请重试

**数据对象引用：** [*TbReviewReply*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbReviewReply.html)

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "reviewReplyID": 2,
        "reviewID": 7,
        "userID": 1,
        "content": "回复很诚恳，指的表扬",
        "time": 1434643156
    }
}
```

## /review/list
Desc: 依据某一课程获取评论的列表

Method: Default

Param:
* course_table_id (require) 课程表ID，必须指定对应的课程表ID
* show_reply (可选) 是否显示老师对应的回复，默认不显示，值为`1`时显示
* self (可选) 是否只显示自己的评价信息，默认全部，值为`1`时只显示自己。该参数只对学生有效，如果老师使用该参数会返回错误

**权限说明:** 学生只允许查询自己选课了的课程的全部评价，老师可以查看任何课程的评价，但只允许回复自己的课程评价

#### 错误状态，错误标记`233`
* `23300` 非法ID参数
* `23301` 你没有权限查看该课程的评价信息
* `23302` 教师无法查看自己的评价列表
* `23303` 课程未找到

**数据对象引用：** [*DataReviewList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataReviewList.html)

**注意:** `allowComment` 不能用作判断用户是否已经评价过的标记，只表示一个权限的问题

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"allowComment": true,			//是否允许学生评论
	"allowReply": false,			//是否允许教师进行回复
	"list": [
	  {
		"review": {
		  "reviewID": 7,
		  "courseTableID": 5,
		  "userID": 32,
		  "content": "还不错哦",
		  "rating": 1.5,
		  "time": 1434642762,
		  "upNum": 0,			//顶的人数
		  "downNum": 1			//踩的人数
		},
		"replies": [			//教师的回复列表
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  },
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  }
		]
	  },
	  {
		"review": {
		  "reviewID": 8,
		  "courseTableID": 5,
		  "userID": 32,
		  "content": "还不错哦",
		  "rating": 1.5,
		  "time": 1434642762,
		  "upNum": 0,
		  "downNum": 1
		},
		"replies": [
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  }
		]
	  }
	]
  }
}
```

## /review/student_list
Desc: 获取学生自己的全部评价列表，数据和`list`类似，这里会强制查询学生自己的，但课程参数可选

Method: Default

Param:
* course_table_id (可选) 课程ID是可选的，如果不提交或值无效则查询全部的课程的评价
* show_reply (可选) 是否显示老师对应的回复，默认不显示，值为`1`时显示

#### 错误状态，错误标记`234`
* `23400` 非学生用户

**数据对象引用：** [*DataReviewList*](../javadoc/index.html?com/katoa/gocourse/model/data/DataReviewList.html)

**注意:** 在`allowComment`和`allowReply`两字段是无效的，不能用作判断，因为查询条件不一样

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"allowComment": null,			//学生自己查询时，此字段为NULL,即无效
	"allowReply": null,			//学生自己查询时，此字段为NULL,即无效
	"list": [
	  {
		"review": {
		  "reviewID": 7,
		  "courseTableID": 5,
		  "userID": 32,
		  "content": "还不错哦",
		  "rating": 1.5,
		  "time": 1434642762,
		  "upNum": 0,			//顶的人数
		  "downNum": 1			//踩的人数
		},
		"replies": [			//教师的回复列表
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  },
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  }
		]
	  },
	  {
		"review": {
		  "reviewID": 8,
		  "courseTableID": 5,
		  "userID": 32,
		  "content": "还不错哦",
		  "rating": 1.5,
		  "time": 1434642762,
		  "upNum": 0,
		  "downNum": 1
		},
		"replies": [
		  {
			"reviewReplyID": 2,
			"reviewID": 7,
			"userID": 1,
			"content": "回复很诚恳，指的表扬",
			"time": 1434643156
		  }
		]
	  }
	]
  }
}
```

## /review/teacher_list
Desc: 获取教师的回复列表，数据中相对`TbReviewReply`包含了一些附加数据

Method: Default

Param: `none` 此时无参数

#### 错误状态，错误标记`235`
* `23500` 非教师用户

**数据对象引用：** [*TbReviewReplyMore*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbReviewReplyMore.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": [
	{
	  "reviewReplyID": 1,
	  "reviewID": 7,
	  "userID": 1,
	  "content": "回复很诚恳，指xxx的表扬",
	  "time": 1434643156,
	  //------以下数据为附加数据,上部分的数据与TbReviewReply一致-------
	  "courseTableID": 5,
	  "courseName": "人工智能",
	  "courseID": 1,
	  "studentReview": "还不错哦",
	  "studentName": "xxx",
	  "studentID": "32"
	},
	{
	  "reviewReplyID": 2,
	  "reviewID": 7,
	  "userID": 1,
	  "content": "回复很诚恳，指的表扬",
	  "time": 1434643156,
	  "courseTableID": 5,
	  "courseName": "人工智能",
	  "courseID": 1,
	  "studentReview": "还不错哦",
	  "studentName": "xxx",
	  "studentID": "32"
	}
	//......more......
  ]
}
```

## /review/check_already_review
Desc: 检测学生是否已经评价，该检测不会对是否选课进行检测，不能依旧此接口判断是否允许评价

Method: POST

Param: 
* course_table_id (require) 课程ID

#### 错误状态，错误标记`236`
* `23600` 非学生用户
* `23601` 未知课程

**返回提示：** 成功检测会在`status`返回`true`,而已经选课会再`data`字段返回`true`，未选则为`false`

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": true			//True表示已经选课。false表示未选课
}
```