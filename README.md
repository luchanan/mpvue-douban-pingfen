# 仿微信小程序-豆瓣评分

## 预览

首页

![image](https://note.youdao.com/favicon.ico)

## 使用

1. 涉及的API的域名有两个

https://m.douban.com/

https://frodo.douban.com/

需要在小程序后台管理添加域名， 具体： 设置->开发设置->服务器域名

2. src/api/json/**.json为备份接口，实际开发使用的是上面的两个地址接口

3. 启动开发编译，编译后会到dist下，小程序开发工具只做预览，且预览路径指向dist

```
npm run dev
```
4. 开发环境真机远程调试取消授权：右上角... => 关于*** => 右上角... => 设置 => 使用我的用户信息

框架： https://github.com/KuangPF/mpvue-weui

