import { Parser } from '../../src/system/parser';

describe('Testing Unary Operators', () => {
  it('Should return a Unary Expression for NOT(!)', () => {
    const parser = new Parser();
    const ast = parser.parse(`!x;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "UnaryExpression",
            "operator": "!",
            "argument": {
              "type": "IDENTIFIER",
              "name": "x"
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return a nested Unary Expression for (--x)', () => {
    const parser = new Parser();
    const ast = parser.parse(`--x;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "UnaryExpression",
              "operator": "-",
              "argument": {
                "type": "IDENTIFIER",
                "name": "x"
              }
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
