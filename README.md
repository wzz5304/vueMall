## 这是一个基于vue全家桶+node.js+express+mysql实现的商城网站

项目github地址：[vueMall](https://github.com/wzz5304/vueMall)

查看demo:[地址](http://112.74.167.212:3001/#/)

如果觉得对您有帮助，您可以在右上角给我个star支持一下，谢谢！

### 项目结构
如下图所示：

![项目结构](https://user-gold-cdn.xitu.io/2018/1/17/16102c6c85f4227d?w=418&h=625&f=png&s=25028)

**注**：该项目是真实的请求后台api。server为后端数据接口项目结构，运行时可以单独拿出来放在[wamp](http://www.wampserver.com/en/)/www下或者[xammp](http://rj.baidu.com/soft/detail/12489.html?ald)/htdocs 这两是集成包（apache+php+mysql...）没用过的小伙伴可以百度学习学习很容易的。当然你也可以自己单独配置Mysql环境，这个看个人习惯。**连接Mysql代码在server/conf/conf.js**大家只要将配置信息改成自己的就行。表创建**sql语句在server/malldata.sql**文件内大家可以直接复制插入就ok。我的数据库名是**malldata**，大家不一样的记得改，不懂的用数据库的小伙伴们去百度百度很容易的，基本的增删改查会就够了。

### 项目运行
```
# 克隆到本地：
https://github.com/wzz5304/vueMall.git

# 安装依赖：
vue:
....
cd vueMall(进入项目文件下)
npm install （安装依赖）

express:(进入项目文件下)
cd server
npm install（安装依赖）

# 本地开发，开启服务器，浏览器访问http://localhost:8081,express监听的是3001端口http://localhost:3001（我改了监听端口）
vue:
npm run dev

express:
node bin\www

# 构建生产
npm run build
```
注：第一次使用vue和express的小伙伴记得全局安装下vue-cli和express
- **vue-cli**

  键入命令：npm install -g vue-cli
- **express**
 
  键入命令：cnpm i -g express-generator

不懂的改后台监听端口的可以[打开](https://juejin.im/post/5a5eac7af265da3e4f0a2fba)查看，对你有帮助记得给个爱心哦，谢谢！

小伙伴们右上角狠狠给个Star吧，谢谢~

### 项目说明
- 用到的技术栈

    vue-cli2 + vue2.0 + vue-router + vuex + axios + stylus + scss + node.js + es6 + express + mysql
- 实现功能

```
    - 登录注册
    - 商品详情
    - 购物车管理
    - 地址管理
    - 模拟支付（由于调用不了支付接口）
    - 订单管理
    
```
- 功能说明
```
    - 基于vue2.0
    - 使用vue-cli脚手架搭建项目
    - 使用vue-router实现路由切换
    - 使用vuex进行状态管理
    - 使用axios进行数据请求
    - stylus和scss编写样式
    - 联动滚动借助了vue-infinite-scroll插件和图片懒加载vue-lazyload插件
    - Express编写后台api
    - Mysql实现数据存储
 ```
 ### 学习参考
 - vue2.0官网 [https://vuefe.cn/v2/guide/](https://vuefe.cn/v2/guide/)
 - npm  [https://www.npmjs.com/](https://www.npmjs.com/)
 - ES6 [http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)
 - Sticky footers [https://juejin.im/post/5a52d62a518825734c5b3c37](https://juejin.im/post/5a52d62a518825734c5b3c37)
 - awesome-vue [https://github.com/vuejs/awesome-vue](https://github.com/vuejs/awesome-vue)
 
