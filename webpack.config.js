const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    plugins:[
        // 虽然output里的名字根据entry的名字动态变化，但index.html里的引入名字还得手动改，因此引入html-webpack-plugin插件，这个插件自动生成index.html文件，并注入响应的各种外链资源
        new HtmlWebpackPlugin({
            title:'output Management 输出管理'
        }),
        // 每次构建都删除dist目录，然后重建
        new CleanWebpackPlugin(['dist'])
    ],
    output:{
        filename:'[name].boundle.js',
        path:path.resolve(__dirname,'dist')
    },
}