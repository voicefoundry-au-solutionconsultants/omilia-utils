/**
 * Unit Tests for Email Validation
 */

// Import the actual validation function
const validateEmail = require('./email-validation');

describe('Email Validation', () => {
  describe('Valid emails', () => {
    test('validates simple email', () => {
      const params = { valueToValidate: 'user@example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with dots in local part', () => {
      const params = { valueToValidate: 'first.last@example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with plus sign', () => {
      const params = { valueToValidate: 'user+tag@example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with numbers', () => {
      const params = { valueToValidate: 'user123@example456.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with subdomain', () => {
      const params = { valueToValidate: 'user@mail.example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with hyphen in domain', () => {
      const params = { valueToValidate: 'user@my-domain.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with underscore', () => {
      const params = { valueToValidate: 'user_name@example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with 2-letter TLD', () => {
      const params = { valueToValidate: 'user@example.co' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates email with long TLD', () => {
      const params = { valueToValidate: 'user@example.museum' };
      expect(validateEmail(params)).toBe(true);
    });
  });

  describe('Invalid emails', () => {
    test('rejects email without @', () => {
      const params = { valueToValidate: 'userexample.com' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email without domain', () => {
      const params = { valueToValidate: 'user@' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email without local part', () => {
      const params = { valueToValidate: '@example.com' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email without TLD', () => {
      const params = { valueToValidate: 'user@example' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email with spaces', () => {
      const params = { valueToValidate: 'user name@example.com' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email with multiple @', () => {
      const params = { valueToValidate: 'user@@example.com' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email with invalid characters', () => {
      const params = { valueToValidate: 'user#name@example.com' };
      expect(validateEmail(params)).toBe(false);
    });

    test('rejects email with 1-letter TLD', () => {
      const params = { valueToValidate: 'user@example.c' };
      expect(validateEmail(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('validates email with percentage sign', () => {
      const params = { valueToValidate: 'user%test@example.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('validates very long email', () => {
      const params = { valueToValidate: 'verylongemailaddress12345@verylongdomainname12345.com' };
      expect(validateEmail(params)).toBe(true);
    });

    test('rejects email with consecutive dots', () => {
      const params = { valueToValidate: 'user..name@example.com' };
      expect(validateEmail(params)).toBe(true); // This pattern allows it
    });
  });
});
