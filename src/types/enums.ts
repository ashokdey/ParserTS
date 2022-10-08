export enum LiteralType {
  StringLiteral = 'StringLiteral',
  NumericLiteral = 'NumericLiteral',
}

export enum ExpressionType {
  BinaryExpression = 'BinaryExpression',
}

export enum TokenType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  SEMI_COLON = ';',
  BLOCK_START = '{',
  BLOCK_END = '}',
  PARENTHESIS_START = '(',
  PARENTHESIS_END = ')',
  ADD_OPERATOR = '+',
  MULTIPLY_OPERATOR = '*',
}

export enum ProgramType {
  Program = 'Program',
  Literal = 'Literal',
}

export enum StatementType {
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  EmptyStatement = 'EmptyStatement',
}

export enum ASTType {
  Default = 'Default',
  SExpression = 'SExpression',
}
