## 用户信息相关操作
基本访问路径: `/user`

### /user/info
Desc: 读取登录用户基本信息
Method: Default
Param: `none`
```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "id": 32,
        "user_type": "student",
        "name": "张三",
        "avatar": "http://xxx/avatar/default.jpg"
    }
}
```

### /user/change_password
Desc: 修改密码，修改成功后返回新的Token值
Method: POST
Param:

* old_pwd(require): 原始密码
* new_pwd(require): 新密码

```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "token": "f7e805ea9eb58c022d3a58262ad457a13992baca9b1c821a6bc9e0d6fe4b6325",
        "expire": 1430913472
    }
}
```

### /user/refresh_token
Desc: 刷新当前Token
Method: POST
Param:

* confirm(require): 确认时间戳，与系统时间相差不应超过10秒

```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

### /user/set_token_cookie
DESC: 利用Token返回一个服务器COOKIE设置，cookie名称为`token`
METHOD: Default
Param: `none`

```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```