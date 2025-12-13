# Omilia OCP Development Workspace

This workspace is configured for developing JavaScript code for Omilia Cloud Platform (OCP) IVR applications.

## Key Omilia Conventions

- Functions do NOT use `return` keyword - last expression is the return value
- Use `ocpReturn()` for Isolated Mode (recommended)
- Access data via `params` object
- Node.js v20 runtime with modern ECMAScript support
- Three function types: User Functions (return string), Validation Functions (return boolean), Output Functions (return object)
