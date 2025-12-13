/**
 * Unit Tests for Amount Validation
 */

// Import the actual validation function
const validateAmount = require('./amount-validation');

describe('Amount Validation', () => {
  describe('Valid amounts', () => {
    test('validates minimum amount (10.00)', () => {
      const params = { valueToValidate: '10.00' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates maximum amount (10000.00)', () => {
      const params = { valueToValidate: '10000.00' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates amount with 2 decimals', () => {
      const params = { valueToValidate: '1234.56' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates amount with 1 decimal', () => {
      const params = { valueToValidate: '1234.5' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates whole number amount', () => {
      const params = { valueToValidate: '1234' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates mid-range amounts', () => {
      const testCases = ['100', '500.00', '1000.50', '5000.99'];
      testCases.forEach(amount => {
        const params = { valueToValidate: amount };
        expect(validateAmount(params)).toBe(true);
      });
    });
  });

  describe('Invalid amounts', () => {
    test('rejects amount below minimum (9.99)', () => {
      const params = { valueToValidate: '9.99' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects amount above maximum (10000.01)', () => {
      const params = { valueToValidate: '10000.01' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects amount with 3 decimals', () => {
      const params = { valueToValidate: '1234.567' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects negative amount', () => {
      const params = { valueToValidate: '-100' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects zero', () => {
      const params = { valueToValidate: '0' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects non-numeric string', () => {
      const params = { valueToValidate: 'not-an-amount' };
      expect(validateAmount(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateAmount(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('validates exact minimum', () => {
      const params = { valueToValidate: '10' };
      expect(validateAmount(params)).toBe(true);
    });

    test('validates exact maximum', () => {
      const params = { valueToValidate: '10000' };
      expect(validateAmount(params)).toBe(true);
    });

    test('rejects amount with leading zeros', () => {
      const params = { valueToValidate: '0100' };
      expect(validateAmount(params)).toBe(false); // Regex doesn't allow leading zeros
    });

    test('handles Infinity', () => {
      const params = { valueToValidate: 'Infinity' };
      expect(validateAmount(params)).toBe(false);
    });

    test('handles scientific notation', () => {
      const params = { valueToValidate: '1e3' };
      expect(validateAmount(params)).toBe(false); // Regex rejects scientific notation
    });
  });
});
