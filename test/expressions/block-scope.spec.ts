import { Parser } from '../../src/system/parser';

describe('Testing block scoped statements', () => {
  it('Should return a block scoped statements', () => {
    const parser = new Parser();
    const ast = parser.parse(`
    // sample block
    {
      2 + 2;
    }

    "hello";
    2;
    `);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                  "type": "NumericLiteral",
                  "value": 2
                },
                "right": {
                  "type": "NumericLiteral",
                  "value": 2
                }
              }
            }
          ]
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "StringLiteral",
            "value": "hello"
          }
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "NumericLiteral",
            "value": 2
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return nested block statements', () => {
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
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "BinaryExpression",
                "operator": "+",
                "left": {
                  "type": "NumericLiteral",
                  "value": 2
                },
                "right": {
                  "type": "NumericLiteral",
                  "value": 2
                }
              }
            },
            {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "StringLiteral",
                    "value": "nested scope"
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "StringLiteral",
            "value": "hello"
          }
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "NumericLiteral",
            "value": 2
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
