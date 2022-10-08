import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   x + 5  > 10 != false;
`);

console.log(JSON.stringify(ast, null, 2));
