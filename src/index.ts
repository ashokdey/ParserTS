import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   func blank() {
      return;
   }
`);

console.log(JSON.stringify(ast, null, 2));
