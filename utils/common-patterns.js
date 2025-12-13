/**
 * Common Patterns and Best Practices for Omilia JavaScript
 * Reusable code snippets and patterns
 */

// ============================================
// PATTERN: Safe Property Access
// ============================================

/**
 * Safely access nested properties that might not exist
 */
function safeGet(obj, path, defaultValue = '') {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
}

// Usage in Output Function:
// const balance = safeGet(params.wsResponseBody, 'account.balance.current', '0.00');

// ============================================
// PATTERN: Date Formatting
// ============================================

/**
 * Format date for announcements
 */
function formatDate(dateString, locale = 'en-US') {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ============================================
// PATTERN: Currency Formatting
// ============================================

/**
 * Format number as currency
 */
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// ============================================
// PATTERN: Phone Number Normalization
// ============================================

/**
 * Normalize phone number to digits only
 */
function normalizePhone(phone) {
  return phone.replace(/\D/g, '');
}

/**
 * Format phone number for display
 */
function formatPhone(phone) {
  const digits = normalizePhone(phone);
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return phone;
}

// ============================================
// PATTERN: Input Sanitization
// ============================================

/**
 * Remove potentially problematic characters
 */
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>]/g, '')  // Remove angle brackets
    .replace(/\s+/g, ' ');  // Normalize whitespace
}

// ============================================
// PATTERN: Response Code Handling
// ============================================

/**
 * Map HTTP status codes to user-friendly messages
 */
function getErrorMessage(statusCode) {
  const errorMessages = {
    '400': 'BAD_REQUEST',
    '401': 'UNAUTHORIZED',
    '403': 'FORBIDDEN',
    '404': 'NOT_FOUND',
    '408': 'REQUEST_TIMEOUT',
    '429': 'TOO_MANY_REQUESTS',
    '500': 'INTERNAL_SERVER_ERROR',
    '502': 'BAD_GATEWAY',
    '503': 'SERVICE_UNAVAILABLE',
    '504': 'GATEWAY_TIMEOUT'
  };
  
  return errorMessages[statusCode] || 'UNKNOWN_ERROR';
}

// ============================================
// PATTERN: Array Processing
// ============================================

/**
 * Find item in array safely
 */
function findItem(array, predicate, defaultValue = null) {
  if (!Array.isArray(array)) return defaultValue;
  const found = array.find(predicate);
  return found !== undefined ? found : defaultValue;
}

// Usage in Output Function:
// const authHeader = findItem(
//   params.wsResponseHeaders,
//   h => h.name === 'Authorization',
//   { value: '' }
// );

// ============================================
// PATTERN: Conditional Output Building
// ============================================

/**
 * Build output object with conditional fields
 */
function buildOutput(baseFields, conditionalFields = {}) {
  const output = { ...baseFields };
  
  Object.keys(conditionalFields).forEach(key => {
    const condition = conditionalFields[key];
    if (condition.when) {
      output[key] = condition.value;
    }
  });
  
  return output;
}

// Usage:
// const output = buildOutput(
//   { status: 'success', name: 'John' },
//   {
//     premium: { when: userLevel === 'premium', value: 'true' },
//     discount: { when: hasPromo, value: '10%' }
//   }
// );

// ============================================
// PATTERN: Logging for Debugging
// ============================================

/**
 * Structured logging helper
 * Remember: Do not log sensitive information!
 */
function logDebug(label, value) {
  if (params.testMode) {
    console.log(`[DEBUG] ${label}:`, JSON.stringify(value, null, 2));
  }
}

// Usage:
// logDebug('Validation Input', params.valueToValidate);
// logDebug('WebService Response', params.wsResponseBody);

// ============================================
// PATTERN: Retry Logic Indicator
// ============================================

/**
 * Determine if should retry based on error count
 */
function shouldRetry(maxRetries = 3) {
  return (params.Errors || 0) < maxRetries;
}

// ============================================
// PATTERN: Business Hours Check
// ============================================

/**
 * Check if current time is within business hours
 */
function isBusinessHours(startHour = 9, endHour = 17, timezone = 0) {
  const currentHour = parseInt(params.CurrentHour) + timezone;
  return currentHour >= startHour && currentHour < endHour;
}

// Usage in User Function:
// const greeting = isBusinessHours() 
//   ? "Thank you for calling during business hours"
//   : "Thank you for calling. Our business hours are 9 AM to 5 PM";

// ============================================
// EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    safeGet,
    formatDate,
    formatCurrency,
    normalizePhone,
    formatPhone,
    sanitizeInput,
    getErrorMessage,
    findItem,
    buildOutput,
    logDebug,
    shouldRetry,
    isBusinessHours
  };
}
