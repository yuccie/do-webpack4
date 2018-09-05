const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:{
		polyfills:'./src/polyfills',
		app:'./src/index.js',
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'缓存'
		}),
		new webpack.ProvidePlugin({
			// 这里是告诉webpack，如果遇到至少一处用到lodash变量的模块实例，那就请webpack将lodash包引进来
			// 并将其提供给用到它的模块,还可以具体导出模块中某个具体的属性或函数，如这里lodash的join
			// 这样还可以很好的结合tree shaking配合使用
			join:['lodash','join']
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
		filename:'[name].bundle.js',
		// chunkFilename:'[name].[chunkhash].js',//决定非入口chunk的名称
		path:path.resolve(__dirname,'dist')
	}
}