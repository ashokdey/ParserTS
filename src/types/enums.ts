export enum LiteralType {
  StringLiteral = 'StringLiteral',
  NumericLiteral = 'NumericLiteral',
}

export enum TokenType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  SEMI_COLON = ';',
  BLOCK_START = '{',
  BLOCK_END = '}'
}

export enum ProgramType {
  Program = 'Program',
  Literal = 'Literal',
}

export enum StatementType {
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
}
