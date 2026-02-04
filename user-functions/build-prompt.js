/**
 * Prompt Builder User Function
 * Builds a spoken prompt by stitching together reusable segments.
 *
 * Usage: configure params.promptSequence with array of keys.
 */

// Demonstration lookup showing how segments are structured
const PROMPT_SEGMENTS = {
  greeting: {
    first: "Hello and welcome",
    middle: "We appreciate your call today",
    last: "We are here to help"
  },
  balance: {
    first: "Let's review your account",
    middle: "Your current balance is available",
    last: "Please confirm if you need anything else"
  },
  authentication: {
    first: "For security purposes",
    middle: "We will ask you to verify your details",
    last: "Your identity helps keep your account safe"
  },
  closing: {
    first: "Thank you for your patience",
    middle: "We appreciate your trust in us",
    last: "Goodbye"
  }
};

// Fallback sequence used when no params.promptSequence is provided
const DEFAULT_PROMPT_SEQUENCE = ["closing", "authentication", "balance"];

const paramsDefined = typeof params !== "undefined" && params !== null;

const providedSequence = paramsDefined && Array.isArray(params.promptSequence) && params.promptSequence.length > 0
  ? params.promptSequence
  : DEFAULT_PROMPT_SEQUENCE;

const validSequence = providedSequence
  .map(key => typeof key === "string" ? key.trim() : "")
  .filter(key => key && PROMPT_SEGMENTS[key]);

const promptParts = validSequence.map((key, index) => {
  const segment = PROMPT_SEGMENTS[key];
  if (!segment) {
    return "";
  }

  if (index === 0) {
    return segment.first;
  }

  if (index === validSequence.length - 1) {
    return segment.last;
  }

  return segment.middle;
}).filter(Boolean);

const prompt = promptParts.join(". ");

prompt;

console.log(prompt);
