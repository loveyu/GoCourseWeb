# 课程表的查询与添加
基本路径：`course_table`

## /course_table/add
Desc: 添加一个课程表
Method: POST
Param: *该方法需要提交多个复杂类型的参数* 
* department(require) 专业ID
* year(require) 专业学生的入学年份，即专业年级
* notice(可选) 附加提示信息
* scheduleID(require) 查询到的课程时间表ID
* __classes[]__(require) 专业上课的班级列表，这里是一个数组类型的参数，就是多传入几个值，如：
	* class[]=1001
	* class[]=1002
	* class[]=1003 
	
* location(require) 上课地点，这里是长传一个json格式化的对象，否则数据太复杂，下面给出样例
```
//location 上课地点JSON对象，应对其进行压缩
[
	//对象是一个数组，最少允许一个地点，最多不限制
	{
		"location": "13-A-5",	//上课地点，教室位子
		"slot": 1,				//上课的节次，1-6
		"day": 2,				//上课的星期，1-7分别为星期一到日
		"week": "1,2,4,7-13",	//上课的周次，用英文逗号分隔，连续周可以使用`-`相连
		"notice": "无备注"		//备注信息
	},
	{
		"location": "12-404",
		"slot": 3,
		"day": 3,
		"week": "5,7-13",
		"notice": "无备注"
	}
]
```

#### 错误状态，错误标记`125`
* `12500` 不是教师用户，无法添加课程表
* `12501` 没有指定该课程的班级
* `12502` 专业不能为空
* `12503` 入学年份不能为空
* `12504` 对应的课程必须选择
* `12505` 不存在任何一个可行的上课地点
* `12506` 有课程周次检测失败，请检查
* `12507` 存在重复的课程数据，请检查
* `12508` 教师不属于当前学院，无法添加
* `12509` 班级数据检查不合法
* `12510` 无法插入新的课程信息
* `12511` 新插入课程班级数据失败
* `12512` 插入课程信息地点失败
* `12513` 事务处理发生异常，请稍后再试
* `12514` 有上课时间检测失败
* `12515` 有上课地点检测失败
* `12516` 课程时间存在冲突，请检查星期与上课周次及时间



Return:
```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```
## /course_table/get/{courseTableId}
Desc: 查询某一门课程的信息
Method: Default
Param: *提示：* 此处参数与`search`的有部分重合
* set_class_id (可选) 是否显示班级ID信息，即可选班级的数组ID，默认不显示，参数`1`显示
* set_class_info (可选) 是否显示班级的详细信息，包含名称，默认不显示，参数`1`显示
* set_location (可选) 是否显示上课地点，默认不显示，参数`1`显示
* status (可选) 要搜索的课程状态，默认`-1`为全部，`0`为开课中,`1`为未开课,`2`为已结束

**提示：** `{courseTableId}`指此处需要使用字符替换，如果课程表ID为10请求地址为`/course_table/get/10`

*提示：*如果未找到，会返回一个错误状态

#### 错误状态，错误标记`129`
* `12900` 学生只允许查询自己的课表
* `12901` 未查询到当前学生的课程表
* `12902` 不允许查询其他院系的学生课表信息
* `12903` 当前年份学期信息不存在
* `12904` 你当前没有任何课程




**数据对象引用: ** [*DataCourseTable*](../javadoc/index.html?com/katoa/gocourse/model/data/DataCourseTable.html)

```
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"course": {
	  "scheduleID": 15,
	  "courseTableID": 8,
	  "teacherID": 1,
	  "teacherName": "管理员",
	  "deptID": 1,
	  "deptName": "计算机科学与技术系",
	  "deptNickName": "计科系",
	  "enrolYear": 2011,
	  "courseID": 414,
	  "courseName": "广告学",
	  "openYear": 2015,
	  "openTerm": 0,
	  "fromWeek": 1,
	  "endWeek": 22,
	  "status": 1
	},
	"classes_id": [
	  1,
	  2
	],
	"classes_info": [
	  {
		"classID": 1,
		"className": "计科11101",
		"courseTableID": 8
	  },
	  {
		"classID": 2,
		"className": "计科11102",
		"courseTableID": 8
	  }
	],
	"locations": [
	  {
		"clID": 7,
		"courseTableID": 8,
		"location": "新兴县",
		"week": "1-8",
		"day": 1,
		"slot": 4,
		"notice": ""
	  }
	]
  }
}
```

## /course_table/search
Desc: 课程表搜索
Method: Default
Param:
* search_type (require) 当前搜索的类型，目前可选值：`teacher`,`student`，使用对应的用户权限进行查询
* set_class_id (可选) 是否显示班级ID信息，即可选班级的数组ID，默认不显示，参数`1`显示
* set_class_info (可选) 是否显示班级的详细信息，包含名称，默认不显示，参数`1`显示
* set_location (可选) 是否显示上课地点，默认不显示，参数`1`显示
* status (可选) 要搜索的课程状态，默认`-1`为全部，`0`为开课中,`1`为未开课,`2`为已结束

