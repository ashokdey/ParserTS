import { Parser } from '../../src/system/parser';

describe('Testing the Binary Expressions', () => {
  describe('Multiplication and Chain Multiplication Expression Tests', () => {
    it('Should return a binary multiplicative expression', () => {
      const parser = new Parser();
      const ast = parser.parse(`2 * 2;`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "*",
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
      }`);
      expect(ast).toMatchObject(res);
    });

    it('Should return a binary chain multiplicative and division expression', () => {
      const parser = new Parser();
      const ast = parser.parse(`2 * 4 / 3;`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "/",
              "left": {
                "type": "BinaryExpression",
                "operator": "*",
                "left": {
                  "type": "NumericLiteral",
                  "value": 2
                },
                "right": {
                  "type": "NumericLiteral",
                  "value": 4
                }
              },
              "right": {
                "type": "NumericLiteral",
                "value": 3
              }
            }
          }
        ]
      }`);
      expect(ast).toMatchObject(res);
    });
  });
});
