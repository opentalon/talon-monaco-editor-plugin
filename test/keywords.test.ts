import { describe, it, expect } from 'vitest';
import {
  BLOCK_KEYWORDS,
  CLAUSE_KEYWORDS,
  ML_KEYWORDS,
  UNIT_KEYWORDS,
  STRING_OP_KEYWORDS,
  PRIORITY_KEYWORDS,
  BOOLEAN_KEYWORDS,
  TEST_KEYWORDS,
  KEYWORD_CATEGORY,
  ALL_KEYWORDS,
} from '../src/keywords.js';

describe('keyword inventory', () => {
  it('has every category populated', () => {
    expect(BLOCK_KEYWORDS.length).toBeGreaterThan(0);
    expect(CLAUSE_KEYWORDS.length).toBeGreaterThan(0);
    expect(ML_KEYWORDS.length).toBeGreaterThan(0);
    expect(UNIT_KEYWORDS.length).toBeGreaterThan(0);
    expect(STRING_OP_KEYWORDS.length).toBeGreaterThan(0);
    expect(PRIORITY_KEYWORDS.length).toBe(4);
    expect(BOOLEAN_KEYWORDS.length).toBe(2);
    expect(TEST_KEYWORDS.length).toBeGreaterThan(0);
  });

  it('priority keywords are uppercase', () => {
    for (const k of PRIORITY_KEYWORDS) {
      expect(k).toBe(k.toUpperCase());
    }
  });

  it('boolean keywords are lowercase', () => {
    for (const k of BOOLEAN_KEYWORDS) {
      expect(k).toBe(k.toLowerCase());
    }
  });

  it('has no duplicates across categories', () => {
    const all = [
      ...BLOCK_KEYWORDS,
      ...CLAUSE_KEYWORDS,
      ...ML_KEYWORDS,
      ...UNIT_KEYWORDS,
      ...STRING_OP_KEYWORDS,
      ...PRIORITY_KEYWORDS,
      ...BOOLEAN_KEYWORDS,
      ...TEST_KEYWORDS,
    ];
    const dupes = all.filter((x, i) => all.indexOf(x) !== i);
    expect(dupes).toEqual([]);
  });

  it('KEYWORD_CATEGORY covers every keyword', () => {
    expect(Object.keys(KEYWORD_CATEGORY).sort()).toEqual([...ALL_KEYWORDS].sort());
  });

  it('includes critical block keywords', () => {
    for (const k of ['detect', 'rule', 'define', 'forecast', 'workflow', 'test']) {
      expect(BLOCK_KEYWORDS).toContain(k);
    }
  });

  it('includes critical clause keywords', () => {
    for (const k of ['for', 'where', 'when', 'flag', 'priority', 'attr']) {
      expect(CLAUSE_KEYWORDS).toContain(k);
    }
  });
});
