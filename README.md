# @opentalon/monaco-talon

Monaco Editor language plugin for [Talon](https://github.com/opentalon/talon-language).

Ships a Monarch tokenizer, language configuration (brackets, comments, auto-close), block-scaffold snippets, keyword autocomplete, hover docs, and `talon-light` / `talon-dark` themes.

## Install

```sh
npm install @opentalon/monaco-talon
```

`monaco-editor` is a peer dependency.

## Usage

```ts
import * as monaco from 'monaco-editor';
import { registerTalon } from '@opentalon/monaco-talon';

registerTalon(monaco);

monaco.editor.create(document.getElementById('editor')!, {
  language: 'talon',
  theme: 'talon-dark',
  value: `detect "Service overdue" {
  for records where type == "item" and status == "active"
  flag matching items
  label "{item.name}: overdue"
  priority HIGH
}`,
});
```

`registerTalon` returns a `monaco.IDisposable` that unregisters everything.

### Options

```ts
registerTalon(monaco, { registerThemes: false }); // skip theme registration
```

## What's included

| Feature | Source |
| --- | --- |
| Tokenizer | Mirrors keywords from `talon-language/internal/lexer/lexer.go` |
| Block scaffolds | `detect`, `rule`, `define`, `recommend`, `forecast`, `workflow`, `test` |
| Themes | `talon-light` (vs base), `talon-dark` (vs-dark base) |

## Keeping in sync

If new keywords are added to the Talon lexer, update `src/keywords.ts` and re-run tests.

## License

Apache-2.0
