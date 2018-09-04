const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry:{
        app:'./src/index.js',
    },
    // 服务模式也可以在这里设置
    mode:'production',
    // 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。
    devtool:'inline-source-map',

    // 增加webpack-dev-server开发服务器，可以实时重新加载（live reloading）
    // 告诉webpack-dev-server开发服务器在哪里找变化的文件,在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
    devServer:{
        contentBase:'./dist',
        hot:true
    },
    module:{
        rules:[
            {
                sideEffects: false
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
        ]
    },
    plugins:[
        // 虽然output里的名字根据entry的名字动态变化，但index.html里的引入名字还得手动改，因此引入html-webpack-plugin插件，这个插件自动生成index.html文件，并注入响应的各种外链资源
        new HtmlWebpackPlugin({
            title:'output Management 输出管理'
        }),
        // 每次构建都删除dist目录，然后重建
        new CleanWebpackPlugin(['dist']),
        // webpack内置插件，以便更容易查看要修补(patch)的依赖
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output:{
        filename:'[name].boundle.js',
        path:path.resolve(__dirname,'dist'),
        // publicPath也会在服务器脚本用到，以确保文件资源能够在http://localhost:3000下正确访问，
        publicPath:'/'
    },
}