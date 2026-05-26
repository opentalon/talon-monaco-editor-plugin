import type * as monaco from 'monaco-editor';
import { LANGUAGE_ID } from './language-id.js';
import { KEYWORD_CATEGORY, type KeywordCategory } from './keywords.js';

function kindFor(
  m: typeof monaco,
  category: KeywordCategory
): monaco.languages.CompletionItemKind {
  const K = m.languages.CompletionItemKind;
  switch (category) {
    case 'block':
      return K.Struct;
    case 'priority':
    case 'boolean':
      return K.Constant;
    case 'ml':
    case 'unit':
    case 'stringOp':
    case 'clause':
    case 'test':
      return K.Keyword;
  }
}

export function createKeywordCompletionProvider(
  m: typeof monaco
): monaco.languages.CompletionItemProvider {
  return {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range: monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: monaco.languages.CompletionItem[] = Object.entries(
        KEYWORD_CATEGORY
      ).map(([kw, cat]) => ({
        label: kw,
        kind: kindFor(m, cat),
        insertText: kw,
        detail: cat,
        range,
        // Lower priority than snippets (which use '0_' prefix).
        sortText: '1_' + kw,
      }));
      return { suggestions };
    },
  };
}

export function registerKeywordCompletions(
  m: typeof monaco
): monaco.IDisposable {
  return m.languages.registerCompletionItemProvider(
    LANGUAGE_ID,
    createKeywordCompletionProvider(m)
  );
}
