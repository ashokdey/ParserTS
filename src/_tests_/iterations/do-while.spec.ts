import { Parser } from '../../parser/parser';

describe('Testing Do-While Statements', () => {
  it('Should return a DoWhileStatement', () => {
    const parser = new Parser();
    const ast = parser.parse(`
      do {
          x -= 1;
      }
      while(x > 10);
    `);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "DoWhileStatement",
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "AssignmentExpression",
                  "operator": "-=",
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
            ]
          },
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
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
