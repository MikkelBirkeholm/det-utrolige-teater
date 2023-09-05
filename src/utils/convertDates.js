const months = [
  'Januar',
  'Februar',
  'Marts',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'December',
]

const days = [
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
  'Søndag',
]

export default function convertDates(dateString) {
  const newDate = new Date(dateString)
  const date = newDate.getDate()
  const day = days[newDate.getDay()]
  const month = months[newDate.getMonth()]
  const year = newDate.getFullYear()

  return { year, month, day, date }
}
