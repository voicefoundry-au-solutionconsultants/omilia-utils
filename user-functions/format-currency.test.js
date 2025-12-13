/**
 * Unit Tests for Format Currency
 */

// Import the actual function
const formatCurrency = require('./format-currency');

describe('Format Currency', () => {
  describe('Standard amounts', () => {
    test('formats whole number', () => {
      const params = { extValue1: '1234' };
      expect(formatCurrency(params)).toBe('$1,234.00');
    });

    test('formats amount with cents', () => {
      const params = { extValue1: '1234.56' };
      expect(formatCurrency(params)).toBe('$1,234.56');
    });

    test('formats small amount', () => {
      const params = { extValue1: '9.99' };
      expect(formatCurrency(params)).toBe('$9.99');
    });

    test('formats large amount', () => {
      const params = { extValue1: '1234567.89' };
      expect(formatCurrency(params)).toBe('$1,234,567.89');
    });
  });

  describe('Edge cases', () => {
    test('formats zero', () => {
      const params = { extValue1: '0' };
      expect(formatCurrency(params)).toBe('$0.00');
    });

    test('formats one cent', () => {
      const params = { extValue1: '0.01' };
      expect(formatCurrency(params)).toBe('$0.01');
    });

    test('rounds to 2 decimals', () => {
      const params = { extValue1: '10.999' };
      expect(formatCurrency(params)).toBe('$11.00');
    });

    test('adds trailing zeros', () => {
      const params = { extValue1: '100.5' };
      expect(formatCurrency(params)).toBe('$100.50');
    });

    test('handles numeric input', () => {
      const params = { extValue1: 1234.56 };
      expect(formatCurrency(params)).toBe('$1,234.56');
    });
  });

  describe('Special values', () => {
    test('handles negative amounts', () => {
      const params = { extValue1: '-100.50' };
      expect(formatCurrency(params)).toBe('$-100.50');
    });

    test('handles very large numbers', () => {
      const params = { extValue1: '999999999.99' };
      expect(formatCurrency(params)).toBe('$999,999,999.99');
    });
  });
});
