/**
 * Conditional Output Based on Business Logic
 * Routes to different outputs based on complex conditions
 * 
 * Output Function - MUST return object
 * Demonstrates business logic in output parsing
 */

let result;

if (params.wsResponseCode === "200") {
  const account = params.wsResponseBody;
  const balance = parseFloat(account.balance);
  const status = account.status;
  
  // Determine account health based on multiple factors
  let accountHealth;
  let nextAction;
  
  if (balance < 0) {
    accountHealth = "overdrawn";
    nextAction = "immediate_payment";
  } else if (balance < 100 && status === "active") {
    accountHealth = "low_balance";
    nextAction = "add_funds";
  } else if (balance >= 100 && status === "active") {
    accountHealth = "good";
    nextAction = "none";
  } else if (status === "frozen") {
    accountHealth = "frozen";
    nextAction = "contact_support";
  } else {
    accountHealth = "unknown";
    nextAction = "verify_account";
  }
  
  result = {
    status: "success",
    currentBalance: balance.toFixed(2),
    accountStatus: status,
    accountHealth: accountHealth,
    recommendedAction: nextAction,
    canTransact: (status === "active" && balance >= 0) ? "true" : "false"
  };
} else {
  result = {
    status: "failed",
    currentBalance: "0.00",
    accountStatus: "unknown",
    accountHealth: "unknown",
    recommendedAction: "retry",
    canTransact: "false",
    FailExitReason: "SERVICE_ERROR"
  };
}

ocpReturn(result);
