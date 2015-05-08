# 学生信息获取
基本访问路径`/student`

## /student/info
Desc: 获取当前登录学生的基本信息
Method: Default
Param: `none`

#### 错误状态，错误标记`103`
* `10300` 请求超时，或系统时间异常，请在20秒内完成请求，通过`/server_status/time`查看服务器时间
* `10301` 无法更新新的Token



```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "user": {
            "id": 32,                     //系统ID
            "user_type": "student",
            "name": null,                 //用户真实名称，如果值为空，注意要求绑定信息
            "uid": 201210001,             //学号或者唯一ID
            "email": "xxx@xx.com",        //邮箱地址
            "sex": "男",                  //性别
            "sex_flag": 0,                //性别标记，0男，1女
            "description": "xxxx",        //用户描述信息
            "avatar": "http://xxx/avatar/default.jpg"
        },
        "college": {
            "classID": 1,
            "className": "计科11101",
            "deptID": 1,
            "deptName": "计算机科学与技术系",
            "deptNickName": "计科系",
            "collegeID": 1,
            "collegeName": "计算机科学学院",
            "uniID": 1,
            "uniName": "长江大学",
            "uniNickname": "长江大学"
        }
    }
}
```

## /student/bind_info
Desc: 绑定学生基本信息,用于信息不完全时的补充，描述条件就是姓名为空
Method: POST
Param: 一个数据列表全部不能为空，如下面的结构
```
{
    name: "",  //姓名
    sid: "",   //学号
    sex: "",   //性别，0男，1女
    university: "",   //学校ID
    college: "",      //学院ID
    department: "",   //专业ID
    class: ""         //班级ID
}
```

#### 错误状态，错误标记`105`
* `10500` 当前信息无法进行补充
* `10501` 名称必须为2-5个长度的中文
* `10502` 请填写合法的学号
* `10503` 性别不符规范
* `10504` 当前学号已经存在
* `10505` 传递的班级专业信息不合法
* `10506` 无法绑定用户信息



Return:
```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

## /student/update_info
Desc: 更新学生基本信息
Method: POST
Param:
* user_description(require) 用户描述信息

#### 错误状态，错误标记`106`
* `10600` 无需更新用户描述信息
* `10601` 更新学生信息出错



```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

## /student/my_course
Desc: 获取学生自己的课程表信息，会返回该学期所有的课程，数据量比较大
Method: Default
Param: 
* year(可选) 课程的年份，默认当前年份
* term(可选) 课程的季度（0春季，1秋季），默认当前季度
* detail(可选) 是否显示细节信息，默认不显示，值为`1`时显示

**警告：** year和term参数应该同时使用，同为空或同不为空
**提示：** 在显示细节时，课程对象中的`requirement`,`content`的不为`null`，`location`中的`notice`不为`null`，在使用默认值时这几个字段将置为`null`

#### 错误状态，错误标记`129`
* `12900` 学生只允许查询自己的课表
* `12901` 未查询到当前学生的课程表
* `12902` 不允许查询其他院系的学生课表信息
* `12903` 当前年份学期信息不存在
* `12904` 你当前没有任何课程



```
//注意数据的细节设置
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": [{
		"scheduleID": 1,
		"courseID": 1,
		"courseTableID": 4,
		"courseName": "人工智能",
		"requirement": null,				//需要设置细节才会显示
		"content": null,					//需要设置细节才会显示
		"fromWeek": 1,
		"endWeek": 13,
		"teacherID": 31,
		"teacherName": "发个",
		"location": [{
			"clID": 2,						//上课地点ID
			"courseTableID": 4,
			"location": "545345",
			"week": "1,4,6,7,8,9,10",		//返回的值与之前的有所不同，这里使用`,`逗号连接所有星期为一个字符串，不会使用`1-8`值类的连接形式
			"day": 2,
			"slot": 1,
			"notice": null					//需要设置细节才会显示
		}]
	},{
		"scheduleID": 1,
		"courseID": 1,
		"courseTableID": 5,
		"courseName": "人工智能",
		"requirement": null,
		"content": null,
		"fromWeek": 1,
		"endWeek": 13,
		"teacherID": 1,
		"teacherName": "管理员",
		"location": [{					//上课地点应该是一个数组
			"clID": 3,
			"courseTableID": 5,
			"location": "13-A-5",
			"week": "1,2,4,7,8,9,10,11,12,13",
			"day": 2,
			"slot": 1,
			"notice": null
		},{
			"clID": 4,
			"courseTableID": 5,
			"location": "12-404",
			"week": "5,7,8,9,10,11,12,13",
			"day": 3,
			"slot": 3,
			"notice": null
		}]
	}]
}
```

