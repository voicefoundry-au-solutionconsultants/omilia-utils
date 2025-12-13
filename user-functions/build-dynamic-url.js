/**
 * Build Dynamic URL for WebService
 * Constructs URL with query parameters
 * 
 * User Function - MUST return string
 * Usage: Endpoint: https://api.example.com/user?id={{buildUserUrl}}
 * Input: params.extValue1 contains user ID
 */

const userId = params.extValue1;
const timestamp = Date.now();

// Build query string with multiple parameters
const queryParams = `userId=${encodeURIComponent(userId)}&timestamp=${timestamp}`;

// Return the query string portion
queryParams;
