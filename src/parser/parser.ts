import { AST, ASTNode } from '../ast/factory';
import { Tokenizer } from '../tokenizer/tokenizer';
import { ASTType, TokenType } from '../types/enums';
import {
  ExpressionNode,
  LiteralNode,
  StatementNode,
  StatementToken,
  Token,
} from '../types/types';

export class Parser {
  private _string = '';
  private tokenizer: Tokenizer;
  private lookahead: Token;
  private factory: ASTNode;

  constructor() {
    this.tokenizer = new Tokenizer();
    this.factory = new AST(ASTType.Default).getFactory();
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
    return this.factory.Program(this.StatementList());
  }

  StatementList(stopLookahead: TokenType = null): StatementToken[] | any[] {
    const statementList = [this.Statement()];
    while (this.lookahead !== null && this.lookahead.type !== stopLookahead) {
      statementList.push(this.Statement());
    }
    return statementList;
  }

  /** Statement can be:
   * ; expression statement
   * {} block statement
   * ; empty statement
   */
  Statement(): StatementNode {
    switch (this.lookahead.type) {
      case TokenType.SEMI_COLON:
        return this.EmptyStatement();
      case TokenType.BLOCK_START:
        return this.BlockStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /** empty statement can be a single ; */
  EmptyStatement(): StatementNode {
    this.eat(TokenType.SEMI_COLON);
    return this.factory.EmptyStatement();
  }

  /**
   * block statements can be:
   * { 42; } or {} or { {} "hello" }
   *
   * It can also be nested blocks
   * {
   *   {}
   * }
   */
  BlockStatement(): StatementNode {
    this.eat(TokenType.BLOCK_START);
    /** when a block starts, keep getting lookahead until the block ends */
    const body =
      this.lookahead.type !== TokenType.BLOCK_END
        ? this.StatementList(TokenType.BLOCK_END)
        : []; // return empty list
    this.eat(TokenType.BLOCK_END);
    return this.factory.BlockStatement(body);
  }

  /** anything that's ending with a ; like 42; or "hello"; */
  ExpressionStatement(): ExpressionNode {
    const expression = this.Expression();
    this.eat(TokenType.SEMI_COLON);
    return this.factory.ExpressionStatement(expression);
  }

  Expression(): LiteralNode {
    return this.Literal();
  }

  /** Literal returns either a numeric literal or a string literal */
  Literal(): LiteralNode {
    switch (this.lookahead.type) {
      case TokenType.NUMBER:
        return this.NumericLiteral();
      case TokenType.STRING:
        return this.StringLiteral();
    }
    throw new SyntaxError(`Literal: Unexpected literal found`);
  }

  /** this should get the numeric literal from the token */
  NumericLiteral(): LiteralNode {
    const token = this.eat(TokenType.NUMBER);
    return this.factory.NumericLiteral(Number(token.value));
  }

  /** this should get the string literal node from the string token */
  StringLiteral(): LiteralNode {
    const token = this.eat(TokenType.STRING);
    const value = String(token.value).slice(1, -1); // strip double quotes around the value
    return this.factory.StringLiteral(value);
  }

  /**
   * eat is used to consume the current token and
   * advance the tokenizer to the next token
   * */
  private eat(tokenType: string): Token {
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
