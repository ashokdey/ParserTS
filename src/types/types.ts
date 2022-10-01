import { LiteralType, ProgramType, StatementType, TokenType } from './enums';

/** the token extracted from the raw string stream */
export type Token = {
  type: TokenType;
  value: number | string;
};

/** the extracted token identified as literal, either Numeric or String literal */
export type LiteralToken = {
  type: LiteralType;
  value: number | string;
};

/** the token identified as an expression */
export type ExpressionToken = {
  type: StatementType;
  expression: any;
};

export type BlockToken = {
  type: StatementType,
  body: any
}

export type StatementToken = ExpressionToken | BlockToken;

/** tokenizer rules object type */
export type SpecType = {
  _regex: RegExp;
  type: TokenType;
};
