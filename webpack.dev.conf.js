const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.conf')

module.exports = webpackMerge(webpackCommonConfig,{
	mode:'development',
	devtool:'inline-source-map',
	devServer:{
		contentBase:'./dist'
	}
})