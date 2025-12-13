/**
 * Unit Tests for Pluralize
 */

// Import the actual function
const pluralize = require('./pluralize');

describe('Pluralize', () => {
  describe('Singular cases', () => {
    test('returns empty string for count of 1', () => {
      const params = { extValue1: '1' };
      expect(pluralize(params)).toBe('');
    });

    test('returns empty string for numeric 1', () => {
      const params = { extValue1: 1 };
      expect(pluralize(params)).toBe('');
    });
  });

  describe('Plural cases', () => {
    test('returns "s" for count of 0', () => {
      const params = { extValue1: '0' };
      expect(pluralize(params)).toBe('s');
    });

    test('returns "s" for count of 2', () => {
      const params = { extValue1: '2' };
      expect(pluralize(params)).toBe('s');
    });

    test('returns "s" for count of 10', () => {
      const params = { extValue1: '10' };
      expect(pluralize(params)).toBe('s');
    });

    test('returns "s" for count of 100', () => {
      const params = { extValue1: '100' };
      expect(pluralize(params)).toBe('s');
    });

    test('returns "s" for large numbers', () => {
      const params = { extValue1: '999999' };
      expect(pluralize(params)).toBe('s');
    });
  });

  describe('Usage in sentences', () => {
    test('works with item/items', () => {
      const count1 = { extValue1: '1' };
      const count2 = { extValue1: '2' };
      
      expect(`You have 1 item${pluralize(count1)}`).toBe('You have 1 item');
      expect(`You have 2 item${pluralize(count2)}`).toBe('You have 2 items');
    });

    test('works with transaction/transactions', () => {
      const count1 = { extValue1: '1' };
      const count5 = { extValue1: '5' };
      
      expect(`1 transaction${pluralize(count1)}`).toBe('1 transaction');
      expect(`5 transaction${pluralize(count5)}`).toBe('5 transactions');
    });
  });

  describe('Return type', () => {
    test('always returns string', () => {
      const params = { extValue1: '5' };
      expect(typeof pluralize(params)).toBe('string');
    });

    test('returns either empty string or "s"', () => {
      const result1 = pluralize({ extValue1: '1' });
      const result2 = pluralize({ extValue1: '2' });
      
      expect(['', 's']).toContain(result1);
      expect(['', 's']).toContain(result2);
    });
  });

  describe('Edge cases', () => {
    test('handles negative numbers as plural', () => {
      const params = { extValue1: '-5' };
      expect(pluralize(params)).toBe('s');
    });

    test('handles negative 1 as plural', () => {
      const params = { extValue1: '-1' };
      expect(pluralize(params)).toBe('s');
    });

    test('handles string input', () => {
      const params = { extValue1: '3' };
      expect(pluralize(params)).toBe('s');
    });

    test('handles numeric input', () => {
      const params = { extValue1: 3 };
      expect(pluralize(params)).toBe('s');
    });
  });
});
