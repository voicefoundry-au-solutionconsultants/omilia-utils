/**
 * Unit Tests for ZIP Code Validation
 */

// Import the actual Omilia validation function
// The transformer will automatically wrap it for testing
const validateZipCode = require('./zip-code-validation');

describe('ZIP Code Validation', () => {
  describe('Valid ZIP codes', () => {
    test('validates 5-digit ZIP', () => {
      const params = { valueToValidate: '12345' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates 9-digit ZIP+4', () => {
      const params = { valueToValidate: '123456789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates ZIP with dash (ZIP+4 format)', () => {
      const params = { valueToValidate: '12345-6789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates ZIP with spaces', () => {
      const params = { valueToValidate: '12345 6789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates common ZIP codes', () => {
      const testCases = ['90210', '10001', '60601', '02101'];
      testCases.forEach(zip => {
        const params = { valueToValidate: zip };
        expect(validateZipCode(params)).toBe(true);
      });
    });
  });

  describe('Invalid ZIP codes', () => {
    test('rejects 4-digit code', () => {
      const params = { valueToValidate: '1234' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('rejects 6-digit code', () => {
      const params = { valueToValidate: '123456' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('rejects 10-digit code', () => {
      const params = { valueToValidate: '1234567890' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('rejects code with letters', () => {
      const params = { valueToValidate: '1234A' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('rejects non-numeric string', () => {
      const params = { valueToValidate: 'not-a-zip' };
      expect(validateZipCode(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles ZIP with leading zeros', () => {
      const params = { valueToValidate: '00501' }; // Valid ZIP in NY
      expect(validateZipCode(params)).toBe(true);
    });

    test('handles ZIP+4 with extra spaces', () => {
      const params = { valueToValidate: '12345 - 6789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('rejects Canadian postal code format', () => {
      const params = { valueToValidate: 'K1A 0B1' };
      expect(validateZipCode(params)).toBe(false);
    });

    test('validates ZIP with multiple spaces', () => {
      const params = { valueToValidate: '12345    6789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates ZIP with multiple dashes', () => {
      const params = { valueToValidate: '12345--6789' };
      expect(validateZipCode(params)).toBe(true);
    });

    test('validates ZIP with mixed separators', () => {
      const params = { valueToValidate: '12345 -6789' };
      expect(validateZipCode(params)).toBe(true);
    });
  });
});
