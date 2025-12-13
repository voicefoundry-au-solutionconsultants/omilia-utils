/**
 * Unit Tests for Parse Response Headers
 */

const parseResponseHeaders = require('./parse-response-headers');

describe('Parse Response Headers', () => {
  describe('Successful responses', () => {
    test('parses all headers successfully', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [
          { name: "X-Auth-Token", value: "abc123xyz" },
          { name: "X-RateLimit-Remaining", value: "95" },
          { name: "X-Session-ID", value: "session-456" }
        ],
        wsResponseBody: {
          message: "Success"
        }
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.authToken).toBe('abc123xyz');
      expect(result.rateLimitRemaining).toBe('95');
      expect(result.sessionId).toBe('session-456');
      expect(result.bodyData).toBe('Success');
    });

    test('handles missing optional headers', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [
          { name: "X-Auth-Token", value: "token123" }
        ],
        wsResponseBody: {
          message: "Partial data"
        }
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.authToken).toBe('token123');
      expect(result.rateLimitRemaining).toBe('0');
      expect(result.sessionId).toBe('');
      expect(result.bodyData).toBe('Partial data');
    });

    test('handles empty headers array', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [],
        wsResponseBody: {
          message: "No headers"
        }
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.authToken).toBe('');
      expect(result.rateLimitRemaining).toBe('0');
      expect(result.sessionId).toBe('');
    });

    test('handles missing message in body', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [
          { name: "X-Auth-Token", value: "token" }
        ],
        wsResponseBody: {}
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.bodyData).toBe('');
    });

    test('handles rate limit of zero', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [
          { name: "X-RateLimit-Remaining", value: "0" }
        ],
        wsResponseBody: {
          message: "Limited"
        }
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.rateLimitRemaining).toBe('0');
    });

    test('ignores irrelevant headers', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseHeaders: [
          { name: "Content-Type", value: "application/json" },
          { name: "X-Auth-Token", value: "mytoken" },
          { name: "Server", value: "nginx" }
        ],
        wsResponseBody: {
          message: "Data"
        }
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('success');
      expect(result.authToken).toBe('mytoken');
    });
  });

  describe('Failed responses', () => {
    test('handles non-200 response code', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('failed');
      expect(result.authToken).toBe('');
      expect(result.rateLimitRemaining).toBe('0');
      expect(result.sessionId).toBe('');
      expect(result.bodyData).toBe('');
      expect(result.FailExitReason).toBe('HEADER_MISSING');
    });

    test('handles 404 error', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('failed');
      expect(result.FailExitReason).toBe('HEADER_MISSING');
    });

    test('handles 401 unauthorized', () => {
      const params = {
        wsResponseCode: "401"
      };
      
      const result = parseResponseHeaders(params);
      
      expect(result.status).toBe('failed');
      expect(result.FailExitReason).toBe('HEADER_MISSING');
    });
  });
});
