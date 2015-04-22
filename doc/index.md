# GoCourse API 文档
当前服务器地址为: [http://loveyu.website/gocourse/](http://loveyu.website/gocourse/)，所有API均在该地址基础上拓展

### 数据格式说明
服务器端采用的Json格式数据返回，通用格式如下：
```
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
```
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
1. `/user/*`
2. `/student/*`


## API错误状态代码
[链接: status_code.html](status_code.html)

## API列表导航
1. [获取专业等各种信息, `/college`](college.html)
2. [获取服务器状态信息, `/server_status`](server_status.html)
3. [学生信息获取, `/student`](student.html)
4. [用户信息相关操作, `/user`](user.html)
5. [用户未登陆过程中的操作, `/user_action`](user_action.html)
