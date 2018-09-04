const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
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
		})
	]
})
