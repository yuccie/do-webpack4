import _ from 'lodash'
console.log('这个模块已经被加载，See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
  console.log(_.join(['Button Clicked','lodash拼接'],' '));
}