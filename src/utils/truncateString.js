export function truncateString(str) {
  const num = 7;
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
