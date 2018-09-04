
// 现在不需要静态导入lodash了，而是通过动态导入来分离一个chunk

function getComponent(){
	// 下面注释部分使用webpackChunkName，这样做会导致我们的bundle被命名为lodash.bundle.js
	// 而不是[id].bundle.js
	return import(/* webpackChunkName: "lodash" */ 'lodash').then(
		_ => {
			var element = document.createElement('div')
			element.innetHTML = _.join(['hello','webpack4'],' ')
			return element
		}
	).catch(err => 'An error occurred while loading the component')
}

getComponent().then(component => {
	document.body.appendChild(component)
})
