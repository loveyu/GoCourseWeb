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




**数据对象引用：** [*DataSignPrepare*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignPrepare.html)

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




**数据对象引用：** [*DataSignCreate*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignCreate.html)

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

## /sign/teacher_list
Desc: 查询当前创建的教师签到任务列表

Method: Default

Param:
* show_append (可选) 是否查询签到任务中的附加信息,默认不查询,`1`传入时有效

#### 错误状态，错误标记`172`
* `17200` 非教师用户无权限




**数据对象引用：** [*TbSignData*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbSignData.html)

**数据对象引用：** [*DataAppendInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataAppendInfo.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"taskID": 7,
		"courseTableID": 5,
		"count": 0,
		"append": [				//此处为附加的信息，内容可能会增加，如果不请求该数据，值会置null
		  {
			"time": 1434109565,
			"content": "附加信息1"
		  },
		  {
			"time": 1434101467,
			"content": "附加信息2222"
		  }
		],
		"signID": 4,
		"name": "人工智能(管理员)，第14周上课签到，星期五",
		"detail": "",
		"time": 1434098727,
		"expireTime": 1434101427,
		"type": 0,
		"userID": 1,
		"flag": 0
	  },
	  {
		"taskID": 6,
		"courseTableID": 6,
		"count": 0,
		"append": "",
		"signID": 3,
		"name": "科学教育(管理员)，第12周上课签到，星期天",
		"detail": "",
		"time": 1432987311,
		"expireTime": 1432990011,
		"type": 0,
		"userID": 1,
		"flag": 0
	  }
	  //.....更多数据.............
	]
  }
}
```

## /sign/student_new_sign
Desc: 获取学生的新签到任务，即教师发布非新的签到任务

Method: Default

Param: none

#### 错误状态，错误标记`173`
* `17300` 非学生无法查询新签到任务




**数据对象引用：** [*DataSignData*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignData.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"taskID": 9,
		"courseTableID": 5,
		"count": 0,
		"append": [
		  {
			"time": 1456938976,
			"content": "Append 1"
		  },
		  {
			"time": 1456938982,
			"content": "Append 2"
		  }
		],
		"signID": 6,
		"name": "人工智能(管理员)，第14周上课签到，星期六",
		"detail": "",
		"time": 1434170376,
		"expireTime": 1434201876,
		"type": 0,
		"userID": 1,
		"flag": 0
	  }
	  //...more....可能存在多个新的签到列表
	]
  }
}
```

## /sign/teacher_append_info
Desc: 为某一签到任务设置更新附加的信息描述，只能添加

Method: POST

Param:
* sign_id (require) 签到的ID
* info (require) 附加的信息

#### 错误状态，错误标记`174`
* `17400` 非教师用户，无权限
* `17401` 非法签到任务ID
* `17402` 附加信息为空
* `17403` 未找到对应的签到
* `17404` 无法附加新的信息



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /sign/teacher_get/{signID}
Desc: 教师获取某一个签到信息

Method: Default

Param:
* {signID} 使用ID替换该URL，`int`整型

#### 错误状态，错误标记`175`
* `17500` 非教师用户
* `17501` 非法签到ID
* `17502` 未找到签到




**数据对象引用：** [*TbSignData*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbSignData.html)

```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"taskID": 7,
	"courseTableID": 5,
	"count": 0,
	"append": [
	  {
		"time": 1434109565,
		"content": "附加信息1"
	  },
	  {
		"time": 1434101467,
		"content": "附加信息2222"
	  },
	  {
		"time": 1456935849,
		"content": "OK"
	  }
	],
	"signID": 4,
	"name": "人工智能(管理员)，第14周上课签到，星期五",
	"detail": "",
	"time": 1434098727,
	"expireTime": 1434101427,
	"type": 0,
	"userID": 1,
	"flag": 0
  }
}

```

## /sign/student_sign_begin
Desc: 学生开始进行一个签到操作，进行前期准备

Method: POST

