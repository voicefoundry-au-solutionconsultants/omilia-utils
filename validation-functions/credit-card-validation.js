/**
 * Credit Card Validation (Luhn Algorithm)
 * Validates credit card numbers using Luhn checksum
 * 
 * Validation Function - MUST return boolean
 * Note: Omilia has prebuilt credit card validation, but this shows custom implementation
 */

function luhnCheck(cardNumber) {
  // Remove spaces and dashes
  const digits = cardNumber.replace(/\D/g, '');
  
  // Check length (15-20 digits for most cards)
  if (digits.length < 15 || digits.length > 20) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  // Loop through digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// Validate the input
luhnCheck(params.valueToValidate);
