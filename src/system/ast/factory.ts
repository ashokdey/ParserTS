import { ASTType } from '../enums';
import { ASTNode } from '../types';
import { DefaultASTFactory } from './DefaultFactory';

export class AST {
  private AST_MODE: ASTType;
  private factory: ASTNode;

  /** initialize the factory type */
  constructor(mode: ASTType = ASTType.Default) {
    this.AST_MODE = mode;
    this.factory =
      this.AST_MODE === ASTType.Default ? new DefaultASTFactory() : null; // can be any other AST Type class that implements IFactory
  }

  getFactory(): ASTNode {
    return this.factory;
  }
}
