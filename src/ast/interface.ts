import { ExpressionNode, LiteralNode, StatementNode } from '../types/types';

export interface IAstFactory {
  Program(body);
  EmptyStatement();
  BlockStatement(body): StatementNode;
  ExpressionStatement(body): ExpressionNode;
  NumericLiteral(value): LiteralNode;
  StringLiteral(value): LiteralNode;
}
