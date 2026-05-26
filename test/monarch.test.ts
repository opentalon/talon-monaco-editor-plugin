import { describe, it, expect } from 'vitest';
import { monarchLanguage } from '../src/monarch.js';

describe('monarch grammar', () => {
  it('declares all keyword arrays the tokenizer references', () => {
    const lang = monarchLanguage as Record<string, unknown>;
    for (const key of [
      'blockKeywords',
      'clauseKeywords',
      'mlKeywords',
      'unitKeywords',
      'stringOpKeywords',
      'priorityKeywords',
      'booleanKeywords',
      'testKeywords',
    ]) {
      expect(Array.isArray(lang[key])).toBe(true);
      expect((lang[key] as unknown[]).length).toBeGreaterThan(0);
    }
  });

  it('defines the required tokenizer states', () => {
    const tokenizer = monarchLanguage.tokenizer as Record<string, unknown>;
    expect(tokenizer.root).toBeTruthy();
    expect(tokenizer.string).toBeTruthy();
    expect(tokenizer.template).toBeTruthy();
    expect(tokenizer.blockComment).toBeTruthy();
  });
});
