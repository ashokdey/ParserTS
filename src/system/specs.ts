import { TokenType } from '../types/enums';
import { SpecType } from '../types/types';

export const TokenizationSpecs: SpecType[] = [
  /** numbers  */
  { _regex: /^\d+/, type: TokenType.NUMBER },

  /** strings with double & single quotes */
  { _regex: /^"[^"]*"/, type: TokenType.STRING },
  { _regex: /^'[^"]*'/, type: TokenType.STRING },

  /** white spaces */
  { _regex: /^\s+/, type: null },

  /**
   * Comments
   */
  /** skip single line comments  */
  { _regex: /^\/\/.*/, type: null },
  /** skip multi line comments  */
  { _regex: /^\/\*[\s\S]*?\*\//, type: null },

  /**
   * Symbols and delimiters
   */
  /** processing a semicolon as a statement */
  { _regex: /^;/, type: TokenType.SEMI_COLON },
  /** process block scope  */
  { _regex: /^\{/, type: TokenType.BLOCK_START },
  { _regex: /^\}/, type: TokenType.BLOCK_END },
  /** process parenthesis  */
  { _regex: /^\(/, type: TokenType.PARENTHESIS_START },
  { _regex: /^\)/, type: TokenType.PARENTHESIS_END },

  /** IDENTIFIERS */
  { _regex: /^\w+/, type: TokenType.IDENTIFIER },

  /** ASSIGNMENT OPERATOR */
  { _regex: /^=/, type: TokenType.SIMPLE_ASSIGNMENT },
  { _regex: /^[\*\/\+\-]=/, type: TokenType.COMPLEX_ASSIGNMENT },

  /**
   * Mathematical operators like +. -, *, /
   */
  //eslint-disable-next-line
  { _regex: /^[+\-]/, type: TokenType.ADD_OPERATOR },
  //eslint-disable-next-line
  { _regex: /^[*\/]/, type: TokenType.MULTIPLY_OPERATOR },
];
