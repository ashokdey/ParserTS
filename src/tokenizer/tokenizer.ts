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

    /** if the first char is a number, extract out the number */
    if (!Number.isNaN(Number(newString[0]))) {
      let num = '';
      // keep going until we are getting digits
      while (!Number.isNaN(Number(newString[this.cursor]))) {
        num += newString[this.cursor++];
      }
      /** since now we have the number, let's return a NUMBER token */
      return {
        type: 'NUMBER',
        value: Number(num),
      };
    }
  }
}
