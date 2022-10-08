import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   if (x) if(y) {} else x = 100;
`);

console.log(JSON.stringify(ast, null, 2));
