/**
 * Unit Tests for Prompt Builder
 */

const buildPrompt = require('./build-prompt');

describe('Build Prompt', () => {
  test('uses default sequence when params.promptSequence is missing', () => {
    const result = buildPrompt({});
    expect(result).toBe('Hello and welcome. Your current balance is available. Goodbye');
  });

  test('handles missing params gracefully', () => {
    const result = buildPrompt();
    expect(result).toBe('Hello and welcome. Your current balance is available. Goodbye');
  });

  test('honors provided sequence and delimiter rules', () => {
    const params = { promptSequence: ['greeting', 'authentication', 'closing'] };
    const result = buildPrompt(params);
    expect(result).toBe('Hello and welcome. We will ask you to verify your details. Goodbye');
  });

  test('ignores unknown keys gracefully', () => {
    const params = { promptSequence: ['greeting', 'unknown', 'closing'] };
    const result = buildPrompt(params);
    expect(result).toBe('Hello and welcome. Goodbye');
  });

  test('handles two element sequences with first and last segments', () => {
    const params = { promptSequence: ['authentication', 'closing'] };
    const result = buildPrompt(params);
    expect(result).toBe('For security purposes. Goodbye');
  });

  test('returns empty string when no valid keys are provided', () => {
    const params = { promptSequence: ['unknown'] };
    const result = buildPrompt(params);
    expect(result).toBe('');
  });
});
