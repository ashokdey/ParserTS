import { DefaultASTFactory } from './ast/DefaultFactory';
import {
  DeclarationType,
  ExpressionType,
  LiteralType,
  StatementType,
  TokenType,
} from './enums';

/** the token extracted from the raw string stream */
export type Token = {
  type: TokenType;
  value: number | string;
};

/** the extracted token identified as literal, either Numeric or String literal */
export type LiteralToken = {
  type: LiteralType;
  value: number | string | boolean | null;
};

export type IdentifierToken = {
  type: TokenType.IDENTIFIER;
  name: string;
};

/** the token identified as an expression */
export type ExpressionToken = {
  type: StatementType;
  expression: ExpressionNode;
};

export type BlockToken = {
  type: StatementType;
  body: StatementNode;
};

export type IfToken = {
  type: StatementType.IfStatement;
  test: ExpressionNode;
  consequent: ExpressionNode;
  alternate: ExpressionNode;
};

export type WhileToken = {
  type: StatementType.WhileStatement;
  test: ExpressionNode;
  body: ExpressionNode;
};

export type DoWhileToken = {
  type: StatementType.DoWhileStatement;
  test: ExpressionNode;
  body: ExpressionNode;
};

export type ForToken = {
  type: StatementType.ForStatement;
  test: ExpressionNode;
  body: ExpressionNode;
};

export type FunctionToken = {
  type: StatementType.FunctionDeclaration;
  name: IdentifierToken;
  params: IdentifierToken[];
  body: StatementToken;
};

export type ReturnToken = {
  type: StatementType.ReturnStatement;
  argument: ExpressionNode;
};

export type VariableToken = {
  type: StatementType;
  declarations: VariableDeclaration[];
};

export type VariableDeclaration = {
  type: DeclarationType;
  id: IdentifierToken;
  init: ExpressionNode;
};

export type BinaryExpressionToken = {
  type: ExpressionType;
  operator: string | number;
  left: LiteralNode | ExpressionNode;
  right: LiteralNode | ExpressionNode;
};

export type StatementToken =
  | ExpressionToken
  | BlockToken
  | BinaryExpressionToken
  | VariableToken
  | IfToken
  | WhileToken
  | DoWhileToken
  | ForToken
  | FunctionToken
  | ReturnToken;

/** tokenizer rules object type */
export type SpecType = {
  _regex: RegExp;
  type: TokenType;
};

/** for AST node type default and s-expression */
export type ASTNode = DefaultASTFactory;
export type LiteralNode = LiteralToken;
export type IdentifierNode = IdentifierToken;
export type StatementNode = StatementToken;
export type ExpressionNode =
  | StatementNode
  | LiteralNode
  | IdentifierNode
  | ExpressionToken
  | BinaryExpressionToken;
