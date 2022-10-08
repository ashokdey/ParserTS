import { Parser } from '../../parser/parser';

describe('Testing the Binary Expressions', () => {
  describe('Addition and Chain Addition Expression Tests', () => {
    it('Should return a binary addition expression', () => {
      const parser = new Parser();
      const ast = parser.parse(`2 + 2;`);
      const res = JSON.parse(`{
        "type": "Program",
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
      }`);
      expect(ast).toMatchObject(res);
    });

    it('Should return a binary chain addition and subtraction expression', () => {
      const parser = new Parser();
      const ast = parser.parse(`2 + 4 - 1;`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "operator": "-",
              "left": {
                "type": "BinaryExpression",
                "operator": "+",
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
                "value": 1
              }
            }
          }
        ]
      }`);
      expect(ast).toMatchObject(res);
    });
  });
});