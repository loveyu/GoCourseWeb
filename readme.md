## GoCourse Web端项目

* 通过下列方式来生成静态文件

```
php make.php

//如果需要使用cdn加速资源文件使用下面命令
php make.php cdn
```

* 然后将asset目录文件复制到html_out目录，对应的即可用的静态目录

* 在线演示 : [http://loveyu.website/](http://loveyu.website/)

## Apache 反向代理设置

首先在http.conf 中开启以下几个模块
```
LoadModule expires_module modules/mod_expires.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

在主机虚拟机的配置中，添加以下内容，使用loveyu.website的域名指使用在线的服务器
```
ProxyPreserveHost On
ProxyRequests Off
ProxyPass /gocourse/ http://loveyu.website:8080/gocourse/
ProxyPassReverse /gocourse/ http://loveyu.website:8080/gocourse/
```