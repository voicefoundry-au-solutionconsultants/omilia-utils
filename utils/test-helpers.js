/**
 * Test Utilities for Omilia JavaScript Functions
 * Mock params objects for testing functions locally
 */

// ============================================
// MOCK PARAMS FOR VALIDATION FUNCTIONS
// ============================================

const mockValidationParams = {
  valueToValidate: "1234567890",  // Change this to test different inputs
  Locale: "en-US",
  testMode: true,
  step: 1,
  Timestamp: new Date().toISOString(),
  CurrentHour: new Date().getUTCHours().toString(),
  CurrentTime: new Date().getUTCMinutes().toString()
};

// ============================================
// MOCK PARAMS FOR USER FUNCTIONS
// ============================================

const mockUserFunctionParams = {
  Ani: "5551234567",
  Dnis: "5059876543",
  Locale: "en-US",
  CurrentHour: "14",
  CurrentTime: "30",
  DialogID: "test-dialog-123",
  DialogGroupID: "test-group-456",
  testMode: true,
  extValue1: "12345",
  extValue2: "2025-12-25",
  extValue3: "1234.56"
};

// ============================================
// MOCK PARAMS FOR OUTPUT FUNCTIONS
// ============================================

const mockOutputParams = {
  wsResponseCode: "200",
  wsResponseBody: {
    accountType: "checking",
    balanceDetails: {
      balance: 1234.56,
      dueDate: "2025-12-25",
      minimumPayment: 50.00
    },
    status: "active"
  },
  wsResponseHeaders: [
    { name: "Content-Type", value: "application/json" },
    { name: "X-Auth-Token", value: "abc123xyz789" },
    { name: "X-Session-ID", value: "session-999" }
  ],
  Locale: "en-US",
  testMode: true
};

// ============================================
// MOCK PARAMS FOR ERROR SCENARIOS
// ============================================

const mockErrorParams = {
  wsResponseCode: "404",
  wsResponseBody: {
    error: "Not Found",
    message: "Account not found"
  },
  wsResponseHeaders: [],
  validationResult: "fail",
  validationFailReason: "preBuiltFailed-CreditCard",
  Errors: 2,
  WrongInput: 1
};

// ============================================
// TEST HELPER FUNCTIONS
// ============================================

/**
 * Simulate ocpReturn for local testing
 * In actual Omilia environment, ocpReturn is provided
 */
function ocpReturn(value) {
  console.log("ocpReturn called with:", JSON.stringify(value, null, 2));
  return value;
}

/**
 * Test a validation function
 */
function testValidation(validationFn, testValue) {
  const testParams = { ...mockValidationParams, valueToValidate: testValue };
  console.log(`Testing validation with: "${testValue}"`);
  
  // In Omilia, 'params' is global, but for testing we need to pass it
  // This is a workaround for local testing
  const result = validationFn(testParams);
  console.log(`Result: ${result ? '✓ VALID' : '✗ INVALID'}\n`);
  
  return result;
}

/**
 * Test a user function
 */
function testUserFunction(userFn, customParams = {}) {
  const testParams = { ...mockUserFunctionParams, ...customParams };
  console.log("Testing user function with params:", testParams);
  
  const result = userFn(testParams);
  console.log(`Result: "${result}"\n`);
  
  return result;
}

/**
 * Test an output function
 */
function testOutputFunction(outputFn, customBody = null, customCode = "200") {
  const testParams = {
    ...mockOutputParams,
    wsResponseCode: customCode,
    ...(customBody && { wsResponseBody: customBody })
  };
  
  console.log("Testing output function");
  console.log("Response Code:", testParams.wsResponseCode);
  console.log("Response Body:", testParams.wsResponseBody);
  
  const result = outputFn(testParams);
  console.log("Output:", result, "\n");
  
  return result;
}

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mockValidationParams,
    mockUserFunctionParams,
    mockOutputParams,
    mockErrorParams,
    testValidation,
    testUserFunction,
    testOutputFunction,
    ocpReturn
  };
}
