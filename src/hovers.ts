import type * as monaco from 'monaco-editor';
import { LANGUAGE_ID } from './language-id.js';

interface Doc {
  title: string;
  body: string;
  example?: string;
}

const DOCS: Record<string, Doc> = {
  // Block keywords
  detect: {
    title: 'detect',
    body: 'Flag records matching the given conditions. Produces detections with a label and priority.',
    example: 'detect "Service overdue" {\n  for records where is "overdue_km"\n  flag matching items\n  label "{item.name}: overdue"\n  priority HIGH\n}',
  },
  rule: {
    title: 'rule',
    body: 'Block or require approval for an action on matching records.',
    example: 'rule "Manager approval" {\n  for records where is "active_vehicle"\n  requires approval from role "manager"\n  reason "..."\n}',
  },
  define: {
    title: 'define',
    body: 'Define a named predicate reusable across blocks via `is "name"`.',
    example: 'define "active_vehicle" {\n  type == "item" and status == "active"\n}',
  },
  recommend: {
    title: 'recommend',
    body: 'Suggest an action triggered by a detection match.',
  },
  forecast: {
    title: 'forecast',
    body: 'Project a metric forward over a time series window.',
    example: 'forecast "Stock-out" {\n  for records where type == "stock_item"\n  series attr "current_stock" over last 90 days\n  priority CRITICAL\n}',
  },
  workflow: {
    title: 'workflow',
    body: 'Multi-step workflow definition with optional dependencies and MCP tool invocations.',
  },
  cluster: { title: 'cluster', body: 'Group records into clusters by similarity.' },
  classify: { title: 'classify', body: 'Assign records to categories using learned rules.' },
  predict: { title: 'predict', body: 'Predict a future value or class for a record.' },
  combine: { title: 'combine', body: 'Combine signals from multiple detections.' },
  find: { title: 'find', body: 'Find records similar to a given example (used with `similar`).' },
  test: { title: 'test', body: 'Test case for rules and detections with `given` / `when` / `expect` sections.' },

  // Clause keywords
  for: { title: 'for', body: 'Begin a record-set selector, usually followed by `records where`.' },
  where: { title: 'where', body: 'Filter records by predicate conditions.' },
  when: { title: 'when', body: 'Trigger condition for `recommend` blocks; references a detection by name.' },
  and: { title: 'and', body: 'Logical conjunction of conditions.' },
  or: { title: 'or', body: 'Logical disjunction of conditions.' },
  not: { title: 'not', body: 'Logical negation.' },
  is: { title: 'is', body: 'Reference a `define`d predicate by quoted name. Also used in `is anomaly`.' },
  attr: { title: 'attr', body: 'Reference an attribute by string name, e.g. `attr "km"`.' },
  flag: { title: 'flag', body: 'Mark matching records as flagged. Usually `flag matching items`.' },
  label: { title: 'label', body: 'Human-readable label for the detection, with `{interpolation}` of fields.' },
  priority: { title: 'priority', body: 'Severity of the detection. Values: LOW, MEDIUM, HIGH, CRITICAL.' },
  block: { title: 'block', body: 'Forbid an action on matching records (used inside `rule`).' },
  allow: { title: 'allow', body: 'Explicitly permit an action on matching records.' },
  requires: { title: 'requires', body: 'Require approval. Typically `requires approval from role "..."`.' },
  reason: { title: 'reason', body: 'Human-readable justification displayed when a rule blocks an action.' },
  suggest: { title: 'suggest', body: 'Recommendation message for `recommend` blocks.' },
  before: { title: 'before', body: 'Lifecycle hook fired before an action.' },
  after: { title: 'after', body: 'Lifecycle hook fired after an action.' },
  step: { title: 'step', body: 'A named step inside a `workflow`.' },
  depends_on: { title: 'depends_on', body: 'Mark a workflow step as depending on another step by name.' },
  mcp: { title: 'mcp', body: 'Invoke an MCP tool from a workflow step (`mcp invoke "tool"`).' },
  invoke: { title: 'invoke', body: 'Call a tool or function — usually paired with `mcp`.' },
  context: { title: 'context', body: 'Reference fields from the surrounding evaluation context.' },

  // ML keywords
  anomaly: { title: 'anomaly', body: 'Anomaly check: `attr "x" is anomaly compared_to last N days`.' },
  compared_to: { title: 'compared_to', body: 'Specifies the comparison window for `is anomaly`.' },
  series: { title: 'series', body: 'Declare a time series for `forecast` blocks.' },
  over: { title: 'over', body: 'Time window qualifier, e.g. `over last 90 days`.' },
  within: { title: 'within', body: 'Bounded time window, e.g. `within last 90 days`.' },
  similar: { title: 'similar', body: 'Used by `find similar to ...` for nearest-neighbor lookup.' },
  calculate: { title: 'calculate', body: 'Compute a metric inline, e.g. `calculate avg_km_weekly from ...`.' },
  threshold: { title: 'threshold', body: 'Numeric cutoff for anomaly/classification.' },
  learned_threshold: { title: 'learned_threshold', body: 'Auto-learned cutoff derived from training data.' },
  trained_on: { title: 'trained_on', body: 'Specify training data source for learned models.' },
  features: { title: 'features', body: 'List of attribute names used as model features.' },
  confidence: { title: 'confidence', body: 'Model confidence score (0–1), referenceable in templates.' },

  // String operators
  contains: { title: 'contains', body: 'String contains substring.' },
  starts_with: { title: 'starts_with', body: 'String starts with prefix.' },
  ends_with: { title: 'ends_with', body: 'String ends with suffix.' },
  older_than: { title: 'older_than', body: 'Date predicate: older than a duration.' },
  newer_than: { title: 'newer_than', body: 'Date predicate: newer than a duration.' },

  // Test
  given: { title: 'given', body: 'Setup section of a test — declare records and attributes.' },
  expect: { title: 'expect', body: 'Assertion section of a test.' },
  flagged: { title: 'flagged', body: 'Assert a record id was flagged (or `not flagged`).' },
  record: { title: 'record', body: 'Declare a test fixture record by id, type, status.' },

  // Priority constants
  LOW: { title: 'LOW', body: 'Lowest priority level.' },
  MEDIUM: { title: 'MEDIUM', body: 'Default priority level.' },
  HIGH: { title: 'HIGH', body: 'Elevated priority level.' },
  CRITICAL: { title: 'CRITICAL', body: 'Highest priority level — alert immediately.' },
};

export function createHoverProvider(
  m: typeof monaco
): monaco.languages.HoverProvider {
  return {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const doc = DOCS[word.word];
      if (!doc) return null;
      const md: monaco.IMarkdownString[] = [
        { value: `**${doc.title}** — ${doc.body}` },
      ];
      if (doc.example) {
        md.push({ value: '```talon\n' + doc.example + '\n```' });
      }
      return {
        range: new m.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
        contents: md,
      };
    },
  };
}

export function registerHovers(m: typeof monaco): monaco.IDisposable {
  return m.languages.registerHoverProvider(LANGUAGE_ID, createHoverProvider(m));
}
