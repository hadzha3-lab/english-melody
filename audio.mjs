/** Own at most one object URL and release it when the audio changes. */
export function createAudioController(audio, urls = URL) {
  let currentUrl = null;
  function clear() {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    audio.hidden = true;
    if (currentUrl !== null) {
      urls.revokeObjectURL(currentUrl);
      currentUrl = null;
    }
  }
  function setFile(file) {
    clear();
    if (!file) return;
    currentUrl = urls.createObjectURL(file);
    audio.src = currentUrl;
    audio.hidden = false;
  }
  return { clear, setFile };
}
