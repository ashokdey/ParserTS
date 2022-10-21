import { Parser } from '../../src/system/parser';

describe('Testing Equality Operators', () => {
  it('Should return Boolean Literal on equality with `true`', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + 5  > 10 == true;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "==",
            "left": {
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
            },
            "right": {
              "type": "BooleanLiteral",
              "value": true
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return Boolean Literal on equality with `false`', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + 5  < 10 == false;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "==",
            "left": {
              "type": "BinaryExpression",
              "operator": "<",
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
            },
            "right": {
              "type": "BooleanLiteral",
              "value": false
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return Boolean Literal on equality with `false`', () => {
    const parser = new Parser();
    const ast = parser.parse(`x - 5  < 10 == false;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "==",
            "left": {
              "type": "BinaryExpression",
              "operator": "<",
              "left": {
                "type": "BinaryExpression",
                "operator": "-",
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
            },
            "right": {
              "type": "BooleanLiteral",
              "value": false
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return Boolean Literal on not equality with `false`', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + 5  > 10 != false;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "!=",
            "left": {
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
            },
            "right": {
              "type": "BooleanLiteral",
              "value": false
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return Boolean Literal on not equality with `null`', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + 5  > 10 != null;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "!=",
            "left": {
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
            },
            "right": {
              "type": "NullLiteral",
              "value": null
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
