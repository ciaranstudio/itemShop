export function truncateString(str) {
  const num = 12;
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
