import { AST } from '../ast/Factory';
import { Tokenizer } from '../tokenizer/tokenizer';
import { ASTType, ExpressionType, TokenType } from '../types/enums';
import {
  ASTNode,
  ExpressionNode,
  IdentifierNode,
  LiteralNode,
  StatementNode,
  Token,
  VariableDeclaration,
} from '../types/types';

export class Parser {
  private _string = '';
  private tokenizer: Tokenizer;
  private lookahead: Token;
  private factory: ASTNode;

  /** initialize with the tokenizer and the AST factory */
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

  StatementList(stopLookahead: TokenType = null): ExpressionNode[] {
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
   * VariableStatement
   * IfStatement
   */
  Statement(): StatementNode | ExpressionNode {
    switch (this.lookahead.type) {
      case TokenType.SEMI_COLON:
        return this.EmptyStatement();
      case TokenType.IF:
        return this.IfStatement();
      case TokenType.BLOCK_START:
        return this.BlockStatement();
      case TokenType.LET:
        return this.VariableStatement();
      default:
        return this.ExpressionStatement();
    }
  }

  /**
   * IfStatement
   * : if '(' Expression ')' Statement
   * | if '(' Expression ')' Statement 'else' Statement
   *
   */
  IfStatement(): StatementNode {
    this.eat(TokenType.IF);
    this.eat(TokenType.OPEN_PARENTHESIS);
    const test = this.Expression();
    this.eat(TokenType.CLOSE_PARENTHESIS);

    const consequent = this.Statement();
    const alternate =
      this.lookahead !== null && this.lookahead.type === TokenType.ELSE
        ? this.eat(TokenType.ELSE) && this.Statement()
        : null;

    return this.factory.IfStatement(test, consequent, alternate);
  }

  /**
   * Variable statement should start with `let`
   * followed by multiple variable declarations
   * let VariableDeclarationList ;
   */
  VariableStatement(): StatementNode {
    this.eat(TokenType.LET);
    const declarations = this.VariableDeclarationList();
    this.eat(TokenType.SEMI_COLON);
    return this.factory.VariableStatement(declarations);
  }

  /**
   * ; VariableDeclaration
   * | VariableDeclarationList ',' VariableDeclaration
   */
  VariableDeclarationList(): VariableDeclaration[] {
    const declarations = [];
    do {
      declarations.push(this.VariableDeclaration());
    } while (
      this.lookahead.type === TokenType.COMMA &&
      this.eat(TokenType.COMMA)
    );
    return declarations;
  }

  /**
   * VariableDeclaration
   *  : Identifier OptVariableInitializer
   */
  VariableDeclaration(): VariableDeclaration {
    const id = this.Identifier();
    // OptVariableInitializer
    const init =
      this.lookahead.type !== TokenType.SEMI_COLON &&
      this.lookahead.type !== TokenType.COMMA
        ? this.VariableInitializer()
        : null;
    return this.factory.VariableDeclaration(id, init);
  }

  /**
   * VariableInitializer starts with SIMPLE_ASSIGNMENT AssignmentExpression
   */
  VariableInitializer(): ExpressionNode {
    this.eat(TokenType.SIMPLE_ASSIGNMENT);
    return this.AssignmentExpression();
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

  Expression(): ExpressionNode {
    return this.AssignmentExpression();
  }

  LeftHandExpression() {
    return this.Identifier();
  }

  Identifier(): IdentifierNode {
    const name = this.eat(TokenType.IDENTIFIER).value;
    return typeof name === 'string' ? this.factory.Identifier(name) : null;
  }

  /**
   * AssignmentExpression
   * : AdditiveExpression
   * | LeftHandSideExpression AssignmentOperator AssignmentExpression
   * ;
   */
  AssignmentExpression(): ExpressionNode {
    const left = this.RelationalExpression();
    if (!this.isAssignmentOperator(this.lookahead.type)) {
      return left;
    }
    return {
      type: ExpressionType.AssignmentExpression,
      operator: this.AssignmentOperator().value,
      left: this.checkValidAssignmentTarget(left),
      right: this.AssignmentExpression(),
    };
  }

  checkValidAssignmentTarget(node: ExpressionNode): ExpressionNode {
    if (node.type === TokenType.IDENTIFIER) {
      return node;
    }
    throw new SyntaxError(`Invalid left-hand side in assignment expression`);
  }

  isAssignmentOperator(t: TokenType): boolean {
    return (
      t === TokenType.SIMPLE_ASSIGNMENT || t === TokenType.COMPLEX_ASSIGNMENT
    );
  }

  /**
   * AssignmentOperator can be
   * : SIMPLE_ASSIGNMENT
   * | COMPLEX_ASSIGNMENT
   * ;
   */
  AssignmentOperator(): Token {
    if (this.lookahead.type === TokenType.SIMPLE_ASSIGNMENT) {
      return this.eat(TokenType.SIMPLE_ASSIGNMENT);
    }
    return this.eat(TokenType.COMPLEX_ASSIGNMENT);
  }

  /**
   * RELATIONAL_OPERATOR: >, >=, <, <=
   * x > y
   * x >= y
   * x < y
   * x <= y
   *
   * RelationalExpression
   *  : AdditiveExpression
   *  | AdditiveExpression RELATIONAL_OPERATOR RelationalExpression
   */
  RelationalExpression(): ExpressionNode {
    let left = this.AdditiveExpression();
    while (this.lookahead.type === TokenType.RELATIONAL_OPERATOR) {
      const operator = this.eat(TokenType.RELATIONAL_OPERATOR).value;
      const right = this.AdditiveExpression();
      left = {
        type: ExpressionType.BinaryExpression,
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * AdditiveExpression can be:
   * MultiplicativeExpression
   * | AdditiveExpression ADD_OPERATOR MultiplicativeExpression -> MultiplicativeExpression ADD_OPERATOR
   */
  AdditiveExpression(): ExpressionNode {
    let left = this.MultiplicativeExpression();
    while (this.lookahead.type === TokenType.ADD_OPERATOR) {
      // operator are +, - | also remember to take the value only not the token
      const operator = this.eat(TokenType.ADD_OPERATOR).value;
      const right = this.MultiplicativeExpression();
      left = {
        type: ExpressionType.BinaryExpression,
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * MultiplicativeExpression can be as:
   * PrimaryExpression
   * | MultiplicativeExpression MULTIPLY_OPERATOR PrimaryExpression -> PrimaryExpression MULTIPLY_OPERATOR
   */
  MultiplicativeExpression(): ExpressionNode {
    let left = this.PrimaryExpression();
    while (this.lookahead.type === TokenType.MULTIPLY_OPERATOR) {
      // operator are *, / | also remember to take the value only not the token
      const operator = this.eat(TokenType.MULTIPLY_OPERATOR).value;
      const right = this.PrimaryExpression();
      left = {
        type: ExpressionType.BinaryExpression,
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * PrimaryExpression can be:
   * : Literal
   * | ParenthesizedExpression
   * | LeftHandExpression
   * ;
   */
  PrimaryExpression(): ExpressionNode {
    switch (this.lookahead.type) {
      case TokenType.NUMBER:
      case TokenType.STRING:
        return this.Literal();
      case TokenType.OPEN_PARENTHESIS:
        return this.ParenthesizedExpression();
      default:
        return this.LeftHandExpression();
    }
  }

  /**
   * ParenthesizedExpression can be:
   * '( expression )'
   */
  ParenthesizedExpression(): ExpressionNode {
    this.eat(TokenType.OPEN_PARENTHESIS);
    const expression = this.Expression();
    this.eat(TokenType.CLOSE_PARENTHESIS);
    return expression;
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
  private eat(tokenType: TokenType): Token {
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
