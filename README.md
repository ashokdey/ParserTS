# parserTS: An AST generator implemented in TypeScript

### What Does Parser Mean?

A parser is a compiler or interpreter component that breaks data into smaller elements for easy translation into another language. A parser takes input in the form of a sequence of tokens, interactive commands, or program instructions and breaks them up into parts that can be used by other components in programming.

A parser usually checks all data provided to ensure it is sufficient to build a data structure in the form of a parse tree or an abstract syntax tree.

In order for the code written in human-readable form to be understood by a machine, it must be converted into machine language. This task is usually performed by a translator (interpreter or compiler). The parser is commonly used as a component of the translator that organizes linear text in a structure that can be easily manipulated (parse tree). To do so, it follows a set of defined rules called “grammar”.

The overall process of parsing involves three stages:

### Lexical Analysis

A lexical analyzer is used to produce tokens from a stream of input string characters, which are broken into small components to form meaningful expressions. A token is the smallest unit in a programming language that possesses some meaning (such as +, -, *, “function”, or “new” in JavaScript).

### Syntactic Analysis

Checks whether the generated tokens form a meaningful expression. This makes use of a context-free grammar that defines algorithmic procedures for components. These work to form an expression and define the particular order in which tokens must be placed.

Semantic Parsing: The final parsing stage in which the meaning and implications of the validated expression are determined and necessary actions are taken.

A parser's main purpose is to determine if input data may be derived from the start symbol of the grammar.

## Examples 

```javascript

func add(a, b) {
    return a + b;
}

```

The above code will be converted into an AST like: 

```json

{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "name": {
        "type": "IDENTIFIER",
        "name": "add"
      },
      "params": [
        {
          "type": "IDENTIFIER",
          "name": "a"
        },
        {
          "type": "IDENTIFIER",
          "name": "b"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "IDENTIFIER",
                "name": "a"
              },
              "right": {
                "type": "IDENTIFIER",
                "name": "b"
              }
            }
          },
          {
            "type": "EmptyStatement",
            "body": null
          }
        ]
      }
    }
  ]
}

```

### Upcoming 

- Support for function call
- Support for Classes and Objects


### Usages

Type your code in the `src/index.ts`
Run command to produce ast `npm run dev >> ast.json`