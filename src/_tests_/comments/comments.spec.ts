import { Parser } from '../../parser/parser';

describe('Testing Comments', () => {
  it('Should ignore single line comments', () => {
    const parser = new Parser();
    const ast = parser.parse(`
      // ignoring single line comment
      2 + 2;
      `);
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

  it('Should ignore multi line comments', () => {
    const parser = new Parser();
    const ast = parser.parse(`
      /*
      * testing multi line comments
      *
      * */
      2 + 2;
      `);
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
});
