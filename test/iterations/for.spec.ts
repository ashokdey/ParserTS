import { Parser } from '../../src/system/parser';

describe('Testing For Statements', () => {
  it.skip('Should return a ForStatement', () => {
    const parser = new Parser();
    const ast = parser.parse(`;`);
    const res = JSON.parse(``);
    expect(ast).toMatchObject(res);
  });
});
