/**
 * Parse Payment History
 * Extracts payment information and calculates summary
 * 
 * Output Function - MUST return object
 * Demonstrates data transformation and calculation
 */

if (params.wsResponseCode === "200") {
  const payments = params.wsResponseBody.paymentHistory;
  
  // Calculate total payments
  let totalAmount = 0;
  let onTimeCount = 0;
  
  payments.forEach(payment => {
    totalAmount += payment.amount;
    if (payment.status === 'onTime') {
      onTimeCount++;
    }
  });
  
  ocpReturn({
    status: "success",
    totalPayments: payments.length.toString(),
    totalAmount: totalAmount.toFixed(2),
    onTimePayments: onTimeCount.toString(),
    lastPaymentDate: payments[0]?.date || "No payments",
    lastPaymentAmount: payments[0]?.amount.toFixed(2) || "0.00"
  });
} else {
  ocpReturn({
    status: "failed",
    totalPayments: "0",
    totalAmount: "0.00",
    onTimePayments: "0",
    lastPaymentDate: "Unknown",
    lastPaymentAmount: "0.00",
    FailExitReason: "SERVICE_ERROR"
  });
}
