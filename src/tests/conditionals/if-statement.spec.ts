import { Parser } from '../../system/parser';

describe('Testing If-Statements', () => {
  it('Should return the test, consequent and alternate for single if statements', () => {
    const program = `
      if (x) {
          x = 0;
        }
    `;
    const ast = new Parser().parse(program);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "IDENTIFIER",
            "name": "x"
          },
          "consequent": {
            "type": "BlockStatement",
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
                    "value": 0
                  }
                }
              }
            ]
          },
          "alternate": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return the test, consequent and alternate for single if statements without block statements', () => {
    const program = `
      if (x) x = 10;
    `;
    const ast = new Parser().parse(program);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "IDENTIFIER",
            "name": "x"
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
                "value": 10
              }
            }
          },
          "alternate": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return the test, consequent and alternate for multiple if & else statements without block statements', () => {
    const program = `
      if (x) if(y) {} else x = 100;
    `;
    const ast = new Parser().parse(program);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "IDENTIFIER",
            "name": "x"
          },
          "consequent": {
            "type": "IfStatement",
            "test": {
              "type": "IDENTIFIER",
              "name": "y"
            },
            "consequent": {
              "type": "BlockStatement",
              "body": []
            },
            "alternate": {
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
                  "value": 100
                }
              }
            }
          },
          "alternate": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return the test, consequent and alternate for nested if statements', () => {
    const program = `
      if (x) {
          x = 0;
          if (y) {
            y = 30;
          }
        }
    `;
    const ast = new Parser().parse(program);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "IDENTIFIER",
            "name": "x"
          },
          "consequent": {
            "type": "BlockStatement",
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
                    "value": 0
                  }
                }
              },
              {
                "type": "IfStatement",
                "test": {
                  "type": "IDENTIFIER",
                  "name": "y"
                },
                "consequent": {
                  "type": "BlockStatement",
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                          "type": "IDENTIFIER",
                          "name": "y"
                        },
                        "right": {
                          "type": "NumericLiteral",
                          "value": 30
                        }
                      }
                    }
                  ]
                },
                "alternate": null
              }
            ]
          },
          "alternate": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return the test, consequent and alternate for if and else statements', () => {
    const program = `
      if (x) {
        x = 0;
      } else {
        x = x + 1;
      }
    `;
    const ast = new Parser().parse(program);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "IfStatement",
          "test": {
            "type": "IDENTIFIER",
            "name": "x"
          },
          "consequent": {
            "type": "BlockStatement",
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
                    "value": 0
                  }
                }
              }
            ]
          },
          "alternate": {
            "type": "BlockStatement",
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
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "IDENTIFIER",
                      "name": "x"
                    },
                    "right": {
                      "type": "NumericLiteral",
                      "value": 1
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should throw error for invalid syntax', () => {
    const program = `if(x) else x = 10;`;
    expect(() => new Parser().parse(program)).toThrowError();
  });
});
