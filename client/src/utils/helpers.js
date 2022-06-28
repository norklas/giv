export function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function pluralize(string, num) {
  if (num===1) {
    return string
  } else {
    return string + 's';
  }

}