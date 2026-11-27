/** Read saved progress defensively; storage may be blocked or corrupted. */
export function readProgress(storage) {
  let points = 0;
  let history = [];
  try {
    const value = Number(storage.getItem('melodyPoints') || 0);
    if (Number.isSafeInteger(value) && value >= 0) points = value;
  } catch { /* Keep the default when storage is unavailable. */ }
  try {
    const value = JSON.parse(storage.getItem('melodyHistory') || '[]');
    if (Array.isArray(value)) {
      history = value.filter(entry => entry &&
        ['song', 'mode', 'score'].every(key => typeof entry[key] === 'string')).slice(0, 50);
    }
  } catch { /* Keep an empty history for invalid JSON. */ }
  return { points, history };
}
