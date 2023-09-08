export function splitArray(array, chunkSize) {
  return Array(Math.ceil(array.length / chunkSize))
    .fill()
    .map(function (_, i) {
      return array.slice(i * chunkSize, i * chunkSize + chunkSize)
    })
}
