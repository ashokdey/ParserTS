import { TokenType } from '../types/enums';
import { SpecType } from '../types/types';

export const TokenizationSpecs: SpecType[] = [
  /** Keywords */
  { _regex: /^\blet\b/, type: TokenType.LET },
  { _regex: /^\bif\b/, type: TokenType.IF },
  { _regex: /^\belse\b/, type: TokenType.ELSE },

  /** numbers  */
  { _regex: /^\d+/, type: TokenType.NUMBER },

  /** strings with double & single quotes */
  { _regex: /^"[^"]*"/, type: TokenType.STRING },
  { _regex: /^'[^"]*'/, type: TokenType.STRING },

  /** white spaces */
  { _regex: /^\s+/, type: null },

  /** Comments */
  /** skip single line comments  */
  { _regex: /^\/\/.*/, type: null },
  /** skip multi line comments  */
  { _regex: /^\/\*[\s\S]*?\*\//, type: null },

  /** Symbols and delimiters */
  /** processing a semicolon as a statement */
  { _regex: /^;/, type: TokenType.SEMI_COLON },

  /** process block scope  */
  { _regex: /^\{/, type: TokenType.BLOCK_START },
  { _regex: /^\}/, type: TokenType.BLOCK_END },

  /** process parenthesis  */
  { _regex: /^\(/, type: TokenType.OPEN_PARENTHESIS },
  { _regex: /^\)/, type: TokenType.CLOSE_PARENTHESIS },
  { _regex: /^,/, type: TokenType.COMMA },

  /** IDENTIFIERS */
  { _regex: /^\w+/, type: TokenType.IDENTIFIER },

  /** ASSIGNMENT OPERATOR */
  { _regex: /^=/, type: TokenType.SIMPLE_ASSIGNMENT },
  { _regex: /^[\*\/\+\-]=/, type: TokenType.COMPLEX_ASSIGNMENT },

  /** Mathematical operators like +. -, *, /  */
  { _regex: /^[+\-]/, type: TokenType.ADD_OPERATOR },
  { _regex: /^[*\/]/, type: TokenType.MULTIPLY_OPERATOR },
  { _regex: /^[><]=?/, type: TokenType.RELATIONAL_OPERATOR },
];
