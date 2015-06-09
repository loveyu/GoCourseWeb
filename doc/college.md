# 获取专业等各种信息
基本访问路径: `college`

## /college/get_universities
Desc: 获取全部学校名称信息
Method: Default
Param: `none`

#### 错误状态，错误标记`180`
* `18000` 学校ID不合法，必须为正整数
* `18001` 学校ID不存在，请检查合法性
* `18002` 学院ID不合法，必须为正整数
* `18003` 学院ID不存在，请检查合法性
* `18004` 专业ID不合法，必须为正整数
* `18005` 专业ID不存在，请检查合法性



```js
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

#### 错误状态，参考前文标记`180`

```js
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

#### 错误状态，参考前文标记`180`

```js
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

#### 错误状态，参考前文标记`180`

```js
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

#### 错误状态，参考前文标记`180`

```js
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

## /college/get_classes_all
Desc: 获取一个专业的全部信息，包含所有的班级，所有的年级，是对于接口`get_classes` 的另一种数据获取方式
Param: 
* dept_id(require) 专业ID,仅有无年份参数

#### 错误状态，错误标记`181`
* `18100` 非法ID字符串




**数据对象引用: ** [*DataClassAllInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataClassAllInfo.html)

```js
//主要数据为classes字段
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"deptID": 4,
	"class_size": 7,			//该数量为全部班级的数量
	"year_size": 5,				//该数量为年级的数量
	"classes": {
	  "2010": [
		{
		  "id": 8,
		  "name": "计专11001"
		}
	  ],
	  "2011": [
		{
		  "id": 9,
		  "name": "计专11101"
		},
		{
		  "id": 10,
		  "name": "计专11102"
		}
	  ],
	  "2014": [
		{
		  "id": 14,
		  "name": "计专11401"
		}
	  ],
	  "2012": [
		{
		  "id": 11,
		  "name": "计专11201"
		},
		{
		  "id": 12,
		  "name": "计专11202"
		}
	  ],
	  "2013": [
		{
		  "id": 13,
		  "name": "计专11301"
		}
	  ]
	}
  }
}
```