/**
 * Parse Response Headers
 * Extracts data from HTTP response headers
 * 
 * Output Function - MUST return object
 * Demonstrates header access using params.wsResponseHeaders
 */

if (params.wsResponseCode === "200") {
  // Extract specific headers
  const authToken = params.wsResponseHeaders.find(
    header => header.name === "X-Auth-Token"
  )?.value || "";
  
  const rateLimit = params.wsResponseHeaders.find(
    header => header.name === "X-RateLimit-Remaining"
  )?.value || "0";
  
  const sessionId = params.wsResponseHeaders.find(
    header => header.name === "X-Session-ID"
  )?.value || "";
  
  ocpReturn({
    status: "success",
    authToken: authToken,
    rateLimitRemaining: rateLimit,
    sessionId: sessionId,
    bodyData: params.wsResponseBody.message || ""
  });
} else {
  ocpReturn({
    status: "failed",
    authToken: "",
    rateLimitRemaining: "0",
    sessionId: "",
    bodyData: "",
    FailExitReason: "HEADER_MISSING"
  });
}
