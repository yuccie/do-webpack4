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

抽离了各个环境下的配置后，还需要重定向scripts的配置

### 指定环境
许多library将通过与process.env.NODE_ENV环境变量关联，以决定library中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量

技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

> 注意，任何位于/src的本地代码都可以关联到process.env.NODE_ENV环境变量，意味着src下的文件都可以使用这个环境变量做些判断

## 代码分离
此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：
* 入口起点：使用 entry 配置手动地分离代码。
* 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
* 动态导入：通过模块的内联函数调用来分离代码。

方式1，使用entry来手动分离代码有以下缺点：
* 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
* 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

方式2，使用CommonsChunkPlugin可以将公共的依赖模块提取到已有的入口chunk中，或者提取到一个新生成的chunk中。
CommonsChunkPlugin在webpac4中已经停止使用，可以使用optimization.splitChunks或者optimization.runtimeChunk进行替换
参考链接：https://zhuanlan.zhihu.com/p/33164652

方式3，动态导入
当涉及到动态代码拆分时，webpack提供了两个类似的技术。对于动态导入，第一种，也是最优选择的方式是，使用符合ECMAScript提案的import()语法，第二种，则是使用webpack特定的require.ensure

> import()调用会在内部用到promises，如果在旧有版本浏览器中使用import()，记得使用一个polyfill库（例如es6-promise或promise-polyfill），来shim Promise


## | 懒加载
懒加载或者按需加载，是一种很好的优化网页或应用的方式，这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载


## | 缓存
我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 /dist 目录，然后把打包后的内容放置在此目录中。只要 /dist 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问网站此服务器的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 缓存 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

此指南的重点在于通过必要的配置，以确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。

### | 缓存——输出文件的文件名
通过output.filename进行文件名替换，可以确保浏览器获取到修改后的文件。[hash]替换可以用于在文件命中包含一个构建相关(build-specific)的 hash，但是更好的方式是使用 [chunkhash] 替换，在文件名中包含一个 chunk 相关(chunk-specific)的哈希。

bundle的名称是它内容（通过hash）的映射，如果我们对文件不做修改，然后再次运行构建，我们以为文件可能不变，但如果真的运行，可能会发现情况并非如此（意思是，如果我们不做修改，文件名可能会改也可能不改，这是因为webpack在入口chunk中，包含了某些样板（是webpack运行时的引导代码），特别是runtime和manifest）

### | .gitignore忽略文件
如果项目已经建了，并且文件已经有了，再添加.gitignore之后并不会对已有的文件生效，此时需要用如下命令，如dist:
```
git rm --cached -r  dist/
git commit -m '删除已缓存的追踪'
```

### | 缓存——分离代码
方式一,将运行时的代码独立打包
```
optimization:{
	runtimeChunk:'single'
}
```

方式二,可以在前面的基础上，将第三方包抽离出去，有三个选项，是抽离所有第三方包(all)，还是初次加载的(initial)，还是异步的(async)
```
optimization:{
	runtimeChunk:'single',
	splitChunks:{
		cacheGroups:{
			verdors:{
				test:/[\\/]node_modules[\\/]/,
				name:'vendors',
				chunks:'all'
			}
		}
	}
}
```

方式三，当一个文件发生变化了，所有的其他打出来的bundle都发生变化，可以通过两种方式解决：
* 开发环境：使用NamedModulesPlugin插件
* 生产环境：在插件列表加入：new webpack.HashedModuleIdsPlugin()
这样的话，再修改一个文件，如果不涉及到其他文件，生成的bundle也就不会变化，bundle变化的原因如下：This is because each module.id is incremented based on resolving order by default. Meaning when the order of resolving is changed, the IDs will be changed as well. （这是因为默认情况下，每个module.id都会根据解析顺序递增。 更改解析顺序时的含义，ID也会更改。）



## | shimming
webpack 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 jQuery 中的 $）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 shimming 发挥作用的地方。
```
我们不推荐使用全局的东西！在 webpack 背后的整个概念是让前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、彼此隔离的模块，以及不要依赖于那些隐含的依赖模块（例如，全局变量）。请只在必要的时候才使用本文所述的这些特性。
```
shimming 另外一个使用场景就是，当你希望 polyfill 浏览器功能以支持更多用户时。在这种情况下，你可能只想要将这些 polyfills 提供给到需要修补(patch)的浏览器（也就是实现按需加载）。
