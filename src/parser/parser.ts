import { Tokenizer } from '../tokenizer/tokenizer';

export class Parser {
  private _string = '';
  private tokenizer: Tokenizer;
  private lookahead: any;

  constructor() {
    this.tokenizer = new Tokenizer();
  }

  /** parse() -> a given string into AST */
  parse(s: string) {
    this._string = s;
    this.tokenizer.init(this._string);

    /**
     * guide the tokenizer to obtain the first token,
     * which is our lookahead.
     * The lookahead is used for predictive parsing.
     *
     * Based on lookahead, we will be able to route our parsing
     */
    this.lookahead = this.tokenizer.getNextToken();

    /** parse recursively starting from the main entry point -> the Program */
    return this.Program();
  }

  /** the main entry point for the parser  */
  Program() {
    return {
      type: 'Program',
      body: this.NumericLiteral(),
    };
  }

  /** this should get the numeric literal from the token */
  NumericLiteral() {
    const token: any = this.eat('NUMBER');
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    };
  }

  /**
   * eat is used to consume the current token and
   * advance the tokenizer to the next token
   * */
  eat(tokenType: string) {
    const token = this.lookahead;

    if (token === null) {
      throw new SyntaxError(`Unexpected end of input, expected: ${tokenType}`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: ${token.value}, expected: ${tokenType}`,
      );
    }

    // advance to the next token
    this.lookahead = this.tokenizer.getNextToken();
    return token;
  }
}
