import Image from 'next/image'
import React from 'react'
import { truncate } from '@/utils/truncateText'
import styles from './Actors.module.scss'
import Link from 'next/link'

export default function ActorsList({ data }) {
  return (
    <div className={styles.contentWrapper}>
      <h1>Skuespillere</h1>
      <ul className={styles.actorList}>
        {data.map((actor) => {
          const truncatedtext = truncate(actor.description, 80)
          return (
            <>
              <li key={actor.id}>
                <Image
                  src={`/images/actors/${actor.image}`}
                  width={150}
                  height={200}
                  style={{
                    height: 'auto',
                    width: '100%',
                    aspectRatio: '1 / 1',
                  }}
                  alt={actor.name}
                />
                <hgroup>
                  <h2>{actor.name}</h2>
                  <p>{truncatedtext}...</p>
                </hgroup>
                <Link href={`/skuespillere/${actor.id}`}>
                  <button>Læs mere</button>
                </Link>
              </li>
              <hr />
            </>
          )
        })}
      </ul>
    </div>
  )
}
