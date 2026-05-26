import type * as monaco from 'monaco-editor';

export const darkTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '8B949E', fontStyle: 'italic' },
    { token: 'comment.block', foreground: '8B949E', fontStyle: 'italic' },

    { token: 'keyword.block', foreground: 'D2A8FF', fontStyle: 'bold' },
    { token: 'keyword.clause', foreground: 'FF7B72' },
    { token: 'keyword.ml', foreground: '7EE787' },
    { token: 'keyword.unit', foreground: 'FFA657' },
    { token: 'keyword.string-op', foreground: '79C0FF' },
    { token: 'keyword.test', foreground: 'D2A8FF' },

    { token: 'constant.priority', foreground: 'FF7B72', fontStyle: 'bold' },
    { token: 'constant.boolean', foreground: '79C0FF' },

    { token: 'string', foreground: 'A5D6FF' },
    { token: 'string.quote', foreground: 'A5D6FF' },
    { token: 'string.escape', foreground: 'D2A8FF' },
    { token: 'string.escape.invalid', foreground: 'FF7B72' },

    { token: 'variable.interpolation', foreground: 'FFA657', fontStyle: 'italic' },
    { token: 'delimiter.interpolation', foreground: 'FFA657' },

    { token: 'number', foreground: '79C0FF' },
    { token: 'number.float', foreground: '79C0FF' },

    { token: 'operator', foreground: 'E6EDF3' },
    { token: 'delimiter', foreground: 'E6EDF3' },
    { token: 'delimiter.curly', foreground: 'E6EDF3' },

    { token: 'identifier', foreground: 'E6EDF3' },
  ],
  colors: {},
};
