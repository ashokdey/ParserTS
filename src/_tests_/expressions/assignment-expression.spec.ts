import { Parser } from '../../parser/parser';

describe('Testing the Assignment Expressions', () => {
  it('Should return a assignment expression', () => {
    const parser = new Parser();
    const ast = parser.parse(`x = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
              "type": "IDENTIFIER",
              "name": "x"
            },
            "right": {
              "type": "NumericLiteral",
              "value": 42
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return a chained assignment expression', () => {
    const parser = new Parser();
    const ast = parser.parse(`x = y = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
              "type": "IDENTIFIER",
              "name": "x"
            },
            "right": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "IDENTIFIER",
                "name": "y"
              },
              "right": {
                "type": "NumericLiteral",
                "value": 42
              }
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
