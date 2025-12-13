/**
 * Omilia Params Object Reference
 * Complete reference for all available params properties
 * 
 * This object is available in all JavaScript functions in Omilia OCP
 * Access properties using dot notation: params.PropertyName
 */

// ============================================
// MINIAPP DETAILS
// ============================================
params.miniAppUID          // Group the miniApp belongs to
params.miniAppName         // Short name of the miniApp (e.g., "AskIntent")
params.accountId           // Creator's ID
params['miniApp-appId']    // Full ID of the miniApp

// ============================================
// SESSION DETAILS
// ============================================
params.Ani                 // Caller's phone number (Automatic Number Identification)
params.Dnis                // Dialed number (what number the caller dialed)
params.Locale              // Session locale (e.g., "en-US")
params.ConnectionID        // IVR-related ID
params.DialogGroupID       // Common ID for all miniApp invocations in single dialog
params.DialogID            // Unique ID for each dialog and miniApp invocation
params.testMode            // Boolean - is session in test mode
params.step                // Current step number in dialog
params.Timestamp           // ISO format timestamp (e.g., "1970-01-01T00:00:00.000")
params.CurrentHour         // Current hour in UTC (0-23)
params.CurrentTime         // Current minutes (0-59)

// Session counters
params.AgentRequests       // Number of times caller asked for agent
params.NoMatches           // Number of NoMatch events
params.NoInputs            // Number of NoInput events
params.Errors              // Total errors during dialog
params.ClosingRequestFlag  // Caller confirmed no further requests
params.SameStateEvents     // Count of inputs that didn't evolve dialog
params.Rejections          // Count of user rejections in confirmation
params.RejectedInput       // Value rejected by user or failed validation
params.WrongInput          // Count of invalid inputs
params.InputMode           // How user entered value: "text", "DTMF", or "Voice"

// ============================================
// VALIDATION-SPECIFIC PROPERTIES
// ============================================
params.valueToValidate     // User's input for non-Intent miniApps (MOST IMPORTANT for validations)
params.validationFailReason // Type of failed validation (e.g., "preBuiltFailed-CreditCard")
params.validationResult    // "success" or "fail"

// ============================================
// WEBSERVICE-SPECIFIC PROPERTIES
// ============================================
params.wsResponseBody      // Full response body from WebService call
params.wsResponseCode      // HTTP response code (e.g., "200", "404", "500")
params.wsResponseHeaders   // Array of {name, value} objects for headers

// ============================================
// MINIAPP INPUTS (from Orchestrator)
// ============================================
params.extValue1           // Input field 1 from parent application
params.extValue2           // Input field 2
params.extValue3           // Input field 3
// ... up to extValueN

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Validation Function
// Check if phone number is exactly 10 digits
const phoneDigits = params.valueToValidate.replace(/\D/g, '');
phoneDigits.length === 10;

// Example 2: User Function  
// Dynamic greeting based on time
const hour = parseInt(params.CurrentHour);
hour < 12 ? "Good Morning" : "Good Afternoon";

// Example 3: Output Function
// Parse WebService response
if (params.wsResponseCode === "200") {
  ocpReturn({
    status: "success",
    data: params.wsResponseBody.accountNumber
  });
} else {
  ocpReturn({
    status: "failed",
    FailExitReason: "SERVICE_ERROR"
  });
}

// Example 4: Access caller's phone number
const callerPhone = params.Ani;
console.log("Caller number:", callerPhone);

// Example 5: Check if in test mode
if (params.testMode) {
  console.log("Running in test mode");
}

// Example 6: Use external input values
const accountId = params.extValue1;
const transactionAmount = params.extValue2;
