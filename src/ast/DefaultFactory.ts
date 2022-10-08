import {
  LiteralType,
  ProgramType,
  StatementType,
  TokenType,
} from '../types/enums';
import {
  ExpressionNode,
  IdentifierNode,
  LiteralNode,
  StatementNode,
} from '../types/types';
import { IAstFactory } from './IFactory';

export class DefaultASTFactory implements IAstFactory {
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

  Identifier(name: string): IdentifierNode {
    return {
      type: TokenType.IDENTIFIER,
      name,
    };
  }
}
