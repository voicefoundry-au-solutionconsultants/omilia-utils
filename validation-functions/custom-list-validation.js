/**
 * Custom List Validation
 * Validates against a custom list (alternative to built-in "in list")
 * 
 * Validation Function - MUST return boolean
 * Use case: Validate against dynamic or computed list
 */

// Define allowed values
const allowedValues = [
  'checking',
  'savings',
  'credit',
  'mortgage',
  'loan'
];

const input = params.valueToValidate.toLowerCase().trim();

// Check if input is in the allowed list
allowedValues.includes(input);
