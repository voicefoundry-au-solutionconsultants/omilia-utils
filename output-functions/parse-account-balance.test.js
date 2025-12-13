/**
 * Unit Tests for Parse Account Balance
 */

const parseAccountBalance = require('./parse-account-balance');

describe('Parse Account Balance', () => {
  describe('Successful responses', () => {
    test('parses successful 200 response with account data', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          accountType: "Checking",
          balanceDetails: {
            balance: 1234.56,
            dueDate: "2025-01-15",
            minimumPayment: 50.00
          }
        }
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('success');
      expect(result.accountType).toBe('Checking');
      expect(result.balance).toBe('1234.56');
      expect(result.dueDate).toBe('2025-01-15');
      expect(result.minimumPayment).toBe('50');
    });

    test('handles zero balance', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          accountType: "Savings",
          balanceDetails: {
            balance: 0,
            dueDate: "2025-02-01",
            minimumPayment: 0
          }
        }
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('success');
      expect(result.balance).toBe('0');
      expect(result.minimumPayment).toBe('0');
    });

    test('handles negative balance', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          accountType: "Credit",
          balanceDetails: {
            balance: -500.25,
            dueDate: "2025-01-01",
            minimumPayment: 500.25
          }
        }
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('success');
      expect(result.balance).toBe('-500.25');
    });
  });

  describe('Failed responses', () => {
    test('handles 400 error response', () => {
      const params = {
        wsResponseCode: "400"
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('failed');
      expect(result.accountType).toBe('unknown');
      expect(result.balance).toBe('0');
      expect(result.dueDate).toBe('unknown');
      expect(result.minimumPayment).toBe('0');
    });

    test('handles 500 error response', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('failed');
    });

    test('handles 404 error response', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = parseAccountBalance(params);
      
      expect(result.status).toBe('failed');
    });
  });
});
