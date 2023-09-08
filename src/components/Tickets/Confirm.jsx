import React from 'react'
import styles from './Tickets.module.scss'
import Image from 'next/image'

export const Confirm = ({ show, formFields }) => {
  console.log(formFields)
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formInner}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/events/large/${show.image}`}
            width={200}
            height={200}
            style={{ objectFit: 'cover', width: 'auto', height: '100%' }}
            alt={show.title}
          />
        </div>
      </div>
    </div>
  )
}
