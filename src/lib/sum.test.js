import { describe, it, expect } from 'vitest';
import sum from './sum';

describe('sum', () => {
  it('adds the elements of an array', () => {
    expect(sum([6, 4, 7])).toBe(17);
  });

  it('is 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });
});
