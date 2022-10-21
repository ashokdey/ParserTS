import { Parser } from '../../system/parser';

describe('Testing Variable Declaration', () => {
  it('Should return a single variable declaration', () => {
    const parser = new Parser();
    const ast = parser.parse(`let x;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "VariableStatement",
          "declarations": [
            {
              "type": "VariableDeclaration",
              "id": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "init": null
            }
          ]
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return multiple variable declarations', () => {
    const parser = new Parser();
    const ast = parser.parse(`let x, y;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "VariableStatement",
          "declarations": [
            {
              "type": "VariableDeclaration",
              "id": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "init": null
            },
            {
              "type": "VariableDeclaration",
              "id": {
                "type": "IDENTIFIER",
                "name": "y"
              },
              "init": null
            }
          ]
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return single variable declaration & initialization', () => {
    const parser = new Parser();
    const ast = parser.parse(`let x = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "VariableStatement",
          "declarations": [
            {
              "type": "VariableDeclaration",
              "id": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "init": {
                "type": "NumericLiteral",
                "value": 42
              }
            }
          ]
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return multiple variable declaration & initialization', () => {
    const parser = new Parser();
    const ast = parser.parse(`let x = y = 42;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "VariableStatement",
          "declarations": [
            {
              "type": "VariableDeclaration",
              "id": {
                "type": "IDENTIFIER",
                "name": "x"
              },
              "init": {
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
          ]
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
