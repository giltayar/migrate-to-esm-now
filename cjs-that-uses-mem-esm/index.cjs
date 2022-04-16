const mem = require('mem')

let index = 0
const counter = () => ++index;
const memoized = mem(counter);

console.log(memoized('foo'))
//=> 1

console.log(memoized('foo'))
//=> 1
