import { Tokenizer } from '../tokenizer/tokenizer';
import { LiteralType, ProgramType, TokenType } from '../types/enums';
import { ExpressionToken, LiteralToken, Token } from '../types/types';

export class Parser {
  private _string = '';
  private tokenizer: Tokenizer;
  private lookahead: Token;

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
    const node = this.StatementList();
    return {
      type: 'Program',
      body: node,
    };
  }

  StatementList() {
    const statementList = [this.Statement()];
    while (this.lookahead !== null) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  Statement() {
    return this.ExpressionStatement();
  }

  ExpressionStatement(): ExpressionToken {
    const expression = this.Expression();
    this.eat(TokenType.SEMI_COLON);
    return {
      type: ProgramType.ExpressionStatement,
      expression,
    }
  }

  Expression(): LiteralToken {
    return this.Literal();
  }

  Literal(): LiteralToken {
    switch (this.lookahead.type) {
      case TokenType.NUMBER:
        return this.NumericLiteral();
      case TokenType.STRING:
        return this.StringLiteral();
    }
    throw new SyntaxError(`Literal: Unexpected literal found`);
  }

  /** this should get the numeric literal from the token */
  NumericLiteral(): LiteralToken {
    const token = this.eat(TokenType.NUMBER);
    return {
      type: LiteralType.NumericLiteral,
      value: Number(token.value),
    };
  }

  /** this should get the string literal from the token */
  StringLiteral(): LiteralToken {
    const token = this.eat(TokenType.STRING);
    return {
      type: LiteralType.StringLiteral,
      value: String(token.value).slice(1, -1), // strip double quotes around the value
    };
  }

  /**
   * eat is used to consume the current token and
   * advance the tokenizer to the next token
   * */
  eat(tokenType: string): Token {
    const token = this.lookahead;

    if (token === null) {
      throw new SyntaxError(`Unexpected end of input, expected: ${tokenType}`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: ${token.type}, expected: ${tokenType}`,
      );
    }

    // advance to the next token
    this.lookahead = this.tokenizer.getNextToken();
    return token;
  }
}
