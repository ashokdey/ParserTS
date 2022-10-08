import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
  x = y = 42;
`);

console.log(JSON.stringify(ast, null, 2));
