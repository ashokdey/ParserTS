import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   --x;
`);

console.log(JSON.stringify(ast, null, 2));
