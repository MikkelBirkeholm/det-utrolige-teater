export async function getShows() {
  const res = await fetch(`http://localhost:4000/events`)
  const data = res.json()
  return data
}
