import _ from 'lodash'
import printMe from './print.js'

function component(){
	var ele = document.createElement('div')
	ele.innerHTML = _.join(['hello','webpack'],' ')

	var btn = document.createElement('button')
	btn.innerHTML = 'click me and check the console!'
	btn.onclick = printMe
	ele.appendChild(btn)

	return ele
}


let element = component()
document.body.appendChild(element)

if(module.hot){
	module.hot.accept('./print.js',function(){
		console.log('Accepting the updated printMe module!');
		document.body.removeChild(element)
		element = component()
		document.body.appendChild(element)
	})
}
