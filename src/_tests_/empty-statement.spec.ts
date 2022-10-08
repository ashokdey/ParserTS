import { Parser } from '../parser/parser';

describe('Testing Empty Statements', () => {
  it('Should return a numeric literal', () => {
    const parser = new Parser();
    const ast = parser.parse(`;`);
    const res = JSON.parse(`{
      "type": "Program",
      "body": [
        {
          "type": "EmptyStatement",
          "body": null
        }
      ]
    }`);
    expect(ast).toMatchObject(res);
  });
});
