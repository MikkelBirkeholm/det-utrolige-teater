import styles from '../styles.module.scss'
import { splitArray } from '@/utils/splitArray'
import { TicketsCombiner } from '@/components/Tickets/TicketsCombiner'
import { TicketsForm } from '@/components/Tickets/TicketsForm'

async function getEventDetails(id) {
  const res = await fetch(`http://localhost:4000/events/${id}`)
  const data = await res.json()
  return data
}
async function getBookedSeats() {
  return [2, 3, 4, 20, 21, 22, 44, 45, 6, 7, 8]
}

function checkSeatStatus(reservations, seatID) {
  return reservations.includes(seatID) ? true : false
}

// get all seats
async function getAllSeats(sceneID) {
  const res = await fetch('http://localhost:4000/seats/1')
  const data = await res.json()

  // filtrer seats baseret på scene
  if (data) {
    const bookedSeats = await getBookedSeats()
    const sceneSeats = []
    const mappedSeats = data.map(async (seat) => {
      if (seat.stage.id == sceneID) {
        seat = { ...seat, reserved: checkSeatStatus(bookedSeats, seat.id) }
        sceneSeats.push(seat)
      }
    })

    await Promise.all(mappedSeats)
    return sceneSeats
  }
}

async function createRowsFromSeats(seats) {
  // kopi nødvendig, da reverse() mutater den originale array
  const seatsCopy = [...seats]

  // find det højeste sædenummer - OBS virker kun hvis alle rækker har lige mange sæder
  const seatsPerRow = seatsCopy.reverse()[0]
  const seatRows = splitArray(seats, seatsPerRow.number)
  return seatRows
}

export default async function Billetter({ params }) {
  const id = params.id
  const show = await getEventDetails(id)
  const allSeats = await getAllSeats(show.stage.id)
  const rows = await createRowsFromSeats(allSeats)

  return (
    <main>
      <TicketsForm
        show={show}
        rows={rows}
      />
    </main>
  )
}
