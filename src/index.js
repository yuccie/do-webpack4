
import { cube } from './math.js'
import './style.css'

function component(){
	var ele = document.createElement('pre')
	ele.innerHTML = `
		hello webpack!
		5 cubed is equal to ${cube(5)}
	`
	return ele
}

document.body.appendChild(component())
