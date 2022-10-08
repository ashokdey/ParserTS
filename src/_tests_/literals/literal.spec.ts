import { Parser } from '../../parser/parser';

describe('Testing the Literals', () => {
  describe('Numerical Literal Tests', () => {
    it('Should return a numeric literal', () => {
      const parser = new Parser();
      const ast = parser.parse(`2;`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
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

    it('Should return a string literal', () => {
      const parser = new Parser();
      const ast = parser.parse(`"hello";`);
      const res = JSON.parse(`{
        "type": "Program",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "StringLiteral",
              "value": "hello"
            }
          }
        ]
      }`);
      expect(ast).toMatchObject(res);
    });
  });
});
