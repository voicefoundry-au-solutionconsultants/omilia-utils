module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'validation-functions/**/*.js',
    'user-functions/**/*.js',
    'output-functions/**/*.js',
    '!**/*.test.js',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.test.js$/',
  ],
  verbose: true,
  testTimeout: 10000,
  transform: {
    '^.+\\.js$': './utils/omilia-jest-transformer.js'
  }
};
