# vue项目架构(移动端UI)

## 环境需求
1. node > 8
2. npm > 5

## 项目启动

> 安装依赖包
```
  npm install
  npm install -g json-server faker
```
> 运行开发环境
```
npm run dev
  1. 加载环境变量
  2. 合并webpack配置文件
  3. 配置热加载
  4. 配置代理服务器
  5. 配置回退支持
  6. 配置静态资源
  7. 加载开发服务器
```
> 热重载服务器：localhost:8080

> dist目录转发服务器: localhost:8081

> 接口模拟服务器: localhost:3000

> 构建测试包
```
npm run build_test
```
> 构建生产包
```
npm run build
```
关于打包如何工作的详细解释, 点击 [这里](http://vuejs-templates.github.io/webpack/) 与 [vue-loader文档](http://vuejs.github.io/vue-loader).
> 构建生产包并查看包分析器报告

```
npm run build --report
```

> 运行单元测试(我没写测试代码)
```
npm run unit
```

> 运行端到端测试(我没写测试代码)
```
npm run e2e
```
> 运行全部测试(我没写测试代码)
```
npm test(我没写测试代码)
```

## 依赖库文档链接

[Vue](https://cn.vuejs.org/v2/api/#vm-mount)
[Vuex](https://vuex.vuejs.org/zh-cn/)
[Vue-router](https://router.vuejs.org/zh-cn/)
[vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
[Vux UI](https://vux.li/#/zh-CN/components)
[Vux demo](https://vux.li/demos/v2/#/demo)
[Icon](http://fontawesome.io/icons/)
[axios](https://github.com/axios/axios)

## 目录结构
```
  src
    |- api                      |- AJAX存放位置【暂定】
        |- ajas.js                  |- AJAX请求模板【准备废弃 转移到action中】
        |- axios.js                 |- AJAX全局拦截器【暂定】
    |- assets                   |- 全局资源目录
        |- images                   |- 图片
        |- less                     |- LESS样式表
        |- css                      |- CSS样式表
        |- fonts                    |- 字体文件
    |- components               |- 公共组件目录
    |- directives               |- 公共指令目录
    |- filters                  |- 公共过滤器
    |- router                   |- 全局路由目录
    |- store                    |- 状态机存放目录(vuex)
        |- modules                  |- 模块拆分
        |- actions                  |- 状态机行为
        |- index.js                 |- 状态机主要输出文件
        |- mutation-types           |- Mutation类型定义文件
    |- view                     |- 视图存放目录
    |- App.vue                  |- 默认程序入口(组件入口)
    |- main.js                  |- 程序运行文件(主文件)
  build                         存放用于编译用的webpack配置与相关的辅助工具代码
    |- build.js                 |- 生产打包运行文件
    |- check-versions.js        |- 检查运行环境版本信息文件
    |- dev-client.js            |- 开发环境热刷新启动文件
    |- dev-server.js            |- 开发服务器入口文件
    |- utils.js                 |- 工具函数存放位置
    |- webpack.base.conf.js     |- 公用的webpack基本配置
    |- webpack.dev.conf.js      |- 开发服务器的webpack配置
    |- webpack.test.conf.js     |- 测试服务器的webpack配置
    |- webpack.prod.conf.js     |- 生产服务器的webpack配置
  config                        存放三大环境配置文件，用于设定环境变量和必要的路径信息
    |- dev.env.js               |- 开发环境配置文件
    |- index.js                 |- 主配置输出文件
    |- prod.env.js              |- 开发环境配置文件
    |- test.env.js              |- 测试环境配置文件
  json                          模拟json数据
    |- index.js                 |- 请求模拟数据输出文件
    |- get                      |- get请求目录
    |- post                     |- post请求目录
    |- delete                   |- delete请求目录
    |- put                      |- put请求目录
  static                        存放项目所需要的其它静态资源文件
  dist                          存放项目打包生成后的文件
  test                          存放E2E测试与单元测试文件以及相关的配置文件
    |- e2e                      |- 端到端测试文件目录
        |- custom-assertions        |- 存放自定义断言
        |- page-objects             |- 页面对象文件夹
        |- reports                  |- 输入报表文件夹
        |- screenshots              |- 自动截屏
        |- specs                    |- 测试文件
        |- nightwatch.conf.js       |- 配置文件
        |- runner.js                |- 运行器
    |- unit                     |- 单元测试文件目录
        |- specs                    |- 测试文件目录
        .eslintrc                   测试语法检测配置
        index.js                    主输出文件
        karma.conf.js               karma测试配置文件
  index.html                    程序主页面
  package.json                  依赖关系配置文件
  README.md                     帮助文档
  .babelrc                      babel配置文件
  .editorconfig                 IDE配置文件
  .eslintignore                 语法检测忽略配置文件
  .eslintrc.js                  语法检测配置文件
  .gitignore                    git忽略文件
  .postcssrc.js                 css编译配置文件

```
##　加载器
1. vue-loader 加载并编译.vue文件
2. vue-style-loader  加载.vue中的样式
3. style-loader   加载.vue中的样式
4. css-loader 加载.css样式表
5. less-loader 加载并编译.less样式
6. babel-loader ES5编译为ES3
7. file-loader 用于直接加载文件
8. url-loader 用于加载URL指定的文件
9. json-loader 用于加载.json文件为JS实例

### karma 测试使用
1. 通過 karma-webpack 啓動 webpack 編譯
2. 通過 karma-phantomjs-lanucher 啓動PhantomJS瀏覽器 並注入到index.html
3. 通過 karma-mocha 啓動 Mocha 并加載 karma-sinon-chai
4. 測試並輸出到終端

### e2e 测试使用
1. PhantomJS  無界面的webKit瀏覽器引擎
2. MochaJS javascript測試框架 使用Chai提供斷言 用來測試nodejs 以及 瀏覽器JS代碼
3. Chai BDD风格的断言库
4. Sinon 模拟接口请求模拟数据返回库
5. Nightwatch
