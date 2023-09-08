import React from 'react'
import styles from './FrontpageGrid.module.scss'
import Image from 'next/image'
import convertDates from '@/utils/convertDates'
import { BuyTicket } from './buttons/BuyTicket'
import { ReadMore } from './buttons/ReadMore'
import { PromoBanner } from '../PromoBanner/PromoBanner'

async function getAllShows() {
  try {
    const res = await fetch(
      `http://localhost:4000/events?orderby=startdate&dir=ASC&limit=3`
    )
    const data = await res.json()
    const showIDs = data.map((show) => show.id)

    const showArr = showIDs.map(async (id) => {
      const showRes = await fetch(`http://localhost:4000/events/${id}`)
      return showRes.json()
    })
    const compiledData = await Promise.all(showArr)
    return compiledData
  } catch (error) {
    console.log(error)
  }
}

const showData = await getAllShows()

export default function FrontpageGrid() {
  return (
    <div className={styles.frontPageGrid}>
      <PromoBanner />
      {showData &&
        showData.map((show) => {
          const startDate = convertDates(show.startdate)
          const endDate = convertDates(show.stopdate)

          return (
            <article className={styles.showCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={`/images/events/medium/${show.image}`}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                    padding: '0.5rem',
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill={true}
                  alt={show.title}
                />
              </div>
              <div className={styles.contentContainer}>
                <p>{show.stage.name}</p>
                <span>
                  {startDate.date}. {startDate.month} - {endDate.date}.{' '}
                  {endDate.month} {endDate.year}
                </span>
                <hr />
                <hgroup>
                  <h1>{show.title}</h1>
                  <span>{show.genre.name}</span>
                </hgroup>
                <div className={styles.buttonGroup}>
                  <BuyTicket id={show.id} />
                  <ReadMore id={show.id} />
                </div>
              </div>
            </article>
          )
        })}
    </div>
  )
}
