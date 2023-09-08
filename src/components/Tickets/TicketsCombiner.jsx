'use client'
import { useState } from 'react'
import { TicketsForm } from './TicketsForm'
import styles from './Tickets.module.scss'
import { SeatPicker } from './SeatPicker'
import Image from 'next/image'

export const TicketsCombiner = ({ show, rows }) => {
  const [maxSeats, setMaxSeats] = useState(1)

  function handleCallback(count) {
    setMaxSeats(count)
  }

  return (
    <TicketsForm
      price={show.price}
      callback={(count) => handleCallback(count)}
    />
  )
}
