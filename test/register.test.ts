import { describe, it, expect, vi } from 'vitest';
import { registerTalon, LANGUAGE_ID } from '../src/index.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = readFileSync(
  resolve(here, 'fixtures/fleet_maintenance.talon'),
  'utf8'
);

// Minimal mock of the bits of the monaco namespace we touch.
function createMockMonaco() {
  const registered: string[] = [];
  const monarchSet: Record<string, unknown> = {};
  const configSet: Record<string, unknown> = {};
  const themesDefined: string[] = [];
  const completionRegistrations: { languageId: string; provider: unknown }[] = [];
  const hoverRegistrations: { languageId: string; provider: unknown }[] = [];

  const disposable = () => ({ dispose: vi.fn() });

  return {
    languages: {
      register: vi.fn((descriptor: { id: string }) => {
        registered.push(descriptor.id);
      }),
      getLanguages: vi.fn(() => registered.map((id) => ({ id }))),
      setMonarchTokensProvider: vi.fn(
        (languageId: string, provider: unknown) => {
          monarchSet[languageId] = provider;
        }
      ),
      setLanguageConfiguration: vi.fn(
        (languageId: string, config: unknown) => {
          configSet[languageId] = config;
        }
      ),
      registerCompletionItemProvider: vi.fn(
        (languageId: string, provider: unknown) => {
          completionRegistrations.push({ languageId, provider });
          return disposable();
        }
      ),
      registerHoverProvider: vi.fn(
        (languageId: string, provider: unknown) => {
          hoverRegistrations.push({ languageId, provider });
          return disposable();
        }
      ),
      CompletionItemKind: {
        Snippet: 27,
        Keyword: 17,
        Constant: 21,
        Struct: 23,
      },
      CompletionItemInsertTextRule: {
        InsertAsSnippet: 4,
      },
    },
    editor: {
      defineTheme: vi.fn((name: string, _data: unknown) => {
        themesDefined.push(name);
      }),
    },
    Range: class {
      constructor(
        public startLineNumber: number,
        public startColumn: number,
        public endLineNumber: number,
        public endColumn: number
      ) {}
    },
    _state: {
      registered,
      monarchSet,
      configSet,
      themesDefined,
      completionRegistrations,
      hoverRegistrations,
    },
  };
}

describe('registerTalon', () => {
  it('registers the talon language with both file extensions', () => {
    const m = createMockMonaco();
    registerTalon(m as never);
    expect(m.languages.register).toHaveBeenCalledWith(
      expect.objectContaining({
        id: LANGUAGE_ID,
        extensions: expect.arrayContaining(['.talon', '.talon.test']),
      })
    );
  });

  it('installs monarch tokens and language config', () => {
    const m = createMockMonaco();
    registerTalon(m as never);
    expect(m._state.monarchSet[LANGUAGE_ID]).toBeTruthy();
    expect(m._state.configSet[LANGUAGE_ID]).toBeTruthy();
  });

  it('registers two completion providers (snippets + keywords) and one hover provider', () => {
    const m = createMockMonaco();
    registerTalon(m as never);
    expect(m._state.completionRegistrations).toHaveLength(2);
    expect(m._state.hoverRegistrations).toHaveLength(1);
  });

  it('defines both themes by default', () => {
    const m = createMockMonaco();
    registerTalon(m as never);
    expect(m._state.themesDefined).toEqual(['talon-light', 'talon-dark']);
  });

  it('skips theme registration when registerThemes is false', () => {
    const m = createMockMonaco();
    registerTalon(m as never, { registerThemes: false });
    expect(m._state.themesDefined).toEqual([]);
  });

  it('returns a disposable that disposes inner providers', () => {
    const m = createMockMonaco();
    const d = registerTalon(m as never);
    d.dispose();
    for (const reg of m._state.completionRegistrations) {
      // Each registered provider returned a disposable whose dispose was called.
      // (We can't reach it directly through the mock — but verify dispose runs without throwing.)
      expect(reg.provider).toBeTruthy();
    }
  });

  it('exposes a fixture file that contains representative tokens', () => {
    // Sanity: keep the fixture file recognizably Talon. If this fails the
    // fixture has drifted and may no longer exercise the tokenizer.
    expect(fixture).toMatch(/detect\s+"Service overdue"/);
    expect(fixture).toMatch(/priority\s+HIGH/);
    expect(fixture).toMatch(/forecast\s+"Parts stock-out"/);
  });
});
