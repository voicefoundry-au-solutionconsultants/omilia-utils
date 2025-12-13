/**
 * Calculate Days Until Due Date
 * Returns number of days until a due date
 * 
 * User Function - MUST return string
 * Usage: "Your payment is due in {{getDaysUntilDue}} days"
 * Input: params.extValue1 contains due date
 */

const dueDate = new Date(params.extValue1);
const today = new Date();

// Normalize both dates to midnight in their respective timezones
// Extract year, month, day to avoid timezone issues
const dueDateNormalized = new Date(
  dueDate.getFullYear(),
  dueDate.getMonth(),
  dueDate.getDate()
);

const todayNormalized = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

// Calculate difference in milliseconds
const diffMs = dueDateNormalized - todayNormalized;

// Convert to days
const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

// Return as string
const result = daysUntil.toString();
result;
