import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
   do {
      x -= 1;
   }
   while(x > 10);
`);

console.log(JSON.stringify(ast, null, 2));
