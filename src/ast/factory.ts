import { ASTType } from '../types/enums';
import { ASTNode } from '../types/types';
import { DefaultASTFactory } from './DefaultFactory';
import { SExpressionASTFactory } from './SExpressionFactory';

export class AST {
  private AST_MODE: ASTType;
  private factory: ASTNode;

  /** initialize the factory type */
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
