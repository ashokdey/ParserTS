import { Parser } from '../../src/system/parser';

describe('Testing Relational Operators', () => {
  it('Should return a relational expression with accurate precedence', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + 5 > 10;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": ">",
            "left": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "right": {
                "type": "NumericLiteral",
                "value": 5
              }
            },
            "right": {
              "type": "NumericLiteral",
              "value": 10
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return a if statement with relational operators', () => {
    const parser = new Parser();
    const ast = parser.parse(`if (x > 10) x = 5;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
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
          "consequent": {
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
                "value": 5
              }
            }
          },
          "alternate": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
