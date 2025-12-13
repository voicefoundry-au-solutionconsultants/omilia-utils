/**
 * Unit Tests for Account Number Validation
 */

// Import the actual validation function
const validateAccountNumber = require('./account-number-validation');

describe('Account Number Validation', () => {
  describe('Valid account numbers', () => {
    test('validates 10-digit account starting with 1', () => {
      const params = { valueToValidate: '1234567890' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates 10-digit account starting with 2', () => {
      const params = { valueToValidate: '2234567890' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates 10-digit account starting with 3', () => {
      const params = { valueToValidate: '3234567890' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates 8-digit account (minimum length)', () => {
      const params = { valueToValidate: '12345678' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates 12-digit account (maximum length)', () => {
      const params = { valueToValidate: '123456789012' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates account with dashes', () => {
      const params = { valueToValidate: '123-456-7890' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates account with spaces', () => {
      const params = { valueToValidate: '123 456 7890' };
      expect(validateAccountNumber(params)).toBe(true);
    });
  });

  describe('Invalid account numbers', () => {
    test('rejects account starting with 4', () => {
      const params = { valueToValidate: '4234567890' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects account starting with 0', () => {
      const params = { valueToValidate: '0234567890' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects account with 7 digits (too short)', () => {
      const params = { valueToValidate: '1234567' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects account with 13 digits (too long)', () => {
      const params = { valueToValidate: '1234567890123' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects account with letters', () => {
      const params = { valueToValidate: '12345abc90' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateAccountNumber(params)).toBe(false);
    });

    test('rejects non-numeric string', () => {
      const params = { valueToValidate: 'not-an-account' };
      expect(validateAccountNumber(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles account with special characters (removed)', () => {
      const params = { valueToValidate: '123-456-7890!' };
      expect(validateAccountNumber(params)).toBe(false); // Special chars not removed, only spaces/dashes
    });

    test('validates minimum valid account', () => {
      const params = { valueToValidate: '10000000' };
      expect(validateAccountNumber(params)).toBe(true);
    });

    test('validates maximum valid account', () => {
      const params = { valueToValidate: '399999999999' };
      expect(validateAccountNumber(params)).toBe(true);
    });
  });
});
