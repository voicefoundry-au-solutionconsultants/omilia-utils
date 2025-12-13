/**
 * Unit Tests for Dynamic Greeting
 */

// Import the actual function
const getDynamicGreeting = require('./dynamic-greeting');

describe('Dynamic Greeting', () => {
  describe('Morning greetings', () => {
    test('returns Good Morning at 6 UTC (9 AM local)', () => {
      const params = { CurrentHour: '6' };
      expect(getDynamicGreeting(params)).toBe('Good Morning');
    });

    test('returns Good Morning at 8 UTC (11 AM local)', () => {
      const params = { CurrentHour: '8' };
      expect(getDynamicGreeting(params)).toBe('Good Morning');
    });

    test('returns Good Morning at midnight UTC (3 AM local)', () => {
      const params = { CurrentHour: '0' };
      expect(getDynamicGreeting(params)).toBe('Good Morning');
    });
  });

  describe('Afternoon greetings', () => {
    test('returns Good Afternoon at 9 UTC (12 PM local)', () => {
      const params = { CurrentHour: '9' };
      expect(getDynamicGreeting(params)).toBe('Good Afternoon');
    });

    test('returns Good Afternoon at 12 UTC (3 PM local)', () => {
      const params = { CurrentHour: '12' };
      expect(getDynamicGreeting(params)).toBe('Good Afternoon');
    });

    test('returns Good Afternoon at 14 UTC (5 PM local)', () => {
      const params = { CurrentHour: '14' };
      expect(getDynamicGreeting(params)).toBe('Good Afternoon');
    });
  });

  describe('Evening greetings', () => {
    test('returns Good Evening at 15 UTC (6 PM local)', () => {
      const params = { CurrentHour: '15' };
      expect(getDynamicGreeting(params)).toBe('Good Evening');
    });

    test('returns Good Evening at 18 UTC (9 PM local)', () => {
      const params = { CurrentHour: '18' };
      expect(getDynamicGreeting(params)).toBe('Good Evening');
    });

    test('returns Good Evening at 21 UTC (midnight local)', () => {
      const params = { CurrentHour: '21' };
      expect(getDynamicGreeting(params)).toBe('Good Evening');
    });
  });

  describe('Edge cases', () => {
    test('handles hour 23 UTC (2 AM local next day)', () => {
      const params = { CurrentHour: '23' };
      expect(getDynamicGreeting(params)).toBe('Good Morning');
    });

    test('handles numeric input', () => {
      const params = { CurrentHour: 10 };
      expect(getDynamicGreeting(params)).toBe('Good Afternoon');
    });
  });
});
