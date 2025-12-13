/**
 * Parse User Profile with Error Handling
 * Parses user profile data with comprehensive error handling
 * 
 * Output Function - MUST return object
 * Includes FailExitReason for error cases
 */

let result;

if (params.wsResponseCode === "200") {
  const user = params.wsResponseBody;
  
  result = {
    output1: "success",
    firstName: user.firstName || "Unknown",
    lastName: user.lastName || "Unknown",
    memberSince: user.membershipDate || "Unknown",
    accountStatus: user.status || "Unknown"
  };
} else {
  // Map error codes to meaningful messages
  let errorMessage;
  
  switch (params.wsResponseCode) {
    case "400":
      errorMessage = "BAD_REQUEST";
      break;
    case "401":
      errorMessage = "UNAUTHORIZED";
      break;
    case "404":
      errorMessage = "USER_NOT_FOUND";
      break;
    case "500":
      errorMessage = "INTERNAL_SERVER_ERROR";
      break;
    default:
      errorMessage = "UNKNOWN_ERROR";
      break;
  }
  
  result = {
    output1: "failed",
    firstName: "Unknown",
    lastName: "Unknown",
    memberSince: "Unknown",
    accountStatus: "Unknown",
    FailExitReason: errorMessage
  };
}

ocpReturn(result);
