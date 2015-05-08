## 课程表添加
基本路径：`course_table`

### /course_table/add
Desc: 添加一个课程表
Method: POST
Param: 该方法需要提交多个复杂类型的参数 

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

Return:
```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```

### /course_table/search
Desc: 课程表搜索
Method: Default
Param:
* search_type (require) 当前搜索的类型，目前可选值：`teacher`,`student`，使用对应的用户权限进行查询
* set_class_id (可选) 是否显示班级ID信息，即可选班级的数组ID，默认不显示，参数`1`显示
* set_class_info (可选) 是否显示班级的详细信息，包含名称，默认不显示，参数`1`显示
* set_location (可选) 是否显示上课地点，默认不显示，参数`1`显示
* status (可选) 要搜索的课程状态，默认`-1`为全部，`0`为开课中,`1`为未开课,`2`为已结束

**警告：** 当没有设置可选参数时数据不会设置字段，也不会为`null`，比如未设置`set_location`时，对象中根本就没有`locations`属性，注意检查和判断

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": [{
		"course": {						//默认会显示的数据
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
		"locations": [{			//上课地点，受到`set_location`的影响
			"clID": 2,
			"courseTableID": 4,
			"location": "545345",
			"week": "1,4,6-10",	//数据值为分段值，非分隔值
			"day": 2,
			"slot": 1,
			"notice": ""
		}],
		"classes_id": [1,2],		//可选课的班级ID数组，受到set_class_id参数的影响
		"classes_info": [{			//可选课的班级信息数组，受到set_class_info参数的影响
				"classID": 1,
				"className": "计科11101",
				"courseTableID": 4
			},{
				"classID": 2,
				"className": "计科11102",
				"courseTableID": 4
			}]
		},{
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
		"locations": [{
			"clID": 3,
			"courseTableID": 5,
			"location": "13-A-5",
			"week": "1,2,4,7-13",
			"day": 2,
			"slot": 1,
			"notice": "无备注"
		},{
			"clID": 4,
			"courseTableID": 5,
			"location": "12-404",
			"week": "5,7-13",
			"day": 3,
			"slot": 3,
			"notice": "无备注"
		}],
		"classes_id": [1,2],
		"classes_info": [{
				"classID": 1,
				"className": "计科11101",
				"courseTableID": 5
			},{
				"classID": 2,
				"className": "计科11102",
				"courseTableID": 5
		}]
	}
	//..更多数据
	]
}
```

### /course_table/student_selected
Desc: 学生依据已有的ID查询当前课程是否已经选了
Method: Default
Param: 
* ids (require) 课程表的ID列表，通过`,`英文逗号进行连接如`1,2,3,4,6`

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

### /course_table/student_select_add
Desc: 学生添加一个选课信息，必须为学生权限
Method: POST
Param:
* id (require) 课程表的ID，为courseTableId的值

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```