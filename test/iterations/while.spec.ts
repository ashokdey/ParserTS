import { Parser } from '../../src/system/parser';

describe('Testing While Statements', () => {
  it('Should return a WhileStatement', () => {
    const parser = new Parser();
    const ast = parser.parse(`
       while(x > 10) {
            x -= 1;
       }
    `);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "WhileStatement",
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
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
