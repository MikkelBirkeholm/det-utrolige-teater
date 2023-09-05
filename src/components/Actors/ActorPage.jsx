import React from 'react'
import styles from './Actors.module.scss'
import Image from 'next/image'

export default function ActorPage(data) {
  return (
    <div className={styles.contentWrapper}>
      <h1>Skuespillere</h1>
      <div className={styles.actorCard}>
        <Image
          src={`/images/actors/${data.data.image}`}
          width={200}
          height={400}
          style={{ objectFit: 'cover', width: '100%' }}
          alt={data.data.name}
        />
        <hgroup>
          <h2>{data.data.name}</h2>
          <p>{data.data.description}</p>
        </hgroup>
      </div>
    </div>
  )
}
