/**
 * Unit Tests for Credit Card Validation (Luhn Algorithm)
 */

// Import the actual validation function
const validateCreditCard = require('./credit-card-validation');

describe('Credit Card Validation (Luhn Algorithm)', () => {
  describe('Valid credit card numbers', () => {
    test('validates Visa card (16 digits)', () => {
      const params = { valueToValidate: '4532015112830366' };
      expect(validateCreditCard(params)).toBe(true);
    });

    test('validates Mastercard (16 digits)', () => {
      const params = { valueToValidate: '5425233430109903' };
      expect(validateCreditCard(params)).toBe(true);
    });

    test('validates American Express (15 digits)', () => {
      const params = { valueToValidate: '374245455400126' };
      expect(validateCreditCard(params)).toBe(true);
    });

    test('validates card with spaces', () => {
      const params = { valueToValidate: '4532 0151 1283 0366' };
      expect(validateCreditCard(params)).toBe(true);
    });

    test('validates card with dashes', () => {
      const params = { valueToValidate: '4532-0151-1283-0366' };
      expect(validateCreditCard(params)).toBe(true);
    });
  });

  describe('Invalid credit card numbers', () => {
    test('rejects invalid checksum', () => {
      const params = { valueToValidate: '4532015112830367' }; // Last digit changed
      expect(validateCreditCard(params)).toBe(false);
    });

    test('rejects card with less than 15 digits', () => {
      const params = { valueToValidate: '12345678901234' };
      expect(validateCreditCard(params)).toBe(false);
    });

    test('rejects card with more than 20 digits', () => {
      const params = { valueToValidate: '123456789012345678901' };
      expect(validateCreditCard(params)).toBe(false);
    });

    test('rejects non-numeric string', () => {
      const params = { valueToValidate: 'not-a-card-number' };
      expect(validateCreditCard(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateCreditCard(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles card number with special characters', () => {
      const params = { valueToValidate: '4532-0151-1283-0366!' };
      expect(validateCreditCard(params)).toBe(true); // Special chars removed
    });

    test('validates minimum length (15 digits)', () => {
      const params = { valueToValidate: '374245455400126' };
      expect(validateCreditCard(params)).toBe(true);
    });
  });
});
