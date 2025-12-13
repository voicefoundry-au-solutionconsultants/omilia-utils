/**
 * Format Currency
 * Formats a number as currency for announcements
 * 
 * User Function - MUST return string
 * Usage: "Your balance is {{formatCurrency}}"
 * Input: params.extValue1 contains the amount
 */

const amount = parseFloat(params.extValue1);

// Format with 2 decimal places and commas
const formatted = amount.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// Return formatted string with dollar sign
const result = `$${formatted}`;
result;
