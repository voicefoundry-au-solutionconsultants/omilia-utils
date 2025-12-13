/**
 * Unit Tests for Conditional Business Logic
 */

const conditionalBusinessLogic = require('./conditional-business-logic');

describe('Conditional Business Logic', () => {
  describe('Successful responses with various account states', () => {
    test('handles overdrawn account', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: -50.00,
          status: "active"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('success');
      expect(result.currentBalance).toBe('-50.00');
      expect(result.accountHealth).toBe('overdrawn');
      expect(result.recommendedAction).toBe('immediate_payment');
      expect(result.canTransact).toBe('false');
    });

    test('handles low balance active account', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 50.00,
          status: "active"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('success');
      expect(result.currentBalance).toBe('50.00');
      expect(result.accountHealth).toBe('low_balance');
      expect(result.recommendedAction).toBe('add_funds');
      expect(result.canTransact).toBe('true');
    });

    test('handles good balance active account', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 1000.00,
          status: "active"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('success');
      expect(result.currentBalance).toBe('1000.00');
      expect(result.accountHealth).toBe('good');
      expect(result.recommendedAction).toBe('none');
      expect(result.canTransact).toBe('true');
    });

    test('handles frozen account', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 500.00,
          status: "frozen"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('success');
      expect(result.accountHealth).toBe('frozen');
      expect(result.recommendedAction).toBe('contact_support');
      expect(result.canTransact).toBe('false');
    });

    test('handles unknown status', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 200.00,
          status: "pending"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('success');
      expect(result.accountHealth).toBe('unknown');
      expect(result.recommendedAction).toBe('verify_account');
      expect(result.canTransact).toBe('false');
    });

    test('handles edge case: exactly 100 balance', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 100.00,
          status: "active"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.accountHealth).toBe('good');
      expect(result.canTransact).toBe('true');
    });

    test('handles edge case: zero balance active account', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          balance: 0,
          status: "active"
        }
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.accountHealth).toBe('low_balance');
      expect(result.canTransact).toBe('true');
    });
  });

  describe('Failed responses', () => {
    test('handles non-200 response codes', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('failed');
      expect(result.currentBalance).toBe('0.00');
      expect(result.accountStatus).toBe('unknown');
      expect(result.accountHealth).toBe('unknown');
      expect(result.recommendedAction).toBe('retry');
      expect(result.canTransact).toBe('false');
      expect(result.FailExitReason).toBe('SERVICE_ERROR');
    });

    test('handles 404 error', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = conditionalBusinessLogic(params);
      
      expect(result.status).toBe('failed');
      expect(result.FailExitReason).toBe('SERVICE_ERROR');
    });
  });
});
