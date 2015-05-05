## 用户未登陆过程中的操作
基本访问路径: `/user_action`

### /user_action/login
Desc: 用户登录
Method: POST
Param:

* username(require) 用户名，支持两种类型，邮箱和个人ID，ID可能是学号也可能是字符串类型
* password(require) 用户密码 6-32位长度
* client(require) 客户端类型，可选值: `web`, `android`, `ios`
* pwd_type(可选) 密码加密类型,可选值：`plain`,`md5`, 默认`plain`,区分大小写

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

### /user_action/logout
Desc: 用户退出登录，会清除`token` Cookie
Method: Default
Param: `none`

```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

### /user_action/register
Desc: 用户简单注册，初步用于测试
Method: POST
Param:

* email(require), 用户唯一邮箱
* password(require), 用户密码

```
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

### /user_action/forget_password/send_mail
Desc: 发送密码重置邮件
Session: true
Method: POST
Param:

* email(require) 邮箱地址
* captcha(require) 验证码值
* captcha_id(可选) 验证码的ID，用于区分多个验证码，不提交为默认ID

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

### /user_action/forget_password/check_code
Desc: 检查当前验证码是否正确
Session: true
Method: POST
Param:

* code(require) 验证码

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

### /user_action/forget_password/reset
Desc:  重置密码
Session: true
Method: POST
Param:

* code(password) 新的密码

```
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```
