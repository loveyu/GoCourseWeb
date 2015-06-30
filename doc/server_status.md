# 获取服务器状态信息
基本访问路径为:`/server_status`

## /server_status/time
Desc: 获取服务器时间

Method: Default

Param: `none`

**数据对象引用：** [*DataServerTime*](../javadoc/index.html?com/katoa/gocourse/model/data/DataServerTime.html)

```js
{
    "status": true,
    "code": 0,
    "msg": "",
    "data": {
        "millis": 1429619297824,//当前微秒
        "second": 1429619297,   //当前秒
        "utc": "Asia/Shanghai", //当前时区
        "utcOffset": 28800000,  //当前时区偏移毫秒
        "utcNum": 8             //当前时区
    }
}
```