/**
 * Parse Account Balance Response
 * Parses WebService response for account information
 * 
 * Output Function - MUST return object
 * Used in WebService/Intelli miniApps Output tab
 */

// Check response code
if (params.wsResponseCode === "200") {
  // Successful response
  const data = params.wsResponseBody;
  
  // Return output object with parsed values
  ocpReturn({
    status: "success",
    accountType: data.accountType,
    balance: data.balanceDetails.balance.toString(),
    dueDate: data.balanceDetails.dueDate,
    minimumPayment: data.balanceDetails.minimumPayment.toString()
  });
} else {
  // Failed response
  ocpReturn({
    status: "failed",
    accountType: "unknown",
    balance: "0",
    dueDate: "unknown",
    minimumPayment: "0"
  });
}
