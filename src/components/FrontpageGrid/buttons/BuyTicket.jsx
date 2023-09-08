import Link from 'next/link'
import React from 'react'

export const BuyTicket = ({ id }) => {
  return (
    <Link
      href={`/events/${id}/billetter`}
      className="buy-btn"
    >
      Køb Billet
    </Link>
  )
}
