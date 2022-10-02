import { Parser } from './parser/parser';

const parser = new Parser();
// const myProgram = `   
// // number

// /*
// Documentations
// */

// 42;

// {
//   45;
//   "new scope";
// }

// {
//   // empty block
//   {
//     ;
//   }
// }

// "hello world";`;
// const ast = parser.parse(myProgram);

const ast = parser.parse(`
 42;
`);

console.log(JSON.stringify(ast, null, 2));
