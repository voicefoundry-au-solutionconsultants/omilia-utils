/**
 * ZIP Code Validation
 * Validates US ZIP codes (5 digits or ZIP+4 format)
 * 
 * Validation Function - MUST return boolean
 * Note: Omilia has prebuilt US/CA zip validation, this shows custom logic
 */

const zipCode = params.valueToValidate;

// Remove spaces and dashes
const cleaned = zipCode.replace(/[\s-]/g, '');

// Check for 5-digit ZIP or 9-digit ZIP+4
const isFiveDigit = /^\d{5}$/.test(cleaned);
const isNineDigit = /^\d{9}$/.test(cleaned);

// Valid if either format matches
isFiveDigit || isNineDigit;
