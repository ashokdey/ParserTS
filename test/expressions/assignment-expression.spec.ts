import { Parser } from '../../src/system/parser';

describe('Testing the Assignment Expressions', () => {
  it('Should return a assignment expression', () => {
    const parser = new Parser();
    const ast = parser.parse(`x = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
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
              "value": 42
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return a chained assignment expression', () => {
    const parser = new Parser();
    const ast = parser.parse(`x = y = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
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
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "IDENTIFIER",
                "name": "y"
              },
              "right": {
                "type": "NumericLiteral",
                "value": 42
              }
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should allow binary expression of identifiers', () => {
    const parser = new Parser();
    const ast = parser.parse(`x + y;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "operator": "+",
            "left": {
              "type": "IDENTIFIER",
              "name": "x"
            },
            "right": {
              "type": "IDENTIFIER",
              "name": "y"
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should have the lowest priority', () => {
    const parser = new Parser();
    const ast = parser.parse(`x = 10 + y;`);
    const res = JSON.parse(`{
      "type": "Program",
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
                "type": "NumericLiteral",
                "value": 10
              },
              "right": {
                "type": "IDENTIFIER",
                "name": "y"
              }
            }
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should throw error for invalid assignment', () => {
    const parser = new Parser();
    expect(() => parser.parse(`42 = 42;`)).toThrowError(
      new SyntaxError(`Invalid left-hand side in assignment expression`),
    );
  });
});
