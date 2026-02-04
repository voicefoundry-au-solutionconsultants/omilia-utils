/**
 * Unit Tests for Australian Landline Number Validation
 * Using jest-cucumber for BDD-style testing
 */

const { loadFeature, defineFeature } = require('jest-cucumber');
const validateLandline = require('./landline-validation');

const feature = loadFeature('./validation-functions/landline-validation.feature');

defineFeature(feature, test => {
  let phoneNumber;
  let result;

  test('Valid Australian landline numbers', ({ given, when, then }) => {
    given(/^I have a phone number "(.*)"$/, (phone) => {
      phoneNumber = phone;
    });

    when('I validate it as a landline number', () => {
      const params = { valueToValidate: phoneNumber };
      result = validateLandline(params);
    });

    then('the result should be valid', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid landline numbers', ({ given, when, then }) => {
    given(/^I have a phone number "(.*)"$/, (phone) => {
      phoneNumber = phone;
    });

    when('I validate it as a landline number', () => {
      const params = { valueToValidate: phoneNumber };
      result = validateLandline(params);
    });

    then('the result should be invalid', () => {
      expect(result).toBe(false);
    });
  });
});
