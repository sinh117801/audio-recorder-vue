export function convertTimeMMSS(seconds: number) {
  if (!seconds) return;

  return new Date(seconds * 1000).toISOString().substring(14, 18);
}
