/**
 * Mask Sensitive Data
 * Partially masks account numbers for confirmation
 * 
 * User Function - MUST return string
 * Usage: "Confirming account ending in {{maskAccountNumber}}"
 * Input: params.extValue1 contains full account number
 */

const accountNumber = params.extValue1.toString();

// Keep only last 4 digits
const lastFour = accountNumber.slice(-4);

// Mask the rest with asterisks
const masked = '****' + lastFour;

// Return masked version
masked;
