import { ExpressionNode, LiteralNode, StatementNode } from '../types/types';
import { IAstFactory } from './IFactory';

export class SExpressionASTFactory implements IAstFactory {
  Program(body) {
    return ['begin', body];
  }

  EmptyStatement(): StatementNode {
    return [];
  }

  BlockStatement(body): StatementNode {
    return ['begin', body];
  }

  ExpressionStatement(expression): ExpressionNode {
    return expression;
  }

  NumericLiteral(value: number): LiteralNode {
    return value;
  }

  StringLiteral(value: string): LiteralNode {
    return `${value}`;
  }
}
