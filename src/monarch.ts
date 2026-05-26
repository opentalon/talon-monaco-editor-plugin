import type * as monaco from 'monaco-editor';
import {
  BLOCK_KEYWORDS,
  CLAUSE_KEYWORDS,
  ML_KEYWORDS,
  UNIT_KEYWORDS,
  STRING_OP_KEYWORDS,
  PRIORITY_KEYWORDS,
  BOOLEAN_KEYWORDS,
  TEST_KEYWORDS,
} from './keywords.js';

export const monarchLanguage: monaco.languages.IMonarchLanguage = {
  defaultToken: '',
  tokenPostfix: '.talon',

  blockKeywords: [...BLOCK_KEYWORDS],
  clauseKeywords: [...CLAUSE_KEYWORDS],
  mlKeywords: [...ML_KEYWORDS],
  unitKeywords: [...UNIT_KEYWORDS],
  stringOpKeywords: [...STRING_OP_KEYWORDS],
  priorityKeywords: [...PRIORITY_KEYWORDS],
  booleanKeywords: [...BOOLEAN_KEYWORDS],
  testKeywords: [...TEST_KEYWORDS],

  brackets: [
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '[', close: ']', token: 'delimiter.square' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
  ],

  tokenizer: {
    root: [
      [/\/\/.*$/, 'comment'],
      [/\/\*/, { token: 'comment.block', next: '@blockComment' }],

      [/"/, { token: 'string.quote', next: '@string' }],

      [/\d+\.\d+/, 'number.float'],
      [/\d+/, 'number'],

      [
        /[A-Za-z_][A-Za-z0-9_]*/,
        {
          cases: {
            '@blockKeywords': 'keyword.block',
            '@priorityKeywords': 'constant.priority',
            '@booleanKeywords': 'constant.boolean',
            '@mlKeywords': 'keyword.ml',
            '@stringOpKeywords': 'keyword.string-op',
            '@clauseKeywords': 'keyword.clause',
            '@unitKeywords': 'keyword.unit',
            '@testKeywords': 'keyword.test',
            '@default': 'identifier',
          },
        },
      ],

      [/==|!=|<=|>=|~=/, 'operator'],
      [/[<>+\-*/%]/, 'operator'],

      [/[{}()[\]]/, '@brackets'],
      [/[,.]/, 'delimiter'],

      [/\s+/, 'white'],
    ],

    blockComment: [
      [/[^/*]+/, 'comment.block'],
      [/\*\//, { token: 'comment.block', next: '@pop' }],
      [/[/*]/, 'comment.block'],
    ],

    string: [
      [/[^"\\{]+/, 'string'],
      [/\\["\\nrt]/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/\{/, { token: 'delimiter.interpolation', next: '@template' }],
      [/"/, { token: 'string.quote', next: '@pop' }],
    ],

    template: [
      [/[A-Za-z_][A-Za-z0-9_.]*/, 'variable.interpolation'],
      [/\}/, { token: 'delimiter.interpolation', next: '@pop' }],
      [/[^}]/, 'string.interpolation'],
    ],
  },
};
