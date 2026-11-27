// Original educational texts; no third-party lyrics or recordings.
export const songs = [{name:'Morning Light',level:'A1',lines:['I see the morning light','I walk along the road','I feel the wind tonight','Music makes me feel free']},{name:'Blue Sky',level:'A2',lines:['I look up at the sky','I welcome every day','I know the road to home','I follow my own dream']},{name:'After the Rain',level:'B1',lines:['I hear the sound of rain','I keep hope inside my heart','I find a light within the night','I carry on and sing my song']}];

/** Filter by case-insensitive title and optional CEFR level. */
export function filterSongs(items, query = '', level = '') {
  const search = query.toLowerCase();
  return items.filter(song => song.name.toLowerCase().includes(search) &&
    (!level || song.level === level));
}
