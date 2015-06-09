# 用户信息相关操作
基本访问路径: `/user`

## /user/info
Desc: 读取登录用户基本信息

Method: Default

Param: `none`


**数据对象引用：** [*DataUserInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataUserInfo.html)

```js
//注意事实分析数据类型，可能会有更新
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"id": 31,                         //用户唯一系统ID
		"user_type": "student",           //用户类型
		"name": "发个",                   //用户真实姓名
		"avatar": "http://xxxxx.com/avatar/middle/031/31.png?_t=1432222999",  //默认头像，可以依据地址来判断头像是否有更新，会添加更新参数
		"avatar_more": {                                        //更多尺寸头像
			"lager": "http://xxxxx.com/avatar/large/031/31.png?_t=1432222999",
			"small": "http://xxxxx.com/avatar/small/031/31.png?_t=1432222999",
			"middle": "http://xxxxx.com/avatar/middle/031/31.png?_t=1432222999"
		},
		"email": "xxxxx@qq.com",    //用户邮箱
		"uid": "121434313",         //用户唯一ID，学号或其他类型
		"sex": "男",
		"sex_flag": 0,
		"description": "gtrhfhd"    //用户个人描述
	}
}
```

## /user/change_password
Desc: 修改密码，修改成功后返回新的Token值

Method: POST

Param:
* old_pwd(require): 原始密码
* new_pwd(require): 新密码

#### 错误状态，错误标记`102`
* `10200` 密码不允许使用空值
* `10201` 密码长度必须在6-32位之间
* `10202` 两次密码不能相同
* `10203` 原始密码不正确
* `10204` 更新密码信息失败




**数据对象引用：** [*DataToken*](../javadoc/index.html?com/katoa/gocourse/model/data/DataToken.html)

```js
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

## /user/refresh_token
Desc: 刷新当前Token

Method: POST

Param:
* confirm(require): 确认时间戳，与系统时间相差不应超过10秒

#### 错误状态，错误标记`103`
* `10300` 请求超时，或系统时间异常，请在20秒内完成请求，通过`/server_status/time`查看服务器时间
* `10301` 无法更新新的Token




**数据对象引用：** [*DataToken*](../javadoc/index.html?com/katoa/gocourse/model/data/DataToken.html)

```js
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

## /user/set_token_cookie
Desc: 利用Token返回一个服务器COOKIE设置，cookie名称为`token`

Method: Default

Param: `none`

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": null
}
```

## /user/upload_avatar
Desc: 上传用户头像给当前用户

Method: Post

Param: **上传必须使用HTML文件类型表单**
* avatar(require) 文件字段名

#### 错误状态，错误标记`107`
* `10700` 不合法的文件字段名称
* `10701` 必须使用Multipart类型表单上传文件
* `10702` 上传的文件不存在
* `10703` 超过头像最大上传大小，请从新选择
* `10704` 无法创建大号头像文件夹
* `10705` 无法创建中号头像文件夹
* `10706` 无法创建小号头像文件夹
* `10707` 图片最小宽度为200x200，不允许小于此值
* `10708` 无法读取当前上传的头像
* `10709` 无法存储大号头像
* `10710` 无法存储中等头像
* `10711` 无法存储小号头像
* `10712` 无法更新服务器头像状态




**数据对象引用：** [*DataUserInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataUserInfo.html)

```js
//此处返回信息和用户基本信息是一致的
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
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

## /user/email/status
Desc: 用户当前邮箱的状态

Method: default

Param: `none`

```js
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": {
		"email": "xxxx",
		"status": 0       //0表示未验证，1表示已验证
	}
}
```

## /email/send
Desc: 邮件的发送操作

Method: POST
SESSION: true

Param: 
* type (require),可选值如下:
```js
{
	"old_send_again"	//从新发送激活邮件，如果账户为激活
	//其他值待定
}
```

#### 错误状态，错误标记`108`
* `10800` 未检查到合法的邮件发送参数
* `10801` 当前邮箱已验证，无需再次发送邮件
* `10802` 验证邮件已过期，或数据不存在，请重新发送邮件
* `10803` 邮箱已验证，可忽略此过程
* `10804` 你的验证码不正确，请输入正确的验证码，或者从新发送到邮箱
* `10805` 无法更新邮箱状态，请重试
* `10806` 当前邮箱格式不正确
* `10807` 不允许与当前邮箱相同
* `10808` 该操作不允许修改已验证的邮箱
* `10809` 当前邮箱已存在，请更换新的邮箱地址
* `10810` 无法更新用户邮箱地址
* `10811` 必须为已验证的邮箱才能执行此操作
* `10812` 原邮件地址无法发送邮件
* `10813` 原邮箱的验证码不正确，请确认顺序
* `10814` 新邮箱的验证码不正确，请确认顺序
* `10815` 新的邮箱已被注册，请更换
* `10816` 更新邮箱地址失败，请重试



Return:
```js
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

## /user/email/bind
Desc: 绑定用户的邮箱

Session:: true

Method: POST

Param:
* captcha (require) 验证码，长度为10位

#### 错误状态，参考前文标记`108`

Return:
```js
//如果是移动端，不抓取COOKIE记得保存数据
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

## /user/email/new
Desc: 在未绑定邮箱的状态下，设置一个新的邮箱

Session:: true

Method: POST

Param: 
* email (require) 用户新的邮箱

#### 错误状态，参考前文标记`108`

```js
//如果是移动端，不抓取COOKIE记得保存数据
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

## /user/email/unbind
Desc: 在已经绑定邮箱的状态下，设置一个新的邮箱，会同时发送邮件到新的邮箱和旧的邮箱

Session:: true

Method: POST

Param: 
* new_email(require) 新的邮箱地址

#### 错误状态，参考前文标记`108`

```js
//如果是移动端，不抓取COOKIE记得保存数据
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```

## /user/email/unbind_confirm
Desc: 在解绑时，将两个两个新的验证码发送到服务器

Session:: true

Method: POST

Param:
* old_captcha(require)旧邮箱的验证码
* new_captcha(require)新邮箱的验证码

#### 错误状态，参考前文标记`108`

```js
//如果是移动端，不抓取COOKIE记得保存数据
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```
