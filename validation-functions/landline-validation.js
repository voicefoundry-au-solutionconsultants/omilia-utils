/**
 * Australian Landline Number Validation
 * Validates Australian landline phone numbers with area codes
 * 
 * Validation Function - MUST return boolean
 * Available: params.valueToValidate
 * 
 * Valid area codes: 02, 03, 07, 08
 * Valid formats:
 * - 0212345678
 * - (02) 1234 5678
 * - 02 1234 5678
 * - +61 2 1234 5678 (international format)
 * - +61212345678
 */

const phoneNumber = params.valueToValidate;

// Remove all non-digit characters except leading +
const cleaned = phoneNumber.replace(/[^\d+]/g, '');

let isValid = false;

// Handle international format (+61)
if (cleaned.startsWith('+61')) {
  const digitsAfter61 = cleaned.substring(3);
  // Should have 9 digits starting with 2, 3, 7, or 8 (area codes without leading 0)
  isValid = digitsAfter61.length === 9 && /^[2378]/.test(digitsAfter61);
} else {
  // Remove any remaining non-digit characters for domestic format
  const digitsOnly = cleaned.replace(/\D/g, '');
  // Australian landline numbers: 0[2378]xxxxxxxx (10 digits with valid area codes)
  // Area codes: 02 (NSW/ACT), 03 (VIC/TAS), 07 (QLD), 08 (SA/WA/NT)
  isValid = /^0[2378]\d{8}$/.test(digitsOnly);
}

// Last expression is the return value
isValid;
