const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:{
		app:'./src/index.js',
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'缓存'
		}),
		new webpack.ProvidePlugin({
			// 这里是告诉webpack，如果遇到至少一处用到lodash变量的模块实例，那就请webpack将lodash包引进来
			// 并将其提供给用到它的模块
			_:'lodash'
		})
	],
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
	output:{
		filename:'[name].[contenthash].js',
		// chunkFilename:'[name].[chunkhash].js',//决定非入口chunk的名称
		path:path.resolve(__dirname,'dist')
	}
}