export default function printMe(){
	// 开启inline-source-map后，可以准确定位到具体位置
	// Uncaught ReferenceError: connole is not defined
	//at HTMLButtonElement.printMe (print.js:5)
	console.log('Updating print.js...!')
}