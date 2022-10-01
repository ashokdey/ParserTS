import { TokenType } from './enums';

export type Token = {
  type: string;
  value: any;
};

export type SpecType = {
  _regex: RegExp;
  type: TokenType;
};
