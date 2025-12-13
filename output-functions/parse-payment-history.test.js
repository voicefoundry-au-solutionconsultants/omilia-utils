/**
 * Unit Tests for Parse Payment History
 */

const parsePaymentHistory = require('./parse-payment-history');

describe('Parse Payment History', () => {
  describe('Successful responses', () => {
    test('parses payment history with multiple payments', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          paymentHistory: [
            { date: "2025-01-10", amount: 100.00, status: 'onTime' },
            { date: "2024-12-10", amount: 150.50, status: 'onTime' },
            { date: "2024-11-10", amount: 200.25, status: 'late' }
          ]
        }
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('success');
      expect(result.totalPayments).toBe('3');
      expect(result.totalAmount).toBe('450.75');
      expect(result.onTimePayments).toBe('2');
      expect(result.lastPaymentDate).toBe('2025-01-10');
      expect(result.lastPaymentAmount).toBe('100.00');
    });

    test('handles single payment', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          paymentHistory: [
            { date: "2025-01-01", amount: 50.00, status: 'onTime' }
          ]
        }
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('success');
      expect(result.totalPayments).toBe('1');
      expect(result.totalAmount).toBe('50.00');
      expect(result.onTimePayments).toBe('1');
      expect(result.lastPaymentDate).toBe('2025-01-01');
      expect(result.lastPaymentAmount).toBe('50.00');
    });

    test('handles all late payments', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          paymentHistory: [
            { date: "2025-01-01", amount: 100.00, status: 'late' },
            { date: "2024-12-01", amount: 100.00, status: 'late' }
          ]
        }
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('success');
      expect(result.totalPayments).toBe('2');
      expect(result.totalAmount).toBe('200.00');
      expect(result.onTimePayments).toBe('0');
    });

    test('handles empty payment history', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          paymentHistory: []
        }
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('success');
      expect(result.totalPayments).toBe('0');
      expect(result.totalAmount).toBe('0.00');
      expect(result.onTimePayments).toBe('0');
      expect(result.lastPaymentDate).toBe('No payments');
      expect(result.lastPaymentAmount).toBe('0.00');
    });

    test('calculates correct totals with decimal amounts', () => {
      const params = {
        wsResponseCode: "200",
        wsResponseBody: {
          paymentHistory: [
            { date: "2025-01-01", amount: 10.99, status: 'onTime' },
            { date: "2024-12-01", amount: 20.50, status: 'onTime' },
            { date: "2024-11-01", amount: 5.01, status: 'onTime' }
          ]
        }
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.totalAmount).toBe('36.50');
      expect(result.onTimePayments).toBe('3');
    });
  });

  describe('Failed responses', () => {
    test('handles non-200 response code', () => {
      const params = {
        wsResponseCode: "500"
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('failed');
      expect(result.totalPayments).toBe('0');
      expect(result.totalAmount).toBe('0.00');
      expect(result.onTimePayments).toBe('0');
      expect(result.lastPaymentDate).toBe('Unknown');
      expect(result.lastPaymentAmount).toBe('0.00');
      expect(result.FailExitReason).toBe('SERVICE_ERROR');
    });

    test('handles 404 error', () => {
      const params = {
        wsResponseCode: "404"
      };
      
      const result = parsePaymentHistory(params);
      
      expect(result.status).toBe('failed');
      expect(result.FailExitReason).toBe('SERVICE_ERROR');
    });
  });
});
