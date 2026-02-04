/**
 * Australian Medicare Number Validation (Luhn Algorithm)
 * Validates Australian Medicare card numbers using the Luhn check digit algorithm
 * 
 * Validation Function - MUST return boolean
 * Available: params.valueToValidate
 * 
 * Medicare card format:
 * - 10 digits total (NNNNNNNN C I)
 * - First 8 digits: unique identifier (base number)
 * - 9th digit: check digit (calculated via Luhn algorithm)
 * - 10th digit: issue number (1-9, cannot be 0)
 * 
 * Constraints:
 * - First digit must be in range 2-6
 * - Issue number (10th digit) cannot be 0
 * 
 * Valid formats:
 * - 2950156481
 * - 2950 15648 1
 * - 2950-15648-1
 */

const medicareNumber = params.valueToValidate.replace(/\D/g, '');

// Remove all non-digit characters
// const cleaned = medicareNumber.replace(/\D/g, '');

let isValid = false;

// Medicare card must be exactly 10 digits
if (cleaned.length === 10) {
  // First digit must be in range 2-6
  const firstDigit = parseInt(cleaned[0]);
  
  if (firstDigit >= 2 && firstDigit <= 6) {
    // Issue number (10th digit) cannot be 0
    const issueNumber = parseInt(cleaned[9]);
    
    if (issueNumber >= 1 && issueNumber <= 9) {
      // Validate using Luhn algorithm (mod 10 check)
      // The first 8 digits are used for Luhn calculation
      const baseNumber = cleaned.substring(0, 8);
      const checkDigit = parseInt(cleaned[8]);
      
      // Luhn algorithm weights for Medicare: [1, 3, 7, 9, 1, 3, 7, 9]
      const weights = [1, 3, 7, 9, 1, 3, 7, 9];
      
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += parseInt(baseNumber[i]) * weights[i];
      }
      
      // Calculate expected check digit (9th digit)
      const calculatedCheckDigit = sum % 10;
      
      // Check if calculated matches actual check digit
      isValid = calculatedCheckDigit === checkDigit;
    }
  }
}

// Last expression is the return value
isValid;
