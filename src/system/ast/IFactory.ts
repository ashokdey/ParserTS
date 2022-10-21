import {
  ExpressionNode,
  IdentifierNode,
  LiteralNode,
  StatementNode,
} from '../types';

export interface IAstFactory {
  Program(body);
  EmptyStatement(): StatementNode;
  BlockStatement(body): StatementNode;
  ExpressionStatement(body): ExpressionNode;
  NumericLiteral(value): LiteralNode;
  StringLiteral(value): LiteralNode;
  Identifier(name): IdentifierNode;
}
