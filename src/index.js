import _ from 'lodash'
import moment from 'moment'
import test from './test'
test()
console.log('构建于',moment().format('MMMM Do YYYY, h:mm:ss a'))
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
	btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
		var print = module.default
		print()
	})
	return element
}

document.body.appendChild(component())


// // 现在不需要静态导入lodash了，而是通过动态导入来分离一个chunk

// function getComponent(){
// 	// 下面注释部分使用webpackChunkName，这样做会导致我们的bundle被命名为lodash.bundle.js
// 	// 而不是[id].bundle.js
// 	// 由于import()会返回一个promise，因此它还可以和async一起使用
// 	return import(/* webpackChunkName: "lodash" */ 'lodash').then(
// 		_ => {
// 			var element = document.createElement('div')
// 			element.innetHTML = _.join(['hello','webpack4'],' ')
// 			return element
// 		}
// 	).catch(err => 'An error occurred while loading the component')
// }

// getComponent().then(component => {
// 	document.body.appendChild(component)
// })
