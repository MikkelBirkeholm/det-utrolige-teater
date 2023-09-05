export function truncate(string, count) {
  return string.split(' ').splice(0, count).join(' ')
}
