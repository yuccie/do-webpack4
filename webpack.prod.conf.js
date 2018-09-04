const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(webpackCommonConfig,{
	devtool:'source-map',
	mode:'production',
	plugins:[
		new UglifyJsPlugin({
			// 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
			sourceMap:true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('production')
		}),
		// 将公共的依赖模块提取到指定名字的bundle中
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name:'common'
		// })
	],
	optimization:{
		// runtimeChunk:true//为每一个入口默认添加一个只包含runtime的chunk
		splitChunks:{
			// 当满足以下条件时，webpack会自动打包chunks
			minSize:10000,//超过这个大小就分离，10k
			minChunks:2,//如果当前模块被多出引用或者模块来自node_modules，默认是1，也就是只有一个地方引用
			maxInitialRequests:3,//如果此模块在初始页面加载，并行请求的最大数量小于等于3
			maxAsyncRequests:5,//如果此模块按需加载，并行请求的最大数量小于等于5
		}
	}
})
