export function checkUser() {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  }
  return false
}
