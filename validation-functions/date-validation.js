/**
 * Date Validation
 * Validates dates are within acceptable range
 * 
 * Validation Function - MUST return boolean
 * Use case: Ensure date is not in the past and within next 60 days
 */

// Parse the date from valueToValidate
// Assumes format like "2025-12-25" or Date object
const inputDate = new Date(params.valueToValidate);
const today = new Date();

// Normalize both dates to midnight UTC for consistent comparison
const inputDateNormalized = new Date(Date.UTC(
  inputDate.getFullYear(),
  inputDate.getMonth(),
  inputDate.getDate()
));

const todayNormalized = new Date(Date.UTC(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
));

// Calculate 60 days from today
const maxDate = new Date(todayNormalized);
maxDate.setDate(maxDate.getDate() + 60);

// Check if date is valid, not in past, and within 60 days
const isValidDate = !isNaN(inputDateNormalized.getTime());
const isNotPast = inputDateNormalized >= todayNormalized;
const isWithinRange = inputDateNormalized <= maxDate;

// All conditions must be true
const result = isValidDate && isNotPast && isWithinRange;
result;
