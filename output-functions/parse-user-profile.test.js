/**
 * Unit Tests for Parse User Profile
 */

const parseUserProfile = require('./parse-user-profile');

describe('Parse User Profile', () => {
  describe('Successful responses', () => {
    test('parses complete user profile', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          firstName: "John",
          lastName: "Doe",
          membershipDate: "2020-01-15",
          status: "active"
        }
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('success');
      expect(result.firstName).toBe('John');
      expect(result.lastName).toBe('Doe');
      expect(result.memberSince).toBe('2020-01-15');
      expect(result.accountStatus).toBe('active');
      expect(result.FailExitReason).toBeUndefined();
    });

    test('handles missing optional fields with defaults', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          firstName: "Jane"
        }
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('success');
      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Unknown');
      expect(result.memberSince).toBe('Unknown');
      expect(result.accountStatus).toBe('Unknown');
    });

    test('handles empty strings in response', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          firstName: "",
          lastName: "",
          membershipDate: "",
          status: ""
        }
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('success');
      expect(result.firstName).toBe('Unknown');
      expect(result.lastName).toBe('Unknown');
    });
  });

  describe('Error responses', () => {
    test('handles 400 bad request', () => {
      const params = {
        wsResponseCode: "400"
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('failed');
      expect(result.FailExitReason).toBe('BAD_REQUEST');
      expect(result.firstName).toBe('Unknown');
    });

    test('handles 401 unauthorized', () => {
      const params = {
        wsResponseCode: "401"
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('failed');
      expect(result.FailExitReason).toBe('UNAUTHORIZED');
    });

    test('handles 404 user not found', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('failed');
      expect(result.FailExitReason).toBe('USER_NOT_FOUND');
    });

    test('handles 500 internal server error', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('failed');
      expect(result.FailExitReason).toBe('INTERNAL_SERVER_ERROR');
    });

    test('handles unknown error codes', () => {
      const params = {
        wsResponseCode: "503"
      };
      
      const result = parseUserProfile(params);
      
      expect(result.output1).toBe('failed');
      expect(result.FailExitReason).toBe('UNKNOWN_ERROR');
    });
  });
});
