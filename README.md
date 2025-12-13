# Omilia OCP JavaScript Development Workspace

A comprehensive collection of JavaScript code examples, templates, and utilities for developing IVR applications on the Omilia Cloud Platform (OCP).

## 📋 Table of Contents

- [About Omilia OCP](#about-omilia-ocp)
- [Key Concepts](#key-concepts)
- [Workspace Structure](#workspace-structure)
- [Getting Started](#getting-started)
- [Function Types](#function-types)
- [Quick Reference](#quick-reference)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Resources](#resources)

## 🎯 About Omilia OCP

Omilia Cloud Platform® (OCP) is a conversational AI platform for building IVR (Interactive Voice Response) applications. It uses JavaScript for custom business logic, data validation, and API integration.

### Key Components

- **OCP miniApps®** - Pre-built conversational components (Intent, Numeric, Date, YesNo, etc.)
- **Orchestrator** - Visual flow builder for connecting miniApps
- **JavaScript Functions** - Custom logic for validation, transformation, and integration
- **WebService miniApp** - REST API integration
- **Node.js v20** - Runtime environment with modern ECMAScript support

## 🔑 Key Concepts

### The `params` Object

All JavaScript functions receive a `params` object with session data:

```javascript
params.valueToValidate  // User input (validation functions)
params.Ani              // Caller's phone number
params.Dnis             // Dialed number
params.extValue1-N      // Input fields from Orchestrator
params.wsResponseBody   // WebService API response
params.wsResponseCode   // HTTP status code
params.CurrentHour      // Current hour (UTC)
// ... and many more (see utils/params-reference.js)
```

### No `return` Keyword

Omilia functions **don't use the `return` keyword**. The last expression is the return value:

```javascript
// ✓ Correct
params.valueToValidate.length === 10;

// ✗ Wrong
return params.valueToValidate.length === 10;
```

### Isolated Mode (Recommended)

Use `ocpReturn()` for safer execution:

```javascript
ocpReturn({
  status: "success",
  balance: "1234.56"
});
```

## 📁 Workspace Structure

```
omilia-ocp-workspace/
├── validation-functions/       # Data validation functions (return boolean)
│   ├── phone-validation.js
│   ├── credit-card-validation.js
│   ├── date-validation.js
│   ├── account-number-validation.js
│   ├── zip-code-validation.js
│   ├── amount-validation.js
│   ├── email-validation.js
│   └── custom-list-validation.js
│
├── user-functions/            # Dynamic content and calculations (return string)
│   ├── dynamic-greeting.js
│   ├── branch-locator.js
│   ├── format-currency.js
│   ├── format-date.js
│   ├── calculate-days-until.js
│   ├── build-dynamic-url.js
│   ├── mask-sensitive-data.js
│   ├── pluralize.js
│   ├── get-epoch-timestamp.js
│   └── generate-jwt-token.js
│
├── output-functions/          # Parse API responses (return object)
│   ├── parse-account-balance.js
│   ├── parse-user-profile.js
│   ├── parse-appointment-list.js
│   ├── parse-payment-history.js
│   ├── parse-soap-xml.js
│   ├── parse-response-headers.js
│   └── conditional-business-logic.js
│
├── utils/                     # Utilities and reference
│   ├── params-reference.js    # Complete params object documentation
│   ├── test-helpers.js        # Testing utilities
│   └── common-patterns.js     # Reusable code patterns
│
├── examples/                  # Complete working examples
│   ├── complete-account-balance-example.js
│   └── testing-example.js
│
└── README.md                  # This file
```

## 🚀 Getting Started

### 1. Choose Your Function Type

| Function Type | Purpose | Returns | Used In |
|--------------|---------|---------|---------|
| **Validation** | Validate user input | `boolean` | Validations tab of data miniApps |
| **User** | Dynamic prompts, calculations | `string` | User Functions tab, prompts |
| **Output** | Parse API responses | `object` | Output tab of WebService/Intelli |

### 2. Copy a Template

Browse the appropriate folder and copy a similar example to start from.

### 3. Customize for Your Needs

Modify the logic while following Omilia conventions:
- Access data via `params` object
- Don't use `return` keyword (or use `ocpReturn()`)
- Test using the built-in test runner

### 4. Deploy to Omilia

1. Open your miniApp in OCP Console
2. Go to the appropriate tab (Validations, User Functions, or Output)
3. Paste your code
4. Test using Set params and Run button
5. Save and deploy

## 📝 Function Types

### Validation Functions

**Purpose:** Validate user input against business rules

**Returns:** `boolean` (true = valid, false = invalid)

**Example:**
```javascript
// Validate 10-digit phone number
const phoneNumber = params.valueToValidate;
const digitsOnly = phoneNumber.replace(/\D/g, '');
digitsOnly.length === 10;
```

**Where to use:**
- Validations tab in Alpha, Numeric, Alphanumeric, Amount, Date, Text miniApps

**See:** `validation-functions/` folder for more examples

### User Functions

**Purpose:** Generate dynamic content, perform calculations

**Returns:** `string` (always, even if computing a number)

**Example:**
```javascript
// Dynamic greeting based on time
const localHour = parseInt(params.CurrentHour) + 3;

if (localHour < 12) {
  "Good Morning";
} else if (localHour < 18) {
  "Good Afternoon";
} else {
  "Good Evening";
}
```

**Where to use:**
- User Functions tab in any miniApp
- Referenced in prompts with `{{functionName}}`
- WebService endpoints: `https://api.com/user?id={{getUserId}}`

**See:** `user-functions/` folder for more examples

### Output Functions

**Purpose:** Parse and transform API responses

**Returns:** `object` with named fields

**Example:**
```javascript
// Parse balance response
if (params.wsResponseCode === "200") {
  ocpReturn({
    status: "success",
    balance: params.wsResponseBody.balance.toString(),
    accountType: params.wsResponseBody.accountType
  });
} else {
  ocpReturn({
    status: "failed",
    balance: "0",
    accountType: "unknown",
    FailExitReason: "SERVICE_ERROR"
  });
}
```

**Where to use:**
- Output tab in WebService and Intelli miniApps
- Maps API data to Orchestrator fields

**See:** `output-functions/` folder for more examples

## ⚡ Quick Reference

### Common Validation Patterns

```javascript
// Length check
params.valueToValidate.length === 10;

// Regex pattern
/^\d{10}$/.test(params.valueToValidate);

// Range check
const num = parseFloat(params.valueToValidate);
num >= 10 && num <= 1000;

// List membership
['option1', 'option2', 'option3'].includes(params.valueToValidate.toLowerCase());
```

### Common User Function Patterns

```javascript
// Format currency
const amount = parseFloat(params.extValue1);
`$${amount.toFixed(2)}`;

// Date formatting
new Date(params.extValue1).toLocaleDateString('en-US');

// Conditional message
params.extValue1 === "premium" ? "VIP" : "Standard";

// Build URL parameter
`userId=${encodeURIComponent(params.extValue1)}`;
```

### Common Output Function Patterns

```javascript
// Basic success/fail
if (params.wsResponseCode === "200") {
  ocpReturn({ status: "success", data: params.wsResponseBody.value });
} else {
  ocpReturn({ status: "failed", FailExitReason: "ERROR" });
}

// Extract nested data
const balance = params.wsResponseBody.account?.balance?.current || "0";

// Parse array
const items = params.wsResponseBody.items || [];
const count = items.length.toString();
```

### Logging (for debugging)

```javascript
console.log("Debug message:", params.valueToValidate);
print("Alternative logging");

// Do NOT log sensitive data (SSN, passwords, etc.)
```

## 📚 Examples

### Complete Working Example

See `examples/complete-account-balance-example.js` for a full end-to-end example showing:
1. User Function (build API URL)
2. Validation Function (validate account number)
3. Output Function (parse balance response)
4. How they work together in Orchestrator

### Testing Your Functions

See `examples/testing-example.js` for:
- Local testing strategies
- Test cases and assertions
- Using Omilia's built-in test runner

## ✅ Best Practices

### 1. **Always Validate Input**
```javascript
// Check if data exists before using
const input = params.valueToValidate || "";
if (!input) return false;
```

### 2. **Handle Errors Gracefully**
```javascript
// Provide defaults for missing data
const balance = params.wsResponseBody?.balance || "0.00";
```

### 3. **Use Descriptive Variable Names**
```javascript
// ✓ Good
const phoneDigitsOnly = phone.replace(/\D/g, '');

// ✗ Bad
const x = phone.replace(/\D/g, '');
```

### 4. **Don't Log Sensitive Data**
```javascript
// ✗ Never do this
console.log("SSN:", params.valueToValidate);

// ✓ Safe debugging
console.log("Input length:", params.valueToValidate.length);
```

### 5. **Use ocpReturn() for Complex Returns**
```javascript
// Recommended for objects
ocpReturn({
  field1: value1,
  field2: value2
});
```

### 6. **Test Thoroughly**
- Test with valid inputs
- Test with invalid inputs
- Test with empty/null values
- Test edge cases

### 7. **Document Your Logic**
```javascript
/**
 * Validates account number
 * Business Rule: 10 digits, starts with 1, 2, or 3
 */
```

## 🔗 Resources

### Official Documentation
- [Omilia Learning Portal](https://learn.ocp.ai/guides)
- [JavaScript Functions in miniApps](https://learn.ocp.ai/guides/javascript-functions-in-miniapps)
- [Validations Tab](https://learn.ocp.ai/guides/validations-tab)
- [User Functions Tab](https://learn.ocp.ai/guides/user-functions-tab)
- [Orchestrator API](https://learn.ocp.ai/guides/orchestrator-api)

### Quick Links Within This Workspace
- **Complete params reference:** [utils/params-reference.js](utils/params-reference.js)
- **Testing utilities:** [utils/test-helpers.js](utils/test-helpers.js)
- **Reusable patterns:** [utils/common-patterns.js](utils/common-patterns.js)
- **Full example:** [examples/complete-account-balance-example.js](examples/complete-account-balance-example.js)

### Node.js Compatibility
- **Runtime:** Node.js v20
- **ECMAScript:** See [compatibility table](https://node.green/)
- **Built-in libraries:** Handlebars, Eta
- **Special functions:** `parseXML()`, `signJwt()`, `ocpReturn()`

## 💡 Tips

1. **Start Simple** - Begin with basic examples and build complexity gradually
2. **Copy & Modify** - Use existing examples as templates
3. **Test Early** - Use the built-in test runner before deploying
4. **Read params-reference.js** - Understand what data is available
5. **Check common-patterns.js** - Don't reinvent the wheel
6. **Study complete examples** - See how functions work together

## 🐛 Troubleshooting

### "Function returns undefined"
- Make sure last line is the value to return (no `return` keyword)
- Use `ocpReturn()` for complex objects

### "Cannot read property of undefined"
- Use optional chaining: `params.wsResponseBody?.field`
- Check if data exists before accessing

### "Validation always fails"
- Log `params.valueToValidate` to see actual input
- Check for extra whitespace: `input.trim()`

### "Output fields not mapping"
- Ensure output object keys match configured field names
- All values must be strings (use `.toString()`)

## 📞 Support

For Omilia-specific issues:
- [Omilia Service Desk](https://learn.ocp.ai/guides/omilia-service-desk)
- Check [Frequently Asked Questions](https://learn.ocp.ai/guides/frequently-asked-questions)

---

**Last Updated:** December 2025  
**Omilia OCP Version:** Based on current documentation  
**Node.js Version:** 20

Happy coding! 🚀
