/**
 * Branch Locator
 * Returns branch name based on phone number called (DNIS)
 * 
 * User Function - MUST return string
 * Usage: "Welcome to our {{getBranchName}} branch"
 */

const dnis = params.Dnis;

// Map area codes to branch names
const branchName = dnis.startsWith('505') ? 'New Mexico' :
                   dnis.startsWith('272') ? 'Pennsylvania' :
                   dnis.startsWith('212') ? 'New York' :
                   dnis.startsWith('213') ? 'Los Angeles' :
                   dnis.startsWith('312') ? 'Chicago' :
                   'main';

branchName;
