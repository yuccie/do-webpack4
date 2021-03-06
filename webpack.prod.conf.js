const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(webpackCommonConfig,{
	// devtool:'source-map',
	mode:'production',
	plugins:[
		new UglifyJsPlugin({
			// 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
			// sourceMap:true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('production')
		}),
		// 修复当以地方发生变化，其他的bundle也跟着变化
		new webpack.HashedModuleIdsPlugin()
	],
	optimization:{
		// runtimeChunk:'single',//生成一个运行时的bundle
		// splitChunks是将第三方包处理出去，这里匹配的是node_modules目录下的
		splitChunks:{
			cacheGroups:{
				vendor:{
					test:/[\\/]node_modules[\\/]/,
					name:'vendors',//bundle名
					chunks:'all',
				}
			}
		}
	}
})
