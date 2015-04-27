## 通用星的工具
基本访问路径: `/tools`

### /tools/captcha
Desc: 获取一个验证码
Method: Default
Session: true
Param:
* id(可选) 用于设置当前验证码的ID，范围为0-9，可以在一个页面设置多个验证码，默认为0

Return: 返回为二进制的图像流