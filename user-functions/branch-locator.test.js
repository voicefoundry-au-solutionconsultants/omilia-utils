/**
 * Unit Tests for Branch Locator
 */

// Import the actual function
const getBranchName = require('./branch-locator');

describe('Branch Locator', () => {
  describe('Known area codes', () => {
    test('returns New Mexico for 505 area code', () => {
      const params = { Dnis: '5051234567' };
      expect(getBranchName(params)).toBe('New Mexico');
    });

    test('returns Pennsylvania for 272 area code', () => {
      const params = { Dnis: '2721234567' };
      expect(getBranchName(params)).toBe('Pennsylvania');
    });

    test('returns New York for 212 area code', () => {
      const params = { Dnis: '2121234567' };
      expect(getBranchName(params)).toBe('New York');
    });

    test('returns Los Angeles for 213 area code', () => {
      const params = { Dnis: '2131234567' };
      expect(getBranchName(params)).toBe('Los Angeles');
    });

    test('returns Chicago for 312 area code', () => {
      const params = { Dnis: '3121234567' };
      expect(getBranchName(params)).toBe('Chicago');
    });
  });

  describe('Unknown area codes', () => {
    test('returns main for 415 area code', () => {
      const params = { Dnis: '4151234567' };
      expect(getBranchName(params)).toBe('main');
    });

    test('returns main for 800 toll-free', () => {
      const params = { Dnis: '8001234567' };
      expect(getBranchName(params)).toBe('main');
    });

    test('returns main for unrecognized area code', () => {
      const params = { Dnis: '9991234567' };
      expect(getBranchName(params)).toBe('main');
    });
  });

  describe('Edge cases', () => {
    test('handles phone with +1 prefix', () => {
      const params = { Dnis: '+15051234567' };
      expect(getBranchName(params)).toBe('main'); // startsWith doesn't match
    });

    test('handles short DNIS', () => {
      const params = { Dnis: '505' };
      expect(getBranchName(params)).toBe('New Mexico');
    });

    test('handles formatted phone number', () => {
      const params = { Dnis: '(505) 123-4567' };
      expect(getBranchName(params)).toBe('main'); // Doesn't start with 505
    });
  });
});
