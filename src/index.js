import _ from 'lodash'
import print from './print'

function component(){
	var element = document.createElement('div')
	var btn = document.createElement('button')
	var br = document.createElement('br')

	btn.innerHTML = 'Click me and look at the console!'
	element.innerHTML = _.join(['Hello', 'webpack4'],' ')
	element.appendChild(br)
	element.appendChild(btn)

	// 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，
	// 因为它才是 promise 被处理后返回的实际的 module 对象。
	btn.onclick = print.bind(null)
	return element
}

document.body.appendChild(component())

