# Lindz's blog

Lindz's blog -- 喜欢的话请点 star，想订阅点 watch

> 关注 Javascript, ES6, React, Redux, Vue, Node, 性能优化等

我的知乎专栏： [敲代码，学编程](https://zhuanlan.zhihu.com/learncoding)

部分源码放在 ```/code``` 目录下，你可以：

```
git clone https://github.com/happylindz/blog.git
cd code/xxxx/
```

#### | React 相关

* [深入理解 React 状态管理](https://github.com/happylindz/react-state-management-tutorial)
* [Redux 异步流最佳实践](https://github.com/happylindz/blog/issues/2)
* [剖析单页面应用路由实现原理](https://github.com/happylindz/blog/issues/4)

#### | 前端工程化

* [前端代码异常监控实战](https://github.com/happylindz/blog/issues/5)
* [深入理解 webpack 文件打包机制](https://github.com/happylindz/blog/issues/6)
* [webpack 持久化缓存实践](https://github.com/happylindz/blog/issues/7)

#### | ES6 

* [你可能不知道的 Promise 对象](https://github.com/happylindz/blog/issues/1)

#### | 前端基础知识

* [跨域，你需要知道的全在这里](https://github.com/happylindz/blog/issues/3)


### | webpack-dev-server
webpack-dev-server为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。
* 需要安装安装webpack-dev-server依赖，同时在webpack.config.js里配置devServer选项，告知webpack-dev-server，在在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
* 设置package.json 

### | webpack-dev-middleware
webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

### | 模块热替换（Hot Moddle Replacement或HMR）
热模块替换允许在运行时更新各种模块，而无需完全刷新。
> 注意，HMR不适用于生产环境
* 启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件。

这个步骤的修改是，当print.js内部发生变更时，告诉webpack接受更新的模块。然后修改print.js就可以在console里看到信息

但上面会有一个问题，就是print.js更新完以后，再次点击button，控制台输出的仍然是之前旧的printMe函数，因此需要修改一下
### | HMR修改样式表

### | tree shaking
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)，其实就是删除多余不用的代码。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

### | 将文件标记为无副作用
在一个纯粹的ESM模块世界中，识别出哪些文件有副作用很简单，然而，我们的项目无法达到这种纯度，所以此时有必要向webpack的compiler提示哪些代码是'纯粹部分'，这样当检测到这些代码没有被引用时，就可以直接删除

* 「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
> 但是配置了之后，不生效，https://www.webpackjs.com/guides/tree-shaking/
其实修改一下构建的模式即可生效，或者使用第三工具，因此为了学会使用 tree shaking，你必须……

* 使用 ES2015 模块语法（即 import 和 export）。
* 在项目 package.json 文件中，添加一个 "sideEffects" 入口。
* 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）

## 生产环境构建
开发环境和生产环境的构建目标差异很大，在开发环境中，我们有具有强大的，具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的source map和localhost server。

而在生产环境中，我们的目标则是转向于关注更小的bundle，更轻量的source map以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的webpack配置。

虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。