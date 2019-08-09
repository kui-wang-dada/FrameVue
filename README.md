# wholerenweb

dada 的 vue 脚手架

### 项目依赖

核心库: Vue 全家桶 vue + vue-router + vuex
组件库: vant
主要工具库: vue-i18n(多语言) + better-scroll(滚动插件)

## 项目结构

```javascript
-api: 接口配置文件
-assets: 静态资源
-components: 业务代码
    -common: 公共业务通用组件
    -ui: 公共UI组件
    -pages: 业务组件
        // 注意：以下组件中，一级目录下的.vue文件，是页面，
        // components中的.vue是局部页面组件
        // item中的.vue是局部板块组件
        -customer: 用户板块
            -home: 首页
            -message: 沟通（暂时没做）
            -my: 我的
            -news: 新闻
            -service: 服务
        -login: 登录板块
        -manager: 管理者板块（暂时没做）
        -servant: 服务者板块（暂时没做）
-config: 全局拦截配置，包括接口基本配置拦截，路由拦截
-plugins: 三方配置，包括封装接口操作和eventbus
-router: 路由文件,完全同步于业务组件板块划分
-store: vuex全局操作，利用modules划分板块
-utils: 全局方法，过滤器，指令，cordova插件相关
    -method: 公共方法，挂载到vue原型上，页面通过 this.$utils调用
        -common: 普通方法
        -cordovaAbout: cordova相关方法
    -constant: 常量
    -directive: 指令
    -filter: 过滤器
    -index: 公共方法集合处理
    -regex: 正则验证
-device.js: 初始化判断设备
-vueInit.js: vue相关的初始化
```

## webpack 的配置: build/config

关于 webpack 的配置，主要查看 webpack.base.conf.js，定义了模块解析，loaders 的加载和配置
关于 项目 具体配置，主要查看 config/index.js，定义了入口，导出和相应配置
