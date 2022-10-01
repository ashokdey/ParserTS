import { Parser } from './parser/parser';

const parser = new Parser();
const program = `   
// number

/*
Documentations
*/

42;

"hello world";`;
const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
