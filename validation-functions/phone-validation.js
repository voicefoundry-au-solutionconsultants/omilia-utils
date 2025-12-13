/**
 * Phone Number Validation
 * Validates US phone numbers in various formats
 * 
 * Validation Function - MUST return boolean
 * Available: params.valueToValidate
 */

// US Phone Number - 10 digits
// Accepts: 5551234567, (555) 123-4567, 555-123-4567

const phoneNumber = params.valueToValidate;

// Remove all non-digit characters
const digitsOnly = phoneNumber.replace(/\D/g, '');

// Check if we have exactly 10 digits
const isValid = digitsOnly.length === 10;

// Last expression is the return value
isValid;
