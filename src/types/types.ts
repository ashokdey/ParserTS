import { LiteralType, ProgramType, TokenType } from './enums';

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
  type: string,
  expression: any
}

/** tokenizer rules object type */
export type SpecType = {
  _regex: RegExp;
  type: TokenType;
};
