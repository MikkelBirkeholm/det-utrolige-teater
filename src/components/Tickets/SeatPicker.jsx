'use client'
import React, { useEffect, useState } from 'react'
import styles from './Tickets.module.scss'

export const SeatPicker = ({ rows, sceneName, seatCount, callback }) => {
  const [picked, setPicked] = useState([])

  function handleSeatSelect(e, seat) {
    if (!e.target.checked) {
      // Ved klik på allerede valgt seat
      setPicked((prev) =>
        prev.filter((pickedSeat) => pickedSeat.id !== seat.id)
      )
      return
    }

    if (picked.length >= seatCount) {
      // Vælg max antal seats = antal billetter
      e.target.checked = false
      alert(
        `Du har kun valgt at reservere ${seatCount} billet${
          seatCount > 1 ? 'ter' : ''
        }. Hvis du vil have flere sæder, så bestil flere under "Antal"`
      )
      return
    }

    setPicked((prev) => [...prev, seat])
  }

  useEffect(() => {
    callback(picked)
  }, [picked])

  return (
    <div className={styles.seatsWrapper}>
      <div className={styles.scene}>{sceneName}</div>
      {rows &&
        rows.map((row, i) => {
          return (
            <ul
              key={i}
              data-rownum={i + 1}
            >
              {row.map((seat) => {
                seat = { ...seat, row: i + 1 }
                if (seat.reserved) {
                  return (
                    <li
                      key={seat.id}
                      className={styles.seat}
                    >
                      <label>
                        <input
                          type="checkbox"
                          value={seat.id}
                          disabled={true}
                        />
                        {seat.number}
                      </label>
                    </li>
                  )
                } else {
                  return (
                    <li
                      key={seat.id}
                      className={styles.seat}
                    >
                      <label>
                        <input
                          type="checkbox"
                          onClick={(e) => handleSeatSelect(e, seat)}
                          value={seat.id}
                          disabled={seat.reserved}
                        />
                        {seat.number}
                      </label>
                    </li>
                  )
                }
              })}
            </ul>
          )
        })}
      <span>VÆLG SIDDEPLADSER</span>
    </div>
  )
}
