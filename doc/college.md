## 获取专业等各种信息
基本访问路径: `college`

### /college/get_universities
Desc: 获取全部学校名称信息
Method: Default
Param: `none`
```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "1": "长江大学",
        "3": "北京师范大学"
    }
}
```
### /college/get_colleges
Desc: 获取某一学校的学院列表，当数据为空时，data字段信息中colleges为空对象，如果uni_id不存在，状态直接变为False
Method: Default
Param: uni_id(require)学校ID
```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"colleges": {
		    "1": "计算机科学学院",
		     //......
		},
		"uni_id": 1
	}
}
```

### /college/get_departments
Desc: 获取学院的专业列表，当数据为空时，data字段信息中colleges为空对象，如果college_id不存在，状态直接变为False
Method: Default
Param: college_id(require)学院ID
```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"departments": {
		    "2": "计算机科学与技术系",
		     //......
		},
		"college_id": 2
	}
}
```

### /college/get_classes
Desc: 获取某一专业的班级列表，当数据为空时，data字段信息中classes为空对象，如果dept_id不存在，状态直接变为False
Method: Default
Param: dept_id(require)专业ID
```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"classes": {
		    "2": "软工11205",
		     //......
		},
		"dept_id": 2
	}
}
```