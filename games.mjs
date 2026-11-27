/** Choose gap positions for the existing exercise modes. */
export function gapIndices(words, mode) {
  if (words.length === 0) return [];
  if (mode === 4 || mode === 10) {
    return words.map((_, index) => index).filter(index => index % 2 === 1);
  }
  return [words.length - 1];
}
