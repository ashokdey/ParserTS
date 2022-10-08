import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
  x = 10 + y;
`);

console.log(JSON.stringify(ast, null, 2));
