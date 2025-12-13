# Omilia OCP Quick Start

## What This Workspace Contains

This is a complete JavaScript development environment for Omilia Cloud Platform with:

- **30+ ready-to-use code examples**
- **Complete params object reference**
- **Testing utilities**
- **Best practices and patterns**

## Folder Guide

```plain
📁 validation-functions/  → Validate user input (phone, email, etc.)
📁 user-functions/        → Dynamic prompts and calculations
📁 output-functions/      → Parse API responses
📁 utils/                 → Reference docs and helpers
📁 examples/              → Complete working examples
```

## Quick Start

1. **Browse examples** in the folders above
2. **Copy code** you need
3. **Paste into Omilia Console** (miniApps editor)
4. **Test** using the built-in test runner
5. **Deploy** to your application

## Important Omilia Conventions

✅ **DO:**

- Access data via `params.valueToValidate`, `params.Ani`, etc.
- End functions with the value (no `return` keyword)
- Use `ocpReturn()` for objects
- Test before deploying

❌ **DON'T:**

- Use `return` keyword (except in inner functions)
- Log sensitive data
- Forget to handle errors

## Your First Function

Try this simple validation:

```javascript
// Validate 10-digit phone number
const digits = params.valueToValidate.replace(/\D/g, '');
digits.length === 10;
```

## Need Help?

- 📖 **Read:** [README.md](README.md) - Full documentation
- 🔍 **Reference:** [utils/params-reference.js](utils/params-reference.js) - All params properties
- 💡 **Learn:** [examples/complete-account-balance-example.js](examples/complete-account-balance-example.js) - Full example
- 🧪 **Test:** [examples/testing-example.js](examples/testing-example.js) - How to test

## Official Resources

- [Omilia Learning Portal](https://learn.ocp.ai/guides)
- [JavaScript Functions Guide](https://learn.ocp.ai/guides/javascript-functions-in-miniapps)

---

**You're all set!** Start exploring the code examples. 🚀
