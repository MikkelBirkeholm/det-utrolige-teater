import Image from 'next/image'
import styles from './styles.module.scss'
import convertDates from '@/utils/convertDates'
import { BuyTicket } from '@/components/FrontpageGrid/buttons/BuyTicket'
import Link from 'next/link'

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:4000/events`)
  const data = await res.json()
  const showIDs = data.map((show) => show.id)

  return showIDs.map((id) => ({
    slug: id,
  }))
}

async function getEventDetails(id) {
  const res = await fetch(`http://localhost:4000/events/${id}`)
  const data = await res.json()
  return data
}

async function getAllActors() {
  try {
    const res = await fetch(`http://localhost:4000/actors`)
    const data = await res.json()
    const actorIDs = data.map((actor) => actor.id)

    const actorArr = actorIDs.map(async (id) => {
      const showRes = await fetch(`http://localhost:4000/actors/${id}`)
      return showRes.json()
    })
    const compiledData = await Promise.all(actorArr)
    const trimmedData = compiledData.slice(0, 4)
    return trimmedData
  } catch (error) {
    console.log(error)
  }
}

export default async function Page({ params }) {
  const id = params.id
  const show = await getEventDetails(id)

  const startDate = convertDates(show.startdate)
  const endDate = convertDates(show.stopdate)
  return (
    <main>
      <article className={styles.eventDetails}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/events/large/${show.image}`}
            fill={true}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            alt={show.title}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.eventInfo}>
            <div>
              <p>{show.stage.name}</p>
              <span>
                {startDate.date}. {startDate.month} - {endDate.date}.{' '}
                {endDate.month} {endDate.year}
              </span>
            </div>
            <div>
              <p>BILLETPRIS: {show.price},00 DKK</p>
            </div>
          </div>
          <hr />
          <div className={styles.eventInfo}>
            <hgroup>
              <h1>{show.title}</h1>
              <span>{show.genre.name}</span>
            </hgroup>
            <BuyTicket id={show.id} />
          </div>
          <p>{show.description}</p>
          <p>Varighed ca. {show.duration_minutes} minutter</p>
          <h2>Medvirkende</h2>
          <ul className={styles.actors}>
            {show.actors.map((actor) => {
              return (
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
                  <p>{actor.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </article>
      <Link href={`/events`}>
        <button>Tilbage til alle forestillinger</button>
      </Link>
    </main>
  )
}
