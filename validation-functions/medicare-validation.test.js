/**
 * Unit Tests for Australian Medicare Number Validation
 * Using jest-cucumber for BDD-style testing
 */

const { loadFeature, defineFeature } = require('jest-cucumber');
const validateMedicare = require('./medicare-validation');

const feature = loadFeature('./validation-functions/medicare-validation.feature');

defineFeature(feature, test => {
  let medicareNumber;
  let result;

  test('Valid Medicare numbers', ({ given, when, then }) => {
    given(/^I have a Medicare number "(.*)"$/, (number) => {
      medicareNumber = number;
    });

    when('I validate it using the Luhn algorithm', () => {
      const params = { valueToValidate: medicareNumber };
      result = validateMedicare(params);
    });

    then('the result should be valid', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid Medicare numbers', ({ given, when, then }) => {
    given(/^I have a Medicare number "(.*)"$/, (number) => {
      medicareNumber = number;
    });

    when('I validate it using the Luhn algorithm', () => {
      const params = { valueToValidate: medicareNumber };
      result = validateMedicare(params);
    });

    then('the result should be invalid', () => {
      expect(result).toBe(false);
    });
  });
});
