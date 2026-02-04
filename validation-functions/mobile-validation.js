/**
 * Australian Mobile Number Validation
 * Validates Australian mobile phone numbers (04xx xxx xxx format)
 * 
 * Validation Function - MUST return boolean
 * Available: params.valueToValidate
 * 
 * Valid formats:
 * - 0412345678
 * - 0412 345 678
 * - (04) 1234 5678
 * - +61 412 345 678 (international format)
 * - +61412345678
 */

const phoneNumber = params.valueToValidate;

// Remove all non-digit characters except leading +
const cleaned = phoneNumber.replace(/[^\d+]/g, '');

let isValid = false;

// Handle international format (+61)
if (cleaned.startsWith('+61')) {
  const digitsAfter61 = cleaned.substring(3);
  // Should have 9 digits starting with 4 (mobile prefix without leading 0)
  isValid = digitsAfter61.length === 9 && digitsAfter61.startsWith('4');
} else {
  // Remove any remaining non-digit characters for domestic format
  const digitsOnly = cleaned.replace(/\D/g, '');
  // Australian mobile numbers: 04xx xxx xxx (10 digits starting with 04)
  isValid = /^04\d{8}$/.test(digitsOnly);
}

// Last expression is the return value
isValid;
