/**
 * Account Number Validation
 * Validates account numbers against business rules
 * 
 * Validation Function - MUST return boolean
 * Business Rule: Account must be 8-12 digits, starting with 1, 2, or 3
 */

const accountNumber = params.valueToValidate;

// Remove any spaces or dashes
const cleaned = accountNumber.replace(/[\s-]/g, '');

// Check if it's all digits
const isNumeric = /^\d+$/.test(cleaned);

// Check length
const validLength = cleaned.length >= 8 && cleaned.length <= 12;

// Check if starts with 1, 2, or 3
const validPrefix = /^[123]/.test(cleaned);

// All conditions must be true
isNumeric && validLength && validPrefix;
