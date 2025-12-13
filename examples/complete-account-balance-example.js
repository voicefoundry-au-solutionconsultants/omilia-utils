/**
 * Complete Working Example: Account Balance Checker
 * 
 * This example shows all three function types working together in a real scenario:
 * 1. User Function - Gets current timestamp for API call
 * 2. Validation Function - Validates account number format
 * 3. Output Function - Parses balance response
 */

// ============================================
// STEP 1: USER FUNCTION
// Used to build the API endpoint URL with timestamp
// ============================================

/**
 * User Function Name: getBalanceEndpoint
 * Returns: string (URL query parameter)
 * Usage in WebService miniApp Endpoint:
 *   https://api.bank.com/balance?account={{accountParam}}&timestamp={{getBalanceEndpoint}}
 */

const accountNumber = params.extValue1;  // Account number from Orchestrator
const timestamp = Date.now();

// Build query parameters
const queryString = `${encodeURIComponent(accountNumber)}&t=${timestamp}`;

// Return value (no 'return' keyword!)
queryString;

// ============================================
// STEP 2: VALIDATION FUNCTION
// Validates the account number before calling API
// ============================================

/**
 * Validation Function for Account Number miniApp
 * Returns: boolean
 * Business Rules:
 * - Must be 10 digits
 * - Must start with 1, 2, or 3
 * - No letters or special characters
 */

const account = params.valueToValidate;

// Remove any spaces or dashes
const cleaned = account.replace(/[\s-]/g, '');

// Validate format
const isNumeric = /^\d+$/.test(cleaned);
const validLength = cleaned.length === 10;
const validPrefix = /^[123]/.test(cleaned);

// Return boolean (no 'return' keyword!)
isNumeric && validLength && validPrefix;

// ============================================
// STEP 3: OUTPUT FUNCTION
// Parses the WebService response for balance data
// ============================================

/**
 * Output Function for WebService miniApp
 * Returns: object with output fields
 * Maps API response to Orchestrator fields
 */

let result;

if (params.wsResponseCode === "200") {
  // Success case
  const data = params.wsResponseBody;
  
  // Parse and format the response
  const balance = parseFloat(data.balance);
  const availableBalance = parseFloat(data.availableBalance);
  
  result = {
    status: "success",
    currentBalance: balance.toFixed(2),
    availableBalance: availableBalance.toFixed(2),
    accountType: data.accountType || "Unknown",
    lastTransaction: data.lastTransaction?.date || "No recent transactions",
    accountStatus: data.status === "active" ? "active" : "inactive"
  };
  
} else if (params.wsResponseCode === "404") {
  // Account not found
  result = {
    status: "notFound",
    currentBalance: "0.00",
    availableBalance: "0.00",
    accountType: "Unknown",
    lastTransaction: "N/A",
    accountStatus: "unknown",
    FailExitReason: "ACCOUNT_NOT_FOUND"
  };
  
} else if (params.wsResponseCode === "401") {
  // Authentication failed
  result = {
    status: "unauthorized",
    currentBalance: "0.00",
    availableBalance: "0.00",
    accountType: "Unknown",
    lastTransaction: "N/A",
    accountStatus: "unknown",
    FailExitReason: "UNAUTHORIZED"
  };
  
} else {
  // Other errors
  result = {
    status: "error",
    currentBalance: "0.00",
    availableBalance: "0.00",
    accountType: "Unknown",
    lastTransaction: "N/A",
    accountStatus: "unknown",
    FailExitReason: "SERVICE_ERROR"
  };
}

// Return object (no 'return' keyword, use ocpReturn for Isolated Mode)
ocpReturn(result);

// ============================================
// HOW THIS WORKS IN ORCHESTRATOR
// ============================================

/**
 * Flow in Orchestrator:
 * 
 * 1. Numeric miniApp (Account Number)
 *    - Validation tab: Add above validation function
 *    - User enters account number
 *    - Validation function checks format
 *    - Output: AccountNumber field
 * 
 * 2. WebService miniApp (Get Balance)
 *    - Input: Map AccountNumber to extValue1
 *    - User Functions tab: Add getBalanceEndpoint function
 *    - Endpoint: https://api.bank.com/balance?account={{getBalanceEndpoint}}
 *    - Output tab: Add above output function
 *    - Outputs map to Orchestrator fields:
 *      - status -> Status
 *      - currentBalance -> Balance
 *      - availableBalance -> Available
 *      - accountType -> AccountType
 *      - etc.
 * 
 * 3. Announcement miniApp (Read Balance)
 *    - Inputs: Balance, Available, AccountType
 *    - Prompt: "Your {{AccountType}} account balance is ${{Balance}}.
 *               You have ${{Available}} available."
 * 
 * 4. Condition Block
 *    - Check if Status === "success"
 *    - If yes: Continue to next step
 *    - If no: Go to error handler
 */

// ============================================
// TESTING THIS EXAMPLE
// ============================================

/**
 * To test locally (not in Omilia), use test-helpers.js:
 * 
 * const { testValidation, testOutputFunction } = require('./utils/test-helpers');
 * 
 * // Test validation
 * testValidation((params) => {
 *   const account = params.valueToValidate;
 *   const cleaned = account.replace(/[\s-]/g, '');
 *   const isNumeric = /^\d+$/.test(cleaned);
 *   const validLength = cleaned.length === 10;
 *   const validPrefix = /^[123]/.test(cleaned);
 *   return isNumeric && validLength && validPrefix;
 * }, "1234567890");
 * 
 * // Test output function
 * testOutputFunction((params) => {
 *   // ... output function code ...
 * }, {
 *   balance: 1234.56,
 *   availableBalance: 1000.00,
 *   accountType: "checking",
 *   status: "active"
 * }, "200");
 */
