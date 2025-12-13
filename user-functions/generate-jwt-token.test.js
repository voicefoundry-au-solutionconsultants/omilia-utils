/**
 * Unit Tests for Generate JWT Token
 */

// Mock signJwt function (would be provided by Omilia)
const mockSignJwt = (payload, secret, options) => {
  // Simple mock - in real Omilia environment, this is provided
  const header = Buffer.from(JSON.stringify({ alg: options.algorithm, typ: 'JWT' })).toString('base64');
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = 'mock_signature';
  return `${header}.${payloadStr}.${signature}`;
};

// Make signJwt available globally for the function
global.signJwt = mockSignJwt;

// Import the actual function
const generateJwtToken = require('./generate-jwt-token');

describe('Generate JWT Token', () => {
  const mockParams = {
    extValue1: 'user123',
    DialogID: 'dialog-456'
  };

  describe('Basic functionality', () => {
    test('returns a string', () => {
      expect(typeof generateJwtToken(mockParams)).toBe('string');
    });

    test('returns JWT format (three parts separated by dots)', () => {
      const result = generateJwtToken(mockParams);
      const parts = result.split('.');
      expect(parts.length).toBe(3);
    });

    test('includes header, payload, and signature', () => {
      const result = generateJwtToken(mockParams);
      const [header, payload, signature] = result.split('.');
      
      expect(header).toBeTruthy();
      expect(payload).toBeTruthy();
      expect(signature).toBeTruthy();
    });
  });

  describe('Payload content', () => {
    test('includes userId from params', () => {
      const result = generateJwtToken(mockParams);
      const [, payloadPart] = result.split('.');
      const decoded = JSON.parse(Buffer.from(payloadPart, 'base64').toString());
      
      expect(decoded.userId).toBe('user123');
    });

    test('includes sessionId from DialogID', () => {
      const result = generateJwtToken(mockParams);
      const [, payloadPart] = result.split('.');
      const decoded = JSON.parse(Buffer.from(payloadPart, 'base64').toString());
      
      expect(decoded.sessionId).toBe('dialog-456');
    });

    test('includes timestamp', () => {
      const result = generateJwtToken(mockParams);
      const [, payloadPart] = result.split('.');
      const decoded = JSON.parse(Buffer.from(payloadPart, 'base64').toString());
      
      expect(decoded.timestamp).toBeDefined();
      expect(typeof decoded.timestamp).toBe('number');
    });
  });

  describe('Token properties', () => {
    test('generates different tokens for different users', () => {
      const params1 = { extValue1: 'user1', DialogID: 'dialog1' };
      const params2 = { extValue1: 'user2', DialogID: 'dialog1' };
      
      const token1 = generateJwtToken(params1);
      const token2 = generateJwtToken(params2);
      
      expect(token1).not.toBe(token2);
    });

    test('generates different tokens for different sessions', () => {
      const params1 = { extValue1: 'user1', DialogID: 'dialog1' };
      const params2 = { extValue1: 'user1', DialogID: 'dialog2' };
      
      const token1 = generateJwtToken(params1);
      const token2 = generateJwtToken(params2);
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('Configuration', () => {
    test('uses HS256 algorithm', () => {
      const result = generateJwtToken(mockParams);
      const [headerPart] = result.split('.');
      const header = JSON.parse(Buffer.from(headerPart, 'base64').toString());
      
      expect(header.alg).toBe('HS256');
    });

    test('sets JWT type', () => {
      const result = generateJwtToken(mockParams);
      const [headerPart] = result.split('.');
      const header = JSON.parse(Buffer.from(headerPart, 'base64').toString());
      
      expect(header.typ).toBe('JWT');
    });
  });

  describe('Usage scenarios', () => {
    test('can be used in Authorization header', () => {
      const token = generateJwtToken(mockParams);
      const authHeader = `Bearer ${token}`;
      
      expect(authHeader.startsWith('Bearer ')).toBe(true);
      expect(authHeader.length).toBeGreaterThan(20);
    });

    test('token is not empty', () => {
      const token = generateJwtToken(mockParams);
      expect(token.length).toBeGreaterThan(0);
    });
  });

  describe('Edge cases', () => {
    test('handles empty userId', () => {
      const params = { extValue1: '', DialogID: 'dialog-123' };
      const result = generateJwtToken(params);
      expect(result.split('.').length).toBe(3);
    });

    test('handles numeric userId', () => {
      const params = { extValue1: 12345, DialogID: 'dialog-123' };
      const result = generateJwtToken(params);
      expect(result.split('.').length).toBe(3);
    });

    test('handles long userId', () => {
      const params = { 
        extValue1: 'very-long-user-id-with-lots-of-characters-12345', 
        DialogID: 'dialog-123' 
      };
      const result = generateJwtToken(params);
      expect(result.split('.').length).toBe(3);
    });
  });
});

// Clean up global mock
afterAll(() => {
  delete global.signJwt;
});
