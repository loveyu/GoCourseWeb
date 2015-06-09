# 教师信息获取
基本访问路径`/teacher`

## /student/info
Desc: 获取当前登录教师的基本信息
Method: Default
Param: `none`

#### 错误状态，错误标记`111`
* `11100` 非教师身份，无法查询相关信息




**数据对象引用: ** [*DataTeacherInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataTeacherInfo.html)

```js
//注意分析事实数据，后期可能会有改动
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
            "collegeID": 1,
            "collegeName": "计算机科学学院",
            "uniID": 1,
            "uniName": "长江大学",
            "uniNickname": "长江大学"
        }
    }
}
```

## /teacher/update_info
Desc: 更新教师基本信息
Method: POST
Param:
* user_description(require) 用户描述信息

#### 错误状态，错误标记`112`
* `11200` 无需更新用户描述信息
* `11201` 更新教师信息出错



```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```