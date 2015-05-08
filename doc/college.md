# 获取专业等各种信息
基本访问路径: `college`

## /college/get_universities
Desc: 获取全部学校名称信息
Method: Default
Param: `none`

#### 错误状态，错误标记`104`
* `10400` 学校ID不合法，必须为正整数
* `10401` 学校ID不存在，请检查合法性
* `10402` 学院ID不合法，必须为正整数
* `10403` 学院ID不存在，请检查合法性
* `10404` 专业ID不合法，必须为正整数
* `10405` 专业ID不存在，请检查合法性



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

## /college/get_colleges
Desc: 获取某一学校的学院列表，当数据为空时，data字段信息中colleges为空对象，如果uni_id不存在，状态直接变为False
Method: Default
Param: uni_id(require)学校ID

#### 错误状态，参考前文标记`104`

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

## /college/get_departments
Desc: 获取学院的专业列表，当数据为空时，data字段信息中colleges为空对象，如果college_id不存在，状态直接变为False
Method: Default
Param: 
* college_id(require)学院ID

#### 错误状态，参考前文标记`104`

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

## /college/get_classes
Desc: 获取某一专业的班级列表，当数据为空时，data字段信息中classes为空对象，如果dept_id不存在，状态直接变为False
Method: Default
Param: 
* dept_id(require)专业ID
* year(可选)班级年份，如果年份为空或0则选择全部

#### 错误状态，参考前文标记`104`

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
		"dept_id": 2,
		"year": 2012
	}
}
```

## /college/get_class_year
Desc: 获取某一专业的班级入学年份列表，当数据为空时，data字段信息中classes为空对象，如果dept_id不存在，状态直接变为False
Method: Default
Param: 
* dept_id(require)专业ID

#### 错误状态，参考前文标记`104`

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"class_year": {
		    2012,
		    2011,
		    2010
		},
		"dept_id": 2
	}
}
```