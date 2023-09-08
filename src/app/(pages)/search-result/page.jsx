'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import convertDates from '@/utils/convertDates'
import { BuyTicket } from '@/components/FrontpageGrid/buttons/BuyTicket'
import { ReadMore } from '@/components/FrontpageGrid/buttons/ReadMore'

export default function Search({ searchParams }) {
  const search = searchParams.s
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    async function getSearchResult() {
      const res = await fetch(`http://localhost:4000/events/search/${search}`)
      const data = await res.json()
      setSearchResult(data[0])
      console.log(data)
    }
    if (search) {
      getSearchResult()
    }
  }, [search])

  return (
    <main>
      {searchResult ? (
        <div className={styles.resultWrapper}>
          <article className={styles.eventDetails}>
            <div className={styles.imageContainer}>
              <Image
                src={`/images/events/large/${searchResult.image}`}
                fill={true}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                alt={searchResult.title}
              />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.eventInfo}>
                <div>
                  <p>{searchResult.stage.name}</p>
                </div>
              </div>
              <hr />
              <div className={styles.eventInfo}>
                <hgroup>
                  <h1>{searchResult.title}</h1>
                  <span>{searchResult.genre.name}</span>
                </hgroup>
                <ReadMore id={searchResult.id} />
              </div>
              <p>{searchResult.description}</p>
            </div>
          </article>
        </div>
      ) : (
        'Vi kunne ikke finde noget på din forespørgelse'
      )}
    </main>
  )
}
