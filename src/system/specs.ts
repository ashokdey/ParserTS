import { TokenType } from '../types/enums';
import { SpecType } from '../types/types';

export const TokenizationSpecs: SpecType[] = [
  /** numbers  */
  {
    _regex: /^\d+/,
    type: TokenType.NUMBER,
  },
  /** strings  */
  {
    _regex: /^"[^"]*"/,
    type: TokenType.STRING,
  },
  {
    _regex: /^'[^"]*'/,
    type: TokenType.STRING,
  },
  /** white spaces */
  {
    _regex: /^\s+/,
    type: null,
  },
  /** skip single line comments  */
  {
    _regex: /^\/\/.*/,
    type: null,
  },
  /** skip multi line comments  */
  {
    _regex: /^\/\*[\s\S]*?\*\//,
    type: null,
  },
  /** processing a semicolon as a statement */
  {
    _regex: /^;/,
    type: TokenType.SEMI_COLON,
  },
  /** process block scope  */
  {
    _regex: /^{/,
    type: TokenType.BLOCK_START,
  },
  {
    _regex: /^}/,
    type: TokenType.BLOCK_END,
  },
];
