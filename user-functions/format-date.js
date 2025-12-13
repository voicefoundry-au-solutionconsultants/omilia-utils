/**
 * Format Date for Announcement
 * Converts date to human-readable format
 * 
 * User Function - MUST return string
 * Usage: "Your appointment is on {{formatDate}}"
 * Input: params.extValue1 contains ISO date string
 */

const dateString = params.extValue1;
// Handle both string dates and numeric timestamps
const date = new Date(isNaN(dateString) ? dateString : parseInt(dateString));

// Format options
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Return formatted date
const result = date.toLocaleDateString('en-US', options);
result;
