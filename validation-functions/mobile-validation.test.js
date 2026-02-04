/**
 * Unit Tests for Australian Mobile Number Validation
 * Using jest-cucumber for BDD-style testing
 */

const { loadFeature, defineFeature } = require('jest-cucumber');
const validateMobile = require('./mobile-validation');

const feature = loadFeature('./validation-functions/mobile-validation.feature');

defineFeature(feature, test => {
  let phoneNumber;
  let result;

  test('Valid Australian mobile numbers', ({ given, when, then }) => {
    given(/^I have a phone number "(.*)"$/, (phone) => {
      phoneNumber = phone;
    });

    when('I validate it as a mobile number', () => {
      const params = { valueToValidate: phoneNumber };
      result = validateMobile(params);
    });

    then('the result should be valid', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid mobile numbers', ({ given, when, then }) => {
    given(/^I have a phone number "(.*)"$/, (phone) => {
      phoneNumber = phone;
    });

    when('I validate it as a mobile number', () => {
      const params = { valueToValidate: phoneNumber };
      result = validateMobile(params);
    });

    then('the result should be invalid', () => {
      expect(result).toBe(false);
    });
  });
});
