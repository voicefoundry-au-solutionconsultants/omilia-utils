/**
 * Generate JWT Token for API Authentication
 * Creates signed JWT for WebService calls
 * 
 * User Function - MUST return string (using signJwt helper)
 * Usage: Authorization header: Bearer {{generateToken}}
 * Requires: signJwt function available in Omilia
 */

// Build payload
const payload = {
  userId: params.extValue1,
  sessionId: params.DialogID,
  timestamp: Date.now()
};

// Secret key (in production, use environment variable)
const secret = 'your-secret-key-here';

// Sign options
const options = {
  expiresIn: '1h',
  algorithm: 'HS256'
};

// Sign and return JWT
signJwt(payload, secret, options);
