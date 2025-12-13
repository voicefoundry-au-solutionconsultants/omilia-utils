/**
 * Unit Tests for Format Date
 */

// Import the actual function
const formatDate = require('./format-date');

describe('Format Date', () => {
  describe('Standard dates', () => {
    test('formats ISO date string', () => {
      const params = { extValue1: '2025-12-25' };
      const result = formatDate(params);
      expect(result).toContain('December');
      expect(result).toContain('25');
      expect(result).toContain('2025');
    });

    test('formats date with time', () => {
      const params = { extValue1: '2025-07-04T12:00:00Z' };
      const result = formatDate(params);
      expect(result).toContain('July');
      expect(result).toContain('4');
      expect(result).toContain('2025');
    });

    test('includes weekday name', () => {
      const params = { extValue1: '2025-01-01' }; // Wednesday
      const result = formatDate(params);
      expect(result).toContain('Wednesday');
    });
  });

  describe('Various date formats', () => {
    test('handles mm/dd/yyyy format', () => {
      const params = { extValue1: '12/25/2025' };
      const result = formatDate(params);
      expect(result).toContain('December');
      expect(result).toContain('25');
      expect(result).toContain('2025');
    });

    test('handles timestamp', () => {
      const params = { extValue1: '1735084800000' }; // Dec 25, 2024
      const result = formatDate(params);
      expect(result).toContain('2024');
    });
  });

  describe('Edge cases', () => {
    test('formats New Years Day', () => {
      const params = { extValue1: '2025-01-01' };
      const result = formatDate(params);
      expect(result).toContain('January');
      expect(result).toContain('1');
    });

    test('formats leap year date', () => {
      const params = { extValue1: '2024-02-29' };
      const result = formatDate(params);
      expect(result).toContain('February');
      expect(result).toContain('29');
    });

    test('formats end of year', () => {
      const params = { extValue1: '2025-12-31' };
      const result = formatDate(params);
      expect(result).toContain('December');
      expect(result).toContain('31');
    });
  });

  describe('Return format', () => {
    test('returns string type', () => {
      const params = { extValue1: '2025-12-25' };
      expect(typeof formatDate(params)).toBe('string');
    });

    test('includes full month name', () => {
      const params = { extValue1: '2025-06-15' };
      expect(formatDate(params)).toContain('June');
    });

    test('includes full weekday name', () => {
      const params = { extValue1: '2025-01-01' };
      const result = formatDate(params);
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const hasWeekday = weekdays.some(day => result.includes(day));
      expect(hasWeekday).toBe(true);
    });
  });
});
