import print from './print'
// 这里没有将import变量绑定变量，这是因为只需在基础代码之外，再额外执行polyfills
// 这样我们就可以假定代码中具有某些原生功能
// 但是，不推荐这种在主bundle中引入polyfills，因为这不利于具有这些模块功能的现代浏览器用户，
// 会使得他们下载体积很大，但却不需要的脚本文件
import 'babel-polyfill'

function component(){
	var element = document.createElement('div')
	var btn = document.createElement('button')
	var br = document.createElement('br')

	btn.innerHTML = 'Click me and look at the console!'
	element.innerHTML = join(['Hello', 'webpack4'],' ')
	element.appendChild(br)
	element.appendChild(btn)

	// 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，
	// 因为它才是 promise 被处理后返回的实际的 module 对象。
	btn.onclick = print.bind(null)
	return element
}

document.body.appendChild(component())

