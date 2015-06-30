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

#### 错误状态，错误标记`210`
* `21000` 密码不允许使用空值
* `21001` 密码长度必须在6-32位之间
* `21002` 两次密码不能相同
* `21003` 原始密码不正确
* `21004` 更新密码信息失败

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

#### 错误状态，错误标记`214`
* `21400` 请求超时，或系统时间异常，请在20秒内完成请求，通过`/server_status/time`查看服务器时间
* `21401` 无法更新新的Token

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

**提示：** 文件上传表单中header需包含`Content-Type`，值为`multipart/form-data`

#### 错误状态，错误标记`216`
* `21600` 不合法的文件字段名称
* `21601` 必须使用Multipart类型表单上传文件
* `21602` 上传的文件不存在
* `21603` 超过头像最大上传大小或文件为空，请从新选择
* `21604` 无法创建大号头像文件夹
* `21605` 无法创建中号头像文件夹
* `21606` 无法创建小号头像文件夹
* `21607` 图片最小宽度为200x200，不允许小于此值
* `21608` 无法读取当前上传的头像
* `21609` 大号头像不可写
* `21610` 无法存储大号头像
* `21611` 中等头像不可写
* `21612` 无法存储中等头像
* `21613` 小号头像不可写
* `21614` 无法存储小号头像
* `21615` 无法更新服务器头像状态

**数据对象引用：** [*DataUserInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataUserInfo.html)

```js
//此处返回信息和用户基本信息是一致的
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"id": 32,
	"user_type": "student",
	"name": "xxxxx",
	"avatar": "http://go.course.org/avatar/middle/032/32.png?_t=1434530983",
	"avatar_more": {
	  "lager": "http://go.course.org/avatar/large/032/32.png?_t=1434530983",
	  "small": "http://go.course.org/avatar/small/032/32.png?_t=1434530983",
	  "middle": "http://go.course.org/avatar/middle/032/32.png?_t=1434530983"
	},
	"email": "xxx@qq.com",
	"uid": "201410541",
	"sex": "男",
	"sex_flag": 0,
	"description": null
  }
}

```

## /user/upload_avatar_file
Desc: 上传头像，整个文件输入流作为文件输出，无参数

Method: POST

Param: `none`，该方法为将整个图片直接存放在POST对象中

**提示：** 文件上传表单中header需包含`Content-Type`，值为对应的图片类型

#### 错误状态，参考前文标记`216`

**数据对象引用：** [*DataUserInfo*](../javadoc/index.html?com/katoa/gocourse/model/data/DataUserInfo.html)

```js
//此处返回信息和用户基本信息是一致的
{
  "status": true,
  "code": 0,
  "msg": "",
  "data": {
	"id": 32,
	"user_type": "student",
	"name": "xxxxx",
	"avatar": "http://go.course.org/avatar/middle/032/32.png?_t=1434530983",
	"avatar_more": {
	  "lager": "http://go.course.org/avatar/large/032/32.png?_t=1434530983",
	  "small": "http://go.course.org/avatar/small/032/32.png?_t=1434530983",
	  "middle": "http://go.course.org/avatar/middle/032/32.png?_t=1434530983"
	},
	"email": "xxx@qq.com",
	"uid": "201410083",
	"sex": "男",
	"sex_flag": 0,
	"description": null
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

## /user/email/send
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

#### 错误状态，错误标记`211`
* `21100` 未检查到合法的邮件发送参数
* `21101` 当前邮箱已验证，无需再次发送邮件
* `21102` 验证邮件已过期，或数据不存在，请重新发送邮件
* `21103` 邮箱已验证，可忽略此过程
* `21104` 你的验证码不正确，请输入正确的验证码，或者从新发送到邮箱
* `21105` 无法更新邮箱状态，请重试
* `21106` 当前邮箱格式不正确
* `21107` 不允许与当前邮箱相同
* `21108` 该操作不允许修改已验证的邮箱
* `21109` 当前邮箱已存在，请更换新的邮箱地址
* `21110` 无法更新用户邮箱地址
* `21111` 必须为已验证的邮箱才能执行此操作
* `21112` 原邮件地址无法发送邮件
* `21113` 原邮箱的验证码不正确，请确认顺序
* `21114` 新邮箱的验证码不正确，请确认顺序
* `21115` 新的邮箱已被注册，请更换
* `21116` 更新邮箱地址失败，请重试

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

#### 错误状态，参考前文标记`211`

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

#### 错误状态，参考前文标记`211`

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

#### 错误状态，参考前文标记`211`

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

#### 错误状态，参考前文标记`211`

```js
//如果是移动端，不抓取COOKIE记得保存数据
{
	"status": true,
	"code": 0,
	"msg": "",
	"data": "xxxxxxxxxxxxxxx" //返回当前的SESSION ID, 如果该值存在
}
```
