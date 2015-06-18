# GoCourse API 文档
当前服务器地址为: [http://loveyu.website/gocourse/](http://loveyu.website/gocourse/)，所有API均在该地址基础上拓展

其他几个地址为:

* [http://loveyu.website:8080/gocourse/](http://loveyu.website:8080/gocourse/) 非反向代理地址
* [http://10.109.0.47/gocourse/](http://10.109.0.47/gocourse/) 校园网内网地址
* [http://10.109.0.47:8080/gocourse/](http://10.109.0.47:8080/gocourse/) 非反向代理地址

如果需要服务端JavaDoc文件请访问: [Javadoc](../javadoc), [Javadoc.zip](../javadoc.zip)

### 请求格式
采用标准的form表单传递，只支持GET和POST两种请求，如果`POST`数据出现乱码请先检查`header`中是否包含`Content-Type`字段，
纯文字使用`application/x-www-form-urlencoded`，文件上传使用`multipart/form-data`，且在大部分情况下请使用前者。

### 数据格式说明
服务器端采用的Json格式数据返回，通用格式如下：

```js
{
    "status": true,   //当前操作状态，true或者fasle，只有当操作成功时才返回true
    "code": 0,        //当前状态码，0为正常状态，其他状态参考状态文档
    "msg": "",        //服务器在异常状态下返回的消息提示，一般为错误提示
    "data": {         //所请求的数据，部分数据请求可能无此数据，返回NULL
        //......
    }
}
```

**警告：** 各种客户端对于json数据解析的差异，请自己处理数据转换的问题，必须保证非字符串在是否有引号的情况下均正确，对象名称也可能无引号，同时必须兼容单引号和双引号

### Token值传递
Token用于用户登录过程中的验证问题，长度为64位，如果涉及到用户登录的操作如果无权限会返回如下数据：

```js
{
    "status": false,
    "code": -2,
    "msg": "当前未登录，请登录",
    "data": null
}
```

可以使用下面三种方式验证：优先级由高到低，仅匹配一个

1. 使用Header传递一个名称为`token`值即可验证
2. 使用Cookie传递一个名称为`token`的值
3. 使用GET或POST参数传递名称为`__token`的值

目前需要验证权限的API列表：

1. /user/\*
2. /user/\*/\*
3. /student/\*
4. /teacher/\*
5. /course/\*
6. /schedule/\*
7. /course_table/\*
7. /course_table/\*/\*
8. /quiz_teacher/\*
9. /quiz_student/\*
10. /sign/\*
11. /sign/\*/\*
12. /task/\*
13. /review/\*

### Session ID的传递
Session ID 必须使用Cookie进行传递，且默认名称为`JSESSIONID`，该默认值可能会修改，最好的查询方式为检测服务器返回的COOKIE进行判断

部分页面会需要提供SESSION值，文档中会用Session字段提示

### 数据分页说明
**提示：** 目前服务端未实现分页的接口，如果数据量较大请自行先预留分页的操作，接口会在data字段中添加相应的属性。

## 数据库字段及描述
[链接: mysql_table.html](mysql_table.html)

## API错误状态代码
[链接: status_code.html](status_code.html)

## API列表导航
1. [获取专业等各种信息](college.html), `/college/`
2. [基础课表名的操作](course.html), `/course/`
3. [课程表的查询与添加](course_table.html), `/course_table/`
4. [学生的测验与管理](quiz_student.html), `/quiz_student/`
5. [教师的测验管理](quiz_teacher.html), `/quiz_teacher/`
6. [课程评价操作](review.html), `/review/`
7. [课程安排的时间](schedule.html), `/schedule/`
8. [获取服务器状态信息](server_status.html), `/server_status/`
9. [签到管理](sign.html), `/sign/`
10. [签到加密说明](sign_encode.html), `/sign_encode/`
11. [学生信息获取](student.html), `/student/`
12. [任务管理](task.html), `/task/`
13. [教师信息获取](teacher.html), `/teacher/`
14. [通用型的工具](tools.html), `/tools/`
15. [用户信息相关操作](user.html), `/user/`
16. [用户未登陆过程中的操作](user_action.html), `/user_action/`
