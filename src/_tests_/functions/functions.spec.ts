import { Parser } from '../../parser/parser';

describe('Testing Function Declarations', () => {
  it('Should return a FunctionDeclaration', () => {
    const parser = new Parser();
    const ast = parser.parse(`
       func add(a, b) {
          return a + b;
      }
    `);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "FunctionDeclaration",
          "name": {
            "type": "IDENTIFIER",
            "name": "add"
          },
          "params": [
            {
              "type": "IDENTIFIER",
              "name": "a"
            },
            {
              "type": "IDENTIFIER",
              "name": "b"
            }
          ],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ReturnStatement",
                "argument": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "IDENTIFIER",
                    "name": "a"
                  },
                  "right": {
                    "type": "IDENTIFIER",
                    "name": "b"
                  }
                }
              },
              {
                "type": "EmptyStatement",
                "body": null
              }
            ]
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });

  it('Should return a Empty Function', () => {
    const parser = new Parser();
    const ast = parser.parse(`
      func blank() {
          return;
      }
    `);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "FunctionDeclaration",
          "name": {
            "type": "IDENTIFIER",
            "name": "blank"
          },
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ReturnStatement",
                "argument": null
              },
              {
                "type": "EmptyStatement",
                "body": null
              }
            ]
          }
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
