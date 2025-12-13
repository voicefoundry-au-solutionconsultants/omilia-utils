/**
 * Dynamic Greeting Based on Time
 * Returns appropriate greeting based on current hour
 * 
 * User Function - MUST return string
 * Usage: {{getGreeting}} in prompts
 */

// Get current hour in UTC
const currentHour = parseInt(params.CurrentHour);

// Adjust for local timezone (example: UTC + 3)
// Use modulo to handle hour overflow (e.g., 23 + 3 = 26 becomes 2)
const localHour = (currentHour + 3) % 24;

// Determine greeting based on time
// Morning starts at 2 AM
const greeting = (localHour >= 2 && localHour < 12) ? "Good Morning" :
                 (localHour >= 12 && localHour < 18) ? "Good Afternoon" :
                 "Good Evening";

greeting;
