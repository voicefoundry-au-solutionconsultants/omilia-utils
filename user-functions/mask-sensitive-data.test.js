/**
 * Unit Tests for Mask Sensitive Data
 */

// Import the actual function
const maskSensitiveData = require('./mask-sensitive-data');

describe('Mask Sensitive Data', () => {
  describe('Standard account numbers', () => {
    test('masks 10-digit account number', () => {
      const params = { extValue1: '1234567890' };
      expect(maskSensitiveData(params)).toBe('****7890');
    });

    test('masks 12-digit account number', () => {
      const params = { extValue1: '123456789012' };
      expect(maskSensitiveData(params)).toBe('****9012');
    });

    test('masks 8-digit account number', () => {
      const params = { extValue1: '12345678' };
      expect(maskSensitiveData(params)).toBe('****5678');
    });

    test('shows only last 4 digits', () => {
      const params = { extValue1: '9876543210' };
      const result = maskSensitiveData(params);
      expect(result.slice(-4)).toBe('3210');
      expect(result.slice(0, 4)).toBe('****');
    });
  });

  describe('Short numbers', () => {
    test('handles 4-digit number', () => {
      const params = { extValue1: '1234' };
      expect(maskSensitiveData(params)).toBe('****1234');
    });

    test('handles 3-digit number', () => {
      const params = { extValue1: '123' };
      expect(maskSensitiveData(params)).toBe('****123');
    });

    test('handles single digit', () => {
      const params = { extValue1: '5' };
      expect(maskSensitiveData(params)).toBe('****5');
    });
  });

  describe('Input types', () => {
    test('handles numeric input', () => {
      const params = { extValue1: 1234567890 };
      expect(maskSensitiveData(params)).toBe('****7890');
    });

    test('handles string input', () => {
      const params = { extValue1: '1234567890' };
      expect(maskSensitiveData(params)).toBe('****7890');
    });

    test('handles account with leading zeros', () => {
      const params = { extValue1: '0001234567' };
      expect(maskSensitiveData(params)).toBe('****4567');
    });
  });

  describe('Return format', () => {
    test('always returns string', () => {
      const params = { extValue1: '1234567890' };
      expect(typeof maskSensitiveData(params)).toBe('string');
    });

    test('always has 4 asterisks', () => {
      const params = { extValue1: '1234567890' };
      const result = maskSensitiveData(params);
      expect(result.startsWith('****')).toBe(true);
    });

    test('total length is asterisks + last 4', () => {
      const params = { extValue1: '1234567890' };
      expect(maskSensitiveData(params).length).toBe(8); // **** + 4 digits
    });
  });

  describe('Edge cases', () => {
    test('handles very long number', () => {
      const params = { extValue1: '12345678901234567890' };
      expect(maskSensitiveData(params)).toBe('****7890');
    });

    test('handles empty string', () => {
      const params = { extValue1: '' };
      expect(maskSensitiveData(params)).toBe('****');
    });

    test('preserves all digits when 4 or fewer', () => {
      const testCases = ['1', '12', '123', '1234'];
      testCases.forEach(number => {
        const params = { extValue1: number };
        const result = maskSensitiveData(params);
        expect(result).toBe(`****${number}`);
      });
    });
  });
});
