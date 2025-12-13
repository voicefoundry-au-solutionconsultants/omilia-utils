/**
 * Amount Validation
 * Validates monetary amounts with business rules
 * 
 * Validation Function - MUST return boolean
 * Business Rule: Amount must be between $10 and $10,000
 */

// Parse the amount from valueToValidate
// Could be string like "1234.56" or number
const amount = parseFloat(params.valueToValidate);

// Check if it's a valid number
const isNumber = !isNaN(amount) && isFinite(amount);

// Check if within range
const isInRange = amount >= 10 && amount <= 10000;

// Check if has max 2 decimal places and no leading zeros
const hasValidDecimals = /^(?!0\d)\d+(\.\d{1,2})?$/.test(params.valueToValidate.toString());

// All conditions must be true
const result = isNumber && isInRange && hasValidDecimals;
result;
