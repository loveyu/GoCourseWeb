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
		"id": 31,                         //用户唯一系统ID
		"user_type": "student",           //用户类型
		"name": "发个",                   //用户真实姓名
		"avatar": "http://xxxxx.com/avatar/middle/031/31.png",  //默认头像
		"avatar_more": {                                        //更多尺寸头像
			"lager": "http://xxxxx.com/avatar/large/031/31.png",
			"small": "http://xxxxx.com/avatar/small/031/",
			"middle": "http://xxxxx.com/avatar/middle/031/31.png"
		},
		"email": "xxxxx@qq.com",    //用户邮箱
		"uid": "121434313",         //用户唯一ID，学号或其他类型
		"sex": "男",
		"sex_flag": 0,
		"description": "gtrhfhd"    //用户个人描述
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
Desc: 利用Token返回一个服务器COOKIE设置，cookie名称为`token`
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

### /user/upload_avatar
Desc: 上传用户头像给当前用户
Method: Post
Param: **上传必须使用HTML文件类型表单**
    * avatar(require) 文件字段名

```
{   //此处返回信息和用户基本信息是一致的
	"status": true,
	"code": 0,
	"msg": "",
	"data": {               //此时，返回新的用户基本信息
		"id": 31,
		"user_type": "student",
		"name": "发个",
		"avatar": "http://xxxxx.com/avatar/middle/031/31.png",
		"avatar_more": {
			"lager": "http://xxxxx.com/avatar/large/031/31.png",
			"small": "http://xxxxx.com/avatar/small/031/",
			"middle": "http://xxxxx.com/avatar/middle/031/31.png"
		},
		"email": "xxxxx@qq.com",
		"uid": "121434313",
		"sex": "男",
		"sex_flag": 0,
		"description": "gtrhfhd"
	}
}
```