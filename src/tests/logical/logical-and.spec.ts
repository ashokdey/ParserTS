import { Parser } from '../../system/parser';

describe('Testing Logical Operators', () => {
  it('Should return Logical Expression for Logical AND (&&) operator', () => {
    const parser = new Parser();
    const ast = parser.parse(`x > 10 && y < 10;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "LogicalExpression",
            "operator": "&&",
            "left": {
              "type": "BinaryExpression",
              "operator": ">",
              "left": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "right": {
                "type": "NumericLiteral",
                "value": 10
              }
            },
            "right": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "IDENTIFIER",
                "name": "y"
              },
              "right": {
                "type": "NumericLiteral",
                "value": 10
              }
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
