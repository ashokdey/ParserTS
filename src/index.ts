import { Parser } from './parser/parser';

const parser = new Parser();
const ast = parser.parse(`
{
  2 + 2; 
  {
    "nested scope";
  }
}

"hello";
2;
`);

console.log(JSON.stringify(ast, null, 2));
