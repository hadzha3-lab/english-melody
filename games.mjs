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

/** Prepare a phrase or word scramble without depending on the DOM. */
export function scrambleExercise(words, mode, random = Math.random) {
  const answer = mode === 5 ? words.join(' ') : (words.at(-1) ?? '');
  const prompt = mode === 5 ? shuffle(words, random).join(' / ') : shuffle([...answer], random).join(' ');
  return { answer, prompt };
}

/** Find a known word and prepare the requested translation direction. */
export function translationExercise(words, dictionary, mode) {
  const word = words.map(value => value.toLowerCase().replace(/[^a-z]/g, ''))
    .find(value => Object.hasOwn(dictionary, value));
  if (!word) return null;
  return mode === 8 ? { prompt: word, answer: dictionary[word] }
    : { prompt: dictionary[word], answer: word };
}

/** Prepare text-based exercises independently of playback and rendering. */
export function lineExercise(line, mode) {
  if (!line.trim()) return null;
  if (mode === 0) return { prompt: line, answer: null };
  if (mode === 7) return { prompt: line, answer: line };
  if (mode === 11) {
    const words = line.trim().split(/\s+/);
    return { prompt: words.slice(0,-1).join(' ')+' …', answer: words.at(-1) };
  }
  return null;
}
