/**
 * Unit Tests for Custom List Validation
 */

// Import the actual validation function
const validateCustomList = require('./custom-list-validation');

describe('Custom List Validation', () => {
  describe('Valid values', () => {
    test('validates "checking"', () => {
      const params = { valueToValidate: 'checking' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates "savings"', () => {
      const params = { valueToValidate: 'savings' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates "credit"', () => {
      const params = { valueToValidate: 'credit' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates "mortgage"', () => {
      const params = { valueToValidate: 'mortgage' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates "loan"', () => {
      const params = { valueToValidate: 'loan' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates uppercase input', () => {
      const params = { valueToValidate: 'CHECKING' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates mixed case input', () => {
      const params = { valueToValidate: 'ChEcKiNg' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates input with leading spaces', () => {
      const params = { valueToValidate: '  checking' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates input with trailing spaces', () => {
      const params = { valueToValidate: 'checking  ' };
      expect(validateCustomList(params)).toBe(true);
    });

    test('validates input with both leading and trailing spaces', () => {
      const params = { valueToValidate: '  checking  ' };
      expect(validateCustomList(params)).toBe(true);
    });
  });

  describe('Invalid values', () => {
    test('rejects value not in list', () => {
      const params = { valueToValidate: 'investment' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('rejects partially matching value', () => {
      const params = { valueToValidate: 'check' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('rejects value with typo', () => {
      const params = { valueToValidate: 'checkng' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('rejects numeric value', () => {
      const params = { valueToValidate: '123' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('rejects special characters', () => {
      const params = { valueToValidate: 'checking!' };
      expect(validateCustomList(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('rejects spaces only', () => {
      const params = { valueToValidate: '   ' };
      expect(validateCustomList(params)).toBe(false);
    });

    test('validates all allowed values', () => {
      const allowedValues = ['checking', 'savings', 'credit', 'mortgage', 'loan'];
      allowedValues.forEach(value => {
        const params = { valueToValidate: value };
        expect(validateCustomList(params)).toBe(true);
      });
    });

    test('rejects value with extra words', () => {
      const params = { valueToValidate: 'checking account' };
      expect(validateCustomList(params)).toBe(false);
    });
  });
});
