// Mirrors talon-language/internal/lexer/lexer.go (keywords map).
// Keep in sync when the Go lexer changes.

export const BLOCK_KEYWORDS = [
  'detect',
  'rule',
  'recommend',
  'combine',
  'define',
  'workflow',
  'predict',
  'forecast',
  'cluster',
  'classify',
  'find',
  'test',
] as const;

export const CLAUSE_KEYWORDS = [
  'for',
  'where',
  'when',
  'and',
  'or',
  'not',
  'in',
  'is',
  'has',
  'attr',
  'type',
  'category',
  'status',
  'flag',
  'label',
  'priority',
  'block',
  'allow',
  'reason',
  'action',
  'suggest',
  'return',
  'best',
  'minimize',
  'maximize',
  'requires',
  'approval',
  'from',
  'role',
  'before',
  'after',
  'every',
  'on',
  'step',
  'depends_on',
  'mcp',
  'invoke',
  'context',
  'category_tree',
] as const;

export const ML_KEYWORDS = [
  'anomaly',
  'compared_to',
  'series',
  'over',
  'within',
  'same',
  'similar',
  'calculate',
  'threshold',
  'learned_threshold',
  'trained_on',
  'features',
  'confidence',
] as const;

export const UNIT_KEYWORDS = [
  'days',
  'weeks',
  'months',
  'years',
  'km',
  'last',
  'next',
  'matching',
  'records',
  'items',
  'each',
  'today',
  'changed_to',
] as const;

export const STRING_OP_KEYWORDS = [
  'contains',
  'starts_with',
  'ends_with',
  'older_than',
  'newer_than',
] as const;

// Case-sensitive — only uppercase forms are valid (matches Go lexer).
export const PRIORITY_KEYWORDS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

export const BOOLEAN_KEYWORDS = ['true', 'false'] as const;

// `test` lives in BLOCK_KEYWORDS; these are body keywords for test blocks.
export const TEST_KEYWORDS = ['given', 'expect', 'flagged', 'record'] as const;

export type KeywordCategory =
  | 'block'
  | 'clause'
  | 'ml'
  | 'unit'
  | 'stringOp'
  | 'priority'
  | 'boolean'
  | 'test';

export const KEYWORD_CATEGORY: Record<string, KeywordCategory> = (() => {
  const m: Record<string, KeywordCategory> = {};
  for (const k of BLOCK_KEYWORDS) m[k] = 'block';
  for (const k of CLAUSE_KEYWORDS) m[k] = 'clause';
  for (const k of ML_KEYWORDS) m[k] = 'ml';
  for (const k of UNIT_KEYWORDS) m[k] = 'unit';
  for (const k of STRING_OP_KEYWORDS) m[k] = 'stringOp';
  for (const k of PRIORITY_KEYWORDS) m[k] = 'priority';
  for (const k of BOOLEAN_KEYWORDS) m[k] = 'boolean';
  for (const k of TEST_KEYWORDS) m[k] = 'test';
  return m;
})();

export const ALL_KEYWORDS: readonly string[] = Object.keys(KEYWORD_CATEGORY);
