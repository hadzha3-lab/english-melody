/** Normalize learner input without removing meaningful apostrophes. */
export function normalize(value) {
  return String(value ?? '').toLowerCase().replace(/’/g, "'")
    .replace(/[.,!?;:]/g, ' ').trim().replace(/\s+/g, ' ');
}

export function isCorrect(answer, expected) {
  if (typeof answer !== "string" || typeof expected !== "string") return false;
  const normalized = normalize(answer);
  return normalized !== '' && normalized === normalize(expected);
}

/** Compare aligned answers and return the number of correct responses. */
export function score(answers, expected) {
  if (answers.length !== expected.length) {
    throw new RangeError('Answer and expected arrays must have equal lengths');
  }
  return {
    correct: answers.filter((answer, index) => isCorrect(answer, expected[index])).length,
    total: expected.length,
  };
}
