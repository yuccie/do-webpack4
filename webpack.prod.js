const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(webpackCommonConfig,{
	mode:'production',
	plugins:[
		new UglifyJsPlugin()
	]
})
