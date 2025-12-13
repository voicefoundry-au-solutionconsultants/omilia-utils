/**
 * Unit Tests for Date Validation
 */

// Import the actual validation function
const validateDate = require('./date-validation');

describe('Date Validation', () => {
  // Use UTC to avoid timezone issues
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  describe('Valid dates', () => {
    test('validates today', () => {
      const todayStr = todayUTC.toISOString().split('T')[0];
      const params = { valueToValidate: todayStr };
      expect(validateDate(params)).toBe(true);
    });

    test('validates tomorrow', () => {
      const tomorrow = new Date(todayUTC);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const params = { valueToValidate: tomorrow.toISOString().split('T')[0] };
      expect(validateDate(params)).toBe(true);
    });

    test('validates date 30 days from now', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 30);
      const params = { valueToValidate: future.toISOString().split('T')[0] };
      expect(validateDate(params)).toBe(true);
    });

    test('validates date exactly 60 days from now', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 60);
      const params = { valueToValidate: future.toISOString().split('T')[0] };
      expect(validateDate(params)).toBe(true);
    });
  });

  describe('Invalid dates', () => {
    test('rejects yesterday', () => {
      const yesterday = new Date(todayUTC);
      yesterday.setDate(yesterday.getDate() - 1);
      const params = { valueToValidate: yesterday.toISOString().split('T')[0] };
      expect(validateDate(params)).toBe(false);
    });

    test('rejects date 61 days from now', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 61);
      const params = { valueToValidate: future.toISOString().split('T')[0] };
      expect(validateDate(params)).toBe(false);
    });

    test('rejects invalid date string', () => {
      const params = { valueToValidate: 'not-a-date' };
      expect(validateDate(params)).toBe(false);
    });

    test('rejects empty string', () => {
      const params = { valueToValidate: '' };
      expect(validateDate(params)).toBe(false);
    });

    test('rejects date far in the past', () => {
      const params = { valueToValidate: '2020-01-01' };
      expect(validateDate(params)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles ISO 8601 format with time', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 30);
      const params = { valueToValidate: future.toISOString() };
      expect(validateDate(params)).toBe(true);
    });

    test('handles Date object as string', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 30);
      const params = { valueToValidate: future.toString() };
      expect(validateDate(params)).toBe(true);
    });
  });
});