Param:
* sign_id (require) 教师创建的签到ID
* key (require) 数据字符串，加密后的数据，参考[签到加密说明--创建请求签名数据](sign_encode.html#CreateSignKey)
* hash (require) 加密数据的HASH值，参考[签到加密说明--创建请求签名Hash](sign_encode.html#CreateSignKeyHash)
* algorithm (可选) 加密算法，默认值为`table`，`table`算法用于测试,后期用于移除，请参考[签到加密说明--秘钥](sign_encode.html#Algorithm)

#### 错误状态，错误标记`176`
* `17600` 非法用户
* `17601` 未知签到ID
* `17602` 签名算法无效
* `17603` 签名验证失败
* `17604` 签名时间偏差大于60秒，检查设备时间，或使用服务器时间
* `17605` 未找到签到任务
* `17606` 签到已超时，无法继续添加
* `17607` 签到事件已添加，无法再次添加
* `17608` 未选该课程，无法进行签到事件
* `17609` 无法创建签到记录



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"signKey": "S1Pe1aneZ2",		//用于签到确认的加密秘钥，需本地保存
	"signLogId": "4"				//创建的签到记录ID
  }
}
```


## /sign/student_sign_finish
Desc: 完成一个学生签到请求，由客户端确认这个签到是成功还是失败

Method: POST

Param:
* sign_id (require) 教师的签到ID
* key (require) 客户端加密后的数据，依据创建签到请求时返回的秘钥,[签到加密说明--创建结束签到请求数据](sign_encode.html#CreateSignFinishKey)
* algorithm (可选) 加密算法，默认`table`，后期会移除

#### 错误状态，错误标记`177`
* `17700` 非学生用户，签到失败
* `17701` 非法签到记录ID
* `17702` 未知签名算法
* `17703` 未找到签到记录
* `17704` 该签到已完成，无需再次处理
* `17705` 该签到已过期
* `17706` 签到服务器数据异常
* `17707` 数据解析失败
* `17708` 数据异常，无法匹配原始请求状态UID
* `17709` 设置的签到状态有误
* `17710` 无法更新签到记录
* `17711` 无法针对签到人数修改
* `17712` 签到处理发生异常



```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": null
}
```

## /sign/student_history
Desc: 学生签到历史记录

Method: Default

Param: 
* status (可选) 签到的状态,默认`全部`，0表示签到准备中,1签到成功,2签到失败,3签到异常，[对应的数据库字段](mysql_table.html#tb_sign_log)
* course (可选) 对应的课程搜索参数，支持ID，名称，拼音，默认`无`
* show_append (可选) 是否显示附加信息,默认不显示，传入字符`1`显示

#### 错误状态，错误标记`178`
* `17800` 非学生用户
* `17801` 非法状态参数




**数据对象引用：** [*TbSignHistory*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbSignHistory.html)

**数据对象引用：** [*DataSignStudentHistory*](../javadoc/index.html?com/katoa/gocourse/model/data/DataSignStudentHistory.html)


```js
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"signLogID": 2,
		"studentID": 32,
		"beginTime": 1434331808,
		"endTime": 0,
		"signID": 10,
		"courseTableID": 5,
		"longitude": 0,
		"latitude": 0,
		"logStatus": 0,
		"taskID": 15,
		"name": "人工智能(管理员)，第15周上课签到，星期一 再次",
		"detail": "",
		"taskTime": 1434299533,
		"expireTime": 1434299933,
		"teacherID": 1,
		"courseID": 1,
		"courseName": "人工智能",
		"count": 0,
		"append": null
	  },
	  {
		"signLogID": 3,
		"studentID": 32,
		"beginTime": 1434344951,
		"endTime": 1434353670,
		"signID": 11,
		"courseTableID": 9,
		"longitude": 0,
		"latitude": 0,
		"logStatus": 2,
		"taskID": 16,
		"name": "国际政治(管理员)，第15周上课签到，星期一",
		"detail": "",
		"taskTime": 1434344913,
		"expireTime": 1434404853,
		"teacherID": 1,
		"courseID": 386,
		"courseName": "国际政治",
		"count": 1,
		"append": [
		  {
			"time": 1458592966,
			"content": "OK"
		  }
		]
	  }
	]
  }
}

```


## /sign/student_get/{signLogID}
Desc: 学生查询自己的一个签到记录信息

Method: Default

Param:
* {signLogID} 替换为签到记录的ID

#### 错误状态，错误标记`179`
* `17900` 非学生
* `17901` 非法参数值
* `17902` 未找到记录




**数据对象引用：** [*TbSignHistory*](../javadoc/index.html?com/katoa/gocourse/model/entity/TbSignHistory.html)

```js
{
  "signLogID": 3,
  "studentID": 32,
  "beginTime": 1434344951,
  "endTime": 1434353670,
  "signID": 11,
  "courseTableID": 9,
  "longitude": 0,
  "latitude": 0,
  "logStatus": 2,
  "taskID": 16,
  "name": "国际政治(管理员)，第15周上课签到，星期一",
  "detail": "国际政治(管理员)，第",
  "taskTime": 1434344913,
  "expireTime": 1434404853,
  "teacherID": 1,
  "courseID": 386,
  "courseName": "国际政治",
  "count": 1,
  "append": [
    {
      "time": 1458592966,
      "content": "OK"
    },
    {
      "time": 1458941284,
      "content": "法国大范甘迪"
    },
    {
      "time": 1458941406,
      "content": "个地方电饭锅电饭锅电饭锅地方"
    }
  ]
}
```