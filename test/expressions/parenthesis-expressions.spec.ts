import { Parser } from '../../src/system/parser';

describe('Testing the Binary Expressions', () => {
  describe('Parenthesis Expression Tests', () => {
    it('Should return a parenthesis multiplicative expression', () => {
      const parser = new Parser();
      const ast = parser.parse(`(2 + 2) * 2;`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "*",
              "left": {
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
              },
              "right": {
                "type": "NumericLiteral",
                "value": 2
              }
            }
          }
        ]
      }`);
      expect(ast).toMatchObject(res);
    });
  });
});
