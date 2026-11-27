import { shuffle } from './shuffle.mjs';
/** Choose gap positions for the existing exercise modes. */
export function gapIndices(words, mode) {
  if (words.length === 0) return [];
  if (mode === 4 || mode === 10) {
    return words.map((_, index) => index).filter(index => index % 2 === 1);
  }
  return [words.length - 1];
}

/** Build up to four distinct choices, including the correct answer. */
export function answerOptions(correct, vocabulary, random = Math.random) {
  const seen = new Set([correct.toLowerCase()]);
  const choices = [correct];
  for (const word of shuffle(vocabulary, random)) {
    if (choices.length === 4) break;
    const key = word.toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    choices.push(word);
  }
  return shuffle(choices, random);
}
