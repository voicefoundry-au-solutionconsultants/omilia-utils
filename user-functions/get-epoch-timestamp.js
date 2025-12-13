/**
 * Calculate Epoch Timestamp
 * Returns current Unix epoch for API calls
 * 
 * User Function - MUST return string
 * Usage: Endpoint: https://api.example.com/filter?timeFrom={{getEpoch}}
 */

// Get current timestamp in seconds (Unix epoch)
const epochSeconds = Math.floor(Date.now() / 1000);

// Return as string
epochSeconds.toString();
