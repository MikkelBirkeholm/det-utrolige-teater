'use client'
import React, { useEffect, useState } from 'react'
import styles from './Events.module.scss'
import Image from 'next/image'
import convertDates from '@/utils/convertDates'
import { BuyTicket } from '../FrontpageGrid/buttons/BuyTicket'
import { ReadMore } from '../FrontpageGrid/buttons/ReadMore'

export default function AllEvents() {
  const [shows, setShows] = useState(null)
  const [filter, setFilter] = useState(null)

  // initial fetch
  useEffect(() => {
    async function getAllShows() {
      try {
        const res = await fetch(
          `http://localhost:4000/events?orderby=startdate&dir=ASC`
        )
        const data = await res.json()
        const showIDs = data.map((show) => show.id)

        const showArr = showIDs.map(async (id) => {
          const showRes = await fetch(`http://localhost:4000/events/${id}`)
          return showRes.json()
        })
        const compiledData = await Promise.all(showArr)
        setShows(compiledData)
      } catch (error) {
        console.log(error)
      }
    }
    getAllShows()
  }, [])

  // filtered fetch
  useEffect(() => {
    if (filter !== null) {
      async function getAllShows() {
        try {
          const res = await fetch(
            `http://localhost:4000/events?orderby=${filter.value}&dir=${filter.direction}`
          )
          const data = await res.json()
          const showIDs = data.map((show) => show.id)

          const showArr = showIDs.map(async (id) => {
            const showRes = await fetch(`http://localhost:4000/events/${id}`)
            return showRes.json()
          })
          const compiledData = await Promise.all(showArr)
          setShows(compiledData)
        } catch (error) {
          console.log('filter error', error)
        }
      }
      getAllShows()
    }
  }, [filter])

  function handleFilterChange(e) {
    setFilter({
      value: e.target.value,
      direction: e.target.options[e.target.selectedIndex].dataset.dir,
    })
  }

  return (
    <div className={styles.eventListWrapper}>
      <div className={styles.filterBox}>
        <select
          onChange={handleFilterChange}
          defaultValue={'init'}
        >
          <option
            value="init"
            data-dir="DESC"
            disabled
          >
            Sorter efter...
          </option>
          <option
            value="price"
            data-dir="DESC"
          >
            Sorter efter pris (faldende)
          </option>
          <option
            value="price"
            data-dir="ASC"
          >
            Sorter efter pris (stigende)
          </option>
          <option
            value="title"
            data-dir="DESC"
          >
            Sorter efter title (A - Å)
          </option>
          <option
            value="title"
            data-dir="ASC"
          >
            Sorter efter title (Å - A)
          </option>
        </select>
        <h1>Oversigt</h1>
      </div>
      {shows ? (
        <ul>
          {shows.map((show) => {
            const startDate = convertDates(show.startdate)
            const endDate = convertDates(show.stopdate)
            return (
              <li key={show.id}>
                <Image
                  src={`/images/events/small/${show.image}`}
                  width={100}
                  height={100}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    height: 'auto',
                    flex: '0',
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={show.title}
                />
                <div className={styles.contentWrapper}>
                  <h2>{show.title}</h2>
                  <div className={styles.infoBox}>
                    <p>{show.stage.name}</p>
                    <span>
                      {startDate.date}. {startDate.month} - {endDate.date}.{' '}
                      {endDate.month} {endDate.year}
                    </span>
                  </div>
                  <div className={styles.buttonGroup}>
                    <BuyTicket id={show.id} />
                    <ReadMore id={show.id} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
