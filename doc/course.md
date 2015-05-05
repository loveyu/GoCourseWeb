## 基础课表名的操作
基本访问路径: `course`

### /course/add
Desc: 添加一个课表名
Method: POST
Param:

* name(require) 课程的名称，唯一名称，如`计算机网络`,`人工智能`

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"id": 14,
		"name": "数值分析"
	}
}
```

### /course/list
Desc: 获取课程名称列表
Method: GET
Param: __分页参数待定__

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"1": "人工智能",
		"12": "计算机网络",
		"13": "组成原理",
		"14": "数值分析"
	}
}
```

### /course/del
Desc: 删除一个课程名称
Method: POST
Param:

* id(require) 课程ID

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": null
}
```
