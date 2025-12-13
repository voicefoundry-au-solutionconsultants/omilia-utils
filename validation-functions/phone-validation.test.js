/**
 * Unit Tests for Phone Number Validation
 */

// Import the actual validation function
const validatePhone = require('./phone-validation');

describe('Phone Validation', () => {
  describe('Valid phone numbers', () => {
    test('validates 10-digit phone number', () => {
      const params = { valueToValidate: '5551234567' };
      expect(validatePhone(params)).toBe(true);
    });

    test('validates phone with parentheses and dashes', () => {
      const params = { valueToValidate: '(555) 123-4567' };
      expect(validatePhone(params)).toBe(true);
    });

    test('validates phone with dashes only', () => {
      const params = { valueToValidate: '555-123-4567' };
      expect(validatePhone(params)).toBe(true);
    });

    test('validates phone with spaces', () => {
      const params = { valueToValidate: '555 123 4567' };
      expect(validatePhone(params)).toBe(true);
    });

    test('validates phone with dots', () => {
      const params = { valueToValidate: '555.123.4567' };
      expect(validatePhone(params)).toBe(true);
    });
  });

  describe('Invalid phone numbers', () => {
    test('rejects phone with only 9 digits', () => {
      const params = { valueToValidate: '555123456' };
      expect(validatePhone(params)).toBe(false);
    });

    test('rejects phone with 11 digits', () => {
      const params = { valueToValidate: '15551234567' };
      expect(validatePhone(params)).toBe(false);
    });

    test('rejects phone with letters', () => {
      const params = { valueToValidate: 'abc5551234' };
      expect(validatePhone(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validatePhone(params)).toBe(false);
    });

    test('rejects non-numeric string', () => {
      const params = { valueToValidate: 'not-a-phone' };
      expect(validatePhone(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles phone with extra characters', () => {
      const params = { valueToValidate: '+1 (555) 123-4567 ext. 123' };
      expect(validatePhone(params)).toBe(false); // Has more than 10 digits
    });

    test('handles phone with country code', () => {
      const params = { valueToValidate: '1-555-123-4567' };
      expect(validatePhone(params)).toBe(false); // 11 digits with country code
    });
  });
});
