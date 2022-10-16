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

  /** Keywords */
  { _regex: /^\blet\b/, type: TokenType.LET },
  { _regex: /^\bif\b/, type: TokenType.IF },
  { _regex: /^\belse\b/, type: TokenType.ELSE },
  { _regex: /^\btrue\b/, type: TokenType.TRUE },
  { _regex: /^\bfalse\b/, type: TokenType.FALSE },
  { _regex: /^\bnull\b/, type: TokenType.NULL },
  { _regex: /^\bdo\b/, type: TokenType.DO },
  { _regex: /^\bwhile\b/, type: TokenType.WHILE },
  { _regex: /^\bfor\b/, type: TokenType.FOR },
  { _regex: /^\bfunc\b/, type: TokenType.FUNCTION },
  { _regex: /^\breturn\b/, type: TokenType.RETURN },

  /** IDENTIFIERS */
  { _regex: /^\w+/, type: TokenType.IDENTIFIER },

  /** Equality operator ==, != */
  { _regex: /^[=!]=/, type: TokenType.EQUALITY_OPERATOR },

  /** ASSIGNMENT OPERATOR */
  { _regex: /^=/, type: TokenType.SIMPLE_ASSIGNMENT },
  { _regex: /^[\*\/\+\-]=/, type: TokenType.COMPLEX_ASSIGNMENT },

  /** Mathematical operators like +. -, *, /  */
  { _regex: /^[+\-]/, type: TokenType.ADD_OPERATOR },
  { _regex: /^[*\/]/, type: TokenType.MULTIPLY_OPERATOR },
  // support for relational operator like: >, >=, <, <=
  { _regex: /^[><]=?/, type: TokenType.RELATIONAL_OPERATOR },
  // support for logical operators like: &&, ||, !
  { _regex: /^&&/, type: TokenType.LOGICAL_AND },
  { _regex: /^\|\|/, type: TokenType.LOGICAL_OR },
  { _regex: /^!/, type: TokenType.LOGICAL_NOT },
];
