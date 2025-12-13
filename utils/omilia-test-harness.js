/**
 * Omilia Test Harness
 * 
 * Utility for testing Omilia OCP functions without modifying source code.
 * Uses Node's VM module to execute Omilia code in an isolated context.
 * 
 * Supports:
 * - Validation functions (return boolean)
 * - User functions (return string)
 * - Output functions (return object with ocpReturn)
 */

const vm = require('vm');
const fs = require('fs');
const path = require('path');

/**
 * Create a testable function from an Omilia source file
 * 
 * @param {string} filePath - Path to the Omilia function file (relative to project root or absolute)
 * @param {string} type - Function type: 'validation', 'user', or 'output'
 * @returns {Function} Testable function that accepts params object
 */
function createTestableFunction(filePath, type = 'validation') {
  // Resolve the file path
  const resolvedPath = path.isAbsolute(filePath) 
    ? filePath 
    : path.resolve(__dirname, '..', filePath);
  
  // Read the source code
  const code = fs.readFileSync(resolvedPath, 'utf8');
  
  return function(params) {
    let returnValue = null;
    let ocpReturnCalled = false;
    
    // Create sandbox context with necessary globals
    const context = vm.createContext({
      params,
      // Mock ocpReturn for output functions
      ocpReturn: (val) => { 
        ocpReturnCalled = true;
        returnValue = val; 
        return val; 
      },
      // Allow console for debugging
      console,
      // Provide common JavaScript globals
      Math,
      Date,
      JSON,
      String,
      Number,
      Boolean,
      Array,
      Object,
      RegExp,
      Error,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      encodeURIComponent,
      decodeURIComponent,
    });
    
    try {
      // Execute the code in the isolated context
      const result = vm.runInContext(code, context);
      
      // Return value priority:
      // 1. If ocpReturn was called, use that value
      // 2. Otherwise use the last evaluated expression
      return ocpReturnCalled ? returnValue : result;
    } catch (error) {
      // Re-throw with more context
      throw new Error(`Error executing Omilia function: ${error.message}`);
    }
  };
}

/**
 * Helper function to create validation function
 */
function createValidationFunction(filePath) {
  return createTestableFunction(filePath, 'validation');
}

/**
 * Helper function to create user function
 */
function createUserFunction(filePath) {
  return createTestableFunction(filePath, 'user');
}

/**
 * Helper function to create output function
 */
function createOutputFunction(filePath) {
  return createTestableFunction(filePath, 'output');
}

module.exports = {
  createTestableFunction,
  createValidationFunction,
  createUserFunction,
  createOutputFunction
};
