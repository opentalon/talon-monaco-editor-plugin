import type * as monaco from 'monaco-editor';

import { LANGUAGE_ID } from './language-id.js';
import { languageConfiguration } from './language-config.js';
import { monarchLanguage } from './monarch.js';
import { registerSnippets } from './snippets.js';
import { registerKeywordCompletions } from './completions.js';
import { registerHovers } from './hovers.js';
import { lightTheme } from './theme-light.js';
import { darkTheme } from './theme-dark.js';

export { LANGUAGE_ID };
export { monarchLanguage } from './monarch.js';
export { languageConfiguration } from './language-config.js';
export { lightTheme } from './theme-light.js';
export { darkTheme } from './theme-dark.js';

export interface RegisterOptions {
  /** Register `talon-light` and `talon-dark` themes. Defaults to true. */
  registerThemes?: boolean;
}

/**
 * Register the Talon language, configuration, snippets, completions, hovers,
 * and (by default) light/dark themes with the given Monaco instance.
 * Returns a disposable that unregisters everything.
 */
export function registerTalon(
  m: typeof monaco,
  opts: RegisterOptions = {}
): monaco.IDisposable {
  const { registerThemes = true } = opts;

  const isRegistered = m.languages
    .getLanguages()
    .some((l) => l.id === LANGUAGE_ID);
  if (!isRegistered) {
    m.languages.register({ id: LANGUAGE_ID, extensions: ['.talon', '.talon.test'], aliases: ['Talon', 'talon'] });
  }

  m.languages.setMonarchTokensProvider(LANGUAGE_ID, monarchLanguage);
  m.languages.setLanguageConfiguration(LANGUAGE_ID, languageConfiguration);

  const disposables: monaco.IDisposable[] = [
    registerSnippets(m),
    registerKeywordCompletions(m),
    registerHovers(m),
  ];

  if (registerThemes) {
    m.editor.defineTheme('talon-light', lightTheme);
    m.editor.defineTheme('talon-dark', darkTheme);
  }

  return {
    dispose() {
      for (const d of disposables) d.dispose();
    },
  };
}
