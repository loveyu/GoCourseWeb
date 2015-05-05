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
		"week": "1,2,4,7-13",	//上课的周次，用英文逗号分隔，连续周可以使用`-`相连
		"notice": "无备注"		//备注信息
	},
	{
		"location": "12-404",
		"slot": "3",
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