import type * as monaco from 'monaco-editor';
import { LANGUAGE_ID } from './language-id.js';

interface Snippet {
  label: string;
  body: string;
  detail: string;
  documentation?: string;
}

const SNIPPETS: Snippet[] = [
  {
    label: 'detect',
    detail: 'detect block',
    documentation: 'Flag records matching conditions.',
    body: [
      'detect "${1:name}" {',
      '  for records where ${2:condition}',
      '  flag matching items',
      '  label "${3:{item.name}: ...}"',
      '  priority ${4|LOW,MEDIUM,HIGH,CRITICAL|}',
      '}$0',
    ].join('\n'),
  },
  {
    label: 'rule',
    detail: 'rule block',
    documentation: 'Block or require approval for an action.',
    body: [
      'rule "${1:name}" {',
      '  for records where ${2:condition}',
      '  ${3|block,allow,requires approval from role "manager"|} "${4:action}"',
      '  reason "${5:why}"',
      '}$0',
    ].join('\n'),
  },
  {
    label: 'define',
    detail: 'define block',
    documentation: 'Named predicate reusable in other blocks.',
    body: ['define "${1:name}" {', '  ${2:condition}', '}$0'].join('\n'),
  },
  {
    label: 'recommend',
    detail: 'recommend block',
    documentation: 'Suggest an action when a detection matches.',
    body: [
      'recommend "${1:name}" {',
      '  when detect "${2:detection}" matches',
      '  calculate ${3:metric} from ${4:source} within last ${5:90} days',
      '  suggest "${6:message}"',
      '  priority ${7|LOW,MEDIUM,HIGH,CRITICAL|}',
      '}$0',
    ].join('\n'),
  },
  {
    label: 'forecast',
    detail: 'forecast block',
    documentation: 'Forecast a metric over a time window.',
    body: [
      'forecast "${1:name}" {',
      '  for records where ${2:condition}',
      '  series attr "${3:metric}" over last ${4:90} days',
      '  label "${5:{item.name}: ...}"',
      '  priority ${6|LOW,MEDIUM,HIGH,CRITICAL|}',
      '}$0',
    ].join('\n'),
  },
  {
    label: 'workflow',
    detail: 'workflow block',
    documentation: 'Multi-step workflow with MCP invocations.',
    body: [
      'workflow "${1:name}" {',
      '  step "${2:step1}" {',
      '    mcp invoke "${3:tool}"',
      '  }',
      '  step "${4:step2}" {',
      '    depends_on "${2:step1}"',
      '    mcp invoke "${5:tool}"',
      '  }',
      '}$0',
    ].join('\n'),
  },
  {
    label: 'test',
    detail: 'test block',
    documentation: 'Test suite for rules/detections.',
    body: [
      'test "${1:description}" {',
      '  given {',
      '    record ${2:1} type "${3:item}" status "${4:active}"',
      '    attr ${2:1} "${5:name}" "${6:value}"',
      '  }',
      '',
      '  when detect "${7:detection}"',
      '',
      '  expect {',
      '    flagged ${2:1}',
      '  }',
      '}$0',
    ].join('\n'),
  },
];

export function createSnippetProvider(
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
      const suggestions: monaco.languages.CompletionItem[] = SNIPPETS.map((s) => ({
        label: s.label,
        kind: m.languages.CompletionItemKind.Snippet,
        insertText: s.body,
        insertTextRules: m.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: s.detail,
        documentation: s.documentation
          ? { value: s.documentation }
          : undefined,
        range,
        sortText: '0_' + s.label,
      }));
      return { suggestions };
    },
  };
}

export function registerSnippets(m: typeof monaco): monaco.IDisposable {
  return m.languages.registerCompletionItemProvider(
    LANGUAGE_ID,
    createSnippetProvider(m)
  );
}
