import type * as monaco from 'monaco-editor';

export const languageConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
  ],
  indentationRules: {
    increaseIndentPattern: /\{[^}]*$/,
    decreaseIndentPattern: /^\s*\}/,
  },
  wordPattern: /[A-Za-z_][A-Za-z0-9_]*/,
};
