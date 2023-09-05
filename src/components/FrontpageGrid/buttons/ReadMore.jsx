import Link from 'next/link'
import React from 'react'

export const ReadMore = ({ id }) => {
  return (
    <Link
      href={`/events/${id}`}
      className="readmore-btn"
    >
      Læs Mere
    </Link>
  )
}
