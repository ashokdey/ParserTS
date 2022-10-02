import {
  ASTType,
  LiteralType,
  ProgramType,
  StatementType,
} from '../types/enums';
import { ExpressionNode, LiteralNode, StatementNode } from '../types/types';
import { IAstFactory } from './interface';

export type ASTNode = DefaultASTFactory | SExpressionASTFactory;

export class AST {
  private AST_MODE: ASTType;
  private factory: ASTNode;
  constructor(mode: ASTType = ASTType.Default) {
    this.AST_MODE = mode;
    this.factory =
      this.AST_MODE === ASTType.Default
        ? new DefaultASTFactory()
        : new SExpressionASTFactory();
  }

  getFactory(): ASTNode {
    return this.factory;
  }
}

class DefaultASTFactory implements IAstFactory {
  Program(body) {
    return {
      type: ProgramType.Program,
      body,
    };
  }

  EmptyStatement(): StatementNode {
    return {
      type: StatementType.EmptyStatement,
      body: null,
    };
  }

  BlockStatement(body): StatementNode {
    return {
      type: StatementType.BlockStatement,
      body,
    };
  }

  ExpressionStatement(body): ExpressionNode {
    return {
      type: StatementType.ExpressionStatement,
      expression: body,
    };
  }

  NumericLiteral(value): LiteralNode {
    return {
      type: LiteralType.NumericLiteral,
      value,
    };
  }

  StringLiteral(value): LiteralNode {
    return {
      type: LiteralType.StringLiteral,
      value,
    };
  }
}

class SExpressionASTFactory implements IAstFactory {
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
