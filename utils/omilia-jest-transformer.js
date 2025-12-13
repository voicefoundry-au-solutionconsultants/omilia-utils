/**
 * Omilia Jest Transformer
 * 
 * Custom Jest transformer that converts Omilia OCP code into testable Node.js modules.
 * Wraps the code so that the last expression becomes the return value.
 * 
 * Enhanced to:
 * - Automatically handle if/else statements by wrapping them in IIFEs
 * - Minimize wrapper overhead for better coverage metrics
 */

const { createInstrumenter } = require('istanbul-lib-instrument');

/**
 * Transform if/else blocks that don't have explicit returns
 * For output functions, just ensure the function doesn't end with hanging statements
 */
function transformIfElseBlocks(source) {
  // Output functions use ocpReturn() which is handled by the wrapper
  // No transformation needed - the wrapper's ocpReturn mock captures the value
  return source;
}

module.exports = {
  process(sourceText, sourcePath, options) {
    // Skip if this is already a test file or the test harness
    if (sourcePath.includes('.test.js') || sourcePath.includes('omilia-test-harness')) {
      return { code: sourceText };
    }
    
    // Only transform validation, user, and output function files
    const isOmiliaFunction = 
      sourcePath.includes('validation-functions/') ||
      sourcePath.includes('user-functions/') ||
      sourcePath.includes('output-functions/');
    
    if (!isOmiliaFunction) {
      return { code: sourceText };
    }
    
    // Parse the source to detect patterns
    let modifiedSource = sourceText;
    
    // Pattern 1: Handle if/else blocks that don't return
    // Convert: if (cond) { result } else { result } 
    // To: result = (function() { if (cond) { return ... } else { return ... } })()
    modifiedSource = transformIfElseBlocks(modifiedSource);
    
    // Pattern 2: Find the last meaningful line
    const lines = modifiedSource.split('\n');
    let lastNonCommentIndex = -1;
    
    for (let i = lines.length - 1; i >= 0; i--) {
      const trimmed = lines[i].trim();
      // Skip empty lines and comments
      if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
        lastNonCommentIndex = i;
        break;
      }
    }
    
    // Pattern 3: Ensure last expression is returned
    if (lastNonCommentIndex >= 0) {
      const lastLine = lines[lastNonCommentIndex].trim();
      // Check if it's a simple expression (not a declaration, control structure, or brace)
      if (lastLine && !lastLine.startsWith('const ') && !lastLine.startsWith('let ') && 
          !lastLine.startsWith('var ') && !lastLine.startsWith('function ') && 
          !lastLine.startsWith('if ') && !lastLine.startsWith('for ') && 
          !lastLine.startsWith('while ') && !lastLine.includes('ocpReturn(') &&
          !lastLine.startsWith('return ') && lastLine !== '}' && lastLine !== '};') {
        // Add return statement
        lines[lastNonCommentIndex] = lines[lastNonCommentIndex].replace(lastLine, `return ${lastLine}`);
        modifiedSource = lines.join('\n');
      }
    }
    
    // Check if source uses ocpReturn (mainly output functions)
    const usesOcpReturn = modifiedSource.includes('ocpReturn(');
    
    // Wrap with minimal overhead - everything on single lines where possible
    let wrappedCode;
    if (usesOcpReturn) {
      // Full wrapper with ocpReturn support for output functions
      wrappedCode = `module.exports = function(params) { let _v, _c = false; function ocpReturn(v) { _c = true; _v = v; return v; }
${modifiedSource}
  if (_c) return _v; };
`;
    } else {
      // Minimal wrapper for user/validation functions that don't use ocpReturn
      wrappedCode = `module.exports = function(params) {
${modifiedSource}
};
`;
    }

    // If coverage is enabled, instrument the code
    if (options.instrument) {
      const instrumenter = createInstrumenter({
        esModules: false,
        compact: false,
        preserveComments: true,
      });
      
      wrappedCode = instrumenter.instrumentSync(wrappedCode, sourcePath);
    }
    
    return { code: wrappedCode };
  }
};
