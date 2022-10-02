import { ASTType, LiteralType, ProgramType, StatementType } from "../types/enums";
import { ExpressionToken, LiteralNode, LiteralToken } from "../types/types";

export type ASTNode = DefaultASTFactory | SExpressionASTFactory;

export class AST {
  private AST_MODE: ASTType;
  private factory: ASTNode;
  constructor(mode: ASTType = ASTType.Default) {
    this.AST_MODE = mode;
    this.factory = this.AST_MODE === ASTType.Default
      ? new DefaultASTFactory() : new SExpressionASTFactory();
  }

  getFactory(): ASTNode {
    return this.factory;
  }
}

class DefaultASTFactory {
  Program(body) {
    return {
      type: ProgramType.Program,
      body,
    };
  }

  EmptyStatement() {
    return {
      type: StatementType.EmptyStatement,
      body: null,
    };
  }

  BlockStatement(body) {
    return {
      type: StatementType.BlockStatement,
      body,
    };
  }

  ExpressionStatement(body): ExpressionToken {
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

class SExpressionASTFactory {
  Program(body) {
    return ['begin', body];
  }

  EmptyStatement() { return [] }

  BlockStatement(body) {
    return ['begin', body];
  }

  ExpressionStatement(expression) {
    return expression;
  }

  NumericLiteral(value: number): LiteralNode {
    return value
  }

  StringLiteral(value: string): LiteralNode {
    return `${value}`;
  }
}



