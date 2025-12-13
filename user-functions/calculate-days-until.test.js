/**
 * Unit Tests for Calculate Days Until
 */

// Import the actual function
const calculateDaysUntil = require('./calculate-days-until');

describe('Calculate Days Until', () => {
  // Use UTC to avoid timezone issues
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  describe('Future dates', () => {
    test('calculates days for tomorrow', () => {
      const tomorrow = new Date(todayUTC);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const params = { extValue1: tomorrow.toISOString() };
      expect(calculateDaysUntil(params)).toBe('1');
    });

    test('calculates days for next week', () => {
      const nextWeek = new Date(todayUTC);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const params = { extValue1: nextWeek.toISOString() };
      expect(calculateDaysUntil(params)).toBe('7');
    });

    test('calculates days for 30 days from now', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 30);
      const params = { extValue1: future.toISOString() };
      expect(calculateDaysUntil(params)).toBe('30');
    });

    test('calculates days for 90 days from now', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 90);
      const params = { extValue1: future.toISOString() };
      expect(calculateDaysUntil(params)).toBe('90');
    });
  });

  describe('Past dates', () => {
    test('returns negative for yesterday', () => {
      const yesterday = new Date(todayUTC);
      yesterday.setDate(yesterday.getDate() - 1);
      const params = { extValue1: yesterday.toISOString() };
      expect(calculateDaysUntil(params)).toBe('-1');
    });

    test('returns negative for last week', () => {
      const lastWeek = new Date(todayUTC);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const params = { extValue1: lastWeek.toISOString() };
      expect(calculateDaysUntil(params)).toBe('-7');
    });
  });

  describe('Special cases', () => {
    test('returns 0 for today', () => {
      const params = { extValue1: today.toISOString() };
      expect(calculateDaysUntil(params)).toBe('0');
    });

    test('returns string type', () => {
      const tomorrow = new Date(todayUTC);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const params = { extValue1: tomorrow.toISOString() };
      expect(typeof calculateDaysUntil(params)).toBe('string');
    });
  });

  describe('Edge cases', () => {
    test('handles date string format', () => {
      const future = new Date(todayUTC);
      future.setDate(future.getDate() + 10);
      const params = { extValue1: future.toISOString().split('T')[0] };
      expect(calculateDaysUntil(params)).toBe('10');
    });

    test('uses Math.ceil for partial days', () => {
      const future = new Date(todayUTC);
      future.setHours(12, 0, 0, 0); // Noon tomorrow
      future.setDate(future.getDate() + 1);
      const params = { extValue1: future.toISOString() };
      const result = parseInt(calculateDaysUntil(params));
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });
});
