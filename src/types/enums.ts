export enum LiteralType {
  StringLiteral = 'StringLiteral',
  NumericLiteral = 'NumericLiteral',
}

export enum ExpressionType {
  BinaryExpression = 'BinaryExpression',
  AssignmentExpression = 'AssignmentExpression',
}

export enum DeclarationType {
  VariableDeclaration = 'VariableDeclaration',
}

export enum TokenType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  IDENTIFIER = 'IDENTIFIER',
  SEMI_COLON = ';',
  COMMA = ',',
  BLOCK_START = '{',
  BLOCK_END = '}',
  OPEN_PARENTHESIS = '(',
  CLOSE_PARENTHESIS = ')',
  ADD_OPERATOR = '+',
  MULTIPLY_OPERATOR = '*',
  SIMPLE_ASSIGNMENT = '=',
  COMPLEX_ASSIGNMENT = '',
  LET = 'let',
  IF = 'if',
  ELSE = 'else',
}

export enum ProgramType {
  Program = 'Program',
  Literal = 'Literal',
}

export enum StatementType {
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  EmptyStatement = 'EmptyStatement',
  VariableStatement = 'VariableStatement',
  IfStatement = 'IfStatement',
}

export enum ASTType {
  Default = 'Default',
  SExpression = 'SExpression',
}
