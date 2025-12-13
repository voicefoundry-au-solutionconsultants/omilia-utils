/**
 * Pluralize Items
 * Returns correct singular/plural form for announcements
 * 
 * User Function - MUST return string
 * Usage: "You have {{getItemCount}} item{{pluralize}}"
 * Input: params.extValue1 contains count
 */

const count = parseInt(params.extValue1);

// Return 's' for plural, empty string for singular
count === 1 ? '' : 's';

// Alternative full message version:
// count === 1 ? `${count} item` : `${count} items`;
