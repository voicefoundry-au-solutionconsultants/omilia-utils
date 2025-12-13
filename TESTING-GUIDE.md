# Omilia Testing Guide

## Test Harness Overview

This workspace includes a custom Jest transformer that allows testing Omilia OCP functions **without modifying the original source code**. The harness automatically wraps Omilia code to make it testable in a Node.js environment.

## How It Works

### 1. Jest Transformer

The `utils/omilia-jest-transformer.js` file automatically:

- Wraps Omilia code in a testable function
- Converts implicit returns (last expression) to explicit returns
- Mocks `ocpReturn()` for Isolated Mode functions
- Instruments code for coverage tracking

### 2. Zero Code Changes Required

Your Omilia functions remain in their original form:

```javascript
// validation-functions/zip-code-validation.js
const zipCode = params.valueToValidate;
const cleaned = zipCode.replace(/[\s-]/g, '');
const isFiveDigit = /^\d{5}$/.test(cleaned);
const isNineDigit = /^\d{9}$/.test(cleaned);

// Valid if either format matches
isFiveDigit || isNineDigit;
```

No `module.exports`, no `return` keyword, no changes!

### 3. Test Files Import Directly

Test files simply require the Omilia function:

```javascript
// validation-functions/zip-code-validation.test.js
const validateZipCode = require('./zip-code-validation');

describe('ZIP Code Validation', () => {
  test('validates 5-digit ZIP', () => {
    const params = { valueToValidate: '12345' };
    expect(validateZipCode(params)).toBe(true);
  });
});
```

## Running Tests

### Run All Tests

```bash
yarn test
```

### Run Specific Test File

```bash
yarn test validation-functions/zip-code-validation.test.js
```

### Run Tests in Watch Mode

```bash
yarn test:watch
```

### Run with Coverage Report

```bash
yarn test:coverage
```

### Run Tests for Specific Folder

```bash
yarn test:validation      # All validation functions
yarn test:user-functions  # All user functions
yarn test:output          # All output functions
```

## Writing Tests

### Test Structure

```javascript
const functionToTest = require('./your-function');

describe('Function Name', () => {
  describe('Valid cases', () => {
    test('description', () => {
      const params = { /* test data */ };
      expect(functionToTest(params)).toBe(expectedValue);
    });
  });

  describe('Invalid cases', () => {
    test('description', () => {
      const params = { /* test data */ };
      expect(functionToTest(params)).toBe(expectedValue);
    });
  });

  describe('Edge cases', () => {
    test('description', () => {
      const params = { /* test data */ };
      expect(functionToTest(params)).toBe(expectedValue);
    });
  });
});
```

### Testing Different Function Types

#### Validation Functions (return boolean)

```javascript
const validate = require('./my-validation');

test('validates correct input', () => {
  expect(validate({ valueToValidate: 'valid-input' })).toBe(true);
});

test('rejects invalid input', () => {
  expect(validate({ valueToValidate: 'invalid' })).toBe(false);
});
```

#### User Functions (return string)

```javascript
const format = require('./my-formatter');

test('formats output correctly', () => {
  const params = { extValue1: '1234.56' };
  expect(format(params)).toBe('$1,234.56');
});
```

#### Output Functions (return object with ocpReturn)

```javascript
const parse = require('./my-parser');

test('parses response successfully', () => {
  const params = {
    wsResponseCode: '200',
    wsResponseBody: { balance: 1000 }
  };
  const result = parse(params);
  expect(result.status).toBe('success');
  expect(result.balance).toBe('1000');
});
```

## Coverage Reports

After running tests with coverage, view the HTML report:

```bash
open coverage/index.html
```

Coverage is tracked for:

- **Statements**: Individual code statements executed
- **Branches**: Conditional paths (if/else) taken
- **Functions**: Functions called
- **Lines**: Lines of code executed

## Best Practices

1. **Test all paths**: Ensure you test both valid and invalid inputs
2. **Edge cases**: Test boundary conditions, empty strings, special characters
3. **Real-world data**: Use realistic test data similar to production
4. **Clear descriptions**: Write descriptive test names
5. **Organized tests**: Group related tests in `describe` blocks
6. **One assertion per test**: Keep tests focused and specific

## Troubleshooting

### Tests fail with "undefined"

- Ensure your Omilia function has a last expression that evaluates to a value
- Check that the function doesn't end with a variable declaration

### Coverage seems low

- Remember that wrapper code is included in coverage metrics
- Focus on testing all logical branches in your Omilia code
- The actual business logic coverage is what matters

### Function not found

- Verify the require path is correct (relative to test file)
- Ensure the source file is in validation-functions/, user-functions/, or output-functions/

## Example Test Files

See these complete examples:

- `validation-functions/zip-code-validation.test.js` - 17 comprehensive tests
- `user-functions/format-currency.test.js` - Testing string output
- `examples/testing-example.js` - Manual testing patterns

## Benefits of This Approach

✅ **No Code Modifications**: Original Omilia code stays pristine  
✅ **Full Coverage Tracking**: Istanbul instrumentation built-in  
✅ **Easy Debugging**: Standard Jest error messages and stack traces  
✅ **Fast Execution**: Tests run locally without OCP environment  
✅ **Continuous Integration**: Easy to integrate with CI/CD pipelines  
✅ **Rapid Development**: Instant feedback loop for TDD  

## Technical Details

The transformer:

1. Reads Omilia source code as text
2. Identifies the last expression in the code
3. Wraps code in a function with `params` parameter
4. Converts last expression to explicit `return` statement
5. Adds `ocpReturn()` mock for isolated mode
6. Instruments code with Istanbul for coverage
7. Exports function for Jest to import

This all happens transparently at test runtime - your source files remain unchanged!
