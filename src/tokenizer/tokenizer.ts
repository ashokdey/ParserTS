import { TokenizationSpecs } from '../system/specs';
import { TokenType } from '../types/enums';
import { Token } from '../types/types';

/**
 * the tokenizer class is responsible for
 * extracting out the tokens like literals,
 * operators, etc from the given stream
 * */
export class Tokenizer {
  /** _string: the program stream */
  private _string: string;
  /** cursor: the current position in the stream */
  private cursor = 0;

  /** initialize the string data */
  init(_string: string) {
    this._string = _string;
  }

  /** do we have more tokens? */
  hasMoreTokens() {
    return this.cursor < this._string.length;
  }

  /** fetch the next token */
  getNextToken(): Token {
    if (!this.hasMoreTokens()) {
      return null;
    }

    /** take the string from the cursor position */
    const newString = this._string.slice(this.cursor);

    for (const spec of TokenizationSpecs) {
      const token = this.regexMatch(newString, spec._regex, spec.type);
      if (token === null) continue;

      /**
       * if the token contains white spaces,
       * skip it and get next token
       * */
      if (token.type === null) return this.getNextToken();

      /** return the token */
      return token;
    }
    throw new SyntaxError(`Unexpected token: '${newString[0]}'`);
  }

  private regexMatch(_string: string, _regex: RegExp, type: TokenType): Token {
    const matched = _regex.exec(_string);
    if (matched !== null) {
      this.cursor += matched[0].length;
      return {
        type,
        value: matched[0],
      };
    }
    return null;
  }
}
