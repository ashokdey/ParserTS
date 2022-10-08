import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   if (x > 10) x = 5;
`);

console.log(JSON.stringify(ast, null, 2));
