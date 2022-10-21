import { Parser } from './system/parser';

const parser = new Parser();
const ast = parser.parse(`
      func add(a, b) {
          return a + b;
      }
`);

console.log(JSON.stringify(ast, null, 2));
