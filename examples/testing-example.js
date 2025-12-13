/**
 * Testing Example: How to Test Your Functions
 * 
 * This file demonstrates how to test Omilia functions before deploying
 */

// Import test helpers (if using Node.js locally)
// const { testValidation, testUserFunction, testOutputFunction } = require('../utils/test-helpers');

// ============================================
// EXAMPLE 1: Testing a Validation Function
// ============================================

console.log("=== Testing Phone Validation ===");

// The validation function to test
function validatePhone(params) {
  const phoneNumber = params.valueToValidate;
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  return digitsOnly.length === 10;
}

// Test cases
const phoneTestCases = [
  { input: "5551234567", expected: true },
  { input: "(555) 123-4567", expected: true },
  { input: "555-123-4567", expected: true },
  { input: "555123456", expected: false },  // Only 9 digits
  { input: "15551234567", expected: false }, // 11 digits
  { input: "abc5551234", expected: false }   // Contains letters
];

phoneTestCases.forEach(test => {
  const params = { valueToValidate: test.input };
  const result = validatePhone(params);
  const status = result === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} - Input: "${test.input}" -> ${result} (expected: ${test.expected})`);
});

console.log("");

// ============================================
// EXAMPLE 2: Testing a User Function
// ============================================

console.log("=== Testing Dynamic Greeting ===");

// The user function to test
function getGreeting(params) {
  const currentHour = parseInt(params.CurrentHour);
  const localHour = currentHour + 3; // UTC + 3 timezone
  
  if (localHour < 12) {
    return "Good Morning";
  } else if (localHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

// Test cases for different times
const greetingTestCases = [
  { hour: "6", expected: "Good Morning" },   // 6 + 3 = 9 AM
  { hour: "10", expected: "Good Afternoon" }, // 10 + 3 = 1 PM
  { hour: "16", expected: "Good Evening" }    // 16 + 3 = 7 PM
];

greetingTestCases.forEach(test => {
  const params = { CurrentHour: test.hour };
  const result = getGreeting(params);
  const status = result === test.expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${status} - Hour: ${test.hour} (local: ${parseInt(test.hour)+3}) -> "${result}" (expected: "${test.expected}")`);
});

console.log("");

// ============================================
// EXAMPLE 3: Testing an Output Function
// ============================================

console.log("=== Testing Balance Parser ===");

// Mock ocpReturn for testing
let lastReturn = null;
function ocpReturn(value) {
  lastReturn = value;
  return value;
}

// The output function to test
function parseBalance(params) {
  if (params.wsResponseCode === "200") {
    const data = params.wsResponseBody;
    return ocpReturn({
      status: "success",
      balance: data.balance.toString(),
      accountType: data.accountType
    });
  } else {
    return ocpReturn({
      status: "failed",
      balance: "0",
      accountType: "unknown",
      FailExitReason: "SERVICE_ERROR"
    });
  }
}

// Test case 1: Successful response
console.log("Test Case 1: Success Response");
const successParams = {
  wsResponseCode: "200",
  wsResponseBody: {
    balance: 1234.56,
    accountType: "checking"
  }
};

parseBalance(successParams);
console.log("Result:", JSON.stringify(lastReturn, null, 2));
console.log(lastReturn.status === "success" ? "✓ PASS" : "✗ FAIL");
console.log("");

// Test case 2: Error response
console.log("Test Case 2: Error Response");
const errorParams = {
  wsResponseCode: "500",
  wsResponseBody: {}
};

parseBalance(errorParams);
console.log("Result:", JSON.stringify(lastReturn, null, 2));
console.log(lastReturn.status === "failed" ? "✓ PASS" : "✗ FAIL");
console.log("");

// ============================================
// EXAMPLE 4: Using Omilia's Built-in Testing
// ============================================

console.log("=== Testing in Omilia Console ===");
console.log(`
In the Omilia miniApp editor:

1. Write your JavaScript function
2. Click "Set params" below the editor
3. Enter test params as JSON:
   {
     "valueToValidate": "1234567890"
   }
4. Click "Run" button
5. See the result immediately

Example for validation function:
┌─────────────────────────────────────┐
│ JS Script:                          │
│ params.valueToValidate.length === 10│
├─────────────────────────────────────┤
│ Set params:                         │
│ {"valueToValidate":"1234567890"}    │
├─────────────────────────────────────┤
│ [Run Button]                        │
├─────────────────────────────────────┤
│ Result: true                        │
└─────────────────────────────────────┘
`);

// ============================================
// RUNNING THESE TESTS
// ============================================

console.log("=== How to Run Tests ===");
console.log(`
1. In Terminal:
   node examples/testing-example.js

2. In Omilia Console:
   - Copy function code to miniApp
   - Use built-in test runner
   - Set params and click Run

3. In VS Code:
   - Install Code Runner extension
   - Right-click file -> Run Code
`);