**警告：** 当没有设置可选参数时数据不会设置字段，比如未设置`set_location`时，`locations`属性值为null，注意检查和判断

#### 错误状态，错误标记`126`
* `12600` 请先登录
* `12601` 请指定搜索类型参数，可选`teacher`,`student`
* `12602` 该搜索必须为教师
* `12603` 该搜索必须为学生
* `12604` 课程表搜索失败，参数检查异常




**数据对象引用: ** [*DataCourseTableSearch*](../javadoc/index.html?com/katoa/gocourse/model/data/DataCourseTableSearch.html)

```
//注意data数组中的对象属性
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"list": [
	  {
		"course": {				//默认会显示的数据
		  "scheduleID": 1,
		  "courseTableID": 4,
		  "teacherID": 31,
		  "teacherName": "发个",
		  "deptID": 1,
		  "deptName": "计算机科学与技术系",
		  "deptNickName": "计科系",
		  "enrolYear": 2011,
		  "courseID": 1,
		  "courseName": "人工智能",
		  "openYear": 2015,
		  "openTerm": 0,
		  "fromWeek": 1,
		  "endWeek": 13,
		  "status": 0
		},
		"locations": [			//上课地点，受到`set_location`的影响
		  {
			"clID": 2,
			"courseTableID": 4,
			"location": "545345",
			"week": "1,4,6-10",		//数据值为分段值，非分隔值
			"day": 2,
			"slot": 1,
			"notice": ""
		  }
		],
		"classes_id": [			//可选课的班级ID数组，受到set_class_id参数的影响
		  1,
		  2
		],
		"classes_info": [			//可选课的班级信息数组，受到set_class_info参数的影响
		  {
			"classID": 1,
			"className": "计科11101",
			"courseTableID": 4
		  },
		  {
			"classID": 2,
			"className": "计科11102",
			"courseTableID": 4
		  }
		]
	  },
	  {
		"course": {
		  "scheduleID": 1,
		  "courseTableID": 5,
		  "teacherID": 1,
		  "teacherName": "管理员",
		  "deptID": 1,
		  "deptName": "计算机科学与技术系",
		  "deptNickName": "计科系",
		  "enrolYear": 2011,
		  "courseID": 1,
		  "courseName": "人工智能",
		  "openYear": 2015,
		  "openTerm": 0,
		  "fromWeek": 1,
		  "endWeek": 13,
		  "status": 0
		},
		"locations": [
		  {
			"clID": 3,
			"courseTableID": 5,
			"location": "13-A-5",
			"week": "1,2,4,7-13",
			"day": 2,
			"slot": 1,
			"notice": "无备注"
		  },
		  {
			"clID": 4,
			"courseTableID": 5,
			"location": "12-404",
			"week": "5,7-13",
			"day": 3,
			"slot": 3,
			"notice": "无备注"
		  }
		],
		"classes_id": [
		  1,
		  2
		],
		"classes_info": [
		  {
			"classID": 1,
			"className": "计科11101",
			"courseTableID": 5
		  },
		  {
			"classID": 2,
			"className": "计科11102",
			"courseTableID": 5
		  }
		]
	  }
	  //..更多数据
	],
	"week": {			//当前的周次
	  "year": 2015,		//当前年份
	  "term": 0,		//季度
	  "week": 10,		//周次
	  "begin_date": "2015-03-09"			//第一周周一开始时间
	}
  }
}
```

## /course_table/student_selected
Desc: 学生依据已有的ID查询当前课程是否已经选了
Method: Default
Param: 
* ids (require) 课程表的ID列表，通过`,`英文逗号进行连接如`1,2,3,4,6`

#### 错误状态，错误标记`127`
* `12700` 仅允许学生自己查询
* `12701` 传递的ID参数长度为0



```
//如传入数据为：ids:'4,5,9,12,13'
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {	//返回对应的ID列表值，MAP类型
		"4": 1,
		"5": 0,		//表示未选
		"9": 1,
		"12": 1,
		"13": 1
	}
}
```

## /course_table/student_select_add
Desc: 学生添加一个选课信息，必须为学生权限
Method: POST
Param:
* id (require) 课程表的ID，为courseTableId的值

#### 错误状态，错误标记`128`
* `12800` 当前用户不是学生
* `12801` 该班级不允许选择此课程
* `12802` 学生已经选了这门课
* `12803` 无法成功添加课程，请检查是否已经添加了该课程



```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```