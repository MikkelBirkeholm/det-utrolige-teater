import React from 'react'
import styles from './PromoBanner.module.scss'
import convertDates from '@/utils/convertDates'
import Image from 'next/image'

async function getPromotedEvent(id) {
  const show = await fetch(`http://localhost:4000/events/${id}`)
  const data = show.json()
  return data
}

const eventData = await getPromotedEvent(1)

export const PromoBanner = async () => {
  const startDate = convertDates(eventData.startdate)
  const endDate = convertDates(eventData.stopdate)

  return (
    <article className={styles.promoCard}>
      <div className={styles.imageContainer}>
        <Image
          src={`/images/events/medium/${eventData.image}`}
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            padding: '0.5rem',
          }}
          fill={true}
          alt={eventData.title}
        />
      </div>
      <div className={styles.contentContainer}>
        <p>{eventData.stage.name}</p>
        <span>
          {startDate.date}. {startDate.month} - {endDate.date}. {endDate.month}{' '}
          {endDate.year}
        </span>
        <hr />
        <hgroup>
          <h1>{eventData.title}</h1>
          <span>{eventData.genre.name}</span>
        </hgroup>
      </div>
    </article>
  )
}
