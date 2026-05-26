import type * as monaco from 'monaco-editor';

export const lightTheme: monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
    { token: 'comment.block', foreground: '6A737D', fontStyle: 'italic' },

    { token: 'keyword.block', foreground: '8250DF', fontStyle: 'bold' },
    { token: 'keyword.clause', foreground: 'CF222E' },
    { token: 'keyword.ml', foreground: '116329' },
    { token: 'keyword.unit', foreground: '953800' },
    { token: 'keyword.string-op', foreground: '0550AE' },
    { token: 'keyword.test', foreground: '6F42C1' },

    { token: 'constant.priority', foreground: 'B31D28', fontStyle: 'bold' },
    { token: 'constant.boolean', foreground: '0550AE' },

    { token: 'string', foreground: '0A3069' },
    { token: 'string.quote', foreground: '0A3069' },
    { token: 'string.escape', foreground: '6F42C1' },
    { token: 'string.escape.invalid', foreground: 'B31D28' },

    { token: 'variable.interpolation', foreground: '953800', fontStyle: 'italic' },
    { token: 'delimiter.interpolation', foreground: '953800' },

    { token: 'number', foreground: '0550AE' },
    { token: 'number.float', foreground: '0550AE' },

    { token: 'operator', foreground: '24292F' },
    { token: 'delimiter', foreground: '24292F' },
    { token: 'delimiter.curly', foreground: '24292F' },

    { token: 'identifier', foreground: '24292F' },
  ],
  colors: {},
};
