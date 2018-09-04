import _ from 'lodash'
import './style.css'
import Img from './images.png'

function component(){
	var ele = document.createElement('div')
	ele.innerHTML = _.join(['hello','webpack'],' ')
	ele.classList.add('hello')

	var myImg = new Image()
	myImg.src = Img

	ele.appendChild(myImg)
	
	return ele

}

document.body.appendChild(component())
