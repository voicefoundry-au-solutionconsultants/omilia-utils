/**
 * Unit Tests for Build Dynamic URL
 */

// Import the actual function
const buildDynamicUrl = require('./build-dynamic-url');

describe('Build Dynamic URL', () => {
  describe('Basic functionality', () => {
    test('includes userId parameter', () => {
      const params = { extValue1: '12345' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=12345');
    });

    test('includes timestamp parameter', () => {
      const params = { extValue1: '12345' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('timestamp=');
    });

    test('returns ampersand-separated parameters', () => {
      const params = { extValue1: '12345' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('&');
    });

    test('returns string type', () => {
      const params = { extValue1: '12345' };
      expect(typeof buildDynamicUrl(params)).toBe('string');
    });
  });

  describe('URL encoding', () => {
    test('encodes special characters in userId', () => {
      const params = { extValue1: 'user@domain.com' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=user%40domain.com');
    });

    test('encodes spaces in userId', () => {
      const params = { extValue1: 'user name' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=user%20name');
    });

    test('encodes special characters', () => {
      const params = { extValue1: 'user&id=123' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=user%26id%3D123');
    });
  });

  describe('Timestamp behavior', () => {
    test('generates valid timestamp', () => {
      const params = { extValue1: '12345' };
      const result = buildDynamicUrl(params);
      const match = result.match(/timestamp=(\d+)/);
      expect(match).toBeTruthy();
      const timestamp = parseInt(match[1]);
      expect(timestamp).toBeGreaterThan(1000000000000); // After Sept 2001
    });

    test('generates different timestamps on successive calls', async () => {
      const params = { extValue1: '12345' };
      const result1 = buildDynamicUrl(params);
      
      // Wait 10ms to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const result2 = buildDynamicUrl(params);
      expect(result1).not.toBe(result2);
    });
  });

  describe('Edge cases', () => {
    test('handles numeric userId', () => {
      const params = { extValue1: 999 };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=999');
    });

    test('handles empty userId', () => {
      const params = { extValue1: '' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=');
    });

    test('handles UUID userId', () => {
      const params = { extValue1: '550e8400-e29b-41d4-a716-446655440000' };
      const result = buildDynamicUrl(params);
      expect(result).toContain('userId=550e8400-e29b-41d4-a716-446655440000');
    });
  });
});
