import { TokenType } from '../types/enums';
import { SpecType } from '../types/types';

export const SPECS: SpecType[] = [
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
];
