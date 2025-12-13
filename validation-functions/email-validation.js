/**
 * Email Validation
 * Validates email addresses with regex pattern
 * 
 * Validation Function - MUST return boolean
 * Use with Text or Alpha miniApps
 */

const email = params.valueToValidate;

// Basic email regex pattern
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Test against pattern
emailPattern.test(email);
