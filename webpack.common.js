const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:{
		app:'./src/index.js'
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'公共webpack模块'
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
		path:path.resolve(__dirname,'dist')
	}
}